# Bit by Bit Pedagogy — Brand & Design Guide

Use this when designing social posts, slides, PDFs, ads, or anything else that needs to look like it came from the same place as the site. This is the canonical reference. If something contradicts this doc, the doc wins.

---

## 1. The brand in one sentence

A clinical, literary diagnostic site for medical students. Reads like a brilliant senior colleague who has seen the loop you are stuck in and will not patronize you about it. Mechanism-first, foundation-tool framing, no marketing voice.

If a designed asset feels like a SaaS landing page, a textbook, or a coaching influencer ad, it is off-brand.

---

## 2. Color palette

### Core (always available)

| Token        | Hex       | Use                                                                |
|--------------|-----------|--------------------------------------------------------------------|
| `--bg`       | `#0D1B2E` | Background. Almost everything sits on this navy.                   |
| `--bg-elev`  | `#0F2238` | Slightly lifted surface for hero cards.                            |
| `--gold`     | `#F5A623` | Primary accent. Italic emphasis, CTAs, brand monogram, eyebrows.   |
| `--teal`     | `#00E5A0` | Forward / confirmation. Used sparingly. C-Factor brand color.      |
| `--cream`    | `#e8dfc8` | Primary text on dark backgrounds. Slightly warm, not pure white.   |
| `--warn`     | `#ff9b6b` | Coral. Borderline / reschedule signals. Never alarmist red.        |

### Cream tints (text hierarchy on dark backgrounds)

| Token         | Value                            | Use                                  |
|---------------|----------------------------------|--------------------------------------|
| `--cream`     | `#e8dfc8`                        | Primary body text.                   |
| `--cream-dim` | `rgba(232,223,200,.62)`          | Secondary text, body paragraphs.     |
| `--cream-faint` | `rgba(232,223,200,.4)`         | Tertiary / labels.                   |
| `--cream-dimmer` | `rgba(232,223,200,.28)`       | Subtle borders, fade text.           |

### Surface tints

| Token            | Value                            | Use                                 |
|------------------|----------------------------------|-------------------------------------|
| `--border`       | `rgba(248,245,235,.1)`           | Standard card border. Very faint.   |
| `--border-strong`| `rgba(248,245,235,.22)`          | Input borders, emphasis edges.      |
| `--bg-card`      | `rgba(255,255,255,.04)`          | Card background tint on navy.       |
| `--bg-card-hover`| `rgba(255,255,255,.07)`          | Hover.                              |

### Archetype accents (use ONLY for the 5 study profiles)

| Archetype       | Hex       | Notes                                  |
|-----------------|-----------|----------------------------------------|
| The Collector   | `#F5A623` | Gold. Matches the main brand gold.     |
| The Memorizer   | `#00E5A0` | Teal.                                  |
| The Perfectionist | `#B8A4FF` | Soft violet. Calm precision.         |
| The Drowner     | `#FF9B6B` | Warm coral. Matches `--warn`.          |
| The Coaster     | `#7FD8E5` | Pale blue. Cool but not cold.          |

Each archetype color appears as a 3px left border accent, a small monospace tag color, and a subtle radial-gradient on hover. Never as a full background fill.

---

## 3. Typography

### Two-font system, no exceptions

**Cormorant Garamond** — `'Cormorant Garamond', Georgia, serif`
The literary voice. Use italic for emphasis, regular for body. Weights: 300 (light), 400 (regular), 600 (semibold). Italic variants at the same weights.

Use for:
- Headlines (always italic, weight 300)
- Body paragraphs in diagnostic flows (triage, archetype pages, exam-schedule)
- "Gold italic" emphasis — variable names, archetype names, key terms inside headlines

**JetBrains Mono** — `'JetBrains Mono', monospace`
The clinical voice. Use for labels, operators, navigation, eyebrows. Weights: 300, 400, 500.

Use for:
- Eyebrow text above headlines (UPPERCASE, letter-spacing .15em–.22em)
- Navigation links (uppercase, letter-spacing .08em–.12em)
- Form labels
- Numerical content
- Section labels
- The B³ monogram
- The footer brand line
- The original homepage section titles (sec-title class uses mono for design heritage)

### NEVER use

- A third typeface
- System sans (Helvetica, Arial, Inter, etc.)
- A display serif other than Cormorant
- Bold weights of either font (we use 600 max; 700+ feels shouty)

### Typographic moves that are signature to the brand

1. **Italic gold emphasis inside an h1 or h2:**
   `<h1>Build your <em style="color: var(--gold); font-style: italic;">exam schedule</em></h1>`
   This is the most recognizable typographic gesture. Use sparingly — one per headline.

