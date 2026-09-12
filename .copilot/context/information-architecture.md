# Information Architecture — Dream Reflection

This is a **single-page app with multiple in-app view states** (no router, no page reloads) — Motion's `AnimatePresence` handles transitions between states. The "architecture" here is about which states exist, what's visible in each, and how state (tone, lens selection) persists across transitions.

## View states

```
[Entry] --submit--> [Constellation] --reveal--> [Results: Reveal + Synthesis]
                          ^                              |
                          |______ (start over) __________|
                          |
                          |<--- tone toggle / lens selection changes (stays in Results, recomputes)
```

### 1. Entry
- App name/tagline, single dream text input, submit action.
- No tone control or lens selection visible yet — those belong to the Constellation screen onward.

### 2. Constellation
- Central symbolic image + three lenses arranged around it in the same triangular layout at every breakpoint, scaling down (smaller center icon, condensed cards, tighter connecting lines) rather than reflowing into a stacked list on mobile — see `visual-design-direction.md` for the rationale.
- Tone control (Reflective ↔ Playful) — visible from here onward, persists across all later states.
- Lens selection UI (tap to include/exclude each of the 3 lenses) — defaults to all 3 selected.
- A "reveal" trigger (button or gesture) advances to Results once the user is happy with their lens selection.

### 3. Results (Reveal + Synthesis)
- **Wide breakpoints (tablet-landscape and up):** the three lens cards sit side-by-side in a row (fixed, matching height with a hover-revealed scrollbar if content overflows), each toggled by its icon+label header. Connecting lines draw downward from each selected card to a single convergence point at the top of the synthesis container below — the two outer lenses step down/across/down, the middle lens drops straight.
- **Mobile/tablet-portrait:** lens cards stack vertically as an accordion — each card has two fully independent states: selected/deselected (checkbox) and expanded/collapsed (caret). Collapsing a card only hides its body text; it never affects whether that lens counts toward the synthesis, and vice versa. All cards (and the synthesis container) start expanded on arrival at Results, regardless of selection carried over from Constellation.
- Synthesis section, shaped according to selection count (see `mvp-features.md` #6):
  - 3 lenses → full Common Themes / Divergent Interpretations / Reflection Questions.
  - 2 lenses → Common Themes / Divergent Interpretations narrowed to the pair, + Reflection Questions.
  - 1 lens → focused single-lens reflection framing + Reflection Questions.
  - At wide breakpoints these render as side-by-side columns with a vertical divider; on mobile/tablet-portrait they stack with a horizontal divider, and the whole container is also a caret-only accordion (no selection checkbox — it's a computed result, not a selectable input).
- Copy-results action.
- Start-over action (returns to Entry, clearing dream text but not necessarily tone preference).

## Persistent controls across Results state

- **Tone control** stays visible and adjustable throughout Results. Changing it triggers a real regeneration (new LLM call) — see `ai-generation-approach.md`.
- **Lens selection** stays adjustable throughout Results. Changing it triggers a lighter synthesis-only recomputation (not a full regeneration) — see `ai-generation-approach.md`.

## Loading / transitional states

1. **Entry → Constellation transition:** brief animated reveal, not a blank flash.
2. **Constellation → Results (initial reveal):** the signature line-drawing + content-reveal animation.
3. **Tone change while in Results:** a "reimagining..." transition, distinct from the initial reveal, communicating that fresh content is being generated.
4. **Lens selection change while in Results:** the card's selected state and its connecting line update **instantly** on tap, independent of the network. The actual `api/synthesize` call is debounced (fires once a brief beat after the user stops toggling) so a burst of rapid taps doesn't queue up redundant requests, and a slow/superseded response can never overwrite a newer one. While that debounced call is in flight, the toggle-instruction copy below the tone control is replaced by a "Generating new responses..." status with a small spinning icon, reverting once the synthesis lands.
5. **Rate-limited/error state:** a friendly, on-brand message with a retry action — can occur during any of the above transitions if the LLM call fails.

## Why still no navigation/router

There are no accounts, no persistent history, and no secondary content — the "pages" here are really just view states within one continuous experience. A traditional router would add structure (URLs, back-button semantics) that this single-session, non-persistent experience doesn't need.

## Content hierarchy principles

- **Tone and lens-selection controls are always visible once introduced** (from Constellation onward) — never buried in a menu, since adjusting them is core to the product's value proposition, not a settings afterthought.
- **Reflection Questions are the one constant** across every lens-selection state — always present, always last.
- **The center image is a stable visual anchor** across Constellation and Results — it shouldn't disappear or relocate jarringly between states, to keep the "journey" feeling continuous rather than disjointed.
