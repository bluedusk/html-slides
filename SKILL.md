---
name: html-slides
metadata:
  version: "0.5.1"
  author: danzhu
description: Generate polished single-file HTML slide presentations with interactive components (flip cards, charts, tables, code blocks, architecture flows, stats, timelines, and more) or creative visual themes. Use this skill whenever the user wants to create slides, presentations, decks, or any visual slide-based content as HTML. Also trigger when the user invokes /html-slides or mentions creating an HTML presentation, pitch deck, or slide deck.
---

# Frontend Slides

Create zero-dependency, animation-rich HTML presentations that run entirely in the browser.

## Core Principles

1. **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools.
2. **Show, Don't Tell** — Generate visual previews, not abstract choices. People discover what they want by seeing it.
3. **Distinctive Design** — No generic "AI slop." Every presentation must feel custom-crafted.
4. **Viewport Fitting (NON-NEGOTIABLE)** — Every slide MUST fit exactly within 100vh. No scrolling within slides, ever. Content overflows? Split into multiple slides.

## Design Aesthetics

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight.

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

## Viewport Fitting Rules

These invariants apply to EVERY slide in EVERY presentation:

- Every `.slide` must have `height: 100vh; height: 100dvh; overflow: hidden;`
- ALL font sizes and spacing must use `clamp(min, preferred, max)` — never fixed px/rem
- Content containers need `max-height` constraints
- Images: `max-height: min(50vh, 400px)`
- Breakpoints required for heights: 700px, 600px, 500px
- Include `prefers-reduced-motion` support
- Never negate CSS functions directly (`-clamp()`, `-min()`, `-max()` are silently ignored) — use `calc(-1 * clamp(...))` instead

**When generating, read `viewport-base.css` and include its full contents in every presentation.**

### Content Density Limits Per Slide

| Slide Type | Maximum Content |
|------------|-----------------|
| Title slide | 1 heading + 1 subtitle + optional tagline |
| Content slide | 1 heading + 4-6 bullet points OR 1 heading + 2 paragraphs |
| Feature grid | 1 heading + 6 cards maximum (2x3 or 3x2) |
| Code slide | 1 heading + 8-10 lines of code |
| Quote slide | 1 quote (max 3 lines) + attribution |
| Image slide | 1 heading + 1 image (max 60vh height) |
| Chart slide | 1 heading + 1 chart (max 50vh height) + optional subtitle |

**Content exceeds limits? Split into multiple slides. Never cram, never scroll.**

---

## Phase 0: Detect Mode

Determine what the user wants:

- **Mode A: New Presentation** — Create from scratch. Go to Phase 1.
- **Mode B: PPT Conversion** — Convert a .pptx file. Go to Phase 4.
- **Mode C: Enhancement** — Improve an existing HTML presentation. Read it, understand it, enhance. **Follow Mode C modification rules below.**
- **Mode D: HTML Conversion** — Convert any HTML file (reveal.js, Marp, Google Slides export, article, generic page) into HTMLSlides format. Go to Phase 5.

### Mode C: Modification Rules

When enhancing existing presentations, viewport fitting is the biggest risk:

1. **Before adding content:** Count existing elements, check against density limits
2. **Adding images:** Must have `max-height: min(50vh, 400px)`. If slide already has max content, split into two slides
3. **Adding text:** Max 4-6 bullets per slide. Exceeds limits? Split into continuation slides
4. **After ANY modification, verify:** `.slide` has `overflow: hidden`, new elements use `clamp()`, images have viewport-relative max-height, content fits at 1280x720
5. **Proactively reorganize:** If modifications will cause overflow, automatically split content and inform the user. Don't wait to be asked

**When adding images to existing slides:** Move image to new slide or reduce other content first. Never add images without checking if existing content already fills the viewport.

---

## Phase 1: Content Discovery (New Presentations)

**Ask ALL questions in a single AskUserQuestion call** so the user fills everything out at once:

**Question 1 — Purpose** (header: "Purpose"):
What is this presentation for? Options: Pitch deck / Teaching-Tutorial / Conference talk / Internal presentation

**Question 2 — Length** (header: "Length"):
Approximately how many slides? Options: Short 5-10 / Medium 10-20 / Long 20+

