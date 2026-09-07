# MVP Features — Dream Reflection

These are the features required for the build to satisfy the Protogen case study rubric and the vision in `BRIEF.md`. Nothing here is optional for v1.

## 1. Entry screen
- Single multi-line text field, minimal supporting UI — as simple as a search box.
- Placeholder/example text to reduce blank-page friction.

## 2. Constellation screen with responsive layout
- Central symbolic image with three lenses arranged around it.
- **Tablet/desktop:** triangular/radial arrangement.
- **Mobile:** gracefully collapses to a vertical stack with the center image as a small anchor icon at top — not a cramped, shrunk-down triangle.

## 3. Tone control (Reflective ↔ Playful) — two states, real regeneration
- A two-state toggle-style control (not a continuous multi-preset gradient).
- Adjustable at any time, including after results are already showing.
- Changing it triggers a **genuine new LLM generation** in the new voice — never a cosmetic-only re-theme.
- A "reimagining..." transition covers the regeneration request, styled as part of the experience rather than a generic loading spinner.

## 4. Lens selection (1, 2, or 3 lenses)
- User can select any combination of the three lenses to focus on.
- Selection drives both the reveal animation (which connecting lines draw) and which content is shown.

## 5. Animated reveal (connecting lines)
- Motion-powered SVG line-drawing animation connecting the center image to each currently selected lens.
- Lines stagger slightly when multiple lenses are selected — not all appearing simultaneously.

## 6. Adaptive synthesis (recomputes per lens selection)
- **3 lenses:** Common Themes, Divergent Interpretations, Reflection Questions.
- **2 lenses:** Common Themes and Divergent Interpretations narrowed to just those two; Reflection Questions remain.
- **1 lens:** Common Themes/Divergent Interpretations replaced by a focused single-lens reflection framing; Reflection Questions remain.
- Recomputing synthesis for a new lens selection should be a lightweight follow-up request, not a full re-generation of all three lenses.

## 7. Copy results
- Copies the **current view's** results (whichever lenses/synthesis are currently displayed) to clipboard.
- Clear confirmation feedback (e.g., "Copied!").

## 8. Graceful rate-limit / error handling (new — required, not optional)
- If the LLM API returns a rate-limit (429) response, the serverless function retries once or twice with short exponential backoff before giving up.
- If still unavailable, the frontend shows a friendly, on-brand message (not a raw error, not a blank screen) and allows the user to try again.
- This must be tested and confirmed working, not just theoretically handled — a reviewer or wider audience should never see a broken demo.

## 9. Responsive, mobile-first design overall
- No horizontal scrolling anywhere.
- Touch targets (lens selection taps, tone control, buttons) sized appropriately for thumbs.
- Legible and well-composed at tablet and desktop widths too.

## Definition of done for MVP

A reviewer (or Jeremy, testing cold, via the Vercel Shareable Link) should be able to:
1. Open the deployed site on a phone with no instructions.
2. Type a dream and watch the entry → constellation transition.
3. Select lenses (try all 3, then narrow to 2, then to 1) and see the synthesis correctly adapt each time.
4. Adjust the tone control and see genuinely different generated content, not just a color change.
5. Copy results successfully.
6. Never encounter a raw error, even under rate-limiting — only graceful, on-brand messaging.
7. Never encounter a login wall, saved history, chat box, or any Do-Not-Include feature from the brief.
