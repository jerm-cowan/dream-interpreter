function DreamInput({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label htmlFor="dream-input" className="font-medium text-base text-gem-obsidian-700">
        Describe your dream
      </label>
      <textarea
        id="dream-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="I was flying over my hometown but couldn't land..."
        rows={6}
        className="w-full rounded-xl border border-gem-opal-200 bg-white p-4 text-base leading-relaxed text-gem-obsidian-700 placeholder:text-gem-opal-500 resize-y focus:outline-none focus:ring-2 focus:ring-gem-amethyst-300 focus:border-gem-amethyst-300"
      />
    </div>
  )
}

export default DreamInput
