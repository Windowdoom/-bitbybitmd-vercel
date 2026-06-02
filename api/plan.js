// Vercel Edge function - streams the Bit by Bit blueprint as plain-text chunks.
// POST /api/plan with JSON body. Response is a text stream (not JSON).
// Includes a simple per-IP rate limit (3 blueprints / 24h / instance).

export const config = { runtime: 'edge' };

const ipHits = new Map();
const LIMIT = 3;
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
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server missing ANTHROPIC_API_KEY' }), {
      status: 500, headers: { 'content-type': 'application/json' },
    });
  }

  // Admin-only - full blueprint generation is gated behind a shared token.
  // Trim both sides so a stray space/newline in the Vercel env var or the
  // pasted token doesn't cause a confusing mismatch.
  const adminToken = (process.env.PLAN_ADMIN_TOKEN || '').trim();
  const provided = (req.headers.get('x-admin-token') || '').trim();
  if (!adminToken) {
    // The server itself has no token configured - this is a setup problem,
    // not a wrong password. Say so plainly so it's obvious where to fix it.
    return new Response(JSON.stringify({
      error: 'Server is missing PLAN_ADMIN_TOKEN. Set it in Vercel > Project > Settings > Environment Variables for this environment, then redeploy.',
    }), { status: 503, headers: { 'content-type': 'application/json' } });
  }
  if (provided !== adminToken) {
    return new Response(JSON.stringify({
      error: 'Unauthorised. The full blueprint generator is for Bit by Bit coaches only. Take the public diagnostic at /plan.html instead.',
    }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return new Response(JSON.stringify({
      error: 'Rate limit reached on this instance. Wait or retry.',
    }), { status: 429, headers: { 'content-type': 'application/json' } });
  }

  let d = {};
  try { d = await req.json(); } catch {}

  const systemPrompt = `You are a tutor and academic coach for Bit by Bit Pedagogy, a USMLE and CBSSE prep coaching service. You write personalised study blueprints for medical students. You sound like a tutor who has sat this exam and built this system from the trenches.

PHILOSOPHY (apply to everything you generate):
- This is a supplemental methodology framework, not a content resource. It works with any qbank: UWorld, AMBOSS, Mehlman, Kaplan, Bootcamp, Boards & Beyond.
- The student has completed M1 and M2. Capability is proven. The question is HOW and WHAT, never IF. Never frame the student as deficient. Their score is data, not identity.
- By test day the methodology should be a mental map, not a reference document.
- All writing: direct, warm, observant, second person. Address the student by name throughout. Quote their own exact words back to them where it lands. Validate right instincts; gently redirect wrong ones.
- No AI-sounding language. No "Furthermore", "Moreover", "It is worth noting", "as an AI". No filler transitions. No emoji.

OUTPUT FORMAT:
- A single long-form markdown document. NEVER use code fences (no \`\`\` of any kind). NEVER output raw HTML tags except &nbsp;.
- NO TABLES anywhere. Use bullet lists and bold-led lines instead.
- NO EM DASHES anywhere. Use a hyphen with spaces, a colon, or restructure.

SCORING MATH (apply silently; surface only what helps the student plan):
- CBSSE/COMP: NBME produces ~15 CBSSA forms numbered 21 to 33. Forms 26 to 33 are current; 21 to 25 remain valid for longer prep windows. Never assign Form 34 or higher (does not exist). No Free 120 for CBSSE/COMP students. 200 questions total, 4 blocks of 50, ~60 min per block.
- USMLE Step 1 (US-MD): add Free 120 years 2018, 2021, 2024, 2026 alongside NBME self-assessment forms. 280 questions, 20 per block, 30 min per block - a different, shorter-block stamina profile. Train pacing for the format actually being sat.
- Expected EPC gain per form with full autopsy methodology: 1 to 2 points. 13 to 15 forms x ~1pt = 13 to 15pt gain; x 2 to 3pt = 26 to 35pt gain. Gains are front-loaded: early forms with big gaps yield larger jumps. Do not rush; 1 to 2 EPC points per form is the target.
- FORM SPACING by window: 8 weeks = 4-day loop (Day 1 form, Days 2 to 3 autopsy + targeted Qs, Day 4 next form), use Forms 26 to 33. 10 weeks = 5 to 6 days between forms, Forms 23 to 33. 12 weeks = 6 to 7 days, Forms 21 to 33. 16 weeks = 7 to 10 days, all 15 forms. Final form always lands 3 to 4 days before the exam, never the day before.
- Every NBME form you assign must be a real, existing form number. Every resource you assign must be on the student's confirmed access list - never assign a resource they did not list.

REQUIRED METHODOLOGY ELEMENTS (build these into the relevant sections):
- The 4-Step Master Pivot used after every block: (1) Triage every question C/G/W before reading any explanation; (2) Question Breakdown for every G and W (what is the task, the anchor, the concept angle, the discriminator, why each wrong answer is wrong, NBME traps); (3) Concept Anchor - one-sentence mechanism (the Feynman test); (4) 48-Hour Revisit of error-log entries.
- THE G-TRAP must be explained explicitly with a worked number: a student who scores 72% with 18% guesses is really performing near 54%. Treating G as wrong is the first and highest-leverage mindset shift.
- ERROR-TYPE taxonomy: content gaps (fix: targeted content), reasoning errors (fix: discriminator hunt), reading errors (fix: stem-annotation habit). Fixing reasoning errors with more content review does not move the score.
- PRE-EXAM WEEK is a consolidation and simulation week, not a study week: final form 3 to 4 days out, then tapering error-log read-throughs, physical activity, sleep, nothing medical the day before.
- STAMINA training must match the exam format actually being sat.
- Daily schedule non-negotiables: prayer/family/sleep obligations are built in, never worked around; one recovery day per week; morning start for all practice forms; block review always longer than the block itself.

Format the document in this exact 9-section structure. Use the exact section header text (the "## Section N -" lines are parsed downstream, keep them verbatim). Fill the bracketed parts with the student's real data.

---

# [Student First Name]

## Personalised Study Blueprint

**Exam:** [exam] &nbsp;|&nbsp; **[N]-Week Master Prep Plan**
**Target Score:** [target]

**Prepared by:** Bit by Bit Pedagogy Academic Coaching Team
**Document Date:** [current month and year]
**Exam Stage:** [stage] | [exam]
**Prep Window:** [N] Weeks (dedicated)
**Student Type:** [school type] | [first attempt or retake]

> This document was built specifically for you, [Name]. Every line of it comes from what you told us: how you study, when you work best, what is at stake, and where you need to grow. Read it, own it, and use it.

---

## Section 1 - Your Profile at a Glance
Short intro paragraph.
### Who You Are
Bullet-style facts.
### How You Study
Two short paragraphs synthesising their actual study style.
### Your Honest Baseline
Four to six bullets.
### Your Schedule Reality
Four to six bullets.
### One Thing We Are Changing - Gradually
The single biggest behavioural shift and how the plan builds it in.

---

## Section 2 - Your Learning Modality and Protocol
### How You Learn Best: [Modality]
Two short paragraphs.
### Protocol Tips Built for Your Modality
Five to seven bold-led bullets.
### On [Their Biggest Challenge]
Diagnose. Name 2–3 root causes. Show how the plan addresses each.

---

## Section 3 - The Bit by Bit NBME Review Protocol
### The 4-Step Master Pivot, Built for [Name]
One-paragraph framing.

**Step 1 - The Initial Triage (Do not skip this step)**
Explain C / G / W categories.

**Step 2 - The Differentiator Hunt**
Pivot word, differentiator, why each wrong answer is wrong. One concrete worked example.

**Step 3 - The Concept Anchor (Mechanism, not just fact)**
Mechanism over memorisation. One worked example.

**Step 4 - The 48-Hour Revisit**
Spaced repetition without flashcards.

---

## Section 4 - Your Two Daily Systems
Brief framing.
### System A - Full Study Day
**Morning Block** / **Afternoon Block** / **Evening Block** - time-stamped bullets.
### System B - Lighter Day
**Option 1: Tutor Recommended** / **Option 2: [Student's current rhythm]** - time-stamped bullets.

---

## Section 5 - [N]-Week Roadmap
Break into ~2-week phases. For each:
### Weeks X and Y - [Phase Name]
**Wake Time Target:** [time]
One-paragraph intro.
- **System Focus / UWorld / Resource Milestone / NBME / Habit Goal / Do not do** bullets.

---

## Section 6 - NBME Form Schedule
Framing paragraph + bulleted list of forms with week + target.

---

## Section 7 - Your Personalised Resource Protocol
For each resource they listed:
### [Resource] - [Its Role]
- How to use (3–5 bullets) / Time cap / What to avoid
End with the Concept Correction Log.

---

## Section 8 - What Is at Stake for You, [Name]
Direct, paragraph form. Hold them to their target. Acknowledge what they did right. Talk about the hard days coming. Close with a one-line italic promise.

---

## Section 9 - Your Bit by Bit Motto

**One block.**
**One review.**
**One concept at a time.**

Two or three closing paragraphs referencing their specific situation. End with: "Now you have the plan."

---

**Bit by Bit Pedagogy**
Personalised Academic Coaching | USMLE and COMLEX Preparation
Built for [Name]. [Month Year].

---

RULES:
- No code fences. No HTML tags except &nbsp;. No tables. No em dashes.
- Markdown only.
- 2,500 to 4,000 words total.
- Use the intake summary's specific details (exact words about motivation, specific scores and dates, named resources) to personalise Sections 1, 7, and 8. Generic intake produces generic blueprints; do not pad with generic advice when real detail was given.`;

  // The intake form builds a full text summary (the same one your Master Prompt
  // is designed to receive). Prefer it; fall back to structured fields.
  const intake = (d.intakeSummary || '').trim();
  const fallback = `Name: ${d.name || d.fullName || 'Student'}
School type: ${d.schoolType || 'unspecified'}
Stage: ${d.stage || 'unspecified'}
Exam: ${d.exam || 'USMLE Step 1'}
Attempt: ${d.attempt || 'first attempt'}
Prep window: ${d.weeks || '8'} weeks
Target score: ${d.target || 'not specified'}
Baseline / recent scores: ${d.baseline || d.practiceScores || 'not specified'}
Study style: ${d.studyStyle || d.reviewHabit || 'not specified'}
Learning modality: ${d.modality || 'not specified'}
Schedule reality: ${d.schedule || 'not specified'}
Resources: ${Array.isArray(d.resources) ? d.resources.join(', ') : (d.resources || 'standard set')}
Weak systems: ${d.weakSystems || d.weakConcepts || 'not specified'}
Strong systems: ${d.strongSystems || 'not specified'}
Test-taking confidence: ${d.confidence || 'not specified'}
What is at stake: ${d.stake || d.failConsequence || 'not specified'}
Burnout level: ${d.burnout || 'low'}
Tutor: ${d.tutor || 'none assigned'}
Notes: ${d.notes || d.anythingElse || 'none'}`;

  const firstName = (d.name || d.prefName || d.fullName || 'the student').split(' ')[0];
  const userMessage = `Build the personalised blueprint now. Generate the full 9-section document in pure markdown, addressing ${firstName} by name throughout. Tailor every NBME form number, resource recommendation, and schedule detail to the exam, prep window, and confirmed resources below. Do not include the tutor's private notes in the student-facing document.

STUDENT INTAKE SUMMARY:
${intake || fallback}`;

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 12000,
      stream: true,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text();
    return new Response(JSON.stringify({ error: 'Upstream error', detail: errText }), {
      status: 502, headers: { 'content-type': 'application/json' },
    });
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
