// Vercel Edge function — streams a Concept Correction Log entry.
// POST /api/log with JSON { stem, choices, picked, correct, system, ref }.
// Response is a text stream of markdown.

export const config = { runtime: 'edge' };

const ipHits = new Map();
const LIMIT = 30;
const WINDOW_MS = 24 * 60 * 60 * 1000;

function rateLimited(ip) {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= LIMIT) { ipHits.set(ip, hits); return true; }
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({ error: 'Server missing ANTHROPIC_API_KEY' }), { status: 500, headers: { 'content-type': 'application/json' } });

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Rate limit reached (30 entries / day). Email sifrandcompany@gmail.com to lift.' }), { status: 429, headers: { 'content-type': 'application/json' } });
  }

  let d = {};
  try { d = await req.json(); } catch {}

  // Compute revisit date = today + 48h, formatted as e.g. "Friday, 22 May"
  const revisit = new Date(Date.now() + 48 * 60 * 60 * 1000);
  const revisitStr = revisit.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  const systemPrompt = `You are an academic coach at Bit by Bit Pedagogy. You write Concept Correction Log entries in our exact Master Pivot format.

OUTPUT MARKDOWN ONLY. No code fences. No HTML tags. Be tight — this is a log, not an essay.

Use exactly this structure:

## [Topic / system tag] — [one-line diagnosis label]
**Reference:** [ref or "—"]
**You picked:** [letter — diagnosis name] &nbsp;·&nbsp; **Correct:** [letter — diagnosis name]

### Pivot Word
> [The single phrase from the stem that decides the answer, quoted directly.]

One sentence explaining why this phrase is the pivot — what it rules in and what it rules out.

### Why Each Wrong Answer Was Wrong
- **A. [name]** — [one sentence: the specific reason, not a generic "wrong because it's a different disease".]
- **B. [name]** — [same]
- **C. [name]** — [same]
- **D. [name]** — [same]
- **E. [name]** — [same]
(Skip the correct answer here.)

### Concept Anchor
One sentence of mechanism. Not the fact restated — the physiological *reason* the fact is true. Specific to the pivot.

### Revisit
**${revisitStr}** — re-attempt without reading this entry first. If the anchor holds, mark done. If not, rewrite the anchor.

---

RULES:
- Quote the actual pivot phrase from the stem, in italics or as a blockquote.
- Each "why wrong" line must reference the stem, not just say "different disease".
- The anchor is one sentence. No more.
- If a field the student gave you is empty or unclear, infer the best you can, but never fabricate findings that aren't in the stem.`;

  const userMessage = `Build the log entry.

QUESTION REFERENCE: ${d.ref || '—'}
SYSTEM / TOPIC: ${d.system || '(infer from stem)'}

STEM:
${d.stem || '(none provided)'}

ANSWER CHOICES:
${d.choices || '(none provided)'}

STUDENT PICKED: ${d.picked || '?'}
CORRECT ANSWER: ${d.correct || '?'}

Write the log entry now in the exact format specified.`;

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      stream: true,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text();
    return new Response(JSON.stringify({ error: 'Upstream error', detail: errText }), { status: 502, headers: { 'content-type': 'application/json' } });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (!data || data === '[DONE]') continue;
            try {
              const j = JSON.parse(data);
              if (j.type === 'content_block_delta' && j.delta && j.delta.text) {
                controller.enqueue(encoder.encode(j.delta.text));
              }
            } catch {}
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
    },
  });
}
