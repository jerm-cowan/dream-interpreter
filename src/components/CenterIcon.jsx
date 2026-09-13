import { Brain } from 'lucide-react'
import BrainGlyph from './BrainGlyph'

// Constellation stays subtle/slow (user is actively selecting lenses there); Results can be a
// touch livelier since there's less competing interaction. Both sit well under full opacity so
// the swirl never fights the icon's own opal outline for attention.
const VARIANT_CLASSES = {
  constellation: 'center-icon-swirl--ambient',
  results: 'center-icon-swirl--lively',
}

// Shared "dreaming mind" center icon used on the Constellation and Results screens. The swirling
// gemstone-color layer sits behind the icon glyph. On Results, a solid-fill `BrainGlyph` replaces
// lucide's outline-only `Brain` — its fill/stroke map to the synthesis section's own "stroke"
// (container border, citrine-200) and heading text (citrine-900) colors, both solid (no alpha),
// so the swirl behind never mixes into the icon shape itself.
function CenterIcon({ variant = 'constellation', className = '', iconClassName = 'w-1/2 h-1/2', style }) {
  const isResults = variant === 'results'
  return (
    <div
      className={`flex items-center justify-center rounded-full border border-gem-opal-300 bg-gradient-to-br from-gem-opal-50 to-gem-opal-200 shadow-sm overflow-hidden ${className}`}
      style={style}
    >
      <div aria-hidden="true" className={`center-icon-swirl ${VARIANT_CLASSES[variant]}`} />
      {isResults ? (
        <BrainGlyph
          className={`relative z-10 ${iconClassName}`}
          fill="var(--color-gem-citrine-200)"
          stroke="var(--color-gem-citrine-900)"
        />
      ) : (
        <Brain className={`relative z-10 text-gem-opal-700 ${iconClassName}`} strokeWidth={1.5} />
      )}
    </div>
  )
}

export default CenterIcon