**Question 3 — Content** (header: "Content"):
Do you have content ready? Options: All content ready / Rough notes / Topic only

**Question 4 — Inline Editing** (header: "Editing"):
Do you need to edit text directly in the browser after generation? Options:
- "Yes (Recommended)" — Can edit text in-browser, auto-save to localStorage, export file
- "No" — Presentation only, keeps file smaller

**Remember the user's editing choice — it determines whether edit-related code is included in Phase 3.**

If user has content, ask them to share it.

### Step 1.2: Image Evaluation (if images provided)

If user selected "No images" → skip to Phase 2.

If user provides an image folder:
1. **Scan** — List all image files (.png, .jpg, .svg, .webp, etc.)
2. **View each image** — Use the Read tool (Claude is multimodal)
3. **Evaluate** — For each: what it shows, USABLE or NOT USABLE (with reason), what concept it represents, dominant colors
4. **Co-design the outline** — Curated images inform slide structure alongside text. This is NOT "plan slides then add images" — design around both from the start (e.g., 3 screenshots → 3 feature slides, 1 logo → title/closing slide)
5. **Confirm via AskUserQuestion** (header: "Outline"): "Does this slide outline and image selection look right?" Options: Looks good / Adjust images / Adjust outline

**Logo in previews:** If a usable logo was identified, embed it (base64) into each style preview in Phase 2 — the user sees their brand styled three different ways.

---

## Phase 2: Style Discovery

**This is the "show, don't tell" phase.** Most people can't articulate design preferences in words.

### Step 2.0: Choose Mode

**If the user has not specified a mode, default to Advanced.**

Ask which mode they want (header: "Mode"):

- **Advanced (Recommended)** (Dark Interactive) — Structured interactive components: flip cards, charts, tables, code blocks, architecture flows, and more. Best for technical talks, product demos, and data-rich presentations.
- **Simple** (Creative themes) — AI interprets your content freely with distinctive visual styles. Best for pitch decks, keynotes, and non-technical presentations.

**If Advanced:** Skip to Step 2.4.

### Step 2.1: Simple — Style Path

Ask how they want to choose (header: "Style"):
- "Show me options" (recommended) — Generate 3 previews based on mood
- "I know what I want" — Pick from preset list directly

**If direct selection:** Show preset picker and skip to Phase 3. Available presets are defined in [STYLE_PRESETS.md](references/STYLE_PRESETS.md).

### Step 2.2: Simple — Mood Selection

Ask (header: "Vibe", multiSelect: true, max 2):
What feeling should the audience have? Options:
- Impressed/Confident — Professional, trustworthy
- Excited/Energized — Innovative, bold
- Calm/Focused — Clear, thoughtful
- Inspired/Moved — Emotional, memorable

### Step 2.3: Simple — Generate 3 Style Previews

Based on mood, generate 3 distinct single-slide HTML previews showing typography, colors, animation, and overall aesthetic. Read [STYLE_PRESETS.md](references/STYLE_PRESETS.md) for available presets and their specifications.

| Mood | Suggested Presets |
|------|-------------------|
| Impressed/Confident | Bold Signal, Electric Studio, Dark Botanical |
| Excited/Energized | Creative Voltage, Neon Cyber, Split Pastel |
| Calm/Focused | Notebook Tabs, Paper & Ink, Swiss Modern |
| Inspired/Moved | Dark Botanical, Vintage Editorial, Pastel Geometry |

Save previews to `.claude-design/slide-previews/` (style-a.html, style-b.html, style-c.html). Each should be self-contained, ~50-100 lines, showing one animated title slide.

Open each preview automatically for the user.

Ask (header: "Style"):
Which style preview do you prefer? Options: Style A: [Name] / Style B: [Name] / Style C: [Name] / Mix elements

If "Mix elements", ask for specifics.

### Step 2.4: Advanced — Dark Interactive

No style selection needed — Advanced mode uses the Dark Interactive preset with the full component system. Proceed directly to Phase 3.

---

## Phase 3: Generate Presentation

Generate the full presentation using content from Phase 1 (text, or text + curated images) and style from Phase 2.

