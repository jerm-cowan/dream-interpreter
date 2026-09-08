import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Copy, RotateCcw, Brain, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import ToneControl from '../ToneControl'
import InterpretationCard from '../InterpretationCard'
import SynthesisSection from '../SynthesisSection'
import BackButton from '../BackButton'
import { LENS_STROKE, REVEAL_LINE_TIMING } from '../ConnectingLines'
import { LENSES } from '../../lensData'

function ResultsScreen({
  tone,
  onToneChange,
  selectedLenses,
  onToggleLens,
  onStartOver,
  fast = false,
  generatedLenses,
  synthesis,
  loadingState = 'idle',
  dataVersion = 0,
}) {
  const isSingleLens = selectedLenses.length === 1
  const isGenerating = loadingState === 'generating'
  const isSynthesizing = loadingState === 'synthesizing'

  // Mobile/tablet-portrait accordion state only — fully independent of lens selection, and of each
  // other's collapse state. Always starts fully expanded on arrival at Results (fresh mount per visit).
  const [expandedLenses, setExpandedLenses] = useState(() => new Set(LENSES.map((lens) => lens.id)))
  const [synthesisExpanded, setSynthesisExpanded] = useState(true)

  function toggleExpanded(lensId) {
    setExpandedLenses((current) => {
      const next = new Set(current)
      if (next.has(lensId)) {
        next.delete(lensId)
      } else {
        next.add(lensId)
      }
      return next
    })
  }

  // Measured (not percentage) geometry, since card/synthesis heights aren't fixed like the Constellation triangle
  const gridRef = useRef(null)
  const cardRefs = useRef({})
  const synthesisRef = useRef(null)
  const [lineGeometry, setLineGeometry] = useState(null)

  // Stable so it can be re-run both on mount/resize and once the entrance animation actually settles
  const measureLines = useCallback(() => {
    const container = gridRef.current
    const synthesisEl = synthesisRef.current
    if (!container || !synthesisEl) return

    const containerRect = container.getBoundingClientRect()
    const synthesisRect = synthesisEl.getBoundingClientRect()
    // Every line converges on this single point: the synthesis box's top edge, horizontally centered
    const target = {
      x: synthesisRect.left - containerRect.left + synthesisRect.width / 2,
      y: synthesisRect.top - containerRect.top,
    }

    const sources = {}
    LENSES.forEach((lens) => {
      const node = cardRefs.current[lens.id]
      if (!node) return
      const rect = node.getBoundingClientRect()
      // Lines start at each card's own bottom edge, horizontally centered, and draw downward
      sources[lens.id] = {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.bottom - containerRect.top,
      }
    })

    setLineGeometry({ width: containerRect.width, height: containerRect.height, target, sources })
  }, [])

  useLayoutEffect(() => {
    // Cards/synthesis enter via a y-offset animation, so a single measurement taken at mount would
    // go stale mid-transition (and briefly show lines short of the frame borders below). Re-measuring
    // on every frame for the duration of that entrance animation keeps lines glued to it throughout,
    // not just once it settles.
    let rafId
    let active = true
    const entranceMs = fast ? 600 : 1050
    const stopAt = performance.now() + entranceMs

    function tick(now) {
      measureLines()
      if (active && now < stopAt) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    window.addEventListener('resize', measureLines)
    return () => {
      active = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', measureLines)
    }
  }, [dataVersion, measureLines, fast])

  // First reveal gets the full signature stagger; a re-reveal after a lens-selection change is snappier
  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: fast ? 0.075 : 0.15,
        delayChildren: fast ? 0.0625 : 0.1875,
      },
    },
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: fast ? 0.3125 : 0.5, ease: 'easeOut' } },
  }
  const synthesisVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: fast ? 0.3125 : 0.5,
        ease: 'easeOut',
        delay: fast ? 0.125 : 0.3125,
      },
    },
  }

  // Matches the Constellation reveal's own line-draw timing/stagger
  const { duration: lineDuration, stagger: lineStagger } = fast ? REVEAL_LINE_TIMING.fast : REVEAL_LINE_TIMING.slow

  return (
    <div className="relative min-h-screen flex flex-col gap-8 px-4 py-8">
      <BackButton />
      <header className="w-full max-w-xl mx-auto flex flex-col items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gem-opal-300 bg-gradient-to-br from-gem-opal-50 to-gem-opal-200 shadow-sm">
          <Brain className="w-6 h-6 text-gem-opal-700" strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-gem-obsidian-900 tracking-tight">
          Your Reflection
        </h2>
        <ToneControl value={tone} onChange={onToneChange} disabled={isGenerating} />
        {isGenerating ? (
          <p className="text-sm text-gem-obsidian-500/80 italic">Reimagining your dream in a new voice...</p>
        ) : isSynthesizing ? (
          <p className="flex items-center gap-2 text-sm text-gem-obsidian-500/80 italic">
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Generating new responses...
          </p>
        ) : (
          <p className="text-sm text-gem-obsidian-500/80 text-center">
            Here are possible meanings across three lenses — turn any of them on or off to explore different
            combinations.
          </p>
        )}
      </header>

      <div ref={gridRef} className="relative w-full max-w-5xl mx-auto flex flex-col gap-10 lg:gap-14">
        {lineGeometry && (
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${lineGeometry.width} ${lineGeometry.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {LENSES.map((lens, index) => {
              const source = lineGeometry.sources[lens.id]
              if (!source) return null
              const selected = selectedLenses.includes(lens.id)
              const target = lineGeometry.target
              const lineProps = {
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                className: LENS_STROKE[lens.id],
                initial: { pathLength: 0, opacity: 0 },
                animate: selected ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
                transition: {
                  duration: lineDuration,
                  delay: selected ? index * lineStagger : 0,
                  ease: 'easeInOut',
                },
              }

              // The middle lens sits directly above the synthesis box, so it gets a plain
              // straight drop; the two side lenses step down/across/down to reach the same point.
              if (lens.id === 'neuroscience') {
                return <motion.line key={lens.id} x1={source.x} y1={source.y} x2={target.x} y2={target.y} {...lineProps} />
              }

              const bendY = source.y + (target.y - source.y) / 2
              return (
                <motion.path
                  key={lens.id}
                  fill="none"
                  d={`M ${source.x} ${source.y} L ${source.x} ${bendY} L ${target.x} ${bendY} L ${target.x} ${target.y}`}
                  {...lineProps}
                />
              )
            })}
          </svg>
        )}

        <motion.section
          key={`cards-${dataVersion}`}
          className={`flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start transition-opacity ${isSynthesizing ? 'opacity-60' : ''}`}
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {LENSES.map((lens) => (
            <motion.div
              key={lens.id}
              ref={(node) => {
                cardRefs.current[lens.id] = node
              }}
              variants={cardVariants}
            >
              <InterpretationCard
                lensId={lens.id}
                lens={lens.label}
                body={generatedLenses?.[lens.id] ?? ''}
                selected={selectedLenses.includes(lens.id)}
                onToggle={() => onToggleLens(lens.id)}
                expanded={expandedLenses.has(lens.id)}
                onToggleExpand={() => toggleExpanded(lens.id)}
              />
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          key={`synthesis-${dataVersion}`}
          ref={synthesisRef}
          className={`rounded-xl border border-gem-citrine-200 bg-gem-citrine-50/50 p-5 flex flex-col gap-6 w-full lg:w-fit lg:max-w-4xl lg:self-center transition-opacity ${isSynthesizing ? 'opacity-60' : ''}`}
          variants={synthesisVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex lg:hidden items-center justify-between gap-2">
            <span className="font-display font-semibold text-lg text-gem-citrine-900">Synthesis</span>
            <button
              type="button"
              onClick={() => setSynthesisExpanded((value) => !value)}
              aria-expanded={synthesisExpanded}
              aria-label={synthesisExpanded ? 'Collapse synthesis' : 'Expand synthesis'}
              className="p-1 -m-1 shrink-0 text-gem-citrine-900"
            >
              {synthesisExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          <div
            className={`${synthesisExpanded ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row lg:items-stretch divide-y divide-gem-citrine-200 lg:divide-y-0 lg:divide-x gap-6 lg:gap-0 w-full`}
          >
            {isSingleLens ? (
              <SynthesisSection heading="Single-Lens Reflection" body={synthesis?.singleLensReflection ?? ''} />
            ) : (
              <>
                <SynthesisSection heading="Common Themes" body={synthesis?.commonThemes ?? ''} />
                <SynthesisSection heading="Divergent Interpretations" body={synthesis?.divergentInterpretations ?? ''} />
              </>
            )}
            <SynthesisSection heading="Reflection Questions" items={synthesis?.reflectionQuestions ?? []} />
          </div>
        </motion.section>
      </div>

      <div className="flex items-center justify-center gap-4 pb-4">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gem-obsidian-500 hover:text-gem-obsidian-700 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy Results
        </button>
        <span className="h-4 w-px bg-gem-opal-300" aria-hidden="true" />
        <button
          type="button"
          onClick={onStartOver}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gem-obsidian-500 hover:text-gem-obsidian-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </button>
      </div>
    </div>
  )
}

export default ResultsScreen
