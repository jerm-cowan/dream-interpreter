import ToneControl from '../ToneControl'
import InterpretationCard from '../InterpretationCard'
import SynthesisSection from '../SynthesisSection'
import { LENSES } from '../../lensData'

const LENS_PLACEHOLDER =
  'Placeholder text — a paragraph describing how this lens might read the dream will appear here once generation is wired up.'

const SYNTHESIS_PLACEHOLDER =
  'Placeholder text — synthesis content will appear here once generation is wired up.'

function ResultsScreen({ tone, onToneChange, selectedLenses, onToggleLens, onStartOver }) {
  const revealedLenses = LENSES.filter((lens) => selectedLenses.includes(lens.id))
  const isSingleLens = revealedLenses.length === 1

  return (
    <div className="min-h-screen flex flex-col gap-8 px-4 py-8">
      <header className="w-full max-w-xl mx-auto flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-center">Your Reflection</h2>
        <ToneControl value={tone} onChange={onToneChange} />

        {/* Lens selection stays adjustable here; toggling will drive synthesis recomputation in a later phase */}
        <div className="flex flex-wrap justify-center gap-2">
          {LENSES.map((lens) => {
            const selected = selectedLenses.includes(lens.id)
            return (
              <button
                key={lens.id}
                type="button"
                onClick={() => onToggleLens(lens.id)}
                aria-pressed={selected}
                className={`rounded-full border-2 px-3 py-1 text-sm font-medium transition-colors ${
                  selected
                    ? 'border-purple-500 bg-purple-50 text-purple-900'
                    : 'border-gray-300 border-dashed bg-gray-100 text-gray-400 grayscale'
                }`}
              >
                {lens.label}
              </button>
            )
          })}
        </div>
      </header>

      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch">
        <section className="flex flex-col gap-4">
          {revealedLenses.map((lens) => (
            <InterpretationCard key={lens.id} lens={lens.label} body={LENS_PLACEHOLDER} />
          ))}
        </section>

        <section className="rounded-xl border border-gray-300 p-5 bg-white flex flex-col gap-4 lg:justify-between">
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
