# Suggested Repo Structure & AI Scaffolding — Dream Reflection

This is the target structure for the full project repo once code is added. The docs delivered alongside this file are already placed where they belong in this structure — you can drop them straight into a new repo. The `src/` layout below reflects a standard Vite + React scaffold with Tailwind and Motion added.

```
dream-reflection/
├── README.md                          # Project overview, what/why, how to run it
├── LICENSE                             # MIT (or your preferred license)
├── BRIEF.md                            # The design spec — read first, kept in sync with the build
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js                  # Tailwind setup, incl. any custom theme-preset colors
├── postcss.config.js
├── vercel.json                         # (if needed for serverless function config)
│
├── .copilot/                           # AI scaffolding — context docs for GitHub Copilot / any AI coworker
│   └── context/
│       ├── personas.md                 # Who this is built for
│       ├── user-journey.md             # Step-by-step walkthrough of the experience
│       ├── mvp-features.md             # What must ship in v1
│       ├── nice-to-haves.md            # What's deferred, and why
│       ├── information-architecture.md # Page/state structure
│       ├── visual-design-direction.md  # Color, type, motion direction, theme-preset system
│       ├── ai-generation-approach.md   # How generation stays live/legitimate without RAG
│       ├── development-phases.md       # Build plan, phase by phase
│       └── repo-structure.md           # This file
│
├── public/                             # Static assets (favicon, any static images)
│
├── src/                                 # React app source
│   ├── main.jsx                         # App bootstrap (createRoot, mount)
│   ├── App.jsx                          # Root component — composes the single-screen layout, holds theme + app state
│   ├── index.css                        # Tailwind directives + any custom CSS variables for theme presets
│   └── components/
│       ├── DreamInput.jsx
│       ├── ToneSlider.jsx                # Drives theme preset state; uses Motion for transitions
│       ├── InterpretationCard.jsx        # Reused 3x (psychology/neuroscience/symbolism)
│       ├── SynthesisSection.jsx           # Reused 3x (Common Themes / Divergent / Reflection Qs)
│       └── CopyResultsButton.jsx
│
└── api/                                  # Serverless function(s)
    └── interpret.js                       # Takes { dreamText, tone } → returns structured JSON
```

## Why this structure

- **`.copilot/context/` is the AI scaffolding directory** the Protogen rubric explicitly looks for — a logical place for context docs, distinct from application code, so a reviewer (or future Copilot session) can find project intent immediately.
- **`BRIEF.md`, `README.md`, and `LICENSE` stay in the repo root** — this is a hard requirement in the rubric ("README.md and LICENSE are in the root of your repo").
- **`src/components/` mirrors the Information Architecture** — one React component per piece of the single-screen layout, making it easy to point Copilot at exactly the piece you're iterating on.
- **`tailwind.config.js` at the root** is where the three theme-preset color/spacing values should live, so they're defined in one place rather than scattered across components.
- **A single `api/interpret.js` endpoint** keeps the "simple implementation over technical complexity" principle intact — one function, one job, no chained calls or hidden state.
- **No `data/`, `db/`, or `auth/` folders** — their absence is deliberate, reflecting the MVP boundaries (no accounts, no history, no persistence) rather than an oversight.

## Commit hygiene expectations (per rubric)

- Multiple commits across each development phase, not one commit per phase and never one commit for the whole project.
- Descriptive commit messages (`feat: wire up dream interpretation generation via serverless function`) instead of `update` or `fix`.
- Context docs should show evidence of being revisited as the build evolves (e.g., updating `nice-to-haves.md` or `mvp-features.md` if scope shifts), not just written once at the start and abandoned.
