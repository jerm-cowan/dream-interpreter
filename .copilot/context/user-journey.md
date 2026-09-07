# User Journey — Dream Reflection

A single-session journey, designed to be completed in under two minutes on a phone, start to finish.

## Step 0: Arrival

**Screen:** Landing/entry state — just the app name, a short one-line invitation ("What did you dream last night?"), and a single open text field. Visual theme starts at the Balanced preset by default.

**User state:** Curious, possibly still half-asleep, low patience for setup.

**Design intent:** Zero friction. No login, no onboarding carousel, no explanation required before they can start typing.

## Step 1: Describe the dream

**Action:** User types a free-text description of the dream (a sentence or a paragraph — no minimum/maximum enforced harshly, but placeholder text should model a short, natural example).

**Micro-moment:** A subtle placeholder or rotating example ("I was flying over my hometown but couldn't land...") helps users who freeze up at a blank field.

## Step 2: Set the tone (optional) — the signature interaction

**Action:** User drags a slider between **Reflective** and **Playful**. As they drag across preset thresholds, the entire visual theme of the app eases into the new preset (background tone, accent colors, type treatment) — not just a label change. Default sits at the Balanced midpoint if untouched.

**Design intent:** This is the app's signature delight moment. It must feel tactile and alive — dragging the slider should visibly, smoothly transform the page's mood, reinforcing "you're choosing a lens on this experience," not just picking a writing style. See `visual-design-direction.md` for exactly what changes per preset.

## Step 3: Generate

**Action:** User taps a single clear call-to-action ("Reveal interpretations" or similar — language should match the "slightly magical" design goal without overselling).

**System response:** A brief, delightful loading state (a few seconds), styled to match whichever theme preset is currently active.

## Step 4: Read the three lenses

**Action:** User scrolls through three interpretation cards, presented as distinct, visually differentiated sections (not identical gray boxes) — Psychology, Neuroscience, Symbolism & Culture.

**Design intent:** On mobile, this is a vertical scroll, not tabs/swipe-behind-a-carousel — nothing here should be hidden behind an extra tap, since comparing the three lenses is the entire point.

## Step 5: See the synthesis

**Action:** Below the three cards, the user reaches **Common Themes**, **Divergent Interpretations**, and **Reflection Questions** — presented as a distinct visual "landing" moment, since this is the payoff of the whole experience.

**Design intent:** Reflection Questions should be the last thing the user reads — open-ended, unresolved, inviting them to sit with the dream rather than close the loop with a verdict.

## Step 6: Copy or start over

**Action:** User can copy the full result to their clipboard (single tap, one clean text block) to paste into a journal, notes app, or share with a friend. A clearly separate action lets them start over with a new dream.

**Design intent:** No save, no account, no history — if they want to keep it, copying it out is the mechanism. This is a deliberate MVP boundary, not an oversight.

## End state

User leaves having read three genuinely different perspectives on the same dream, with language reinforcing throughout that none of them is "the answer" — just possibilities worth holding lightly.
