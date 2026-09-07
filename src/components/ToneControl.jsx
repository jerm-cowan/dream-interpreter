function ToneControl({ value, onChange }) {
  return (
    <div
      className="inline-flex rounded-full border border-gem-opal-200 bg-gem-opal-50 p-1"
      role="group"
      aria-label="Tone"
    >
      <button
        type="button"
        onClick={() => onChange('reflective')}
        aria-pressed={value === 'reflective'}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          value === 'reflective'
            ? 'bg-gem-garnet-700 text-white shadow'
            : 'text-gem-garnet-700 hover:text-gem-garnet-900'
        }`}
      >
        Reflective
      </button>
      <button
        type="button"
        onClick={() => onChange('playful')}
        aria-pressed={value === 'playful'}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          value === 'playful'
            ? 'bg-gem-rose-500 text-white shadow'
            : 'text-gem-rose-700 hover:text-gem-rose-900'
        }`}
      >
        Playful
      </button>
    </div>
  )
}

export default ToneControl
