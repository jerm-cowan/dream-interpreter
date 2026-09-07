import { Brain } from 'lucide-react'
import ToneControl from '../ToneControl'
import LensIcon from '../LensIcon'
import BackButton from '../BackButton'
import ConnectingLines from '../ConnectingLines'
import { LENSES, LENS_STYLES } from '../../lensData'

const LENS_POSITIONS = {
  psychology: 'md:top-2 md:left-1/2 md:-translate-x-1/2',
  neuroscience: 'md:bottom-2 md:left-2',
  symbolism: 'md:bottom-2 md:right-2',
}

function ConstellationScreen({
  tone,
  onToneChange,
  selectedLenses,
  onToggleLens,
  onReveal,
  fast = false,
}) {
  const hasSelection = selectedLenses.length > 0

  return (
    <div className="relative min-h-screen flex flex-col items-center gap-12 px-6 py-12">
      <BackButton />
      <header className="w-full max-w-xl flex flex-col items-center gap-5">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-gem-obsidian-900 tracking-tight">
          Choose your lenses
        </h2>
        <ToneControl value={tone} onChange={onToneChange} />
      </header>

      {/* Stacked on mobile; absolutely positioned into a triangle around the center from md up */}
      <div className="w-full flex flex-col items-center gap-8 md:relative md:block md:max-w-md md:aspect-square md:mx-auto">
        {/* Coordinates (% of container) computed so every line is the same length: center (50, 54.9) to top-card bottom-mid (50, 30.4) and to each bottom-card's nearest corner (30.4/69.6, 69.6) */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="50" y1="54.9" x2="50" y2="30.4" className="stroke-gem-opal-300" strokeWidth="0.5" />
          <line x1="50" y1="54.9" x2="30.4" y2="69.6" className="stroke-gem-opal-300" strokeWidth="0.5" />
          <line x1="50" y1="54.9" x2="69.6" y2="69.6" className="stroke-gem-opal-300" strokeWidth="0.5" />
        </svg>

        <ConnectingLines selectedLenses={selectedLenses} fast={fast} />

        <div className="relative w-16 h-16 flex items-center justify-center rounded-full border border-gem-opal-300 bg-gradient-to-br from-gem-opal-50 to-gem-opal-200 shadow-sm md:absolute md:top-[54.9%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-40 md:h-40">
          <Brain className="w-9 h-9 text-gem-opal-700 md:w-20 md:h-20" strokeWidth={1.5} />
        </div>

        {LENSES.map((lens) => {
          const selected = selectedLenses.includes(lens.id)
          const styles = LENS_STYLES[lens.id]
          return (
            <button
              key={lens.id}
              type="button"
              onClick={() => onToggleLens(lens.id)}
              aria-pressed={selected}
              className={`relative w-full max-w-xs min-h-24 flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center font-medium transition-colors md:absolute md:w-32 md:h-32 ${LENS_POSITIONS[lens.id]} ${
                selected ? styles.selected : styles.unselected
              }`}
            >
              <LensIcon id={lens.id} className={`w-6 h-6 ${selected ? styles.icon : styles.unselectedIcon}`} />
              <span className="font-display">{lens.label}</span>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onReveal}
        disabled={!hasSelection}
        className="w-full max-w-xs min-h-12 rounded-lg bg-gem-amethyst-600 text-white font-semibold text-base py-3 hover:bg-gem-amethyst-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Reveal
      </button>
    </div>
  )
}

export default ConstellationScreen
