// The exact lucide "brain" icon paths (github.com/lucide-icons/lucide, icon "brain"), reused
// unmodified so the linework still reads as the same icon — only the backing silhouette is new.
const LUCIDE_BRAIN_PATHS = [
  'M12 18V5',
  'M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4',
  'M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5',
  'M17.997 5.125a4 4 0 0 1 2.526 5.77',
  'M18 18a4 4 0 0 0 2-7.464',
  'M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517',
  'M6 18a4 4 0 0 1-2-7.464',
  'M6.003 5.125a4 4 0 0 0-2.526 5.77',
]

// A closed silhouette traced along the exact same arcs as the lucide brain's outer boundary
// (short straight bridges fill the small intentional gaps between its stroke segments) — safe to
// fill solid, unlike the open strokes above, which auto-close into ugly "chord" artifacts if filled.
const SILHOUETTE_PATH =
  'M12,5 A3,3 0 1,1 17.598,6.5 L17.997,5.125 A4,4 0 0,1 20.523,10.895 L20,10.536 A4,4 0 0,1 18,18 ' +
  'L19.967,17.483 A4,4 0 1,1 12,18 A4,4 0 1,1 4.033,17.483 L6,18 A4,4 0 0,1 4,10.536 ' +
  'L3.477,10.895 A4,4 0 0,1 6.003,5.125 L6.402,6.5 A3,3 0 1,1 12,5 Z'

// A filled version of lucide's `Brain` icon: a solid backing silhouette (traced from the same
// geometry) sits behind the icon's real, unmodified stroke paths — so it's still visibly the same
// brain icon, just with its interior filled solid instead of left transparent.
function BrainGlyph({ fill, stroke, strokeWidth = 1.5, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d={SILHOUETTE_PATH} fill={fill} stroke="none" />
      {LUCIDE_BRAIN_PATHS.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}

export default BrainGlyph