2. **Mono eyebrow above serif headline:**
   `<div class="eyebrow">Scheduling tool</div>` (mono, uppercase, letterspaced) followed by italic Cormorant title.

3. **Roman numeral chapter markers:**
   The toolkit tabs use lowercase i, ii, iii in italic Cormorant above mono uppercase labels. This is a recognizable site pattern.

4. **Small caps via uppercase + letter-spacing on mono:**
   Real small-caps fonts are not in our stack. The convention is uppercase JetBrains Mono with `letter-spacing: 0.15em` for the small-caps feel.

---

## 4. The B³ monogram

Pronounced "B cubed." Read as "Bit by Bit, three letters, indexed." The 3 is also a nod to the C-Factor's three pillars but read as a literal exponent.

**Specifications:**
- Letter "B" in JetBrains Mono, weight 500, color `--gold`
- Followed by `<sup>3</sup>` in the same color
- Inside a 28×28px square (32px for hero contexts)
- 1.5px border in `--gold`, border-radius 3px
- Centered

**HTML:**
```html
<div class="nav-monogram">B&#179;</div>
```

**CSS:**
```css
.nav-monogram {
  width: 28px;
  height: 28px;
  border: 1.5px solid #F5A623;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  color: #F5A623;
}
```

Never use the monogram alone in marketing without the wordmark "Bit by Bit Pedagogy" beside it. Never recolor it — it is always gold on whatever the background is.

---

## 5. Voice & copy rules (binding)

These apply to every word that goes on a page, into a social caption, or into a thumbnail.

1. **Zero em dashes (—) or en dashes (–).** Use a comma, period, colon, or semicolon. The brand voice does not use a dash that is not also a hyphen.
2. **Zero exclamation points.** Anywhere. Including "free!" "join us!" "today!"
3. **No "we / our / us / our team."** This is one person writing to one student. Use second person ("you / your") and stay there.
4. **No AI cadence.** Words and phrases that are off-brand: *dive in, embark, unlock, journey, master, crush, level up, supercharge, game-changer, transform your, your future self, let's*. If a sentence sounds like a productivity influencer, rewrite it.
5. **No therapist voice.** "I hear you" / "your feelings are valid" / "you've got this" are off-brand.
6. **Mechanism first.** Say what the thing does and why, not how it will make the student feel.
7. **Foundation framing.** The site is a starting point, not a coach. Phrases like "this is one starting point" / "talk to your advisor" / "not a substitute for" are core to the voice and should appear in any asset that recommends action.
8. **Honest about scope.** When something is approximate or uncertain, say so. "Roughly" / "approximately" / "in most cases" are fine. Pretending precision is off-brand.
9. **Numbers without padding.** "60-question block" not "powerful 60-question block." "Five tools" not "five game-changing tools."
10. **Literary, not clinical-textbook.** The voice is closer to a thoughtful essay than a UpToDate article. Sentences breathe.

**Example before / after:**

> ✗ "Unlock your dream Step 1 score with our game-changing study schedule! Built by experts, this powerful tool will transform your prep journey!"
>
> ✓ "Build a schedule that paces your forms, reads your recent scores, and stops asking you to do a full NBME every day. Free, no signup. A starting point for the conversation with your advisor, not a replacement for it."

---

## 6. Visual signatures

These are the moves that make the brand recognizable at a glance. Use them.

1. **3px left border accent on cards.** Color depends on context (gold for primary, teal for confirmation, coral for warning). This is the single most recognizable visual gesture. Use it on every card-like surface.

2. **Italic serif on gold inside a mono / serif headline.** See typography section 3.

3. **Faint cream borders on navy.** `rgba(248,245,235,.1)` — almost invisible but creates structure. Do not use harder borders.

4. **Radial gradient hover wash.** On interactive cards, a subtle radial-gradient from the accent color (opacity ~6%) appears on hover. Never a solid hover background.

5. **Backdrop-blur on sticky nav.** `background: rgba(13,27,46,.96); backdrop-filter: blur(12px);` — recognizable touch.

6. **Symptom chips with embedded quote glyph.** The "Why You Feel Stuck" cards open with a `"` glyph in the accent color, positioned absolutely at top-left. Each card is color-coded by archetype.

7. **Cycle plan / chapter numerals.** Roman numerals (i, ii, iii) in italic serif above section labels. Suggests "chapter," not "tab."

---

## 7. Layout & spacing

