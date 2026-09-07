import { useState } from 'react'
import DreamInput from './components/DreamInput'
import ToneSlider from './components/ToneSlider'
import InterpretationCard from './components/InterpretationCard'
import SynthesisSection from './components/SynthesisSection'

const LENS_PLACEHOLDER =
  'Placeholder text — a paragraph describing how this lens might read the dream will appear here once generation is wired up.'

const SYNTHESIS_PLACEHOLDER =
  'Placeholder text — synthesis content comparing the three lenses will appear here once generation is wired up.'

function App() {
  const [dreamText, setDreamText] = useState('')
  const [tone, setTone] = useState(50)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 px-4 py-8">
        <header className="max-w-xl mx-auto w-full flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Dream Interpreter</h1>
          <p className="text-gray-600 text-base">
            Explore what your dream might mean, through three different lenses.
          </p>
        </header>

        <div className="max-w-xl mx-auto w-full flex flex-col gap-8">
          <DreamInput value={dreamText} onChange={setDreamText} />

          <ToneSlider value={tone} onChange={setTone} />

          <button
            type="button"
            className="w-full min-h-12 rounded-lg bg-purple-600 text-white font-semibold text-base py-3 hover:bg-purple-700 transition-colors"
          >
            Reveal Interpretations
          </button>
        </div>

        {/* Two-column on large viewports: lenses left, synthesis right — both columns stretch to equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch">
          <section className="flex flex-col gap-4">
            <InterpretationCard lens="Psychology" body={LENS_PLACEHOLDER} />
            <InterpretationCard lens="Neuroscience" body={LENS_PLACEHOLDER} />
            <InterpretationCard lens="Symbolism & Culture" body={LENS_PLACEHOLDER} />
          </section>

          <section className="rounded-xl border border-gray-300 p-5 bg-white flex flex-col gap-4 lg:justify-between">
            <SynthesisSection heading="Common Themes" body={SYNTHESIS_PLACEHOLDER} divider={false} />
            <SynthesisSection heading="Divergent Interpretations" body={SYNTHESIS_PLACEHOLDER} />
            <SynthesisSection heading="Reflection Questions" body={SYNTHESIS_PLACEHOLDER} />
          </section>
        </div>

        <div className="max-w-xl mx-auto w-full flex flex-col gap-3 pb-4">
          <button
            type="button"
            className="w-full min-h-12 rounded-lg border border-gray-300 font-semibold text-base py-3 hover:bg-gray-100 transition-colors"
          >
            Copy Results
          </button>
          <button
            type="button"
            className="w-full min-h-12 rounded-lg text-gray-500 font-medium text-base py-3 hover:text-gray-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
