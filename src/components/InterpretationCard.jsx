function InterpretationCard({ lens, body }) {
  return (
    <div className="rounded-xl border border-gray-300 p-5 flex flex-col gap-2 bg-white">
      <h3 className="font-semibold text-lg">{lens}</h3>
      <p className="text-base leading-relaxed text-gray-700">{body}</p>
    </div>
  )
}

export default InterpretationCard
