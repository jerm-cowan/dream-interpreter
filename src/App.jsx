import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import EntryScreen from './components/screens/EntryScreen'
import ConstellationScreen from './components/screens/ConstellationScreen'
import ResultsScreen from './components/screens/ResultsScreen'
import ErrorOverlay from './components/ErrorOverlay'
import { interpretDream, synthesizeLenses } from './api/generation'

const ALL_LENS_IDS = ['psychology', 'neuroscience', 'symbolism']

function computeNextSelection(current, lensId) {
  if (current.includes(lensId)) {
    // Always keep at least one lens selected
    if (current.length === 1) return current
    return current.filter((id) => id !== lensId)
  }
  return [...current, lensId]
}

// Per-screen enter/exit shapes for AnimatePresence — exits stay quick so the user is never waiting on them
const SCREEN_MOTION = {
  entry: {
    initial: { opacity: 0, scale: 1.02 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.94, transition: { duration: 0.375, ease: 'easeIn' } },
  },
  constellation: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.625, ease: 'easeOut', delay: 0.125 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25, ease: 'easeIn' } },
  },
  results: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4375, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3125, ease: 'easeIn' } },
  },
}

function App() {
  const [view, setView] = useState('entry')
  // Bumped on every navigation so AnimatePresence always sees a fresh key, even when the same
  // view is revisited before its previous exit animation has finished (e.g. rapid back/reveal)
  const [viewKey, setViewKey] = useState(0)
  const [dreamText, setDreamText] = useState('')
  const [tone, setTone] = useState('reflective')
  const [selectedLenses, setSelectedLenses] = useState(ALL_LENS_IDS)
  // First reveal plays the full signature timing; later reveals (after a lens-selection change) are snappier
  const [revealCount, setRevealCount] = useState(0)

  const [generatedLenses, setGeneratedLenses] = useState(null)
  const [synthesisAll3, setSynthesisAll3] = useState(null)
  const [synthesis, setSynthesis] = useState(null)
  // Bumped whenever fresh generated/synthesis content lands, so Results can replay its reveal
  // animation as the "visual cover" for tone/lens-selection updates instead of a new spinner
  const [dataVersion, setDataVersion] = useState(0)
  const [loadingState, setLoadingState] = useState('idle')
  const [errorMessage, setErrorMessage] = useState(null)
  const [retryAction, setRetryAction] = useState(null)

  // Guards synthesis recomputation against rapid repeat toggles: the visual selection/lines update
  // instantly on every tap, but the network call itself is debounced to the final selection, and a
  // stale (superseded) response can never overwrite a newer one that already landed.
  const latestSelectionRef = useRef(selectedLenses)
  const synthesisRequestIdRef = useRef(0)
  const synthesisDebounceRef = useRef(null)

  // Sync app view state with browser history so the back button (in-app or browser) works
  useEffect(() => {
    window.history.replaceState({ view: 'entry' }, '')

    function handlePopState(event) {
      setView(event.state?.view ?? 'entry')
      setViewKey((key) => key + 1)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigateTo(nextView) {
    setView(nextView)
    setViewKey((key) => key + 1)
    window.history.pushState({ view: nextView }, '')
  }

  // Tier 1: full generation for a given tone. Used for both the initial submit and tone changes.
  async function generateInterpretation(toneValue) {
    setLoadingState('generating')
    setErrorMessage(null)
    try {
      const result = await interpretDream({ dreamText, tone: toneValue })
      const lenses = {
        psychology: result.psychology,
        neuroscience: result.neuroscience,
        symbolism: result.symbolism,
      }
      setGeneratedLenses(lenses)
      setSynthesisAll3(result.synthesis_all3)
      setDataVersion((v) => v + 1)
      setLoadingState('idle')
      return { lenses, synthesisAll3: result.synthesis_all3 }
    } catch (err) {
      setErrorMessage(err.message)
      setLoadingState('error')
      setRetryAction(() => () => generateInterpretation(toneValue))
      throw err
    }
  }

  // Recomputes the synthesis section for a lens selection. All 3 lenses reuse the cached Tier 1
  // synthesis (no network call); 1-2 lenses call the lighter Tier 2 synthesis endpoint. `requestId`
  // lets a caller discard this result if a newer request has since superseded it (see stale-response
  // guard below) — pass the value returned by `beginSynthesisRequest()`.
  async function recomputeSynthesis(lenses, lensTexts, toneValue, cachedAll3, requestId) {
    const isStale = () => requestId !== undefined && requestId !== synthesisRequestIdRef.current

    if (lenses.length === 3) {
      if (isStale()) return
      setSynthesis(cachedAll3)
      setDataVersion((v) => v + 1)
      setLoadingState('idle')
      return
    }

    setLoadingState('synthesizing')
    setErrorMessage(null)
    try {
      const selectedLensTexts = {}
      lenses.forEach((id) => {
        selectedLensTexts[id] = lensTexts[id]
      })
      const result = await synthesizeLenses({ selectedLensTexts, tone: toneValue, lensCount: lenses.length })
      if (isStale()) return
      setSynthesis(result)
      setDataVersion((v) => v + 1)
      setLoadingState('idle')
    } catch (err) {
      if (isStale()) return
      setErrorMessage(err.message)
      setLoadingState('error')
      setRetryAction(() => () => recomputeSynthesis(lenses, lensTexts, toneValue, cachedAll3, requestId))
      throw err
    }
  }

  async function handleDreamSubmit() {
    try {
      const { lenses, synthesisAll3: freshAll3 } = await generateInterpretation(tone)
      setSelectedLenses(ALL_LENS_IDS)
      setRevealCount(0)
      setSynthesis(freshAll3)
      navigateTo('constellation')
    } catch {
      // Error UI is already shown via loadingState; user retries from the overlay.
    }
  }

  // Constellation-screen toggling: selection only, no recomputation until Reveal is pressed.
  function handleToggleLens(lensId) {
    setSelectedLenses((current) => computeNextSelection(current, lensId))
  }

  // Results-screen toggling: selection (and its lines/card styling) updates immediately on every tap.
  // The actual recomputation network call is debounced to the final selection after a brief pause,
  // so a burst of rapid taps only fires one request instead of one per tap.
  function handleToggleLensInResults(lensId) {
    setSelectedLenses((current) => {
      const next = computeNextSelection(current, lensId)
      latestSelectionRef.current = next
      return next
    })

    if (synthesisDebounceRef.current) clearTimeout(synthesisDebounceRef.current)
    const requestId = ++synthesisRequestIdRef.current
    synthesisDebounceRef.current = setTimeout(() => {
      recomputeSynthesis(latestSelectionRef.current, generatedLenses, tone, synthesisAll3, requestId).catch(() => {
        // Error UI is already shown; retry recomputes the same selection.
      })
    }, 350)
  }

  async function handleReveal() {
    if (synthesisDebounceRef.current) clearTimeout(synthesisDebounceRef.current)
    const requestId = ++synthesisRequestIdRef.current
    try {
      await recomputeSynthesis(selectedLenses, generatedLenses, tone, synthesisAll3, requestId)
      setRevealCount((count) => count + 1)
      navigateTo('results')
    } catch {
      // Error UI is already shown; stays on Constellation.
    }
  }

  async function handleToneChange(nextTone) {
    setTone(nextTone)
    if (!generatedLenses) return
    if (synthesisDebounceRef.current) clearTimeout(synthesisDebounceRef.current)
    const requestId = ++synthesisRequestIdRef.current
    try {
      const { lenses, synthesisAll3: freshAll3 } = await generateInterpretation(nextTone)
      await recomputeSynthesis(selectedLenses, lenses, nextTone, freshAll3, requestId)
    } catch {
      // Error UI is already shown.
    }
  }

  function handleRetry() {
    const action = retryAction
    setRetryAction(null)
    action?.()
  }

  function handleStartOver() {
    setDreamText('')
    setGeneratedLenses(null)
    setSynthesisAll3(null)
    setSynthesis(null)
    navigateTo('entry')
  }

  return (
    <main className="relative min-h-screen bg-gem-opal-50 font-sans text-gem-obsidian-700">
      <AnimatePresence>
        {view === 'entry' && (
          <motion.div key={`entry-${viewKey}`} className="absolute inset-0 overflow-y-auto" {...SCREEN_MOTION.entry}>
            <EntryScreen
              dreamText={dreamText}
              onDreamTextChange={setDreamText}
              onSubmit={handleDreamSubmit}
              loadingState={loadingState}
            />
          </motion.div>
        )}

        {view === 'constellation' && (
          <motion.div key={`constellation-${viewKey}`} className="absolute inset-0 overflow-y-auto" {...SCREEN_MOTION.constellation}>
            <ConstellationScreen
              tone={tone}
              onToneChange={handleToneChange}
              selectedLenses={selectedLenses}
              onToggleLens={handleToggleLens}
              onReveal={handleReveal}
              fast={revealCount > 0}
              loadingState={loadingState}
            />
          </motion.div>
        )}

        {view === 'results' && (
          <motion.div key={`results-${viewKey}`} className="absolute inset-0 overflow-y-auto" {...SCREEN_MOTION.results}>
            <ResultsScreen
              tone={tone}
              onToneChange={handleToneChange}
              selectedLenses={selectedLenses}
              onToggleLens={handleToggleLensInResults}
              onStartOver={handleStartOver}
              fast={revealCount > 1}
              generatedLenses={generatedLenses}
              synthesis={synthesis}
              loadingState={loadingState}
              dataVersion={dataVersion}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loadingState === 'error' && <ErrorOverlay message={errorMessage} onRetry={handleRetry} />}
      </AnimatePresence>
    </main>
  )
}

export default App
