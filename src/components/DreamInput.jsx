function DreamInput({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="dream-input" className="font-semibold text-base">
        Describe your dream
      </label>
      <textarea
        id="dream-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="I was flying over my hometown but couldn't land..."
        rows={6}
        className="w-full rounded-lg border border-gray-300 p-4 text-base leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  )
}

export default DreamInput