If images were provided, the slide outline already incorporates them from Step 1.2. If not, CSS-generated visuals (gradients, shapes, patterns) provide visual interest — this is a fully supported first-class path.

**Before generating, read these supporting files based on the chosen style:**

**For creative presets (presets 1-12):**
- [html-template.md](references/html-template.md) — HTML architecture and JS features
- [viewport-base.css](assets/viewport-base.css) — Mandatory CSS (include in full)
- [animation-patterns.md](references/animation-patterns.md) — Animation reference for the chosen feeling

**For Dark Interactive (preset 13 — structured component mode):**
- [component-templates.md](references/component-templates.md) — HTML component templates with decision table
- [dark-interactive.css](assets/dark-interactive.css) — Complete CSS (copy verbatim into `<style>`)
- [dark-interactive-nav.js](assets/dark-interactive-nav.js) — Navigation JS (copy verbatim into `<script>`)
- If any slides use **Chart** components, add Chart.js CDN in `<head>` before `<style>`: `<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>`

**Key requirements:**
- Single self-contained HTML file, all CSS/JS inline
- For presets 1-12: include the FULL contents of viewport-base.css in the `<style>` block
- For preset 13: include the FULL contents of dark-interactive.css in the `<style>` block, and dark-interactive-nav.js in the `<script>` block
- Use fonts from Fontshare or Google Fonts — never system fonts
- Add detailed comments explaining each section
- Every section needs a clear `/* === SECTION NAME === */` comment block
- **Always generate speaker notes** — see Speaker Notes below

### Speaker Notes (Mandatory)

Every generated presentation must include a separate `.notes.json` file alongside the HTML file. If the presentation is `my-deck.html`, the notes file is `my-deck.notes.json`. This file is read by external presenter applications.

```json
{
  "0": {
    "title": "Introduction",
    "script": "Welcome everyone. Today we're going to look at how HTML Slides lets you create beautiful presentations without any design skills.",
    "notes": ["Pause after welcome", "Gauge audience familiarity with AI tools"]
  },
  "1": {
    "title": "The Problem",
    "script": "Most presentation tools force you into rigid templates or require design expertise. What if your AI agent could handle all of that?",
    "notes": ["Rhetorical question — don't wait for answer", "Transition: next slide shows the solution"]
  }
}
```

**File naming:** `<presentation-name>.notes.json` — must match the HTML filename.

**Format:** Object keyed by `data-slide` index (as string). Each entry has:
- `title` — Slide heading (for presenter app navigation)
- `script` — Full natural language the presenter can read verbatim or paraphrase
- `notes` — Array of bullet point reminders (timing cues, transitions, delivery tips)

**Guidelines for generating notes:**
- `script`: Write as natural speech, 2-4 sentences per slide. Focus on what to **say**, not what's on screen.
- `notes`: 2-3 short bullet points. Include transition cues ("After this, we'll look at..."), timing hints ("Skip if short on time"), and delivery tips ("Pause here for effect").
- Every slide must have an entry, including title and CTA slides.

---

## Phase 4: PPT Conversion

When converting PowerPoint files:

1. **Extract content** — Run `python scripts/extract-pptx.py <input.pptx> <output_dir>` (install python-pptx if needed: `pip install python-pptx`)
2. **Confirm with user** — Present extracted slide titles, content summaries, and image counts
3. **Style selection** — Proceed to Phase 2 for style discovery
4. **Generate HTML** — Convert to chosen style, preserving all text, images (from assets/), slide order, and speaker notes (as HTML comments)

---

## Phase 5: HTML Conversion (Mode D)

Convert existing HTML files into spec-compliant HTMLSlides presentations.

### Step 5.1: Analyze Input

Read the HTML file and classify the source. Read [conversion-patterns.md](references/conversion-patterns.md) for framework detection patterns.

| Source Type | Detection | Extraction Strategy |
|-------------|-----------|-------------------|
| reveal.js | `<div class="reveal">` + `<section>` elements | Map sections 1:1 to slides |
| Marp | `<!-- marp: true -->` or `class="marpit"` | Map Marp slides 1:1 |
| impress.js | `<div id="impress">` + `div.step` | Map steps 1:1 to slides |
| Slidev | `class="slidev-layout"` or Slidev-specific classes | Map layouts 1:1 to slides |
| Google Slides | Deeply nested divs with Google-specific classes | Extract text/images from structure |
| HTMLSlides (partial) | Has some but not all of the 7 spec rules | Fix compliance gaps only |
| Article/Blog | `<article>`, `<main>`, or heading-structured HTML | Split at headings |
| Generic HTML | None of the above | Split at headings, analyze structure |

