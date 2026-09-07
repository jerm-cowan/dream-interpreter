# Development Phases — Dream Interpreter (Protogen Case Study Build Plan)

This plan is structured to satisfy all three Protogen case study review areas — the build works end-to-end, the repo/AI scaffolding is in place with real commit history over time, and the design visibly reflects planning captured in `BRIEF.md` — while following the same prompt → review → keep/undo → deploy rhythm used throughout Protogen.

Aim for **multiple commits per phase**, not one commit per phase. Reviewers explicitly look for commit history that shows real progress over time, not one big push at the end.

## Phase 0 — Setup & Scaffolding (before any UI exists)
- Initialize the repo, set up the project folder, install the base toolchain (VS Code, GitHub Copilot, Node.js, Vercel-linked repo).
- Write `BRIEF.md` first, before prompting Copilot for any code — this is the single highest-leverage step, since a vague brief produces a generic build.
- Create the `.copilot/context/` docs (this folder) so Copilot has grounding context from the very first prompt, not bolted on afterward.
- Commit: Initialize repo with documents and scaffolding.


## Phase 1 — Scaffold the React Project
- Have Copilot scaffold a new React project using Vite.
- Install and configure Tailwind CSS.
- Install Motion (`npm install motion`).
- Watch for Copilot scaffolding everything into a subfolder instead of the repo root — if it does, ask it to move everything back to root before continuing.
- Review the generated folder structure before moving on so you understand what was created.
- Commit: `chore: scaffold React + Vite project, add Tailwind and Motion`

## Phase 2 — Static Component Shell (no AI generation yet)
- Prompt Copilot to build the single-screen layout as React components: `DreamInput`, `ToneSlider`, a generate button, and placeholder versions of `InterpretationCard` and `SynthesisSection`, using the Information Architecture doc as the spec.
- Get the responsive layout right *before* wiring up real content — it's much easier to review mobile layout with placeholder text than to debug layout and generation logic at the same time.
- Commit in small chunks: input field, then slider, then card component, then synthesis component — each as its own commit with a descriptive message.

## Phase 3 — Theme Preset System & Visual Design Pass
- Implement the three theme presets (Reflective / Balanced / Playful) from `visual-design-direction.md` as Tailwind class sets or CSS variables tied to slider state.
- Wire up Motion to smoothly transition background, accent colors, and type treatment as the slider crosses preset thresholds — this is the signature interaction, so budget extra review/iteration time here.
- Add the card "reveal" transition (staggered fade/rise-in) using Motion, with placeholder content so it can be reviewed independently of real generation logic.
- Commit in stages: `feat: add theme preset system`, then `style: wire slider to live theme transition`, then `style: add card reveal animation`.

## Phase 4 — Generation Logic
- Build the serverless function that takes `{ dreamText, tone }` and returns structured JSON (`psychology`, `neuroscience`, `symbolism`, `commonThemes`, `divergentInterpretations`, `reflectionQuestions`).
- Prompt engineering here is the core design work of this phase — the prompt sent to the LLM should encode the Product Principles directly (present possibilities not facts, multiple traditions in the symbolism lens, tone slider changes voice not substance), using the Knowledge Primer from `ai-generation-approach.md`.
- Test with several different dream inputs and all three tone presets before moving on — this is the "does it do what it's supposed to do" moment reviewers will test directly.
- Commit: `feat: wire up dream interpretation generation via serverless function`

## Phase 5 — Wire React Frontend to Generation
- Connect the input/slider/button to the serverless function; render real results into the `InterpretationCard` and `SynthesisSection` components built in Phase 2.
- Build loading and error states, styled to match the active theme preset.
- Commit: `feat: connect UI to generation endpoint, add loading/error states`

## Phase 6 — Copy-to-Clipboard & Polish
- Implement the copy-to-clipboard action and its confirmation feedback.
- Pass over empty states, edge cases (very short dream input, generation failure, slow network) — this is the "edge cases and empty states are handled gracefully" bar reviewers look for beyond the happy path.
- Commit: `feat: add copy-to-clipboard`, then separate polish commits as issues are found.

## Phase 7 — Cross-Device Pass
- Test on an actual phone (not just a resized browser window) and at tablet/desktop widths.
- Fix any layout breakage, oversized touch targets, or text legibility issues found. Double-check the theme-shift animation performs smoothly on mobile, not just desktop.
- Commit: `fix: responsive layout adjustments after device testing`

## Phase 8 — Final Review Against BRIEF.md
- Re-read `BRIEF.md` top to bottom and check the deployed build against every line, especially the "Do Not Include" list and the Success Criteria section.
- Update `BRIEF.md` or `nice-to-haves.md` if anything changed during the build (a stale brief that doesn't match the build is a rubric Redo, not just a documentation nitpick).
- Deploy final build to Vercel, verify the public URL works end-to-end.
- Commit: `docs: reconcile BRIEF.md with final build` + final deploy.

## Ongoing practice across all phases
- Prompt Copilot like briefing a junior designer: describe what you want to see and why (referencing the context docs), not low-level implementation instructions.
- After each generation, explicitly review, then keep or undo — don't accept-and-move-on by default.
- Write commit messages that describe *what changed and why*, not "update" or "fix."
