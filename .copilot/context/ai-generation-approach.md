# AI Generation Approach — Dream Reflection

This doc exists to answer one question precisely, so Copilot (and future-you) never has to guess: **how does this app generate a legitimate-feeling interpretation for literally any dream, without pre-written templates, and without building full RAG/a vector database?**

## The core idea: a Static Knowledge Primer (not RAG)

RAG (Retrieval-Augmented Generation) works by searching a knowledge base at request time and pulling back the most relevant snippets — that requires embeddings and a vector database, which is explicitly out of scope for this project.

Instead, this app uses a much simpler pattern: a **short, fixed reference document** (below) listing well-established, *named* frameworks for each lens. That entire document is included in **every single prompt**, regardless of what dream was entered. There is no search step and nothing to retrieve — it's just always-there context, like giving the model a cheat sheet before every answer.

| | RAG | Static Knowledge Primer (this project) |
|---|---|---|
| Handles any dream input | ✅ | ✅ |
| Needs embeddings / vector DB | ✅ Yes | ❌ No |
| Content included per request | Only the top-matching snippets | The entire primer, every time |
| Complexity to build | High | Low — it's one more block of text in the prompt |

This is why it satisfies your original "no RAG, no vector DB" boundary while still giving every response something real to lean on instead of pure improvisation.

## The Knowledge Primer

This is draft content to include verbatim in the system prompt sent to the LLM. It intentionally names *frameworks and traditions*, never specific studies, papers, or researchers — see the hallucination-mitigation rule below for why.

### Psychology Lens — established frameworks to draw from
- **Psychoanalytic / Freudian:** dreams as wish fulfillment; manifest content (what's remembered) vs. latent content (underlying meaning).
- **Jungian / archetypal:** the collective unconscious, archetypes (the Shadow, the Self, the Anima/Animus), dreams as part of individuation.
- **Continuity hypothesis (cognitive psychology):** dreams as a continuation of waking-life concerns, relationships, and "day residue."
- **Gestalt approach:** every person, object, and setting in the dream can be read as reflecting some part of the dreamer.
- **Emotion-processing / relational themes:** dreams as a space where unresolved feelings about relationships, stress, or fears get played out.

### Neuroscience Lens — established frameworks to draw from
- **Activation-synthesis hypothesis:** the brain generates dream content by synthesizing a story out of essentially random neural activity during REM sleep.
- **Threat simulation theory:** dreaming as an evolved rehearsal space for practicing responses to threats.
- **Memory consolidation theory:** REM sleep's role in moving and integrating memories between short-term and long-term storage.
- **Emotional regulation ("overnight therapy"):** REM sleep's role in processing and lowering the emotional charge of the day's experiences.
- **Default mode network activity:** links between dreaming and the brain's baseline "mind-wandering" network.

### Symbolism & Cultural Interpretation Lens — traditions to draw from (rotate/vary; never default to only one)
- Jungian archetypal symbolism (already distinct from the Psychology lens's clinical framing — here, treated as *symbolic/mythic* language)
- Greek and Roman mythology
- Norse/Germanic folklore
- Chinese dream lore and traditional interpretation practices
- Islamic dream interpretation tradition (*ta'bir*), historically a rich and systematic field
- Biblical/Abrahamic dream symbolism (e.g., prophetic dreams), presented as one tradition among several, never as the default
- Indigenous and folk storytelling traditions, described respectfully and in general terms rather than claiming authority over any specific living tradition

**Rule for this lens specifically:** every response must draw from **at least two different traditions**, and must never present any single one as more "correct" than another — this directly enforces the Product Principle of not privileging one belief system.

## Prompt rules that reduce hallucination

Build these directly into the system prompt sent to the LLM:

1. **Never cite specific studies, papers, researchers, or years.** Speak only in terms of the named frameworks/traditions above (e.g., "Jungian psychology suggests..." not "a 2019 study by Dr. X found..."). This single rule removes the highest-risk category of fabrication.
2. **Never assert a dream's meaning as fact.** Every sentence should read as a possibility ("might reflect," "one way to read this is") — this is a content-quality rule, not just a tone preference.
3. **Require structured output** (a fixed JSON schema with keys for each card and each synthesis section). Structured output keeps the model from wandering off-format and makes the React components simple to render.
4. **Use a moderate-low temperature** (e.g., ~0.4–0.6 depending on the provider's scale). Low enough for consistency and to reduce invented specifics; high enough that responses don't feel robotic or repetitive across different dreams.
5. **Symbolism lens must reference 2+ traditions per response** (see rule above) — enforce this explicitly in the prompt instructions, not just hope for it.
6. **The tone setting affects voice only**, never which frameworks/traditions are surfaced — the underlying interpretation should be the same regardless of where the slider sits; only the wording changes.

## What this means in practice for the Generation Logic phase

When you get to the generation logic phase in `development-phases.md`, the prompt you give Copilot should reference this document directly, e.g.:

> "Using `#file:ai-generation-approach.md`, build the serverless function that sends the dream text, tone setting, and the Knowledge Primer to \[your chosen LLM API] as a system prompt, and requests structured JSON output matching the schema in BRIEF.md."

You don't need to pick a specific LLM provider right now — OpenAI's and Anthropic's APIs both support structured/JSON output and adjustable temperature, and either works fine for this pattern. That's an implementation detail, not a scope decision.

## Future upgrade path (not MVP)

If you ever wanted to go further than this POC, a genuine RAG layer (e.g., embedding real excerpts from psychology texts, sleep science papers, and folklore references, then retrieving the most relevant ones per dream) would be the natural next step up in rigor. That's real added complexity and infrastructure, though — worth listing in `nice-to-haves.md` as a "bigger swing," not something to pull into this build.
