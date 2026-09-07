import { AlertCircle } from 'lucide-react'
import { motion } from 'motion/react'

// Friendly, on-brand replacement for a raw error dialog — covers whichever screen is currently
// active (Entry/Constellation/Results) and offers a single retry action.
function ErrorOverlay({ message, onRetry }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gem-obsidian-900/40 backdrop-blur-sm px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="w-full max-w-sm rounded-xl border border-gem-opal-300 bg-gem-opal-50 p-6 flex flex-col items-center gap-4 text-center shadow-lg">
        <AlertCircle className="w-8 h-8 text-gem-amethyst-500" strokeWidth={1.5} />
        <p className="text-base leading-relaxed text-gem-obsidian-700">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="min-h-11 px-6 rounded-lg bg-gem-amethyst-600 text-white font-semibold text-sm hover:bg-gem-amethyst-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </motion.div>
  )
}

export default ErrorOverlay
