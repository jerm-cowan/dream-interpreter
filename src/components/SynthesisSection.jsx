// Separator between sections is drawn by the parent's divide-y/divide-x (border-top on mobile
// stack, border-left on wide-screen columns) rather than a self-managed divider here.
function SynthesisSection({ heading, body, items }) {
  return (
    <div className="flex flex-col gap-2 lg:flex-1 lg:px-6 lg:first:pl-0 lg:last:pr-0">
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
