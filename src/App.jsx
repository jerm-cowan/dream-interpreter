import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import EntryScreen from './components/screens/EntryScreen'
import ConstellationScreen from './components/screens/ConstellationScreen'
import ResultsScreen from './components/screens/ResultsScreen'

const ALL_LENS_IDS = ['psychology', 'neuroscience', 'symbolism']

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

  function handleDreamSubmit() {
    setSelectedLenses(ALL_LENS_IDS)
    setRevealCount(0)
    navigateTo('constellation')
  }

  function handleToggleLens(lensId) {
    setSelectedLenses((current) => {
      if (current.includes(lensId)) {
        // Always keep at least one lens selected
        if (current.length === 1) return current
        return current.filter((id) => id !== lensId)
      }
      return [...current, lensId]
    })
  }

  function handleReveal() {
    setRevealCount((count) => count + 1)
    navigateTo('results')
  }

  function handleStartOver() {
    setDreamText('')
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
            />
          </motion.div>
        )}

        {view === 'constellation' && (
          <motion.div key={`constellation-${viewKey}`} className="absolute inset-0 overflow-y-auto" {...SCREEN_MOTION.constellation}>
            <ConstellationScreen
              tone={tone}
              onToneChange={setTone}
              selectedLenses={selectedLenses}
              onToggleLens={handleToggleLens}
              onReveal={handleReveal}
              fast={revealCount > 0}
            />
          </motion.div>
        )}

        {view === 'results' && (
          <motion.div key={`results-${viewKey}`} className="absolute inset-0 overflow-y-auto" {...SCREEN_MOTION.results}>
            <ResultsScreen
              tone={tone}
              onToneChange={setTone}
              selectedLenses={selectedLenses}
              onToggleLens={handleToggleLens}
              onStartOver={handleStartOver}
              fast={revealCount > 1}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App
