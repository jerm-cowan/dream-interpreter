export const LENSES = [
  { id: 'psychology', label: 'Psychology' },
  { id: 'neuroscience', label: 'Neuroscience' },
  { id: 'symbolism', label: 'Symbolism & Culture' },
]

// Per-lens gemstone tinting: full color when selected/active, desaturated tint when not
export const LENS_STYLES = {
  psychology: {
    selected: 'border-gem-amethyst-500 bg-gem-amethyst-50 text-gem-amethyst-700',
    icon: 'text-gem-amethyst-500',
    unselected: 'border-gem-amethyst-200 border-dashed bg-gem-amethyst-50/40 text-gem-amethyst-300',
    unselectedIcon: 'text-gem-amethyst-200',
  },
  neuroscience: {
    selected: 'border-gem-sapphire-500 bg-gem-sapphire-50 text-gem-sapphire-700',
    icon: 'text-gem-sapphire-500',
    unselected: 'border-gem-sapphire-200 border-dashed bg-gem-sapphire-50/40 text-gem-sapphire-300',
    unselectedIcon: 'text-gem-sapphire-200',
  },
  symbolism: {
    selected: 'border-gem-emerald-500 bg-gem-emerald-50 text-gem-emerald-700',
    icon: 'text-gem-emerald-500',
    unselected: 'border-gem-emerald-200 border-dashed bg-gem-emerald-50/40 text-gem-emerald-300',
    unselectedIcon: 'text-gem-emerald-200',
  },
}
