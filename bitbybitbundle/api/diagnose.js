// Public diagnostic endpoint — short, cheap, streaming.
// POST /api/diagnose with the 10 quiz fields. Returns ~150-250 tokens of markdown.

export const config = { runtime: 'edge' };

const ipHits = new Map();
const LIMIT = 5;
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
    return new Response(JSON.stringify({ error: 'You have reached the daily diagnostic limit (5/day). Email hello@bitbybitpedagogy.com to talk.' }), { status: 429, headers: { 'content-type': 'application/json' } });
  }

  let d = {};
  try { d = await req.json(); } catch {}

  const systemPrompt = `You are a senior academic coach at Bit by Bit Pedagogy reading a 10-question diagnostic from a prospective student. Your job is to give an honest, short, personalised read on where they're stuck — not to write a full study plan.

OUTPUT MARKDOWN ONLY. No code fences. No HTML. Keep the whole thing under 250 words.

Use exactly this structure:

## The Read

One short paragraph (3–4 sentences) synthesising their situation. Address them in second person. Be direct and observant — quote one specific thing they told you. Do NOT be generic.

## Three Things Slowing You Down

1. **[Gap 1]** — one specific sentence naming the issue, tied to what they said.
2. **[Gap 2]** — same.
3. **[Gap 3]** — same.

## The Fastest Path Forward

One paragraph (3–4 sentences) describing what would change first if you worked together. Reference the Bit by Bit approach (the Master Pivot, the Concept Correction Log, fixed wake time, two-week phases) where it lands naturally — but don't list our method. Make it about them.

Do NOT include a "book a session" CTA — the page already has one. Just end on the fastest-path paragraph.

VOICE: direct, warm, slightly clinical. No emoji. No hype. No "amazing", "incredible", "you've got this". Sound like a coach who has read 500 of these.`;

  const userMessage = `Diagnose this student's prep based on their 10-question intake:

Exam: ${d.exam || 'unspecified'}
Weeks until test: ${d.weeks || 'unspecified'}
Most recent NBME/SA: ${d.nbme || 'none reported'}
UWorld %: ${d.uworld || 'unspecified'}
Daily study hours: ${d.hours || 'unspecified'}
Hours of sleep: ${d.sleep || 'unspecified'}
Wake time consistency: ${d.wake || 'unspecified'}
Biggest current blocker (their words): ${d.blocker || 'unspecified'}
Weakest system: ${d.weakness || 'unspecified'}
What's at stake: ${d.stake || 'unspecified'}

Write the diagnosis now.`;

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 700,
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
