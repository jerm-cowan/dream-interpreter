# Project Brief: Dream Reflection

## 1. Summary

**Dream Reflection** is a mobile-first web experience that helps someone explore what a memorable dream might mean — not by giving them one "correct" answer, but by guiding them through a short, delightful journey through three different lenses (psychology, neuroscience, and symbolism/culture), letting them slice the synthesis by whichever lens(es) resonate, and reflecting rather than concluding.

This is a **Protogen P303 (Mobile Experience) case study**. The scenario is self-defined (wellness/self-reflection) rather than pulled from the standard industry table, which the case study instructions explicitly allow.

> **Non-goal, stated up front:** This is not a scientific or diagnostic tool. It does not claim to know what a dream "really" means. Every surface in the product should reinforce that these are *possible* interpretations to explore, not facts to accept.

## 2. Core User

Someone who:
- Had a memorable dream (their own, or one they heard about) that's stuck with them.
- Is curious what it might mean, but isn't looking for a definitive verdict.
- Enjoys reflection and self-discovery as an activity in itself.
- Wants to compare viewpoints — and slice/filter them — rather than be handed one flat answer.

They are most likely opening this on their phone — right after waking up, on a commute, or while telling a friend about the dream.

## 3. Core Value Proposition

Most dream interpretation tools give a single, confident-sounding explanation. **Dream Reflection instead turns interpretation into an explorable, filterable experience** — the user can compare all three lenses, or narrow in on just the one or two that resonate, and watch the synthesis recompute around their selection. The comparison — and the ability to slice it — is the product.

## 4. Core Workflow (a multi-step journey, not a single form)

The experience is built as a **sequence of distinct screens/states** within one app (no page reloads, no router — Motion handles the transitions between states):

