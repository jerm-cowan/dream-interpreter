function SynthesisSection({ heading, body, divider = true }) {
  return (
    <div
      className={`flex flex-col gap-2 ${divider ? 'border-t border-gem-citrine-200 pt-4' : ''}`}
    >
      <h3 className="font-display font-semibold text-lg text-gem-citrine-900">{heading}</h3>
      <p className="text-base leading-relaxed text-gem-obsidian-700">{body}</p>
    </div>
  )
}

export default SynthesisSection
