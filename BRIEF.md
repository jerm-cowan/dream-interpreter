# Project Brief: Dream Interpreter

## 1. Summary

**Dream Interpreter** is a single-session, mobile-first web app that helps someone explore what a memorable dream might mean — not by giving them one "correct" answer, but by showing them three different lenses (psychology, neuroscience, and symbolism/culture) side by side, then surfacing where those lenses agree, where they diverge, and what questions might be worth sitting with afterward.

This is a **Protogen P303 (Mobile Experience) case study**. The scenario is self-defined (wellness/self-reflection) rather than pulled from the standard industry table, which the case study instructions explicitly allow. The build should feel like a real, scoped client engagement in the personal wellness/reflection space — not a generic template with a dream theme bolted on.

> **Non-goal, stated up front:** This is not a scientific or diagnostic tool. It does not claim to know what a dream "really" means. Every surface in the product should reinforce that these are *possible* interpretations to explore, not facts to accept.

## 2. Core User

Someone who:
- Had a memorable dream (their own, or one they heard about) that's stuck with them.
- Is curious what it might mean, but isn't looking for a definitive verdict.
- Enjoys reflection and self-discovery as an activity in itself.
- Wants to compare viewpoints rather than be handed a single answer.

They are most likely opening this on their phone — right after waking up, on a commute, or while telling a friend about the dream — which is why this is scoped as a mobile-first experience, not a desktop dashboard.

## 3. Core Value Proposition

Most dream interpretation tools (apps, chatbots, "dream dictionaries") give a single, confident-sounding explanation. **Dream Interpreter instead helps users compare multiple ways of understanding the same dream and decide which perspective(s) resonate with them.** The comparison itself — not any single answer — is the product.

## 4. Core Workflow

1. User enters a free-text dream description.
2. User optionally adjusts a tone slider between **Reflective ↔ Playful**, which changes both the voice/register of the generated content AND the visual theme of the whole experience (see Section 8 — this is a deliberate, signature interaction, not a cosmetic afterthought).
3. The app generates **three interpretation cards**:
   - **Psychology Lens** — how a psychologist might read the dream: emotions, experiences, relationships, desires, fears, subconscious themes.
   - **Neuroscience Lens** — how sleep science might explain aspects of it: memory consolidation, stress processing, emotional regulation, cognition during sleep.
   - **Symbolism & Cultural Interpretation Lens** — common symbolic meanings drawn from mythology, folklore, storytelling traditions, and spiritual/cultural perspectives. This lens must present **multiple** possible readings and must not privilege any single religion or belief system.
4. The app generates a synthesis layer beneath the three cards:
   - **Common Themes** — where the three lenses point in a similar direction.
   - **Divergent Interpretations** — where the lenses meaningfully disagree or emphasize different things.
   - **Reflection Questions** — open-ended prompts that invite the user to sit with the dream rather than close the loop.
5. User leaves with a richer, multi-framework understanding of their dream — and the ability to copy the full result to keep for themselves.

## 5. Product Principles (non-negotiable)

- **Present possibilities, not facts.** Every card should read as "a psychologist might see..." not "this means..."
- **Never claim a single correct interpretation.** No lens is presented as more authoritative than another.
- **Encourage reflection over certainty.** Reflection Questions are a required output, not an optional nice-to-have.
- **No privileging of one religion/belief system** in the Symbolism & Cultural lens — present a spread (e.g., multiple mythological/cultural traditions) rather than one framework as default.
- **Feel more delightful than pasting a dream into a generic chatbot.** The structured cards, the tone slider's whole-experience theme shift, and the synthesis layer are what justify this being a product rather than a prompt.

## 6. MVP Scope

**Include:**
- Single dream text input
- Tone slider (Reflective ↔ Playful) that shifts both generated voice AND overall visual theme
- Three interpretation cards (Psychology, Neuroscience, Symbolism & Culture)
- Common Themes section
- Reflection Questions section
- Copy results (to clipboard) — single action, no formatting decisions required of the user
- Responsive, mobile-first design that also holds up on tablet/desktop

**Explicitly out of scope for MVP:**
- User accounts / login
- Saved dream journals or dream history
- Follow-up AI chat / conversational refinement
- RAG or retrieval over any external knowledge base
- Vector databases
- Long-term memory of any kind across sessions
- Social sharing
- AI image generation

Anything above should be treated as a hard boundary during the build, not just a soft suggestion — a reviewer checking this brief against the build should find no stray login screen, history tab, or chat box.