1. **Entry screen** — a simple, single-purpose "describe your dream" moment, evocative of a search box: minimal, inviting, no distractions.
2. **Constellation screen** — after submitting, the app transitions (with a delightful animated reveal) into a central symbolic image (representing the dreaming mind) with the three lenses arranged around it — a triangular/radial layout on tablet/desktop, gracefully collapsing to a vertical arrangement with the center image as a small anchor icon on mobile. The **tone control** (Reflective ↔ Playful — see Section 8) lives here and can be adjusted at any time, including after results are shown, triggering a real regeneration in the new voice.
3. **Reveal interaction** — the user selects which lens(es) to focus on (1, 2, or all 3) and a button/gesture reveals that lens's (or those lenses') content with animated connecting lines (drawn via Motion's SVG path animation) linking the center image to the selected lens(es).
4. **Synthesis, scoped to selection** — Common Themes, Divergent Interpretations, and Reflection Questions are computed **based on whichever lens(es) are currently selected**:
   - **3 lenses selected:** full three-way comparison (as originally scoped).
   - **2 lenses selected:** synthesis narrows to just those two.
   - **1 lens selected:** "Common Themes" and "Divergent Interpretations" don't apply (nothing to compare) — this state instead shows a focused single-lens reflection framing, still ending in Reflection Questions.
5. User can copy the current view's results, adjust the tone control (triggering fresh regeneration), change lens selection at any time, or start over with a new dream.

## 5. Product Principles (non-negotiable)

- **Present possibilities, not facts.** Every card should read as "a psychologist might see..." not "this means..."
- **Never claim a single correct interpretation.** No lens is presented as more authoritative than another.
- **Encourage reflection over certainty.** Reflection Questions are a required output in every selection state.
- **No privileging of one religion/belief system** in the Symbolism & Cultural lens — present a spread rather than one framework as default.
- **Feel more delightful than pasting a dream into a generic chatbot.** The guided journey, the animated constellation/reveal, the lens-filtering interaction, and the tone control are what justify this being a product rather than a prompt.
- **Every generation is a genuine, live LLM call.** No pre-written or canned interpretations, no fake/sample dataset — every dream, every tone setting, and every lens-selection synthesis is generated fresh, on request.

## 6. MVP Scope

**Include:**
- Entry screen: single dream text input
- Constellation screen: central image + three lenses in a triangular (desktop/tablet) or stacked (mobile) layout
- Tone control: **Reflective ↔ Playful** (two-state, not a continuous gradient — see Section 8), adjustable at any time, triggers real regeneration
- Lens selection: user can choose 1, 2, or all 3 lenses to focus on
- Animated line-drawing reveal connecting the center image to selected lens(es)
- Synthesis that adapts to lens selection (Common Themes + Divergent Interpretations for 2-3 lenses; Reflection-only framing for 1 lens)
- Reflection Questions in every state
- Copy current results to clipboard
- Responsive layout: triangular/radial on tablet+, gracefully collapsed to vertical on mobile
- Graceful handling of LLM rate-limit errors (see Section 8) — a friendly in-app message, never a raw error or broken state

**Explicitly out of scope for MVP:**
- User accounts / login
- Saved dream journals or dream history across sessions
- Follow-up AI chat / conversational refinement
- RAG or retrieval over any external knowledge base
- Vector databases
- Long-term memory of any kind across sessions
- Social sharing
- AI image generation

## 7. Design Goals

The experience should feel:
- **Thoughtful** — spacing, pacing, and copy that don't rush the user to an answer.
- **Curious** — inviting exploration and slicing, not interrogation.
- **Inviting** — low-friction entry; the entry screen is as simple as a search box.
- **Slightly magical** — carried primarily by the constellation reveal, the animated connecting lines, and the tone-driven regeneration ritual.
- **Reflective rather than predictive** — visual and verbal tone should never imply certainty or prophecy.

## 8. Technical Approach

Priority for this project is **maximum delight and a legitimate-feeling, fully live experience**, at zero real-world cost, with implementation simplicity as the tie-breaker. This is a prompting-driven build, so the stack favors what an AI pair-programmer can generate well.

### Frontend
- **React, scaffolded via Vite.** Chosen over Vue for its deeper animation/component ecosystem — the largest pool of polished "delightful micro-interaction" examples exists in React, which matters directly for a prompting-driven build.
- **Styling: Tailwind CSS**, built around a **gemstone color palette** (see [`visual-design-direction.md`](./.copilot/context/visual-design-direction.md)) — Amethyst (Psychology), Sapphire (Neuroscience), Citrine/Emerald (Symbolism & Culture), with Obsidian/Onyx (Reflective) and Rose Quartz/Citrine (Playful) tone states.
- **Animation: Motion** (formerly Framer Motion) — powers the screen-to-screen journey transitions (`AnimatePresence`), the constellation reveal, and the SVG line-drawing animations connecting the center image to selected lenses.
- **No router** — the multi-step journey is built as in-app view state, not separate routes/pages.

### Tone control (simplified to two states)
The tone control is **Reflective ↔ Playful**, a two-state toggle-style control (not a three-preset gradient as earlier drafted) that can be adjusted **at any time, including after results are showing** — moving it triggers a genuine new LLM generation in the new voice (not a cosmetic-only re-theme). A brief "reimagining..." transition covers the regeneration request, framed as part of the ritual rather than a loading spinner.

### Lens filtering & synthesis recomputation
When the user changes their lens selection (1, 2, or 3 lenses), the synthesis section is recomputed for that specific selection. This does **not** require re-interpreting the dream from scratch — the three lens interpretations are generated once per tone setting, and a lighter follow-up request computes the Common Themes/Divergent Interpretations/Reflection Questions for whichever subset is currently selected. A 1-lens selection swaps the synthesis layout to a focused single-lens reflection (no "common/divergent" framing, since there's nothing to compare).

### Generation & grounding
- **LLM: Google Gemini (Flash or Flash-Lite)**, accessed via a personal, free-tier API key (Google AI Studio) stored **only** as a server-side Vercel environment variable — never exposed to the browser, never a Slalom resource, and free at this project's expected usage volume.
- A single serverless function (`api/interpret.js`) handles the primary 3-lens generation; a second, lighter function or code path (`api/synthesize.js` or a mode flag on the same endpoint) handles synthesis recomputation for a given lens subset.
- **Grounding, without RAG:** every request includes a small, fixed **Knowledge Primer** (see [`ai-generation-approach.md`](./.copilot/context/ai-generation-approach.md)) — a curated list of well-established, named frameworks per lens. Static context, not retrieval — no embeddings, no vector database.
- **Determinism controls:** moderate-low temperature, required structured JSON output schema.
- **No database.** Nothing is persisted; everything lives in the current browser session.

### Rate-limit resilience (new — required for MVP)
Gemini's free tier has real per-minute and per-day request caps. The serverless function must handle `429` (rate-limit) responses gracefully:
- Retry once or twice with a short exponential backoff before giving up.
- If still rate-limited, return a friendly, on-brand message to the frontend (e.g., "Lots of dreams being interpreted right now — try again in a moment") rather than a raw error or blank state.
- This is a functional MVP requirement, not a nice-to-have — reviewers and any wider audience (see Deployment below) should never see a broken demo.

### Deployment & access control
- **Deployment:** Vercel Hobby (free) plan, per Protogen convention.
- **Access control: Vercel Authentication with a Shareable Link** — not a manually distributed password. The deployment stays gated behind Vercel's built-in authentication; a Shareable Link (generated from the Vercel dashboard) is what gets included in the case study submission, giving reviewers (and, if desired, a wider Slalom/Protoverse audience) direct access without any manual password exchange or repo-access request.
- No client- or Slalom-specific information is included anywhere in the build, per Protogen guidance. The Gemini API key is personal, not a Slalom-billed resource.

> **A note on deviating from Protogen 200's taught stack (Vue):** Protogen 200 teaches Vue. This project deliberately uses React instead — a documented, conscious choice — to prioritize a richer, more delightful animated experience. The underlying skill being demonstrated (planning a build, working with a component-based framework, managing an AI-assisted workflow) transfers regardless of framework.

## 9. Success Criteria (how this brief should be graded against the build)

- A first-time visitor can understand what to do within seconds, without instructions.
- The journey from entry → constellation → reveal → synthesis feels like a guided experience, not a form submission.
- Submitting a dream reliably produces all three lenses, and the synthesis correctly recomputes when the user changes their lens selection (1, 2, or 3 lenses).
- Nowhere in the product does the copy assert a dream's "true" meaning.
- The Symbolism & Culture lens visibly draws from more than one cultural/mythological tradition per response.
- The tone control visibly changes voice and triggers a real, fresh regeneration — not just a cosmetic swap.
- If the LLM is rate-limited, the user sees a graceful, on-brand message — never a raw error or broken UI.
- Copy-to-clipboard captures the current view's results in a clean, shareable text format.
- The deployed site is reachable via a Vercel Shareable Link, with no manual password to distribute.
- The build is a component-based React app, with the framework deviation from Protogen 200 documented above.
