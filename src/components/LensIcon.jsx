const SHARED_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Simple line-icon motifs per lens: brain (psychology), wave/moon-phase (neuroscience), compass (symbolism)
function LensIcon({ id, className }) {
  if (id === 'psychology') {
    return (
      <svg {...SHARED_PROPS} className={className} aria-hidden="true">
        <path d="M9.5 3.5a2.7 2.7 0 0 0-2.7 2.7 2.7 2.7 0 0 0-1.8 4.5 2.7 2.7 0 0 0 .9 4.9 2.7 2.7 0 0 0 2.6 3.4 1.8 1.8 0 0 0 1.8-1.8V6.2a2.7 2.7 0 0 0-.8-2.7Z" />
        <path d="M14.5 3.5a2.7 2.7 0 0 1 2.7 2.7 2.7 2.7 0 0 1 1.8 4.5 2.7 2.7 0 0 1-.9 4.9 2.7 2.7 0 0 1-2.6 3.4 1.8 1.8 0 0 1-1.8-1.8V6.2a2.7 2.7 0 0 1 .8-2.7Z" />
      </svg>
    )
  }

  if (id === 'neuroscience') {
    return (
      <svg {...SHARED_PROPS} className={className} aria-hidden="true">
        <path d="M2 13c1.3-2.6 2.2-2.6 3.5 0s2.2 2.6 3.5 0 2.2-2.6 3.5 0 2.2 2.6 3.5 0 2.2-2.6 3.5 0" />
        <path d="M16 5.5a6 6 0 1 0 0 12" />
      </svg>
    )
  }

  return (
    <svg {...SHARED_PROPS} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" />
      <path d="m9.7 14.3 1.7-4.6 4.6-1.7-1.7 4.6-4.6 1.7Z" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default LensIcon
