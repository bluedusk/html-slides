---
name: html-slides
metadata:
  version: "0.6.6"
  author: danzhu
description: Generate polished single-file HTML slide presentations with interactive components (flip cards, charts, tables, code blocks, architecture flows, stats, timelines, and more) or creative visual themes. Use this skill whenever the user wants to create slides, presentations, decks, or any visual slide-based content as HTML. Also trigger when the user invokes /html-slides or mentions creating an HTML presentation, pitch deck, or slide deck.
---

# Frontend Slides

Create zero-dependency, animation-rich HTML presentations that run entirely in the browser.

## Agent Compatibility

This skill is optimized for **Claude Code** and uses `AskUserQuestion` for interactive prompts. If `AskUserQuestion` is not available (Gemini CLI, GitHub Copilot, OpenAI Codex, or other agents), ask the same questions as plain text in the conversation and wait for the user to respond before proceeding.

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

When modifying existing presentations, make **minimal changes** — only touch what the user asked about.

**Editing slides:**
- Read the existing HTML file first
- Modify only the requested slide(s), keep everything else intact
- If adding/removing slides, renumber all `data-slide` attributes sequentially from 0
- If changing a component type (e.g., code block → table), use the template from component-templates.md
- Update the `.notes.json` file to match any content changes

**Viewport fitting (always check):**
- Before adding content, check against density limits
- Adding images: must have `max-height: min(50vh, 400px)`
- Adding text: max 4-6 bullets per slide. Exceeds? Split into multiple slides
- If modifications will cause overflow, split content and inform the user

**After ANY modification, verify all 8 spec rules:**
1. `<div class="deck" id="deck">` exists
2. All slides are `<div class="slide">` with sequential `data-slide="0"` through `data-slide="N"`
3. First slide has `class="slide active"`, no other slide has `active`
4. Global `goTo()`, `next()`, `prev()` functions exist
5. All CSS inline (except font imports)
6. All JS inline (except Chart.js CDN)
7. No broken numbering gaps after insertions or deletions
8. `<meta name="generator" content="html-slides vX.Y.Z">` exists in `<head>`

**If any rule fails after editing, fix it before saving.**

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

**If the user has not specified a mode, default to Pro.**

Ask which mode they want (header: "Mode"):

- **Pro (Recommended)** — Structured interactive components: flip cards, charts, tables, code blocks, architecture flows, and more. Multiple themes available. Best for technical talks, product demos, and data-rich presentations.
- **Vibe** (Creative themes) — AI interprets your content freely with distinctive visual styles. Best for pitch decks, keynotes, and non-technical presentations.

**If Pro:** Skip to Step 2.4.

### Step 2.1: Vibe — Style Path

Ask how they want to choose (header: "Style"):
- "Show me options" (recommended) — Generate 3 previews based on mood
- "I know what I want" — Pick from preset list directly

**If direct selection:** Show preset picker and skip to Phase 3. Available presets are defined in [STYLE_PRESETS.md](references/STYLE_PRESETS.md).

### Step 2.2: Vibe — Mood Selection

Ask (header: "Vibe", multiSelect: true, max 2):
What feeling should the audience have? Options:
- Impressed/Confident — Professional, trustworthy
- Excited/Energized — Innovative, bold
- Calm/Focused — Clear, thoughtful
- Inspired/Moved — Emotional, memorable

### Step 2.3: Vibe — Generate 3 Style Previews

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

### Step 2.4: Pro — Theme Selection

Ask which theme they want (header: "Theme"):

- **Obsidian (default)** — Dark background, blue/green/orange accents
- **Excalidraw Light** — Hand-drawn, white background, sketch borders
- **Excalidraw Dark** — Hand-drawn, dark background, sketch borders
- **Editorial Light** — Luminous, editorial, tech-forward minimalism
- **Binary Architect** — Hacker-elite, sharp corners, neon on void-black

If the user already specified a theme in their prompt, skip this question and use that theme. If no preference, default to Obsidian.

Each theme uses the same components and navigation — only the visual style changes. Theme files are in `assets/themes/`.

---

## Phase 3: Generate Presentation

