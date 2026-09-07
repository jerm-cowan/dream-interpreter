import { useState } from 'react'
import EntryScreen from './components/screens/EntryScreen'
import ConstellationScreen from './components/screens/ConstellationScreen'
import ResultsScreen from './components/screens/ResultsScreen'

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
    setSelectedLenses((current) => {
      if (current.includes(lensId)) {
        // Always keep at least one lens selected
        if (current.length === 1) return current
        return current.filter((id) => id !== lensId)
      }
      return [...current, lensId]
    })
  }

  function handleReveal() {
    console.log('Reveal requested', { selectedLenses, tone })
    setView('results')
  }

  function handleStartOver() {
    setDreamText('')
    setView('entry')
  }

  return (
    <main className="min-h-screen bg-gem-opal-50 font-sans text-gem-obsidian-700">
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
        <ResultsScreen
          tone={tone}
          onToneChange={setTone}
          selectedLenses={selectedLenses}
          onToggleLens={handleToggleLens}
          onStartOver={handleStartOver}
        />
      )}
    </main>
  )
}

export default App
