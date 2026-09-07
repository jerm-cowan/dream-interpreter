import { Copy, RotateCcw } from 'lucide-react'
import ToneControl from '../ToneControl'
import InterpretationCard from '../InterpretationCard'
import SynthesisSection from '../SynthesisSection'
import BackButton from '../BackButton'
import { LENSES } from '../../lensData'

const LENS_PLACEHOLDER =
  'Placeholder text — a paragraph describing how this lens might read the dream will appear here once generation is wired up.'

const SYNTHESIS_PLACEHOLDER =
  'Placeholder text — synthesis content will appear here once generation is wired up.'

function ResultsScreen({ tone, onToneChange, selectedLenses, onToggleLens, onStartOver }) {
  const isSingleLens = selectedLenses.length === 1

  return (
    <div className="relative min-h-screen flex flex-col gap-8 px-4 py-8">
      <BackButton />
      <header className="w-full max-w-xl mx-auto flex flex-col items-center gap-4">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-gem-obsidian-900 tracking-tight">
          Your Reflection
        </h2>
        <ToneControl value={tone} onChange={onToneChange} />
      </header>

      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-center">
        <section className="flex flex-col gap-4">
          {LENSES.map((lens) => (
            <InterpretationCard
              key={lens.id}
              lensId={lens.id}
              lens={lens.label}
              body={LENS_PLACEHOLDER}
              selected={selectedLenses.includes(lens.id)}
              onToggle={() => onToggleLens(lens.id)}
            />
          ))}
        </section>

        <section className="rounded-xl border-2 border-gem-citrine-300 bg-gem-citrine-50 p-5 flex flex-col items-center justify-center gap-6">
          {isSingleLens ? (
            <SynthesisSection heading="Single-Lens Reflection" body={SYNTHESIS_PLACEHOLDER} divider={false} />
          ) : (
            <>
              <SynthesisSection heading="Common Themes" body={SYNTHESIS_PLACEHOLDER} divider={false} />
              <SynthesisSection heading="Divergent Interpretations" body={SYNTHESIS_PLACEHOLDER} />
            </>
          )}
          <SynthesisSection heading="Reflection Questions" body={SYNTHESIS_PLACEHOLDER} />
        </section>
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
