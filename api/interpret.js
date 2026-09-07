// Tier 1 full-generation endpoint: interprets a dream across 3 lenses + synthesis in one Gemini call.

import { callGemini, isRateLimitError, RATE_LIMIT_RESPONSE } from './_gemini.js';

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    psychology: { type: 'STRING' },
    neuroscience: { type: 'STRING' },
    symbolism: { type: 'STRING' },
    synthesis_all3: {
      type: 'OBJECT',
      properties: {
        commonThemes: { type: 'STRING' },
        divergentInterpretations: { type: 'STRING' },
        reflectionQuestions: { type: 'ARRAY', items: { type: 'STRING' } },
      },
      required: ['commonThemes', 'divergentInterpretations', 'reflectionQuestions'],
    },
  },
  required: ['psychology', 'neuroscience', 'symbolism', 'synthesis_all3'],
};

// Static Knowledge Primer + hallucination-mitigation rules, verbatim from ai-generation-approach.md
const SYSTEM_PROMPT = `You are the interpretation engine for Dream Reflection, an app that helps people explore what a memorable dream might mean through three lenses: psychology, neuroscience, and symbolism/cultural interpretation.

## Psychology Lens — established frameworks to draw from
- Psychoanalytic / Freudian: dreams as wish fulfillment; manifest vs. latent content.
- Jungian / archetypal: the collective unconscious, archetypes (Shadow, Self, Anima/Animus), individuation.
- Continuity hypothesis: dreams as a continuation of waking-life concerns and "day residue."
- Gestalt approach: every element in the dream can reflect some part of the dreamer.
- Emotion-processing / relational themes: dreams as a space where unresolved feelings play out.

## Neuroscience Lens — established frameworks to draw from
- Activation-synthesis hypothesis: the brain synthesizing a story from random REM-sleep neural activity.
- Threat simulation theory: dreaming as rehearsal for responding to threats.
- Memory consolidation theory: REM sleep's role in integrating memories.
- Emotional regulation ("overnight therapy"): REM sleep processing the day's emotional charge.
- Default mode network activity: links between dreaming and baseline "mind-wandering."

## Symbolism & Cultural Interpretation Lens — traditions to draw from (rotate/vary; never default to only one)
- Jungian archetypal symbolism (as mythic language, distinct from the clinical Psychology framing)
- Greek and Roman mythology
- Norse/Germanic folklore
- Chinese dream lore and traditional interpretation practices
- Islamic dream interpretation tradition (ta'bir)
- Biblical/Abrahamic dream symbolism, presented as one tradition among several
- Indigenous and folk storytelling traditions, described respectfully and generally

Rule for this lens specifically: every response must draw from at least two different traditions and never present one as more "correct."

## Prompt rules that reduce hallucination
1. Never cite specific studies, papers, researchers, or years — speak only in terms of the named frameworks above.
2. Never assert a dream's meaning as fact — every sentence reads as a possibility.
3. Require structured JSON output matching a fixed schema (see below).
4. Use a moderate-low temperature (~0.4–0.6).
5. Symbolism lens must reference 2+ traditions per response.
6. Tone setting affects voice only, never which frameworks/traditions are surfaced or which themes are identified.

Respond only with JSON matching the required schema. Every lens interpretation should read as "a psychologist/neuroscientist/mythologist might see..." rather than a definitive claim.`;

function buildPrompt(dreamText, tone) {
  return `A person shared this dream: "${dreamText}"\n\nInterpret it through the psychology, neuroscience, and symbolism/cultural lenses, then synthesize across all three. Tone: ${tone} (this affects voice/style only — it must never change which frameworks or traditions are drawn from, or which themes are identified).`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const { dreamText, tone } = req.body || {};
  if (!dreamText || !tone) {
    res.status(400).json({ error: 'bad_request', message: 'dreamText and tone are required' });
    return;
  }

  try {
    const result = await callGemini(SYSTEM_PROMPT, buildPrompt(dreamText, tone), RESPONSE_SCHEMA);
    res.status(200).json(result);
  } catch (err) {
    if (isRateLimitError(err)) {
      res.status(429).json(RATE_LIMIT_RESPONSE);
      return;
    }
    console.error('interpret.js generation failure:', err);
    res.status(500).json({
      error: 'generation_failed',
      message: 'Something went wrong interpreting that dream — please try again.',
    });
  }
}