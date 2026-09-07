# Visual Design Direction — Dream Interpreter

## Design goals, restated as visual direction

| Design goal | What it means visually |
|---|---|
| Thoughtful | Generous whitespace, unhurried pacing, no dense walls of text |
| Curious | Soft prompts and micro-copy that invite rather than instruct |
| Inviting | Low visual barrier to entry — nothing looks like a "form" |
| Slightly magical | The tone slider's live theme-shift is the primary carrier of this goal |
| Reflective, not predictive | No fortune-teller visual tropes (crystal balls, tarot iconography, glowing prophecy text) |

## The theme-preset system (the signature interaction)

The tone slider drives a **global visual theme**, not just a label. Under the hood, it snaps to **three discrete presets** rather than continuously blending colors in real time — this keeps the "gradual, magical shift" feeling for the user while staying simple to build with Motion (no custom color-interpolation math needed; Motion/CSS transitions handle the easing between preset values).

| | **Reflective** (left) | **Balanced** (center, default) | **Playful** (right) |
|---|---|---|---|
| Background | Deep indigo/midnight, low contrast, calm | Soft twilight blue-gray | Warmer, brighter dusk tones — plum/coral hints |
| Type treatment | Slightly more spacing, softer weight | Standard | Slightly bouncier letter spacing, rounder feel |
| Accent intensity | Muted, low-saturation accents | Standard saturation | Higher saturation, a touch more contrast |
| Motion character | Slow, gentle easing on transitions | Standard easing | Slightly springier easing (subtle bounce) |
| Iconography | Simple line icons, minimal | Standard | Same icons, slightly more animated/lively on interaction |

**What must stay constant across all three presets:** the layout/structure (Section on Information Architecture), the actual content/themes surfaced in the generated interpretations, and overall legibility. Only mood-carrying visual properties change — never information hierarchy.

**Transition behavior:** as the user drags across a preset threshold, use Motion to ease the changed properties (background color, accent colors, letter-spacing, easing curves for other animations) over roughly 300-500ms — smooth enough to feel alive, fast enough not to feel laggy while dragging.

## Color direction (base, before preset variation)

- **Base palette:** Deep, soft night tones — muted indigo/midnight blue as a background or accent, paired with a warm, calm neutral (soft cream or warm gray) for card backgrounds, so it doesn't read as sterile or clinical.
- **Lens accent colors (constant across all theme presets):**
  - Psychology — a warm terracotta/rose (human, emotional)
  - Neuroscience — a cool teal/cyan (clinical but not cold)
  - Symbolism & Culture — a muted violet/plum (mythic without being garish-mystical)
- **Avoid:** neon gradients, glitter/sparkle textures, anything that reads as "app for kids" or "tarot card reading site." The goal is calm sophistication, not novelty — even at the Playful end of the slider.

## Typography

- A humanist sans-serif for UI chrome and body copy (legible, warm, not overly geometric/robotic).
- Optional: a distinct serif or slightly expressive display font *only* for the app name/wordmark and section headers (Psychology Lens, Neuroscience Lens, etc.).
- Body text sized generously for mobile reading (minimum ~16px equivalent) — this is content meant to be read closely, not skimmed like a dashboard.

## Motion & interaction (via Motion / Framer Motion)

- **The signature moment:** the theme-preset transition as the slider crosses thresholds — this is where the animation budget and craft should be concentrated.
- **The second moment:** the transition from input to results (the "reveal") — a soft fade/rise-in of the three cards, staggered slightly, styled to match whichever theme preset is active.
- **Slider interaction itself:** smooth, immediate visual feedback (label change, handle movement) as the user drags — this should feel tactile and responsive, not laggy.
- **Everywhere else:** minimal motion. Scrolling through cards and synthesis sections should feel calm, not busy — restraint elsewhere makes the two signature moments land.

## Iconography

- Simple, line-based icons for each lens — a subtle brain motif for Psychology, a wave/moon-phase motif for Neuroscience (sleep cycles), and a soft symbolic motif (a compass or open book) for Symbolism & Culture, avoiding any single religious symbol.

## Imagery

- No literal dream imagery/illustrations required for MVP (and AI-generated imagery is explicitly out of scope). If any decorative visual is used, prefer abstract, soft gradient/texture treatments over literal dream-scene illustrations, which risk looking whimsical/childish rather than reflective.

## Mobile-first layout notes

- Single column throughout; no side-by-side card layout even at tablet width unless there's confirmed room without cramming.
- Sticky elements (if any) should be minimal — avoid a sticky header/footer that eats vertical space on a small screen while the user is trying to read three cards' worth of content.
