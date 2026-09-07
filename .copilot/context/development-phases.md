# Development Phases — Dream Reflection (Protogen Case Study Build Plan)

This plan satisfies all three Protogen case study review areas — the build works end-to-end, the repo/AI scaffolding is in place with real commit history, and the design reflects planning captured in `BRIEF.md`.

Aim for **multiple commits per phase**, not one commit per phase.

## Phase 0 — Setup & Scaffolding ✅ (done)
- Repo initialized, `BRIEF.md` and `.copilot/context/` docs in place.

## Phase 1 — Scaffold the React Project ✅ (done)
- React via Vite, Tailwind CSS, Motion installed.

## Phase 2 — Static Component Shell ✅ (done — being revised)
- Original Phase 2 built a single-scroll static layout. **This is being superseded** by the journey/constellation concept below — expect to substantially rebuild these components rather than just adding to them.

## Phase 3 — Entry & Constellation Screens (revised scope)
- Build the Entry screen: dream text input, minimal chrome.
- Build the Constellation screen shell: center image placeholder, three lens icons/cards arranged in a triangular layout (desktop/tablet) with a responsive fallback to a stacked vertical layout (mobile) — using plain positioning/Tailwind first, no animation yet.
- Build the tone control (two-state Reflective/Playful toggle) and lens-selection UI (tap to include/exclude each lens) as functional but unstyled/lightly-styled components.
- Commit in stages: `feat: add Entry screen`, `feat: add Constellation screen shell with responsive layout`, `feat: add tone control and lens selection UI`.

## Phase 4 — Gemstone Visual Design Pass
- Apply the gemstone color palette (Amethyst/Sapphire/Citrine for lenses, Obsidian/Rose Quartz for tone states) from `visual-design-direction.md`.
- Style the center image, icons, and typography per the visual direction doc.
- Commit: `style: apply gemstone palette and typography`.

## Phase 5 — Motion: Journey Transitions & Line-Drawing Reveal
- Implement `AnimatePresence`-driven transitions between Entry → Constellation → Results view states.
- Implement the signature connecting-line SVG animation (Motion's `pathLength`) from the center image to selected lens(es), staggered across multiple lenses.
- Use placeholder text content so animation timing/feel can be reviewed independently of real generation logic.
- This phase involves real creative judgment (timing, easing, stagger) — budget extra review/iteration here.
- Commit in stages: `feat: add screen transition animations`, `feat: add connecting-line reveal animation`.

## Phase 6 — Generation Logic (Tier 1: full generation)
- Build `api/interpret.js`: takes `{ dreamText, tone }`, returns all 3 lenses + full 3-way synthesis as structured JSON, using the Knowledge Primer and hallucination-mitigation rules from `ai-generation-approach.md`.
- Set up the Gemini API key as a Vercel environment variable (never committed to the repo — confirm `.env.local` is in `.gitignore`).
- Include the retry/backoff rate-limit handling described in `ai-generation-approach.md`.
- Test with several dream inputs and both tone settings.
- Commit: `feat: add full-generation serverless function with Gemini`.

## Phase 7 — Generation Logic (Tier 2: synthesis-only recomputation)
- Build `api/synthesize.js`: takes the currently-selected lens text(s) + tone + lens count, returns the appropriately-shaped synthesis (3-lens / 2-lens / 1-lens framing) as structured JSON.
- Include the same rate-limit handling pattern.
- Test all three lens-count scenarios (1, 2, 3 selected).
- Commit: `feat: add synthesis recomputation serverless function`.

## Phase 8 — Wire Frontend to Both Generation Tiers
- Connect the Entry submission and tone-control changes to `api/interpret.js`.
- Connect lens-selection changes to `api/synthesize.js`.
- Build the "reimagining..." transition for tone changes, and a lighter transition for lens-selection changes.
- Build the graceful rate-limit error state in the UI.
- Commit: `feat: connect UI to generation endpoints, add loading and error states`.

## Phase 9 — Copy-to-Clipboard & Polish
- Implement copy-current-view-to-clipboard.
- Pass over empty states and edge cases (very short dream input, all lenses deselected, generation failure).
- Commit: `feat: add copy-to-clipboard`, plus polish commits as issues are found.

## Phase 10 — Cross-Device Pass
- Test on an actual phone and at tablet/desktop widths — confirm the triangular-to-stacked reflow works smoothly, not just structurally.
- Confirm animations perform well on mobile, not just desktop.
- Commit: `fix: responsive layout adjustments after device testing`.

## Phase 11 — Deployment & Access Control
- Deploy to Vercel (Hobby/free plan).
- Enable Vercel Authentication and generate a Shareable Link for the deployment.
- Confirm the Gemini API key is set as a Vercel environment variable (not in the repo).
- Commit: `chore: configure deployment and access control`.

## Phase 12 — Final Review Against BRIEF.md
- Re-read `BRIEF.md` top to bottom and check the deployed build against every line, especially Success Criteria and the "Do Not Include" list.
- Update `BRIEF.md` or `nice-to-haves.md` if anything changed during the build.
- Commit: `docs: reconcile BRIEF.md with final build`.

## Ongoing practice across all phases
- Prompt Copilot like briefing a junior designer: describe what you want and why, referencing context docs.
- Review, then keep or undo — don't accept-and-move-on by default.
- Write descriptive commit messages, not "update" or "fix."
