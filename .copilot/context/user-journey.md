# User Journey — Dream Reflection

A guided, multi-step journey built as in-app view states (no router/page reloads) — Motion's `AnimatePresence` handles every transition between steps.

## Step 0: Entry screen

**Screen:** As simple and inviting as a search box — app name, a short one-line invitation ("What did you dream last night?"), and a single open text field. Nothing else competes for attention here.

**User state:** Curious, possibly still half-asleep, low patience for setup.

**Design intent:** Zero friction. This screen's entire job is to get the user typing immediately.

## Step 1: Submit → transition to Constellation

**Action:** User submits their dream description.

**System response:** An animated transition (the first "reveal" moment) from the entry screen into the Constellation screen — this is where the app announces its personality for the first time.

## Step 2: Constellation screen

**Layout:** A central symbolic image (representing the dreaming mind) with the three lenses arranged around it — triangular/radial on tablet and desktop; on mobile, the center image shrinks to a small anchor icon at the top with the three lenses stacked below it.

**Controls present here:**
- **Tone control** (Reflective ↔ Playful) — visible and adjustable at all times from this point forward, not just as an initial setting.
- **Lens selection** — the user can tap 1, 2, or all 3 lenses to include in focus.

**Design intent:** This screen is the emotional centerpiece of the whole app — it should feel like arriving somewhere, not like a settings panel.

## Step 3: Reveal interaction

**Action:** Once the user has selected their lens(es) (defaulting to all 3), they trigger the reveal — a button or gesture that draws animated connecting lines (via Motion's SVG path-length animation) from the center image out to each selected lens, then reveals that lens's interpretation content.

**Design intent:** The line-drawing animation is a signature "slightly magical" moment — lines should draw with a slight stagger if multiple lenses are selected, not all snap in at once.

## Step 4: Synthesis, scoped to current selection

**Content:** Below or alongside the revealed lens(es), the synthesis section appears:
- **3 lenses selected:** Common Themes, Divergent Interpretations, Reflection Questions (full three-way comparison).
- **2 lenses selected:** Common Themes and Divergent Interpretations narrow to just those two; Reflection Questions remain.
- **1 lens selected:** Common Themes / Divergent Interpretations don't apply — replaced by a focused single-lens reflection framing, still ending in Reflection Questions.

**Design intent:** Reflection Questions are the one constant across every selection state — always the last thing the user reads, regardless of how they've sliced the lenses.

## Step 5: Adjust and re-explore (loop, not a dead end)

**Actions available at this point, in any order:**
- **Change lens selection** — synthesis recomputes for the new selection (a lighter follow-up request, not a full re-generation).
- **Adjust the tone control** — triggers a genuine fresh regeneration of the lens content in the new voice, with a brief "reimagining..." transition covering the request.
- **Copy** the current view's results to clipboard.
- **Start over** with a new dream, returning to the Entry screen.

**Design intent:** This is deliberately a loop, not a single linear path — the user is encouraged to keep exploring combinations (different lens selections, both tone settings) rather than treating the first result as final.

## Handling generation delays and errors gracefully

- **Normal generation wait:** styled as an on-brand "reimagining..." or "consulting the lenses..." moment, not a generic spinner.
- **Rate-limited (429) response from the LLM:** shown as a friendly, in-character message (e.g., "Lots of dreams being interpreted right now — try again in a moment") — never a raw error or blank screen. See `ai-generation-approach.md` for the technical handling.

## End state

There isn't really a fixed "end" — the user can keep adjusting tone and lens selection for as long as they're curious, and leaves whenever they've read something that resonates, with language throughout reinforcing that none of it is "the answer."
