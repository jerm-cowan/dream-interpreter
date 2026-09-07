import { ArrowLeft } from 'lucide-react'

// Delegates to browser history so the in-app back button and the browser's back button stay in sync
function BackButton({ label = 'Back' }) {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center gap-1.5 text-sm font-medium text-gem-obsidian-400 hover:text-gem-obsidian-600 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  )
}

export default BackButton