Generate the full presentation using content from Phase 1 (text, or text + curated images) and style from Phase 2.

If images were provided, the slide outline already incorporates them from Step 1.2. If not, CSS-generated visuals (gradients, shapes, patterns) provide visual interest — this is a fully supported first-class path.

**Before generating, read these supporting files based on the chosen style:**

**For creative presets (presets 1-12):**
- [html-template.md](references/html-template.md) — HTML architecture and JS features
- [viewport-base.css](assets/viewport-base.css) — Mandatory CSS (include in full)
- [animation-patterns.md](references/animation-patterns.md) — Animation reference for the chosen feeling

**For Pro mode (structured component mode):**
- [component-templates.md](references/component-templates.md) — HTML component templates with decision table
- [components.css](assets/components.css) — Shared component CSS (copy verbatim into `<style>`)
- Theme CSS from `assets/themes/` — copy verbatim into `<style>`, BEFORE components.css
- [dark-interactive-nav.js](assets/dark-interactive-nav.js) — Navigation JS (copy verbatim into `<script>`)
- If any slides use **Chart** components, add Chart.js CDN in `<head>` before `<style>`: `<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>`

**Available Pro themes** (user specifies in prompt, default: Obsidian):

| Theme | File | Vibe |
|-------|------|------|
| Obsidian (default) | `assets/themes/dark-interactive.css` | Dark background, blue/green/orange accents |
| Excalidraw Light | `assets/themes/excalidraw.css` | Hand-drawn, white background, sketch borders |
| Excalidraw Dark | `assets/themes/excalidraw-dark.css` | Hand-drawn, dark background, sketch borders |
| Editorial Light | `assets/themes/editorial-light.css` | Luminous, editorial, tech-forward minimalism |
| Binary Architect | `assets/themes/binary-architect.css` | Hacker-elite, sharp corners, neon on void-black |

