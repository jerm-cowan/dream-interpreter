import { ChevronDown, ChevronUp } from 'lucide-react'
import LensIcon from './LensIcon'
import { LENS_STYLES } from '../lensData'

// Two independent headers rendered per breakpoint: wide screens keep the whole-card icon+label
// toggle as before; mobile/tablet-portrait swaps to a checkbox (selection) + caret (expand/collapse)
// accordion header, each with its own isolated tap target.
function InterpretationCard({ lensId, lens, body, selected, onToggle, expanded = true, onToggleExpand }) {
  const styles = LENS_STYLES[lensId]

  return (
    // Hover uses an inset ring (box-shadow), not a wider border, so it never shifts internal content
    <div
      className={`w-full rounded-xl border hover:ring-2 hover:ring-inset ${styles.ring} p-5 flex flex-col gap-3 transition-colors ${
        selected ? styles.selected : styles.unselected
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        className="hidden lg:flex items-center gap-2 font-display font-semibold text-lg text-left"
      >
        <LensIcon id={lensId} className={`w-6 h-6 shrink-0 ${selected ? styles.icon : styles.unselectedIcon}`} />
        {lens}
      </button>

      <div className="flex lg:hidden items-center justify-between gap-2">
        <label className="flex items-center gap-2 font-display font-semibold text-lg">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            className="w-5 h-5 shrink-0 accent-current"
            aria-label={`Include ${lens} in synthesis`}
          />
          {lens}
        </label>
        <button
          type="button"
          onClick={onToggleExpand}
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse ${lens}` : `Expand ${lens}`}
          className="p-1 -m-1 shrink-0"
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Fixed (not max) height at wide breakpoints so all three cards align regardless of content length */}
      <div className="lg:h-[400px] lg:overflow-y-auto lens-scroll lg:pr-1">
        <p
          className={`${expanded ? 'block' : 'hidden'} lg:block text-base leading-relaxed ${
            selected ? 'text-gem-obsidian-700' : 'text-gem-obsidian-300'
          }`}
        >
          {body}
        </p>
      </div>
    </div>
  )
}

export default InterpretationCard
