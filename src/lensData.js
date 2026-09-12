export const LENSES = [
  { id: 'psychology', label: 'Psychology' },
  { id: 'neuroscience', label: 'Neuroscience' },
  { id: 'symbolism', label: 'Symbolism & Culture' },
]

// Per-lens gemstone tinting: soft-tinted background + soft stroke when selected (icon carries the
// full saturation), dashed and even lighter when not — `selected`/`unselected` are the composite
// classes cards/buttons use directly. `selectedSolid`/`unselectedSolid` are opaque-background
// variants for cards that have content (e.g. connecting lines) passing behind their edges, where a
// translucent fill would let that content show through.
export const LENS_STYLES = {
  psychology: {
    selected: 'border-gem-amethyst-300 bg-gem-amethyst-50/50 text-gem-amethyst-700',
    unselected: 'border-gem-amethyst-200 border-dashed bg-gem-amethyst-50/25 text-gem-amethyst-200',
    selectedSolid: 'border-gem-amethyst-300 bg-gem-amethyst-50 text-gem-amethyst-700',
    unselectedSolid: 'border-gem-amethyst-200 border-dashed bg-gem-amethyst-50 text-gem-amethyst-200',
    icon: 'text-gem-amethyst-500',
    unselectedIcon: 'text-gem-amethyst-200',
    ring: 'ring-gem-amethyst-300',
  },
  neuroscience: {
    selected: 'border-gem-sapphire-300 bg-gem-sapphire-50/50 text-gem-sapphire-700',
    unselected: 'border-gem-sapphire-200 border-dashed bg-gem-sapphire-50/25 text-gem-sapphire-200',
    selectedSolid: 'border-gem-sapphire-300 bg-gem-sapphire-50 text-gem-sapphire-700',
    unselectedSolid: 'border-gem-sapphire-200 border-dashed bg-gem-sapphire-50 text-gem-sapphire-200',
    icon: 'text-gem-sapphire-500',
    unselectedIcon: 'text-gem-sapphire-200',
    ring: 'ring-gem-sapphire-300',
  },
  symbolism: {
    selected: 'border-gem-emerald-300 bg-gem-emerald-50/50 text-gem-emerald-700',
    unselected: 'border-gem-emerald-200 border-dashed bg-gem-emerald-50/25 text-gem-emerald-200',
    selectedSolid: 'border-gem-emerald-300 bg-gem-emerald-50 text-gem-emerald-700',
    unselectedSolid: 'border-gem-emerald-200 border-dashed bg-gem-emerald-50 text-gem-emerald-200',
    icon: 'text-gem-emerald-500',
    unselectedIcon: 'text-gem-emerald-200',
    ring: 'ring-gem-emerald-300',
  },
}
