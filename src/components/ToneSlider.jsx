const LABELS = ['Reflective', 'Balanced', 'Playful']

function getLabel(value) {
  if (value < 33) return LABELS[0]
  if (value > 66) return LABELS[2]
  return LABELS[1]
}

function ToneSlider({ value, onChange }) {
  const label = getLabel(value)

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-base">Tone</span>
        <span className="text-sm font-medium text-purple-600">{label}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label="Tone: Reflective to Playful"
        className="w-full h-3 cursor-pointer accent-purple-500"
      />
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Reflective</span>
        <span>Playful</span>
      </div>
    </div>
  )
}

export default ToneSlider
