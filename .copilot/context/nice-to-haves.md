# Nice-to-Have Features — Dream Reflection

These are explicitly **not** part of MVP. They're recorded here so future-you (or a reviewer reading the repo) understands they were considered and deliberately deferred, not forgotten. If you build any of these, update `BRIEF.md`'s scope section to reflect the change — don't let this doc drift from what's actually built.

## Near-term, low-risk additions (could reasonably follow MVP)

- **Regenerate a single lens.** Let the user re-roll just the Symbolism card, for example, without regenerating everything — useful if one lens felt flat but the others landed. Low complexity, doesn't violate any "do not include" boundary.
- **True continuous color-blending on the tone slider**, instead of snapping between discrete presets. This would be a genuine visual upgrade, but requires real-time color interpolation logic — meaningfully harder to build and tune than the preset-snap approach used in MVP. Worth revisiting only if the preset-snap version feels too abrupt in practice.
- **Adjustable card order / pinning a favorite lens to the top.** Small UI enhancement, no new AI capability required.
- **A "surprise me" example dream** for users who want to see the product work before committing their own dream.
- **Downloadable/shareable image card** of the result (a static, generated visual summary) — note this is different from "AI image generation," which is out of scope; this would be a templated visual layout of existing text, not new AI-generated imagery.

## Bigger swings (would require real scoping/discussion before building)

- **Multiple dreams in one session for comparison** (e.g., "compare this dream to one from last week") — this brushes up against "no dream history," so would need explicit re-scoping if pursued.
- **Adjustable lens selection** (let the user choose which 2 of N lenses to see) — interesting, but dilutes the core "three lenses, always" value proposition and would need its own brief.
- **Localization / multi-language support** for both input and generated output.

## Deliberately excluded, not just deferred

These aren't "later" — they're **out of scope by product principle**, not by sequencing, and shouldn't be treated as a roadmap:

- User accounts, saved journals, dream history — the product's value is in a single reflective moment, not a longitudinal record.
- Follow-up AI chat — would shift the product from "structured comparison" to "open-ended chatbot," undermining the core differentiator.
- Full RAG / vector databases / long-term memory — unnecessary complexity for a single-shot, stateless generation task. (Note: the app does use a small, fixed "Knowledge Primer" included in every prompt for grounding — see `ai-generation-approach.md` — but this is static context, not retrieval, and needs no embeddings or vector database.)
- Social sharing — dreams are personal; building in sharing mechanics could pressure users toward performative rather than reflective use.
- AI image generation — out of scope per the brief; if visual imagery is desired later, treat it as a distinct, separately-scoped feature with its own review of appropriateness (dream imagery can be sensitive).
