// Shared Gemini client + retry/backoff logic used by both interpret.js and synthesize.js.
// Prefixed with `_` so Vercel treats it as a helper module, not a routable function.

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const RETRYABLE_STATUSES = new Set([429, 503]); // 429 = rate limit; 503 = free-tier "high demand" (observed in practice)

export const RATE_LIMIT_RESPONSE = {
  error: 'rate_limited',
  message: 'Lots of dreams being interpreted right now — try again in a moment.',
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Upstream Gemini calls have no built-in timeout — under load a connection can hang indefinitely
// with no error and no response, which would otherwise never reach the retry/friendly-error path.
const REQUEST_TIMEOUT_MS = 20000;

async function requestGemini(systemPrompt, userPrompt, schema, temperature) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature,
          responseMimeType: 'application/json',
          responseSchema: schema,
        },
      }),
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      const timeoutError = new Error('Gemini request timed out');
      timeoutError.status = 503; // treat as retryable "high demand" per RETRYABLE_STATUSES
      throw timeoutError;
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const errText = await response.text();
    const error = new Error(`Gemini API error ${response.status}: ${errText}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini response missing expected text content');

  return JSON.parse(text);
}

// Retries transient rate-limit/overload failures before surfacing a friendly error to the caller.
export async function callGemini(systemPrompt, userPrompt, schema, temperature = 0.5) {
  const delaysMs = [1000, 2500];

  for (let attempt = 0; ; attempt++) {
    try {
      return await requestGemini(systemPrompt, userPrompt, schema, temperature);
    } catch (err) {
      const isRetryable = RETRYABLE_STATUSES.has(err.status);
      if (!isRetryable || attempt >= delaysMs.length) throw err;
      await sleep(delaysMs[attempt]);
    }
  }
}

export function isRateLimitError(err) {
  return RETRYABLE_STATUSES.has(err.status);
}
