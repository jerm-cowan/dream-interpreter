// Tier 2 synthesis-only recomputation: given already-generated lens text(s) + tone,
// computes Common Themes / Divergent Interpretations / Reflection Questions (or a
// single-lens reflection when only one lens is selected) without re-interpreting the dream.

import { callGemini, isRateLimitError, RATE_LIMIT_RESPONSE } from './_gemini.js';

const LENS_LABELS = {
  psychology: 'Psychology',
  neuroscience: 'Neuroscience',
  symbolism: 'Symbolism & Cultural Interpretation',
};

const MULTI_LENS_SCHEMA = {
  type: 'OBJECT',
  properties: {
    commonThemes: { type: 'STRING' },
    divergentInterpretations: { type: 'STRING' },
    reflectionQuestions: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: ['commonThemes', 'divergentInterpretations', 'reflectionQuestions'],
};

const SINGLE_LENS_SCHEMA = {
  type: 'OBJECT',
  properties: {
    singleLensReflection: { type: 'STRING' },
    reflectionQuestions: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: ['singleLensReflection', 'reflectionQuestions'],
};

const SYSTEM_PROMPT = `You are the synthesis engine for Dream Reflection, an app that helps people explore what a memorable dream might mean through multiple lenses: psychology, neuroscience, and symbolism/cultural interpretation.

You will be given interpretation text that has already been generated for one or more of these lenses, and asked to synthesize across only the lenses provided — never invent or assume content for a lens that wasn't given to you.

## Rules
1. Never cite specific studies, papers, researchers, or years.
2. Never assert a dream's meaning as fact — every sentence reads as a possibility.
3. Require structured JSON output matching the required schema.
4. Use a moderate-low temperature (~0.4–0.6).
5. Tone setting affects voice only, never which themes are identified or how many lenses are compared.
6. If two or three lens texts are provided, identify commonThemes (where the lenses converge) and divergentInterpretations (where they diverge or offer distinct angles), then close with reflectionQuestions.
7. If only one lens text is provided, there is nothing to compare — instead produce a singleLensReflection that distills that lens's interpretation into a focused reflective passage, then close with reflectionQuestions. Do not mention other lenses.

Respond only with JSON matching the required schema.`;

function buildPrompt(selectedLensTexts, tone, lensCount) {
  const sections = Object.entries(selectedLensTexts)
    .filter(([, text]) => !!text)
    .map(([lens, text]) => `### ${LENS_LABELS[lens] || lens}\n${text}`)
    .join('\n\n');

  const instruction =
    lensCount === 1
      ? 'Only one lens is selected. Produce a focused singleLensReflection (no comparison) and reflectionQuestions.'
      : `${lensCount} lenses are selected. Produce commonThemes and divergentInterpretations across exactly these ${lensCount} lens texts (not assuming any others exist), and reflectionQuestions.`;

  return `Here is the previously generated lens interpretation text for this dream:\n\n${sections}\n\n${instruction} Tone: ${tone} (this affects voice/style only — it must never change which themes are identified).`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const { selectedLensTexts, tone, lensCount } = req.body || {};

  const providedLenses = selectedLensTexts
    ? Object.entries(selectedLensTexts).filter(([, text]) => !!text)
    : [];

  if (!tone || !lensCount || providedLenses.length === 0) {
    res.status(400).json({
      error: 'bad_request',
      message: 'selectedLensTexts (at least one), tone, and lensCount are required',
    });
    return;
  }

  if (providedLenses.length !== lensCount) {
    res.status(400).json({
      error: 'bad_request',
      message: 'lensCount must match the number of non-empty entries in selectedLensTexts',
    });
    return;
  }

  const schema = lensCount === 1 ? SINGLE_LENS_SCHEMA : MULTI_LENS_SCHEMA;

  try {
    const result = await callGemini(SYSTEM_PROMPT, buildPrompt(selectedLensTexts, tone, lensCount), schema);
    res.status(200).json(result);
  } catch (err) {
    if (isRateLimitError(err)) {
      res.status(429).json(RATE_LIMIT_RESPONSE);
      return;
    }
    console.error('synthesize.js generation failure:', err);
    res.status(500).json({
      error: 'generation_failed',
      message: 'Something went wrong synthesizing that reflection — please try again.',
    });
  }
}
