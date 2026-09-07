function ToneControl({ value, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-gray-300 bg-gray-100 p-1" role="group" aria-label="Tone">
      <button
        type="button"
        onClick={() => onChange('reflective')}
        aria-pressed={value === 'reflective'}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          value === 'reflective' ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
        }`}
      >
        Reflective
      </button>
      <button
        type="button"
        onClick={() => onChange('playful')}
        aria-pressed={value === 'playful'}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          value === 'playful' ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
        }`}
      >
        Playful
      </button>
    </div>
  )
}

export default ToneControl
