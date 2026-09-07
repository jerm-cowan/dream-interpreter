# Dream Reflection

A mobile-first React web experience that guides you through exploring what a memorable dream might mean — across three different lenses, which you can filter and slice, instead of one flat answer.

> Dream Reflection does not attempt to diagnose or determine the "correct" meaning of a dream. It's a tool for exploring possible interpretations across different schools of thought and deciding which perspectives resonate with you.

## What it does

1. **Entry:** you describe a dream in your own words — as simple as a search box.
2. **Constellation:** the app reveals a central symbolic image with three lenses arranged around it — Psychology, Neuroscience, and Symbolism & Culture — connected by animated lines.
3. **Tone control:** a Reflective ↔ Playful toggle, adjustable any time, which triggers a genuine fresh regeneration in the new voice — not just a re-theme.
4. **Lens filtering:** choose to focus on 1, 2, or all 3 lenses. The synthesis (Common Themes, Divergent Interpretations, Reflection Questions) recomputes around whichever lenses you've selected.
5. **Copy** the current view's results to keep for yourself.

## Why this exists

Most dream interpretation tools hand you a single confident-sounding explanation. Dream Reflection instead lets you compare frameworks, slice them by what resonates, and adjust the tone — closer to an interactive data story about your own dream than a static fortune-telling app.

## MVP scope

**In scope:** guided multi-step journey (entry → constellation → reveal → synthesis), tone control with real regeneration, 1/2/3-lens filtering with adaptive synthesis, animated reveal/connecting-line transitions, copy-to-clipboard, graceful rate-limit handling, responsive layout (triangular on tablet/desktop, stacked on mobile).

**Out of scope (by design):** user accounts, saved dream journals/history, follow-up AI chat, RAG, vector databases, long-term memory, social sharing, AI image generation. See [`BRIEF.md`](./BRIEF.md) for full rationale.

## Tech stack

- **React** (via Vite) — no router; the journey is built as in-app view state.
- **Tailwind CSS** — styled around a gemstone color palette (Amethyst/Sapphire/Citrine for the three lenses; Obsidian/Rose Quartz for the two tone states).
- **Motion** (formerly Framer Motion) — screen transitions, the constellation reveal, and SVG line-drawing animations.
- **Google Gemini** (free tier, personal API key) — every generation is a live call; no canned/sample interpretations. Key lives only in a server-side Vercel environment variable.
- One or two lightweight serverless functions: one for the initial 3-lens generation, one for recomputing synthesis when lens selection changes.
- No database — nothing is persisted between sessions.
- **Deployed on Vercel**, gated by **Vercel Authentication** with a Shareable Link (no manually distributed password).

> **Note on framework choice:** Protogen 200 teaches Vue. This project deliberately uses React instead — a documented decision — to prioritize a richer animated experience. See `BRIEF.md` Section 8.

## Project docs

This repo's AI scaffolding lives in [`.copilot/context/`](./.copilot/context/) and includes:

| Doc | What's in it |
|---|---|
| [`BRIEF.md`](./BRIEF.md) | The design spec — read this first |
| [`personas.md`](./.copilot/context/personas.md) | Who this is built for |
| [`user-journey.md`](./.copilot/context/user-journey.md) | The full entry → constellation → reveal → synthesis journey |
| [`mvp-features.md`](./.copilot/context/mvp-features.md) | What must ship in v1, including lens filtering and rate-limit handling |
| [`nice-to-haves.md`](./.copilot/context/nice-to-haves.md) | What could come later, and why it's not in v1 |
| [`information-architecture.md`](./.copilot/context/information-architecture.md) | Screen/state structure of the journey |
| [`visual-design-direction.md`](./.copilot/context/visual-design-direction.md) | Gemstone palette, triangular layout, motion direction |
| [`ai-generation-approach.md`](./.copilot/context/ai-generation-approach.md) | Gemini setup, Knowledge Primer, lens-filtered synthesis logic, rate-limit handling |
| [`development-phases.md`](./.copilot/context/development-phases.md) | Build plan, phase by phase |
| [`repo-structure.md`](./.copilot/context/repo-structure.md) | Full folder structure and why |

## Getting started (once code exists)

```bash
# clone and install
git clone <your-repo-url>
cd dream-reflection
npm install

# add your own Gemini API key locally
echo "GEMINI_API_KEY=your-key-here" > .env.local

# run locally
npm run dev
```

## License

MIT — see `LICENSE`.

## A note on responsible use

This project intentionally avoids any language, visual design, or feature that implies certainty about a dream's meaning. If you extend this project, please preserve that principle — see the Product Principles section of `BRIEF.md`.
