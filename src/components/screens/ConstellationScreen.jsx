import { Brain } from 'lucide-react'
import ToneControl from '../ToneControl'
import LensIcon from '../LensIcon'
import BackButton from '../BackButton'
import ConnectingLines from '../ConnectingLines'
import { LENSES, LENS_STYLES } from '../../lensData'

// Cards are flush with the container's outer edges (top/left/right) and sized as a % of the
// container, so they land exactly on the SVG line endpoints below (30%/70%) at any container size.
const LENS_POSITIONS = {
  psychology: 'top-0 left-1/2 -translate-x-1/2',
  neuroscience: 'bottom-0 left-0',
  symbolism: 'bottom-0 right-0',
}

function ConstellationScreen({
  tone,
  onToneChange,
  selectedLenses,
  onToggleLens,
  onReveal,
  fast = false,
  loadingState = 'idle',
}) {
  const hasSelection = selectedLenses.length > 0
  const isGenerating = loadingState === 'generating'
  const isSynthesizing = loadingState === 'synthesizing'
  const isBusy = isGenerating || isSynthesizing

  return (
    <div className="relative min-h-screen flex flex-col items-center gap-12 px-6 py-12">
      <BackButton />
      <header className="w-full max-w-xl flex flex-col items-center gap-5">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-gem-obsidian-900 tracking-tight">
          Choose your lenses
        </h2>
        <ToneControl value={tone} onChange={onToneChange} disabled={isGenerating} />
        {isGenerating && (
          <p className="text-sm text-gem-obsidian-500/80 italic">Reimagining your dream in a new voice...</p>
        )}
      </header>

      {/* Same max-width as the Reveal button below, so the bottom two cards sit flush with its edges
          and the whole triangle (cards + lines, all sized in %) scales fluidly with the viewport */}
      <div className="relative w-full max-w-xs aspect-square mx-auto">
        {/* Coordinates (% of container) computed so every line is the same length: center (50, 55) to top-card bottom-mid (50, 30) and to each bottom-card's nearest corner. The bottom two
            overshoot their corner (30/70, 70) slightly, same as the brain circle below, so the extra
            length is hidden under the card (drawn on top) and only a flush rounded join is visible. */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="50" y1="55" x2="50" y2="30" className="stroke-gem-opal-300" strokeWidth="0.5" />
          <line x1="50" y1="55" x2="27" y2="72.25" className="stroke-gem-opal-300" strokeWidth="0.5" />
          <line x1="50" y1="55" x2="73" y2="72.25" className="stroke-gem-opal-300" strokeWidth="0.5" />
        </svg>

        <ConnectingLines selectedLenses={selectedLenses} fast={fast} />

        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18%] aspect-square flex items-center justify-center rounded-full border border-gem-opal-300 bg-gradient-to-br from-gem-opal-50 to-gem-opal-200 shadow-sm">
          <Brain className="w-1/2 h-1/2 text-gem-opal-700" strokeWidth={1.5} />
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
              className={`absolute w-[30%] aspect-square min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-xl border p-2 text-center font-medium transition-colors ${LENS_POSITIONS[lens.id]} ${
                selected ? styles.selectedSolid : styles.unselectedSolid
              }`}
            >
              <LensIcon id={lens.id} className={`w-5 h-5 ${selected ? styles.icon : styles.unselectedIcon}`} />
              <span className="font-display text-xs leading-tight sm:text-sm">{lens.label}</span>
            </button>
          )
        })}
      </div>

      <div className="w-full max-w-xs flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={onReveal}
          disabled={!hasSelection || isBusy}
          className="w-full min-h-12 rounded-lg bg-gem-amethyst-600 text-white font-semibold text-base py-3 hover:bg-gem-amethyst-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSynthesizing ? 'Consulting the lenses...' : 'Reveal'}
        </button>
        {!hasSelection && (
          <p className="text-sm text-gem-obsidian-500/70 text-center">Select at least one lens to reveal a reflection.</p>
        )}
      </div>
    </div>
  )
}

export default ConstellationScreen
