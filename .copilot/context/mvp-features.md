# MVP Features — Dream Interpreter

These are the features required for the build to satisfy the Protogen case study rubric ("core flows work end to end," matches the brief). Nothing here is optional for v1.

## 1. Dream input
- Single multi-line text field.
- Placeholder/example text to reduce blank-page friction.
- No character minimum enforced with an error state; a soft minimum (e.g., a gentle nudge if under ~10 characters) is acceptable, but never a hard block.

## 2. Tone slider (Reflective ↔ Playful) — with full theme shift
- A single continuous-feeling slider control that snaps to a small number of discrete theme presets under the hood (see `visual-design-direction.md`).
- Defaults to the Balanced midpoint.
- Driving both: (a) the voice/register of generated content, and (b) a smooth, eased transition of the app's visual theme (background, accents, type) via Motion.
- Never changes which themes/substance are identified in the generated content — only voice and visual presentation.

## 3. Three interpretation cards
- **Psychology Lens:** emotions, experiences, relationships, desires, fears, subconscious themes.
- **Neuroscience Lens:** sleep science, memory consolidation, stress processing, emotional regulation, cognition.
- **Symbolism & Cultural Interpretation Lens:** multiple symbolic/mythological/folklore/cultural readings — never anchored to a single religion or belief system.
- Each card visually distinct (icon, accent color, or illustration) so a user can tell them apart at a glance while scrolling.

## 4. Common Themes section
- A short synthesis identifying where the three lenses converge or echo each other.
- Written in plain language, not just a bullet restating each card.

## 5. Reflection Questions section
- 2–4 open-ended questions that invite the user to reflect further.
- Must not resolve into an answer — the questions are the deliverable, not a lead-in to one.

## 6. Copy results
- Single tap/click action that copies a clean, readable text version of the full result (tone setting doesn't need to be included, but all three lenses + synthesis should be).
- Clear confirmation feedback (e.g., "Copied!") so the user knows it worked.

## 7. Responsive, mobile-friendly design
- Designed mobile-first; must remain legible and well-composed on tablet and desktop widths.
- No horizontal scrolling, no content cut off behind fixed elements (e.g., a sticky header covering the input field on small screens).
- Touch targets (slider handle, generate button, copy button) sized appropriately for thumbs, not just mouse pointers.

## Definition of done for MVP

A reviewer (or Jeremy, testing cold) should be able to:
1. Open the deployed site on a phone with no instructions.
2. Type a dream, optionally move the slider (and see the visual theme shift smoothly), and generate results within a couple of taps.
3. Read three clearly distinct lenses and a synthesis section without any dead ends, broken states, or missing content.
4. Copy the result successfully.
5. Never encounter a login wall, saved history, chat box, or any Do-Not-Include feature from the brief.
