import { useLayoutEffect, useRef, useState } from 'react'
import { Copy, RotateCcw, Brain } from 'lucide-react'
import { motion } from 'motion/react'
import ToneControl from '../ToneControl'
import InterpretationCard from '../InterpretationCard'
import SynthesisSection from '../SynthesisSection'
import BackButton from '../BackButton'
import { LENS_STROKE, REVEAL_LINE_TIMING } from '../ConnectingLines'
import { LENSES } from '../../lensData'

const LENS_PLACEHOLDER =
  'Placeholder text — a paragraph describing how this lens might read the dream will appear here once generation is wired up.'

const SYNTHESIS_PLACEHOLDER =
  'Placeholder text — synthesis content will appear here once generation is wired up.'

function ResultsScreen({ tone, onToneChange, selectedLenses, onToggleLens, onStartOver, fast = false }) {
  const isSingleLens = selectedLenses.length === 1

  // Measured (not percentage) geometry, since card/synthesis heights aren't fixed like the Constellation triangle
  const gridRef = useRef(null)
  const cardRefs = useRef({})
  const synthesisRef = useRef(null)
  const [lineGeometry, setLineGeometry] = useState(null)

  useLayoutEffect(() => {
    function measure() {
      const container = gridRef.current
      const synthesis = synthesisRef.current
      if (!container || !synthesis) return

      const containerRect = container.getBoundingClientRect()
      const synthesisRect = synthesis.getBoundingClientRect()
      // Every line converges on this single point: the synthesis box's left edge, vertically centered
      const target = {
        x: synthesisRect.left - containerRect.left,
        y: synthesisRect.top - containerRect.top + synthesisRect.height / 2,
      }

      const sources = {}
      LENSES.forEach((lens) => {
        const node = cardRefs.current[lens.id]
        if (!node) return
        const rect = node.getBoundingClientRect()
        sources[lens.id] = {
          x: rect.right - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2,
        }
      })

      setLineGeometry({ width: containerRect.width, height: containerRect.height, target, sources })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

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
        <ToneControl value={tone} onChange={onToneChange} />
      </header>

      <div ref={gridRef} className="relative w-full max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">
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
              return (
                <motion.line
                  key={lens.id}
                  x1={source.x}
                  y1={source.y}
                  x2={lineGeometry.target.x}
                  y2={lineGeometry.target.y}
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={LENS_STROKE[lens.id]}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={selected ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{
                    duration: lineDuration,
                    delay: selected ? index * lineStagger : 0,
                    ease: 'easeInOut',
                  }}
                />
              )
            })}
          </svg>
        )}

        <motion.section
          className="flex flex-col gap-8"
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
                body={LENS_PLACEHOLDER}
                selected={selectedLenses.includes(lens.id)}
                onToggle={() => onToggleLens(lens.id)}
              />
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          ref={synthesisRef}
          className="rounded-xl border-2 border-gem-citrine-300 bg-gem-citrine-50 p-5 flex flex-col items-center justify-center gap-6"
          variants={synthesisVariants}
          initial="hidden"
          animate="visible"
        >
          {isSingleLens ? (
            <SynthesisSection heading="Single-Lens Reflection" body={SYNTHESIS_PLACEHOLDER} divider={false} />
          ) : (
            <>
              <SynthesisSection heading="Common Themes" body={SYNTHESIS_PLACEHOLDER} divider={false} />
              <SynthesisSection heading="Divergent Interpretations" body={SYNTHESIS_PLACEHOLDER} />
            </>
          )}
          <SynthesisSection heading="Reflection Questions" body={SYNTHESIS_PLACEHOLDER} />
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
