// Thin fetch wrappers for the two generation endpoints. Both endpoints always respond with JSON
// (including on failure), so a friendly `message` is available to surface directly in the UI.

async function postJSON(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(data?.message || 'Something went wrong — please try again.')
    error.code = data?.error || 'unknown_error'
    error.rateLimited = data?.error === 'rate_limited'
    throw error
  }

  return data
}

// Tier 1: full generation — all 3 lenses + the full 3-way synthesis.
export function interpretDream({ dreamText, tone }) {
  return postJSON('/api/interpret', { dreamText, tone })
}

// Tier 2: synthesis-only recomputation for whichever lens(es) are currently selected.
export function synthesizeLenses({ selectedLensTexts, tone, lensCount }) {
  return postJSON('/api/synthesize', { selectedLensTexts, tone, lensCount })
}
