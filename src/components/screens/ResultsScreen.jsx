import ToneControl from '../ToneControl'
import InterpretationCard from '../InterpretationCard'
import SynthesisSection from '../SynthesisSection'
import { LENSES } from '../../lensData'

const LENS_PLACEHOLDER =
  'Placeholder text — a paragraph describing how this lens might read the dream will appear here once generation is wired up.'

const SYNTHESIS_PLACEHOLDER =
  'Placeholder text — synthesis content will appear here once generation is wired up.'

function ResultsScreen({ tone, onToneChange, selectedLenses, onToggleLens, onStartOver }) {
  const isSingleLens = selectedLenses.length === 1

  return (
    <div className="min-h-screen flex flex-col gap-8 px-4 py-8">
      <header className="w-full max-w-xl mx-auto flex flex-col items-center gap-4">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-gem-obsidian-900 tracking-tight">
          Your Reflection
        </h2>
        <ToneControl value={tone} onChange={onToneChange} />
      </header>

      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch">
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

        <section className="rounded-xl border-2 border-gem-citrine-300 bg-gem-citrine-50 p-5 flex flex-col gap-4 lg:justify-between">
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

      <div className="w-full max-w-xl mx-auto flex flex-col gap-3 pb-4">
        <button
          type="button"
          className="w-full min-h-12 rounded-lg border border-gray-300 font-semibold text-base py-3 hover:bg-gray-100 transition-colors"
        >
          Copy Results
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="w-full min-h-12 rounded-lg text-gray-500 font-medium text-base py-3 hover:text-gray-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  )
}

export default ResultsScreen