**Key requirements:**
- Single self-contained HTML file, all CSS/JS inline
- For Vibe mode: include the FULL contents of viewport-base.css in the `<style>` block
- For Pro mode: include the chosen theme CSS + components.css in the `<style>` block, and dark-interactive-nav.js in the `<script>` block
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
    "script": "HTML Slides lets you create beautiful presentations without design skills.",
    "notes": [
      "Zero dependencies",
      "Works with 4 AI agents",
      "Describe topic, get a deck"
    ]
  },
  "1": {
    "title": "The Problem",
    "script": "Current tools are slow and require design expertise.",
    "notes": [
      "PowerPoint: hours of manual work",
      "Vendor lock-in, version control pain",
      "AI builds the deck in minutes"
    ]
  }
}
```

**File naming:** `<presentation-name>.notes.json` — must match the HTML filename.

**Format:** Object keyed by `data-slide` index (as string). Each entry has:
- `title` — Slide heading (for presenter app navigation)
- `script` — Brief summary of what this slide delivers, in presenter tone
- `notes` — Key points from the slide content, summarized as short phrases

Both `script` and `notes` summarize the **slide content** — what the slide is saying to the audience. Write in presenter tone, as if the presenter is reading these to remind themselves what this slide covers.

**NEVER include:**
- Delivery instructions ("Pause here", "Slow down")
- Transition cues ("Move to next slide")
- Presentation advice ("Emphasize this", "If short on time skip")
- Meta commentary ("This is the summary slide")

**Example — slide about AI agent capabilities with 4 flip cards:**
```json
{
  "title": "Four Core Capabilities",
  "script": "Agents need four things working together: reasoning, memory, tools, and evaluation.",
  "notes": [
    "Reasoning — choose the next step",
    "Memory — carry context across steps",
    "Tools — take actions in the real world",
    "Evaluation — detect errors, confirm completion"
  ]
}
```

**Example — stats slide showing "3.2x faster, 47% fewer incidents, 89% satisfaction":**
```json
{
  "title": "By the Numbers",
  "script": "AI-assisted development delivers measurable improvements across speed, quality, and satisfaction.",
  "notes": [
    "3.2x faster code review",
    "47% fewer production incidents",
    "89% developer satisfaction"
  ]
}
```

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

Same as Phase 2 — ask Vibe or Pro. Default to Pro.

### Step 5.4: Generate

Same as Phase 3 — read the appropriate supporting files and generate. For Pro mode, map extracted content to components using the decision table in component-templates.md.

Always generate the `.notes.json` file. If the source had speaker notes, preserve them.

### Step 5.5: Validate & Save

Before saving, verify all 8 spec rules pass. Fix any that fail. Save both the HTML and `.notes.json` files.

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

## Phase 7: Share & Export (Optional)

After delivery, ask: _"Would you like to share this presentation? I can deploy it to a live URL or export it as a PDF."_

Options: **Deploy to URL** / **Export to PDF** / **Both** / **No thanks**

If the user declines, stop here.

### 7A: Deploy to a Live URL (Vercel)

Deploys the presentation to a permanent shareable URL. Works on any device.

1. **Check prerequisites** — Run `npx vercel --version`. If not found, user needs Node.js first.
2. **Check login** — Run `npx vercel whoami`. If not logged in, guide through:
   - Sign up at https://vercel.com/signup (free)
   - Run `vercel login` to authorize
3. **Deploy** — Run:
   ```bash
   bash scripts/deploy.sh <path-to-presentation>
   ```
   Accepts a single HTML file or a folder with index.html.
4. **Share the URL** — Tell the user the live URL, that it works on any device, and that they can delete it from https://vercel.com/dashboard later.

**Requires:** Node.js + Vercel account (free tier)

### 7B: Export to PDF

Captures each slide as a screenshot and combines into a single PDF. Animations are not preserved (static snapshot).

1. **Run:**
   ```bash
   bash scripts/export-pdf.sh <path-to-html> [output.pdf]
   ```
   If no output path given, saves next to the HTML file.
2. **What happens:** Playwright opens a headless browser, screenshots each slide at 1920x1080, assembles PDF. Auto-installs Playwright + Chromium on first run.
3. **Large files:** If PDF exceeds 10MB, offer compact mode:
   ```bash
   bash scripts/export-pdf.sh <path-to-html> [output.pdf] --compact
   ```
   Renders at 1280x720 — typically 50-70% smaller.

**Requires:** Node.js (Playwright auto-installs)

---

## Supporting Files

| File | Purpose | When to Read |
|------|---------|-------------|
| [STYLE_PRESETS.md](references/STYLE_PRESETS.md) | Curated visual presets with colors, fonts, and signature elements | Phase 2 (style selection) |
| [viewport-base.css](assets/viewport-base.css) | Mandatory responsive CSS — copy into every presentation (presets 1-12) | Phase 3 (generation) |
| [html-template.md](references/html-template.md) | HTML structure, JS features, code quality standards (presets 1-12) | Phase 3 (generation) |
| [animation-patterns.md](references/animation-patterns.md) | CSS/JS animation snippets and effect-to-feeling guide (presets 1-12) | Phase 3 (generation) |
| [component-templates.md](references/component-templates.md) | Structured HTML component templates with decision table | Phase 3 (Pro) |
| [components.css](assets/components.css) | Shared component CSS for all Pro themes — copy verbatim | Phase 3 (Pro) |
| [themes/](assets/themes/) | Theme CSS files (dark-interactive, excalidraw, excalidraw-dark, editorial-light, binary-architect) — pick one | Phase 3 (Pro) |
| [dark-interactive-nav.js](assets/dark-interactive-nav.js) | Navigation JS — copy verbatim | Phase 3 (Pro) |
| [scripts/extract-pptx.py](scripts/extract-pptx.py) | Python script for PPT content extraction | Phase 4 (PPT conversion) |
| [conversion-patterns.md](references/conversion-patterns.md) | Framework detection patterns and extraction rules | Phase 5 (HTML conversion) |
| [scripts/deploy.sh](scripts/deploy.sh) | Deploy slides to Vercel for instant sharing | Phase 7 (sharing) |
| [scripts/export-pdf.sh](scripts/export-pdf.sh) | Export slides to PDF | Phase 7 (sharing) |
