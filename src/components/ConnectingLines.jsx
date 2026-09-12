import { motion } from 'motion/react'
import { LENSES } from '../lensData'

// Timing pairs shared with ConstellationScreen's mobile connector ticks so both stay in sync
export const REVEAL_LINE_TIMING = {
  slow: { duration: 0.6875, stagger: 0.1625 },
  fast: { duration: 0.3125, stagger: 0.0875 },
}

// Endpoints mirror the static triangle geometry drawn in ConstellationScreen (percentage
// coordinates in a non-uniformly-scaled viewBox, so they track the responsive container).
// The bottom two overshoot their corner so the extra length hides under the card on top,
// leaving a flush join at its rounded edge (same trick as the brain circle).
const DESKTOP_LINE_ENDPOINTS = {
  psychology: { x1: 50, y1: 55, x2: 50, y2: 30 },
  neuroscience: { x1: 50, y1: 55, x2: 27, y2: 72.25 },
  symbolism: { x1: 50, y1: 55, x2: 73, y2: 72.25 },
}

const LENS_STROKE = {
  psychology: 'stroke-gem-amethyst-300',
  neuroscience: 'stroke-gem-sapphire-300',
  symbolism: 'stroke-gem-emerald-300',
}

export { LENS_STROKE }

// Always renders one line per lens so toggling selection animates forward/backward in place
// (rather than mounting/unmounting, which would just pop the line away with no reverse animation).
function ConnectingLines({ selectedLenses, fast = false }) {
  const { duration, stagger } = fast ? REVEAL_LINE_TIMING.fast : REVEAL_LINE_TIMING.slow

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {LENSES.map((lens, index) => {
        const { x1, y1, x2, y2 } = DESKTOP_LINE_ENDPOINTS[lens.id]
        const selected = selectedLenses.includes(lens.id)
        return (
          <motion.line
            key={lens.id}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth="0.6"
            strokeLinecap="round"
            className={LENS_STROKE[lens.id]}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={selected ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration, delay: selected ? index * stagger : 0, ease: 'easeInOut' }}
          />
        )
      })}
    </svg>
  )
}

export default ConnectingLines

