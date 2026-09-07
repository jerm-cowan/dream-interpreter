# Information Architecture — Dream Reflection

This is a **single-screen app** (one React view, no router) — there is no multi-page navigation and no menu structure. The "architecture" here is about vertical content hierarchy on one page, and the states that page can be in.

## Page structure (single view: `App.jsx`)

```
┌─────────────────────────────────────┐
│  App name / short tagline            │
├─────────────────────────────────────┤
│  DreamInput                          │
│  (placeholder example text)          │
├─────────────────────────────────────┤
│  ToneSlider                          │
│  (drives theme preset + tone label)  │
├─────────────────────────────────────┤
│  [ Reveal Interpretations ] button   │
└─────────────────────────────────────┘
        ↓ (on submit)
┌─────────────────────────────────────┐
│  Loading / "revealing" state          │
│  (styled to current theme preset)     │
└─────────────────────────────────────┘
        ↓ (on response)
┌─────────────────────────────────────┐
│  InterpretationCard: Psychology       │
├─────────────────────────────────────┤
│  InterpretationCard: Neuroscience     │
├─────────────────────────────────────┤
│  InterpretationCard: Symbolism/Culture│
├─────────────────────────────────────┤
│  SynthesisSection: Common Themes      │
├─────────────────────────────────────┤
│  SynthesisSection: Divergent Interp.  │
├─────────────────────────────────────┤
│  SynthesisSection: Reflection Qs      │
├─────────────────────────────────────┤
│  CopyResultsButton  [Start Over]      │
└─────────────────────────────────────┘
```

## Application states

1. **Empty/entry state** — input + slider + button, button disabled or gently discouraged until there's input text.
2. **Loading state** — brief, delightful transition; input area either disabled or replaced to prevent double-submits.
3. **Results state** — all three cards + synthesis rendered together (not paginated, not tabbed) so comparison is possible via natural scrolling.
4. **Error state** — if generation fails, a plain, honest message ("Something went wrong — try again") and a retry action. No blame placed on the user's dream description.
5. **Post-copy confirmation** — transient state (e.g., toast or button label change) confirming the copy succeeded.

## Theme state (new — driven by the tone slider)

Layered on top of the above: the app carries a **theme preset** value (Reflective / Balanced / Playful) at all times, independent of which application state it's in. Every state above (empty, loading, results, error) should visually respect whichever theme preset is currently active — the theme is a global visual layer, not something scoped to just one section of the page.

## Why no navigation/menu (and no router)

Because there are no accounts, no history, and no secondary content (no "About" page, no settings beyond the tone slider), a nav bar or router would add structure the product doesn't need. Every piece of chrome should earn its place; for MVP, that means: app name, one input, one slider, one button, and the results below it — all composed inside a single `App.jsx`.

## Content hierarchy principles

- **Input always above output** — the user's own words stay visible/scrollable-back-to, so the connection between what they described and what was generated is never lost.
- **Three cards get equal visual weight** — no lens should read as more "primary" than another, reinforcing the "no single correct answer" principle.
- **Synthesis reads as a distinct section**, visually separated from the cards (e.g., a background shift or divider), since it's a different kind of content (comparative, not descriptive).
- **Reflection Questions are the last thing on the page** before the action buttons — the intentional "note to sit with" as the user's final read.
