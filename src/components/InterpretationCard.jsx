import LensIcon from './LensIcon'
import { LENS_STYLES } from '../lensData'

function InterpretationCard({ lensId, lens, body, selected, onToggle }) {
  const styles = LENS_STYLES[lensId]

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`w-full text-left rounded-xl border-2 p-5 flex flex-col gap-3 transition-colors ${
        selected ? styles.selected : styles.unselected
      }`}
    >
      <h3 className="flex items-center gap-2 font-display font-semibold text-lg">
        <LensIcon id={lensId} className={`w-6 h-6 shrink-0 ${selected ? styles.icon : styles.unselectedIcon}`} />
        {lens}
      </h3>
      <p className={`text-base leading-relaxed ${selected ? 'text-gem-obsidian-700' : ''}`}>{body}</p>
    </button>
  )
}

export default InterpretationCard