## 7. Design Goals

The experience should feel:
- **Thoughtful** — spacing, pacing, and copy that don't rush the user to an answer.
- **Curious** — inviting exploration, not interrogation.
- **Inviting** — low-friction entry; no forms or setup before the user can just start typing.
- **Slightly magical** — the tone slider's live visual theme shift is the primary vehicle for this; see Section 8.
- **Reflective rather than predictive** — visual and verbal tone should never imply certainty or prophecy.

## 8. Technical Approach

Priority for this project is **maximum delight and a legitimate-feeling, fully live experience**, with implementation simplicity as the tie-breaker whenever two approaches deliver similar delight. This is a prompting-driven build (not a hand-coding learning exercise), so the stack is chosen to maximize what an AI pair-programmer can generate well.

- **Frontend: React, scaffolded via Vite.** React was chosen over Vue specifically because its animation/component ecosystem is the deepest of any current framework — the largest pool of polished, "delightful micro-interaction" examples exists in React, which matters directly for a prompting-driven build where Copilot's output quality depends on what it's seen before. No router needed (single-screen experience).
- **Styling: Tailwind CSS.** Utility-first styling makes it straightforward to define multiple complete visual themes (color palette, spacing, type) and swap between them based on slider state, without hand-maintaining separate stylesheets per theme.
- **Animation: Motion (formerly Framer Motion).** React-native animation library, purpose-built for exactly this kind of interaction: UI elements easing into a new visual state as application state changes. Used for the tone slider's theme-shift transition and the card "reveal" moment.
- **The signature interaction — tone slider theme shift:** The slider is the interaction (tactile, continuous-feeling drag), but under the hood it snaps to a small number of discrete theme presets (e.g., Reflective / Balanced / Playful — see [`visual-design-direction.md`](./.copilot/context/visual-design-direction.md) for what changes per preset). When the user crosses a threshold, Motion eases the whole UI (background, accents, type treatment) into the new preset over a short, smooth transition — not a harsh instant swap, but not complex real-time color-blending math either. This keeps the "gradual, magical shift" feeling while staying simple to build and reason about.
- **Generation:** A single serverless function (e.g., a Vercel API route) that takes the dream text + tone setting and calls an LLM **once per request, live, for any input** — never pre-written or templated — to generate all three lenses + synthesis in one structured response (JSON with `psychology`, `neuroscience`, `symbolism`, `commonThemes`, `divergentInterpretations`, `reflectionQuestions` keys). One call in, one structured result out — no chained calls, no chat state, no persistence.
- **Grounding, without RAG.** To reduce hallucination and make interpretations feel legitimate, the function includes a small, fixed **Knowledge Primer** (see [`ai-generation-approach.md`](./.copilot/context/ai-generation-approach.md)) in every prompt — a curated list of well-established, named frameworks per lens. This is *static context*, not retrieval: no embeddings, no vector database, no semantic search.
- **Determinism controls.** A moderate-low temperature setting plus a required structured output schema keep responses consistent in format and less prone to invented specifics (fake studies, fake researcher names), while still generating genuinely fresh content for whatever dream is entered.
- **No database.** Nothing needs to be stored; the result lives in the browser session only, and "copy results" is just a clipboard write of the rendered content.
- **Deployment:** Vercel, per Protogen convention (educational use only, per program guidance).

> **A note on deviating from Protogen 200's taught stack (Vue):** Protogen 200 teaches Vue as the component framework. This project deliberately uses React instead, as a conscious, documented choice — not an oversight — because this case study prioritizes a maximally delightful, animation-rich experience over reinforcing the exact framework taught in P200. The underlying skill being demonstrated (planning a build, working with a component-based framework, managing an AI-assisted workflow) transfers regardless of which framework is used.

## 9. Success Criteria (how this brief should be graded against the build)

- A first-time visitor can understand what to do within seconds, without instructions.
- Submitting a dream reliably produces all three lenses + all three synthesis sections in a readable, mobile-friendly layout.
- Nowhere in the product does the copy assert a dream's "true" meaning.
- The Symbolism & Culture lens visibly draws from more than one cultural/mythological tradition per response.
- The tone slider visibly and smoothly shifts both the generated voice AND the visual theme of the app — this is the signature delight moment and should feel polished, not glitchy.
- Copy-to-clipboard captures the full result in a clean, shareable text format.
- The build is a component-based React app (not a single flat HTML file), with the framework deviation from Protogen 200 documented above.
