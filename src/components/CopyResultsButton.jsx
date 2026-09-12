import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { LENSES } from '../lensData'

// Builds the plain-text export of the CURRENT view: whichever lenses are selected (full body text,
// regardless of that card's collapsed/expanded state on-screen — collapsed only affects reading,
// never what's included here) plus the synthesis shape matching the current selection count.
export function buildResultsText({ tone, selectedLenses, generatedLenses, synthesis }) {
  const lines = [`Dream Reflection — ${tone === 'playful' ? 'Playful' : 'Reflective'} tone`, '']

  LENSES.forEach((lens) => {
    if (!selectedLenses.includes(lens.id)) return
    lines.push(lens.label, generatedLenses?.[lens.id] ?? '', '')
  })

  if (selectedLenses.length === 1) {
    lines.push('Single-Lens Reflection', synthesis?.singleLensReflection ?? '', '')
  } else if (selectedLenses.length > 1) {
    lines.push('Common Themes', synthesis?.commonThemes ?? '', '')
    lines.push('Divergent Interpretations', synthesis?.divergentInterpretations ?? '', '')
  }

  if (selectedLenses.length > 0) {
    lines.push('Reflection Questions')
    ;(synthesis?.reflectionQuestions ?? []).forEach((question) => lines.push(`- ${question}`))
  }

  return lines.join('\n').trim()
}

// navigator.clipboard requires a secure context (https, or localhost) — testing over a plain-http
// LAN IP on a phone silently has no clipboard API at all, so fall back to the legacy
// execCommand('copy') technique (still works over http, as long as it's from a user gesture).
async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // fall through to the legacy fallback below
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  let success = false
  try {
    success = document.execCommand('copy')
  } catch {
    success = false
  }
  document.body.removeChild(textarea)
  return success
}

function CopyResultsButton({ tone, selectedLenses, generatedLenses, synthesis }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)
  const disabled = selectedLenses.length === 0 || !generatedLenses

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  async function handleCopy() {
    if (disabled) return
    const text = buildResultsText({ tone, selectedLenses, generatedLenses, synthesis })
    const success = await copyToClipboard(text)
    if (!success) return
    setCopied(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-gem-obsidian-500 hover:text-gem-obsidian-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied!' : 'Copy Results'}
    </button>
  )
}

export default CopyResultsButton
