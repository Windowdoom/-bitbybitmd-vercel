# Bit by Bit Pedagogy — Site Bundle (v4 · 65 Bits)

## What's inside

```
index.html                        ← your homepage (auto-patched with Free Resources section)
plan.html                         ← PUBLIC 10-Q Find My Gap (diagnostic → book CTA)
log.html                          ← Concept Correction Log generator
differentiators.html              ← HY differentiator hub (65 entries)
nbme-traps.html                   ← 10 NBME Trap Patterns
habit-reset.html                  ← 50-Day Habit Reset
llms.txt                          ← AI manifest
robots.txt                        ← LLM-friendly crawl rules
styles/b3.css                     ← shared stylesheet

admin/
  plan.html                       ← ★ PRIVATE — full blueprint generator (token-gated)

api/
  diagnose.js                     ← public: streaming diagnosis
  plan.js                         ← PRIVATE: full blueprint (admin token required)
  log.js                          ← public: streaming correction-log entry

method/                           ← 9 method pages + hub
bits/                             ← Bit Library hub + 65 Bits
```

## The 65 Bits by system

- **Heme/Onc (8)** · **Renal (4)** · **Endo (7)** · **Cardio (5)** · **Neuro (6)**
- **Rheum/Immuno (5)** · **Genetics (3)** · **Biochem (5)** · **Pathology (3)**
- **Micro (9)** · **Pharm/Tox (5)** · **Behavioral (3)** · **GI (1)** · **OB/Gyn (1)**

Full list at the bottom of `llms.txt` and on `/bits/`.

## Verification sources

- First Aid for the USMLE Step 1, 2024 (34th ed) — Le, Bhushan et al.
- Robbins Basic Pathology, 10e — Kumar, Abbas, Aster
- Guyton & Hall Textbook of Medical Physiology, 14e — Hall
- Basic Immunology, Functions and Disorders, 6e — Abbas, Lichtman, Pillai
- Brenner & Stevens Pharmacology
- Lippincott Illustrated Q&A Review of Pharmacology — Zaslau

All content paraphrased — no textbook prose reproduced verbatim. If you spot an error, email and we'll fix it.

## Required Vercel env vars

| Variable | Why |
|---|---|
| `ANTHROPIC_API_KEY` | All three API endpoints |
| `PLAN_ADMIN_TOKEN`  | Gates `/api/plan` and `/admin/plan.html` |

## Deploy

1. Unzip into repo root (preserves folder structure).
2. Set `PLAN_ADMIN_TOKEN` in Vercel env vars.
3. Commit + push. Vercel redeploys in ~60s.
4. Smoke-test: `/bits/itp-ttp-hus-dic.html` · `/log.html` · `/plan.html` · `/admin/plan.html`.

The homepage `index.html` has already been auto-patched with a "Free Resources" section that links to every new page. No manual edits required.

Do NOT link `/admin/plan.html` anywhere. Bookmark it.

— Bit by Bit
