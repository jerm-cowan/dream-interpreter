import ToneControl from '../ToneControl'
import { LENSES } from '../../lensData'

const LENS_POSITIONS = {
  psychology: 'md:top-2 md:left-1/2 md:-translate-x-1/2',
  neuroscience: 'md:bottom-2 md:left-2',
  symbolism: 'md:bottom-2 md:right-2',
}

function ConstellationScreen({ tone, onToneChange, selectedLenses, onToggleLens, onReveal }) {
  const hasSelection = selectedLenses.length > 0

  return (
    <div className="min-h-screen flex flex-col items-center gap-10 px-4 py-8">
      <header className="w-full max-w-xl flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-center">Choose your lenses</h2>
        <ToneControl value={tone} onChange={onToneChange} />
      </header>

      {/* Stacked on mobile; absolutely positioned into a triangle around the center from md up */}
      <div className="w-full flex flex-col items-center gap-6 md:relative md:block md:max-w-md md:aspect-square md:mx-auto">
        {/* Coordinates (% of container) computed so every line is the same length: center (50, 54.9) to top-card bottom-mid (50, 30.4) and to each bottom-card's nearest corner (30.4/69.6, 69.6) */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="50" y1="54.9" x2="50" y2="30.4" className="stroke-gray-300" strokeWidth="0.5" />
          <line x1="50" y1="54.9" x2="30.4" y2="69.6" className="stroke-gray-300" strokeWidth="0.5" />
          <line x1="50" y1="54.9" x2="69.6" y2="69.6" className="stroke-gray-300" strokeWidth="0.5" />
        </svg>

        <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-gray-400 text-xs font-semibold text-gray-600 text-center md:absolute md:top-[54.9%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-40 md:h-40 md:text-sm">
          Dreaming Mind
        </div>

        {LENSES.map((lens) => {
          const selected = selectedLenses.includes(lens.id)
          return (
            <button
              key={lens.id}
              type="button"
              onClick={() => onToggleLens(lens.id)}
              aria-pressed={selected}
              className={`relative w-full max-w-xs min-h-24 flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-4 text-center font-medium transition-colors md:absolute md:w-32 md:h-32 ${LENS_POSITIONS[lens.id]} ${
                selected
                  ? 'border-purple-500 bg-purple-50 text-purple-900'
                  : 'border-gray-300 border-dashed bg-gray-100 text-gray-400 grayscale'
              }`}
            >
              <span
                className={`absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center w-5 h-5 rounded-full text-xs ${
                  selected ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-500'
                }`}
              >
                {selected ? '✓' : ''}
              </span>
              <span>{lens.label}</span>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onReveal}
        disabled={!hasSelection}
        className="w-full max-w-xs min-h-12 rounded-lg bg-purple-600 text-white font-semibold text-base py-3 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Reveal
      </button>
    </div>
  )
}

export default ConstellationScreen