Run a compliance audit against the 7 spec rules. If all pass, tell the user the file is already compliant — no conversion needed. If partially compliant, offer to fix only the failing rules.

Report content inventory to the user: slide count, content types, external dependencies, estimated output slides. Ask for confirmation before proceeding.

### Step 5.2: Extract Content

**For slide frameworks (reveal.js, Marp, impress.js, Slidev):**
- Map existing slides 1:1 to HTMLSlides slides
- Extract title, body content, images, code blocks from each slide
- Preserve slide order
- If a source slide exceeds density limits, split it

**For articles/blog posts/generic HTML:**
- Split content at heading boundaries (h1/h2 = new slide)
- First heading becomes the title slide
- Group related paragraphs, lists, and images under their nearest heading
- Code blocks → code slides, tables → table slides, blockquotes → quote slides
- Long lists get split across multiple slides (max 6 items per slide)

**For partially compliant HTMLSlides files:**
- Keep existing slide structure intact
- Only fix the specific failing rules

**Handle dependencies:**
- External CSS → inline it. External JS → strip framework JS, keep content JS.
- Images → keep URLs, apply `max-height: min(50vh, 400px)`.
- Fonts → keep Google Fonts / Fontshare, replace others.

### Step 5.3: Style Selection

Same as Phase 2 — ask Simple or Advanced. Default to Advanced.

### Step 5.4: Generate

Same as Phase 3 — read the appropriate supporting files and generate. For Advanced mode, map extracted content to components using the decision table in component-templates.md.

Always generate the `.notes.json` file. If the source had speaker notes, preserve them.

### Step 5.5: Validate & Save

Before saving, verify all 7 spec rules pass. Fix any that fail. Save both the HTML and `.notes.json` files.

---

## Phase 6: Delivery

1. **Clean up** — Delete `.claude-design/slide-previews/` if it exists
2. **Open** — Use `open [filename].html` to launch in browser
3. **Summarize** — Tell the user:
   - File location, style name, slide count
   - Navigation: Arrow keys, Space, scroll/swipe, click nav dots
   - How to customize: `:root` CSS variables for colors, font link for typography, `.reveal` class for animations
   - If inline editing was enabled: Hover top-left corner or press E to enter edit mode, click any text to edit, Ctrl+S to save

---

## Supporting Files

| File | Purpose | When to Read |
|------|---------|-------------|
| [STYLE_PRESETS.md](references/STYLE_PRESETS.md) | Curated visual presets with colors, fonts, and signature elements | Phase 2 (style selection) |
| [viewport-base.css](assets/viewport-base.css) | Mandatory responsive CSS — copy into every presentation (presets 1-12) | Phase 3 (generation) |
| [html-template.md](references/html-template.md) | HTML structure, JS features, code quality standards (presets 1-12) | Phase 3 (generation) |
| [animation-patterns.md](references/animation-patterns.md) | CSS/JS animation snippets and effect-to-feeling guide (presets 1-12) | Phase 3 (generation) |
| [component-templates.md](references/component-templates.md) | Structured HTML component templates with decision table (Advanced mode) | Phase 3 (Dark Interactive) |
| [dark-interactive.css](assets/dark-interactive.css) | Complete CSS for Dark Interactive preset — copy verbatim (preset 13) | Phase 3 (Dark Interactive) |
| [dark-interactive-nav.js](assets/dark-interactive-nav.js) | Navigation JS for Dark Interactive — copy verbatim (preset 13) | Phase 3 (Dark Interactive) |
| [scripts/extract-pptx.py](scripts/extract-pptx.py) | Python script for PPT content extraction | Phase 4 (PPT conversion) |
| [conversion-patterns.md](references/conversion-patterns.md) | Framework detection patterns and extraction rules | Phase 5 (HTML conversion) |
