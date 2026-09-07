# Visual Design Direction — Dream Reflection

## Design goals, restated as visual direction

| Design goal | What it means visually |
|---|---|
| Thoughtful | Generous whitespace, unhurried pacing, no dense walls of text |
| Curious | The constellation layout and lens-selection interaction invite poking around |
| Inviting | The entry screen is as plain and unintimidating as a search box |
| Slightly magical | Carried by the constellation reveal, the connecting-line animations, and the tone-driven regeneration ritual |
| Reflective, not predictive | No fortune-teller visual tropes (crystal balls, tarot iconography, glowing prophecy text) |

## The gemstone color palette

> **Implemented.** The palette below reflects the final choices as built (Tailwind v4 `@theme` tokens in `src/index.css`, prefixed `gem-*`), which deviate from the original draft in two places: **Emerald** (not Citrine) was picked for the Symbolism & Culture lens to keep it visually distinct from the Playful tone state, and the Reflective tone state moved from **Obsidian** to **Garnet** — pure obsidian read as flat black on screen rather than a jewel tone. Obsidian's near-black/near-white shades are still used as the app's general text/background neutrals (see Typography below), just not as the Reflective tone's identifying color. A fourth gemstone, **Citrine**, was added for the synthesis (Common Themes / Divergent Interpretations / Reflection Questions) container.

| Element | Gemstone | Hex (500 shade) | Why |
|---|---|---|---|
| Psychology lens | **Amethyst** | `#6B46C1` | Introspective, emotional, historically tied to the mind/dreams |
| Neuroscience lens | **Sapphire** | `#1E5AA8` | Clinical, cool, "scientific" without feeling sterile |
| Symbolism & Culture lens | **Emerald** | `#1E7A4C` | Mythic, earthy, distinct from the other two lenses |
| Reflective tone state | **Garnet** | `#7A1F2B` (700 shade) | Deep jewel-red — calm and grounded like obsidian was meant to read, but still visibly a gemstone rather than plain black |
| Playful tone state | **Rose Quartz** | `#DE6E8C` | Light, warm, lively mood |
| Center constellation image | **Opal-like** | `#A9A0BF` (neutral scale) | A stable anchor that doesn't compete with lens colors, can subtly shift with tone state |
| Synthesis container | **Citrine** | `#B8860B` | Warm gold-amber accent that reads as a distinct "4th gem" without duplicating a lens or tone color |

Each lens color ships as a full scale (50/100/200/300/500/600/700/900) so selected lens elements can show full saturation while unselected/muted ones use the lighter, desaturated shades of the same hue rather than a generic gray — reinforcing selection state per-lens instead of with one shared "selected" color.

**Avoid:** neon gradients, glitter/sparkle textures, anything that reads as "app for kids" or literal tarot-card imagery. The goal is calm, jewel-toned sophistication — mysterious, not gimmicky.

## Layout: the Constellation screen

**Tablet/desktop:** a triangular or radial arrangement — the center image in the middle, the three lens icons/cards positioned around it at roughly equal angles, with the connecting lines drawn between center and each lens.

**Mobile:** gracefully collapses to a vertical stack — the center image shrinks to a small anchor icon at the top (still present, still meaningful, just less spatially dominant), with the three lenses stacked below it in sequence. This is a deliberate **reflow**, not a forced shrink of the same triangular geometry onto a narrow screen.

## Iconography

- **Implemented** as a shared `LensIcon` component (`src/components/LensIcon.jsx`), rendered on both the Constellation and Results screens: a two-lobe brain motif for Psychology, a wave/moon-phase motif for Neuroscience, and a compass-with-needle motif for Symbolism & Culture — simple stroke-based line icons (no fills, no religious symbolism), each tinted via `currentColor` so they automatically pick up the lens's gemstone color and its selected/unselected shade.
- Lens selection no longer uses a checkmark badge — the icon and card's color/saturation are the only selection indicator, on both the Constellation screen and the Results screen (see below).
- The center image should read as an abstract "dreaming mind" motif (e.g., a stylized brain/cloud/constellation hybrid) — evocative, not literal or medical-looking. Currently a plain opal-toned text label ("Dreaming Mind"); a dedicated static illustration asset is still open (see Imagery below).

## Motion & interaction (via Motion / Framer Motion)

- **Entry → Constellation transition:** a soft, expanding reveal — the entry screen recedes as the constellation image and lenses fade/scale into place.
- **The signature moment — connecting-line reveal:** animate each selected lens's connecting line using Motion's `pathLength` animation (drawing from 0 to 1), staggered slightly across lenses so they don't all draw simultaneously.
- **Tone-change ("reimagining...") transition:** should feel distinct from the initial reveal — perhaps a brief pulse/shimmer through the center image while new content loads, reinforcing "the mood of the whole reading is shifting."
- **Lens-selection change transition:** faster and lighter than a tone change — connecting lines redraw/retract for deselected lenses, new lines draw for newly selected ones, synthesis content cross-fades.
- **Everywhere else:** minimal motion — restraint elsewhere makes the signature moments land.

## Typography

- **Implemented:** [Work Sans](https://fonts.google.com/specimen/Work+Sans) (humanist sans-serif) for all UI chrome and body copy, loaded via Google Fonts and set as the `font-sans` Tailwind theme default.
- **Implemented:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (expressive display serif) as `font-display`, applied to the app name ("Dream Reflection"), the per-screen page titles ("Choose your lenses", "Your Reflection"), and each lens's heading/label — not used for general body copy.
- Body text sized generously for mobile reading (minimum ~16px equivalent).
- General body/heading text color uses the Obsidian neutral scale (`gem-obsidian-*`) — this is distinct from the Reflective tone state, which is now identified by Garnet (see palette above).

## Imagery

- The center constellation image should be a static, pre-designed asset (illustration or abstract graphic) — not AI-generated per dream, which stays explicitly out of scope.
- No literal dream-scene illustrations elsewhere in the product.

## Mobile-first layout notes

- The stacked mobile layout should still visually communicate "these three lenses relate to one center," even without the literal triangle — e.g., via the small anchor icon staying visible/sticky-ish near the top, or via connecting-line remnants pointing upward toward it.
- Touch targets for lens selection (tapping to include/exclude a lens) must be comfortably thumb-sized, not tiny icons crammed together.

## Results screen lens selection (implemented)

- The Results screen no longer has a separate row of lens filter chips. Each lens's `InterpretationCard` is itself the toggle — tapping/clicking a card selects or deselects that lens directly, reusing the same gemstone selected/unselected treatment (and the same `LensIcon`) as the Constellation screen, so the interaction language stays consistent across both screens.
- Deselected lenses stay visible in their muted/desaturated state rather than disappearing, so a lens can always be re-added without navigating back to the Constellation screen. At least one lens must always remain selected.
