import DreamInput from '../DreamInput'

function EntryScreen({ dreamText, onDreamTextChange, onSubmit, loadingState = 'idle' }) {
  const isGenerating = loadingState === 'generating'

  function handleSubmit(event) {
    event.preventDefault()
    if (!dreamText.trim() || isGenerating) return
    onSubmit()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-8">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-gem-obsidian-900 tracking-tight">
            Dream Reflection
          </h1>
          <p className="text-gem-obsidian-500/80 text-base md:text-lg">What did you dream last night?</p>
        </header>

        <DreamInput value={dreamText} onChange={onDreamTextChange} />

        <button
          type="submit"
          disabled={!dreamText.trim() || isGenerating}
          className="w-full min-h-12 rounded-lg bg-gem-amethyst-600 text-white font-semibold text-base py-3 hover:bg-gem-amethyst-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Consulting the lenses...' : 'Explore This Dream'}
        </button>
      </form>
    </div>
  )
}

export default EntryScreen
