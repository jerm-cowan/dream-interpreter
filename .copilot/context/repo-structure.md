# Suggested Repo Structure & AI Scaffolding — Dream Reflection

```
dream-reflection/
├── README.md
├── LICENSE
├── BRIEF.md
├── .gitignore                          # MUST include .env.local (Gemini API key)
├── .env.local                          # GEMINI_API_KEY=... (never committed)
├── package.json
├── vite.config.js
├── tailwind.config.js                  # Gemstone palette colors defined here
├── postcss.config.js
├── vercel.json
│
├── .copilot/
│   └── context/
│       ├── personas.md
│       ├── user-journey.md
│       ├── mvp-features.md
│       ├── nice-to-haves.md
│       ├── information-architecture.md
│       ├── visual-design-direction.md
│       ├── ai-generation-approach.md
│       ├── development-phases.md
│       └── repo-structure.md           # This file
│
├── public/
│   └── constellation-center.svg        # Static center image asset (not AI-generated)
│
├── src/
│   ├── main.jsx
│   ├── App.jsx                          # Manages view state: entry | constellation | results
│   ├── index.css                        # Tailwind directives + gemstone CSS variables
│   └── components/
│       ├── screens/
│       │   ├── EntryScreen.jsx
│       │   ├── ConstellationScreen.jsx
│       │   └── ResultsScreen.jsx
│       ├── ToneControl.jsx               # Reflective/Playful toggle
│       ├── LensSelector.jsx              # 1/2/3 lens selection UI
│       ├── ConnectingLines.jsx           # SVG line-drawing animation component
│       ├── InterpretationCard.jsx        # Reused per selected lens
│       ├── SynthesisSection.jsx          # Adapts shape based on lens count
│       └── CopyResultsButton.jsx
│
└── api/
    ├── interpret.js                      # Tier 1: full generation (3 lenses + full synthesis)
    └── synthesize.js                     # Tier 2: synthesis-only recomputation for lens subset
```

## Why this structure

- **`.copilot/context/` is the AI scaffolding directory** the Protogen rubric explicitly looks for.
- **`BRIEF.md`, `README.md`, `LICENSE` stay in the repo root** — a rubric requirement.
- **`.env.local` is explicitly called out and must be in `.gitignore`** — this is the single most important security detail in this project; the Gemini API key must never be committed to version control, even in a private repo.
- **`src/components/screens/`** mirrors the Information Architecture's three view states directly.
- **`api/interpret.js` and `api/synthesize.js` are separate functions** reflecting the two-tier generation approach in `ai-generation-approach.md` — full generation vs. lightweight synthesis recomputation.
- **`public/constellation-center.svg`** is called out explicitly as a static asset, reinforcing that the center image is not AI-generated per dream.
- **No `data/`, `db/`, or `auth/` folders** — deliberate, reflecting MVP boundaries.

## Commit hygiene expectations (per rubric)

- Multiple commits across each development phase.
- Descriptive commit messages, not "update" or "fix."
- Context docs should show evidence of being revisited as the build evolves.
