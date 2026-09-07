import { useState } from 'react'
import EntryScreen from './components/screens/EntryScreen'
import ConstellationScreen from './components/screens/ConstellationScreen'

const ALL_LENS_IDS = ['psychology', 'neuroscience', 'symbolism']

function App() {
  const [view, setView] = useState('entry')
  const [dreamText, setDreamText] = useState('')
  const [tone, setTone] = useState('reflective')
  const [selectedLenses, setSelectedLenses] = useState(ALL_LENS_IDS)

  function handleDreamSubmit() {
    setSelectedLenses(ALL_LENS_IDS)
    setView('constellation')
  }

  function handleToggleLens(lensId) {
    setSelectedLenses((current) =>
      current.includes(lensId) ? current.filter((id) => id !== lensId) : [...current, lensId]
    )
  }

  function handleReveal() {
    console.log('Reveal requested', { selectedLenses, tone })
    setView('results')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {view === 'entry' && (
        <EntryScreen
          dreamText={dreamText}
          onDreamTextChange={setDreamText}
          onSubmit={handleDreamSubmit}
        />
      )}

      {view === 'constellation' && (
        <ConstellationScreen
          tone={tone}
          onToneChange={setTone}
          selectedLenses={selectedLenses}
          onToggleLens={handleToggleLens}
          onReveal={handleReveal}
        />
      )}

      {view === 'results' && (
        <div className="flex items-center justify-center min-h-screen text-gray-500">
          Results screen coming soon.
        </div>
      )}
    </main>
  )
}

export default App
