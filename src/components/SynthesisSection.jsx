function SynthesisSection({ heading, body, divider = true }) {
  return (
    <div
      className={`flex flex-col gap-2 ${divider ? 'border-t border-gray-200 pt-4' : ''}`}
    >
      <h3 className="font-semibold text-lg">{heading}</h3>
      <p className="text-base leading-relaxed text-gray-700">{body}</p>
    </div>
  )
}

export default SynthesisSection
