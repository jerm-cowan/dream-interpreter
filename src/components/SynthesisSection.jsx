function SynthesisSection({ heading, body, items, divider = true }) {
  return (
    <div
      className={`flex flex-col gap-2 ${divider ? 'border-t border-gem-citrine-200 pt-6' : ''}`}
    >
      <h3 className="font-display font-semibold text-lg text-gem-citrine-900">{heading}</h3>
      {items ? (
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {items.map((item) => (
            <li key={item} className="text-base leading-relaxed text-gem-obsidian-700">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-base leading-relaxed text-gem-obsidian-700">{body}</p>
      )}
    </div>
  )
}

export default SynthesisSection
