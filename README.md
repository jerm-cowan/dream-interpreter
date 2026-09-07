# Dream Reflection

A mobile-first React web app that helps you explore what a memorable dream might mean — through three different lenses, side by side, instead of one single answer.

> Dream Reflection does not attempt to diagnose or determine the "correct" meaning of a dream. It's a tool for exploring possible interpretations across different schools of thought and deciding which perspectives resonate with you.

## What it does

1. You describe a dream in your own words.
2. You optionally set the tone anywhere between **Reflective** and **Playful** — this doesn't just change the writing style, it shifts the entire visual theme of the app in a smooth, eased transition.
3. You get three interpretation cards:
   - 🧠 **Psychology Lens** — emotions, relationships, desires, fears, subconscious themes
   - 💤 **Neuroscience Lens** — sleep science, memory consolidation, stress processing, cognition
   - 🌙 **Symbolism & Cultural Interpretation Lens** — mythology, folklore, and cultural/spiritual perspectives (multiple traditions, no single belief system privileged)
4. You get a synthesis: **Common Themes**, **Divergent Interpretations**, and **Reflection Questions**.
5. You can copy the full result to keep for yourself.

## Why this exists

Most dream interpretation tools hand you a single confident-sounding explanation. Dream Reflection instead lets you compare frameworks and decide what resonates — closer to a reflective journaling exercise than a fortune-telling app.

## MVP scope

**In scope:** single dream input, tone slider (voice + full visual theme shift), three interpretation cards, common themes, reflection questions, copy-to-clipboard, responsive mobile-friendly design.

**Out of scope (by design):** user accounts, saved dream journals/history, follow-up AI chat, RAG, vector databases, long-term memory, social sharing, AI image generation. See [`BRIEF.md`](./BRIEF.md) for the full rationale.

## Tech stack

- **React** (via Vite) — chosen over Vue for its deeper animation/component ecosystem, which matters for a prompting-driven build. No router — single-screen experience.
- **Tailwind CSS** — utility-first styling, used to define and swap between complete visual theme presets as the tone slider moves.
- **Motion** (formerly Framer Motion) — powers the tone slider's theme-shift transition and the card "reveal" moment.
- One serverless function that calls an LLM live, once per submission, and returns structured JSON for all three lenses + synthesis.
- No database — nothing is persisted between sessions.
- Deployed on Vercel.

> **Note on framework choice:** Protogen 200 teaches Vue. This project deliberately uses React instead — a documented decision, not an oversight — to prioritize a richer, more delightful animated experience. See `BRIEF.md` Section 8 for the full rationale.

## Project docs

This repo's AI scaffolding lives in [`.copilot/context/`](./.copilot/context/) and includes:

| Doc | What's in it |
|---|---|
| [`BRIEF.md`](./BRIEF.md) | The design spec — read this first |
| [`personas.md`](./.copilot/context/personas.md) | Who this is built for |
| [`user-journey.md`](./.copilot/context/user-journey.md) | Step-by-step walkthrough of the experience |
| [`mvp-features.md`](./.copilot/context/mvp-features.md) | What must ship in v1 |
| [`nice-to-haves.md`](./.copilot/context/nice-to-haves.md) | What could come later, and why it's not in v1 |
| [`information-architecture.md`](./.copilot/context/information-architecture.md) | How the single screen is structured |
| [`visual-design-direction.md`](./.copilot/context/visual-design-direction.md) | Tone, color, type, motion direction, and the theme-preset system |
| [`ai-generation-approach.md`](./.copilot/context/ai-generation-approach.md) | How generation stays live and grounded without RAG/vector DBs |
| [`development-phases.md`](./.copilot/context/development-phases.md) | How this was/should be built, phase by phase |
| [`repo-structure.md`](./.copilot/context/repo-structure.md) | Full folder structure and why |

## Getting started (once code exists)

```bash
# clone and install
git clone <your-repo-url>
cd dream-reflection
npm install

# run locally
npm run dev
```

## License

MIT — see `LICENSE`.

## A note on responsible use

This project intentionally avoids any language, visual design, or feature that implies certainty about a dream's meaning. If you extend this project, please preserve that principle — see the Product Principles section of `BRIEF.md`.
