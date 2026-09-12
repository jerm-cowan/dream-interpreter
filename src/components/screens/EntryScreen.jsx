import { Brain } from 'lucide-react'
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
        <header className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gem-opal-300 bg-gradient-to-br from-gem-opal-50 to-gem-opal-200 shadow-sm">
            <Brain className="w-6 h-6 text-gem-opal-700" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-gem-obsidian-900 tracking-tight">
            Dream Reflection
          </h1>
          <p className="text-gem-obsidian-500/80 text-base md:text-lg">Describe a dream you have had</p>
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
