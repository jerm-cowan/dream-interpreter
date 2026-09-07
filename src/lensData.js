export const LENSES = [
  { id: 'psychology', label: 'Psychology' },
  { id: 'neuroscience', label: 'Neuroscience' },
  { id: 'symbolism', label: 'Symbolism & Culture' },
]

// Per-lens gemstone tinting. Both states use the same faceted fill (clip-path) + FacetOutline
// stroke structure; selected is solid and full-color, unselected is dashed and muted.
export const LENS_STYLES = {
  psychology: {
    fillBg: 'bg-gem-amethyst-50',
    text: 'text-gem-amethyst-700',
    icon: 'text-gem-amethyst-500',
    stroke: 'stroke-gem-amethyst-500',
    unselectedFillBg: 'bg-gem-amethyst-50/40',
    unselectedText: 'text-gem-amethyst-300',
    unselectedIcon: 'text-gem-amethyst-200',
    unselectedStroke: 'stroke-gem-amethyst-200',
  },
  neuroscience: {
    fillBg: 'bg-gem-sapphire-50',
    text: 'text-gem-sapphire-700',
    icon: 'text-gem-sapphire-500',
    stroke: 'stroke-gem-sapphire-500',
    unselectedFillBg: 'bg-gem-sapphire-50/40',
    unselectedText: 'text-gem-sapphire-300',
    unselectedIcon: 'text-gem-sapphire-200',
    unselectedStroke: 'stroke-gem-sapphire-200',
  },
  symbolism: {
    fillBg: 'bg-gem-emerald-50',
    text: 'text-gem-emerald-700',
    icon: 'text-gem-emerald-500',
    stroke: 'stroke-gem-emerald-500',
    unselectedFillBg: 'bg-gem-emerald-50/40',
    unselectedText: 'text-gem-emerald-300',
    unselectedIcon: 'text-gem-emerald-200',
    unselectedStroke: 'stroke-gem-emerald-200',
  },
}
