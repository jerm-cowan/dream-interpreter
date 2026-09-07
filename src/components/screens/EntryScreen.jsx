import DreamInput from '../DreamInput'

function EntryScreen({ dreamText, onDreamTextChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault()
    if (!dreamText.trim()) return
    onSubmit()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-6">
        <header className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">Dream Reflection</h1>
          <p className="text-gray-600 text-base">What did you dream last night?</p>
        </header>

        <DreamInput value={dreamText} onChange={onDreamTextChange} />

        <button
          type="submit"
          disabled={!dreamText.trim()}
          className="w-full min-h-12 rounded-lg bg-purple-600 text-white font-semibold text-base py-3 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Explore This Dream
        </button>
      </form>
    </div>
  )
}

export default EntryScreen
