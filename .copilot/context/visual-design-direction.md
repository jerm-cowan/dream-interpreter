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

| Element | Gemstone | Hex direction | Why |
|---|---|---|---|
| Psychology lens | **Amethyst** | Deep violet (~#6B46C1 range) | Introspective, emotional, historically tied to the mind/dreams |
| Neuroscience lens | **Sapphire** | Rich blue (~#1E5AA8 range) | Clinical, cool, "scientific" without feeling sterile |
| Symbolism & Culture lens | **Citrine / Emerald** | Warm gold-amber or deep green (~#B8860B or #1E7A4C range) | Mythic, earthy, distinct from the other two |
| Reflective tone state | **Obsidian/Onyx** | Near-black, deep indigo undertone | Calm, grounded, introspective mood |
| Playful tone state | **Rose Quartz / Citrine** | Brighter pink-gold | Light, warm, lively mood |
| Center constellation image | **Opal-like** | Subtly iridescent/shifting neutral | A stable anchor that doesn't compete with lens colors, can subtly shift with tone state |

**Avoid:** neon gradients, glitter/sparkle textures, anything that reads as "app for kids" or literal tarot-card imagery. The goal is calm, jewel-toned sophistication — mysterious, not gimmicky.

## Layout: the Constellation screen

**Tablet/desktop:** a triangular or radial arrangement — the center image in the middle, the three lens icons/cards positioned around it at roughly equal angles, with the connecting lines drawn between center and each lens.

**Mobile:** gracefully collapses to a vertical stack — the center image shrinks to a small anchor icon at the top (still present, still meaningful, just less spatially dominant), with the three lenses stacked below it in sequence. This is a deliberate **reflow**, not a forced shrink of the same triangular geometry onto a narrow screen.

## Iconography

- Simple, line-based icons for each lens, tinted in their gemstone color — a subtle brain motif for Psychology, a wave/moon-phase motif for Neuroscience, and a soft symbolic motif (a compass, open book, or abstract mask) for Symbolism & Culture, avoiding any single religious symbol.
- The center image should read as an abstract "dreaming mind" motif (e.g., a stylized brain/cloud/constellation hybrid) — evocative, not literal or medical-looking.

## Motion & interaction (via Motion / Framer Motion)

- **Entry → Constellation transition:** a soft, expanding reveal — the entry screen recedes as the constellation image and lenses fade/scale into place.
- **The signature moment — connecting-line reveal:** animate each selected lens's connecting line using Motion's `pathLength` animation (drawing from 0 to 1), staggered slightly across lenses so they don't all draw simultaneously.
- **Tone-change ("reimagining...") transition:** should feel distinct from the initial reveal — perhaps a brief pulse/shimmer through the center image while new content loads, reinforcing "the mood of the whole reading is shifting."
- **Lens-selection change transition:** faster and lighter than a tone change — connecting lines redraw/retract for deselected lenses, new lines draw for newly selected ones, synthesis content cross-fades.
- **Everywhere else:** minimal motion — restraint elsewhere makes the signature moments land.

## Typography

- A humanist sans-serif for UI chrome and body copy.
- Optional distinct serif/expressive display font for the app name and lens headers only.
- Body text sized generously for mobile reading (minimum ~16px equivalent).

## Imagery

- The center constellation image should be a static, pre-designed asset (illustration or abstract graphic) — not AI-generated per dream, which stays explicitly out of scope.
- No literal dream-scene illustrations elsewhere in the product.

## Mobile-first layout notes

- The stacked mobile layout should still visually communicate "these three lenses relate to one center," even without the literal triangle — e.g., via the small anchor icon staying visible/sticky-ish near the top, or via connecting-line remnants pointing upward toward it.
- Touch targets for lens selection (tapping to include/exclude a lens) must be comfortably thumb-sized, not tiny icons crammed together.
