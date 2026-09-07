# Nice-to-Have Features — Dream Reflection

These are explicitly **not** part of MVP. If you build any of these, update `BRIEF.md`'s scope section to reflect the change.

## Near-term, low-risk additions (could reasonably follow MVP)

- **True continuous tone gradient** instead of a two-state Reflective/Playful toggle. Would require real-time interpolation between voice styles and visual states — meaningfully harder than the two-state approach used in MVP. Worth revisiting only if two states feel limiting in practice.
- **Adjustable card order / pinning a favorite lens.** Small UI enhancement, doesn't conflict with any boundary.
- **A "surprise me" example dream** for users who want to see the product work before committing their own dream.
- **Downloadable/shareable image card** of the current view's results (a templated visual layout of existing text, not new AI-generated imagery — that stays out of scope).
- **Per-IP or session-based rate limiting** on top of the Gemini-level backoff, if Protoverse exposure ever becomes sustained/heavy rather than a one-time share.

## Bigger swings (would require real scoping/discussion before building)

- **Saving/comparing multiple dreams in one session** — brushes up against "no dream history," would need explicit re-scoping.
- **Localization / multi-language support** for both input and generated output.
- **A genuine RAG layer** — embedding real excerpts from psychology texts, sleep science papers, and folklore/cultural references, then retrieving the most relevant ones per dream at request time. Would be a legitimate upgrade in rigor over the static Knowledge Primer used in MVP, but requires real infrastructure (embeddings, a vector database, retrieval tuning).
- **Upgrading from Gemini free tier to a paid tier or different provider**, if usage (e.g., from wider Protoverse sharing) ever approaches free-tier limits regularly rather than occasionally.

## Deliberately excluded, not just deferred

These aren't "later" — they're **out of scope by product principle**:

- User accounts, saved journals, dream history — the product's value is in a single reflective session, not a longitudinal record.
- Follow-up AI chat — would shift the product from "structured, filterable comparison" to "open-ended chatbot," undermining the core differentiator.
- Full RAG / vector databases / long-term memory — unnecessary complexity for this scope. (Note: the app does use a small, fixed "Knowledge Primer" included in every prompt for grounding — see `ai-generation-approach.md` — but this is static context, not retrieval.)
- Social sharing — dreams are personal; building in sharing mechanics could pressure users toward performative rather than reflective use.
- AI image generation — out of scope per the brief; the central "constellation" image should be a static/pre-designed asset, not AI-generated per dream.
