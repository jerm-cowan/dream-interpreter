# AI Generation Approach — Dream Reflection

This doc answers, precisely, how generation works end to end: which LLM, how grounding works without RAG, how lens-filtered synthesis is computed without wasteful re-generation, and how rate-limit failures are handled gracefully.

## LLM choice: Google Gemini (free tier)

- **Model:** Gemini Flash or Flash-Lite (whichever is current/recommended at build time — check Google AI Studio).
- **Access:** a personal, free API key from Google AI Studio (no credit card required). This key belongs to you personally, not Slalom — Slalom never incurs any cost from this project.
- **Storage:** the key lives **only** as a server-side Vercel environment variable (e.g., `GEMINI_API_KEY`), read exclusively inside serverless functions. It is never exposed to the browser or bundled into frontend code. No one viewing or testing the deployed site — including reviewers or any wider audience — ever needs their own key or any setup.
- **Cost:** effectively zero at this project's expected usage (a case study demo plus reasonable exploratory sharing). Free tier limits are generous (roughly 1,000+ requests/day, ~15 requests/minute depending on the specific model) — see the rate-limit handling section below for what happens if those are ever exceeded.

## The core idea: a Static Knowledge Primer (not RAG)

Instead of retrieval, every prompt includes a short, fixed reference document listing well-established, *named* frameworks per lens. No embeddings, no vector database, no search step — just always-included context.

### Psychology Lens — established frameworks to draw from
- **Psychoanalytic / Freudian:** dreams as wish fulfillment; manifest vs. latent content.
- **Jungian / archetypal:** the collective unconscious, archetypes (Shadow, Self, Anima/Animus), individuation.
- **Continuity hypothesis:** dreams as a continuation of waking-life concerns and "day residue."
- **Gestalt approach:** every element in the dream can reflect some part of the dreamer.
- **Emotion-processing / relational themes:** dreams as a space where unresolved feelings play out.

### Neuroscience Lens — established frameworks to draw from
- **Activation-synthesis hypothesis:** the brain synthesizing a story from random REM-sleep neural activity.
- **Threat simulation theory:** dreaming as rehearsal for responding to threats.
- **Memory consolidation theory:** REM sleep's role in integrating memories.
- **Emotional regulation ("overnight therapy"):** REM sleep processing the day's emotional charge.
- **Default mode network activity:** links between dreaming and baseline "mind-wandering."

### Symbolism & Cultural Interpretation Lens — traditions to draw from (rotate/vary; never default to only one)
- Jungian archetypal symbolism (as *mythic* language, distinct from the clinical Psychology framing)
- Greek and Roman mythology
- Norse/Germanic folklore
- Chinese dream lore and traditional interpretation practices
- Islamic dream interpretation tradition (*ta'bir*)
- Biblical/Abrahamic dream symbolism, presented as one tradition among several
- Indigenous and folk storytelling traditions, described respectfully and generally

**Rule for this lens specifically:** every response must draw from **at least two different traditions** and never present one as more "correct."

## Prompt rules that reduce hallucination

1. **Never cite specific studies, papers, researchers, or years** — speak only in terms of the named frameworks above.
2. **Never assert a dream's meaning as fact** — every sentence reads as a possibility.
3. **Require structured JSON output** matching a fixed schema (see below).
4. **Use a moderate-low temperature** (~0.4–0.6).
5. **Symbolism lens must reference 2+ traditions per response.**
6. **Tone setting affects voice only**, never which frameworks/traditions are surfaced or which themes are identified.

## Two-tier generation: full generation vs. synthesis-only recomputation

To avoid wastefully re-generating all three lenses every time the user just changes which lenses they're focused on, generation happens in **two tiers**:

### Tier 1 — Full generation (`api/interpret.js`)
Triggered when: the user submits a new dream, OR changes the tone control.
Input: `{ dreamText, tone }` (tone = "reflective" | "playful")
Output (structured JSON):
```json
{
  "psychology": "...",
  "neuroscience": "...",
  "symbolism": "...",
  "synthesis_all3": {
    "commonThemes": "...",
    "divergentInterpretations": "...",
    "reflectionQuestions": ["...", "...", "..."]
  }
}
```
This single call generates all three lens interpretations **and** the full 3-way synthesis at once — the 3-way synthesis is essentially "free" to include here since the model already has all three lenses in context.

### Tier 2 — Synthesis-only recomputation (`api/synthesize.js`)
Triggered when: the user changes their lens selection to something other than "all 3" (e.g., narrows to 2 lenses, or to 1).
Input: `{ selectedLensTexts: { psychology: "...", neuroscience: "..." }, tone, lensCount: 2 }` (only the text for the *currently selected* lenses is sent — already available client-side from Tier 1's response, no need to re-fetch)
Output (structured JSON), shape depends on `lensCount`:
- **2 lenses:** `{ commonThemes, divergentInterpretations, reflectionQuestions }` — but computed only across the 2 provided lens texts.
- **1 lens:** `{ singleLensReflection, reflectionQuestions }` — a different shape entirely, since "common/divergent" doesn't apply to a single perspective.

This keeps lens-selection changes fast and cheap — it's a small request using text that's already been generated, not a full re-interpretation of the dream.

### Client-side debounce (frontend robustness, not a generation-tier change)
Rapid repeated lens-selection toggles don't each fire their own Tier 2 request — the frontend updates the visual selection and connecting lines immediately, but debounces the actual `api/synthesize` call to the final selection after a brief pause, and discards any in-flight response that's since been superseded by a newer request (e.g., a fast follow-up toggle or a tone change). This cuts down on redundant Gemini calls without adding perceived lag, since the UI never waits on the network to reflect a toggle.

## Rate-limit handling (required for MVP)

Both `api/interpret.js` and `api/synthesize.js` must handle `429` (rate-limit exceeded) responses from Gemini gracefully:

1. On a `429`, wait briefly (e.g., 1 second) and retry once.
2. If it fails again, wait longer (e.g., 2-3 seconds) and retry once more.
3. If still failing after 2 retries, return a clear, friendly error payload to the frontend (e.g., `{ error: "rate_limited", message: "Lots of dreams being interpreted right now — try again in a moment." }`) rather than letting the raw API error surface.
4. The frontend must catch this specific error shape and display it as an on-brand, in-character message — never a raw error dialog, console-style error text, or blank/broken UI state.

This is a functional MVP requirement (see `mvp-features.md` #8), not a nice-to-have — the deployed demo needs to degrade gracefully under load, especially given it may be shared beyond just the case study reviewer.

## What this means in practice for the Generation Logic phase

When you reach the generation logic phase in `development-phases.md`, reference this document directly, e.g.:

> "Using `#file:ai-generation-approach.md`, build `api/interpret.js` for the full 3-lens generation, and `api/synthesize.js` for lens-filtered synthesis recomputation, both using the Gemini API with the Knowledge Primer as system context, structured JSON output, and the retry/rate-limit handling described."
