import { BookOpen, User } from 'lucide-react'

// Established icons per lens: head/person (psychology), open book (symbolism) via lucide;
// neuroscience uses a custom hub network icon since lucide-react has no equivalent for that shape
const OUTER_NODES = [
  [20, 12],
  [16, 5.1],
  [8, 5.1],
  [4, 12],
  [8, 18.9],
  [16, 18.9],
]

function NetworkIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {OUTER_NODES.map(([x, y]) => (
        <line key={`${x}-${y}`} x1="12" y1="12" x2={x} y2={y} strokeWidth="1.3" />
      ))}
      {OUTER_NODES.map(([x, y]) => (
        <circle key={`node-${x}-${y}`} cx={x} cy={y} r="2.6" strokeWidth="1.8" />
      ))}
      <circle cx="12" cy="12" r="2.8" strokeWidth="1.8" />
    </svg>
  )
}

const LENS_ICONS = {
  psychology: User,
  symbolism: BookOpen,
}

function LensIcon({ id, className }) {
  if (id === 'neuroscience') {
    return <NetworkIcon className={className} />
  }

  const Icon = LENS_ICONS[id]
  return <Icon className={className} aria-hidden="true" />
}

export default LensIcon