- Page max-widths: 760px (focused tool/reading), 880px (forms with sidebars), 1100px (index pages), 1120px (homepage hero band)
- Section padding: `3.5rem 2rem` for feature bands; `4rem 2rem 5rem` for content sections
- Card padding: `1.5rem` to `2rem` interior padding
- Border radius: 4px for buttons, 6px for cards, 8px for inputs, 12-14px for hero feature blocks. Never fully rounded (no pill buttons except mode-switch toggles).
- Cubic-bezier easing across animations: `cubic-bezier(0.22, 1, 0.36, 1)` for entries, `cubic-bezier(0.4, 0, 0.6, 1)` for exits. 240ms for micro-interactions, 480-520ms for scene transitions.

---

## 8. Iconography

- We do NOT use Font Awesome, Material Icons, or a third-party icon set.
- Unicode glyphs are fine and on-brand: ▸ (right arrow accent), → (cta arrow), · (separator), ✓ (confirmation), ▴ ▾ (carets), ★ (badge), ◴ (clock), ◈ (diamond accent).
- Avoid emoji in body content. Emoji are allowed in informal contexts (Instagram captions, Reddit posts) but should never appear in the body of the site itself.

---

## 9. Photography & illustration

- The mascot ("Bit") is the only illustrated character. It is a pixel-style mascot with teal eyes and gold pupils on a navy face. Always rendered crisp, never blurred. File: `/bit-mascot.png`.
- No stock photos of medical students, hands holding pens, stethoscopes, etc.
- No 3D renders, no gradients applied to objects.
- Diagrams, when needed, use line art in cream or teal on navy. Thin strokes.

---

## 10. Social-media asset recipes

These are starting points, not rigid templates. Adjust within the brand.

### Instagram square (1080×1080)

- Background: `#0D1B2E` (navy)
- Optional subtle radial gradient from top-left: `rgba(245,166,35,.04)` to transparent
- Top-left corner (40px margin): B³ monogram + wordmark in cream
- Big italic Cormorant headline center-left, weight 300, color `--cream`, with one word emphasized in gold italic
- Mono eyebrow above the headline (small, gold, letter-spaced)
- Optional 3px gold left border on the headline block as the signature
- Bottom-right: small mono URL `bitbybitpedagogy.com`
- White space is the design. Do not fill it.

### Instagram story (1080×1920)

- Same palette and typography
- Stack vertically: monogram top, headline middle, CTA bottom
- The CTA is a flat gold rectangle with navy mono uppercase text. 4px radius, generous padding.
- One signature move per story (border accent OR radial wash, not both)

### Reddit / forum thumbnail (1200×630)

- More horizontal use of the navy field
- Left half: italic headline + gold accent word
- Right half: ASCII-style data box (mono cream on faint card background) showing a real example from the tool — a sample readiness state, a sample form schedule row, a sample symptom card
- Bottom strip: `r/TidBitsbyBBB` in mono cream

### Twitter / X header (1500×500)

- Wordmark "Bit by Bit Pedagogy" in serif weight 600 cream on left
- Three column eyebrow labels right of the wordmark: `STEP 1 · CBSE · MCAT`
- Optional small chart-style line element on the right side. Faint.

### YouTube thumbnail (1280×720)

- Italic Cormorant title, one or two words emphasized in gold italic
- Bottom-right monogram
- Avoid screenshots of the site itself — use the colors and type, build an original layout

### PDF / handout

- Same color palette, but a softer text density. Generous margins.
- The 3px gold left border on the header block.
- Footer in faint cream mono: "Bit by Bit Pedagogy · bitbybitmd.com"

---

## 11. Things that are explicitly off-brand

- A bright pure-white background. The brand lives on navy. If you need light mode, use cream `#e8dfc8` background with navy text — never pure white.
- A pure red. Use the warm coral `--warn` for any "alert" feeling.
- A pure black. Use the navy `--bg`.
- Drop shadows that are obviously photoshopped. Subtle box-shadows are fine: `0 8px 22px rgba(0,0,0,.25)`.
- Gradient text. Solid colors only.
- Animations that are longer than 600ms. The brand feels considered, not theatrical.
- A second illustrated character beside Bit the mascot.
- Marketing-pitch screenshots ("As seen on...", testimonial carousels, "5 stars" overlays). None of that.

---

## 12. The one-sentence test

Before publishing any designed asset, read it back to yourself and ask: *Does this sound like the brilliant senior colleague who already knows the loop the student is in?*

If yes, ship it.
If it sounds like a course launch, a productivity guru, a clinic, or a SaaS startup, redesign.

---

*Maintained for Bit by Bit Pedagogy · bitbybitmd.com*
*If this guide and the live site disagree on a token, the live site is the source of truth and this file should be updated to match.*
