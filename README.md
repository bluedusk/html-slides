# HTML Slides

A skill for creating stunning, animation-rich HTML presentations — from scratch or by converting PowerPoint files. Works with any IDE-based AI agent (Claude Code, Cursor, Copilot, Windsurf, Aider, etc.).

## What This Does

**HTML Slides** helps non-designers create beautiful web presentations without knowing CSS or JavaScript. It offers two modes:

1. **Creative mode** — "show, don't tell" style discovery with 12 curated visual presets
2. **Structured mode** — deterministic output using 11 interactive component templates (flip cards, code blocks, architecture flows, stats, etc.)

### Key Features

- **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools, no frameworks.
- **Cross-Agent Compatible** — Works with any AI agent that can read local files (Claude Code, Cursor, Copilot, Windsurf, etc.)
- **Visual Style Discovery** — Can't articulate design preferences? Pick from generated visual previews.
- **11 Interactive Components** — Flip cards, expandable cards, code blocks, architecture flows, stats cards, timelines, and more.
- **PPT Conversion** — Convert existing PowerPoint files to web, preserving all images and content.
- **Anti-AI-Slop** — Curated distinctive styles that avoid generic AI aesthetics.

## Installation

### For Claude Code

```bash
git clone https://github.com/bluedusk/html-slides.git ~/.claude/skills/html-slides
```

Then use it by typing `/html-slides` in Claude Code.

### For Cursor / Windsurf / Copilot

Clone or copy this repo into your project workspace:

```bash
git clone https://github.com/bluedusk/html-slides.git
```

Then tell your agent:
> "Read SKILL.md in the html-slides folder and follow it to create a presentation about [topic]."

### For any IDE-based agent

As long as the agent can read files from a local directory, it can use this skill. Point it at `SKILL.md` as the entry point.

## Usage

### Create a New Presentation

Tell your AI agent:
> "Create a presentation about [topic] using the html-slides skill"

The skill will:
1. Ask about your content (slides, messages, images)
2. Ask about the feeling you want (impressed? excited? calm?)
3. Generate 3 visual style previews for you to compare
4. Create the full presentation in your chosen style
5. Open it in your browser

### Use Structured Components (Dark Interactive)

For technical presentations with deterministic output:
> "Create a presentation about [topic] using the Dark Interactive preset from html-slides"

This uses the 11 component templates with copy-verbatim CSS/JS for consistent results across different AI agents.

### Convert a PowerPoint

> "Convert my presentation.pptx to a web slideshow using html-slides"

## Included Styles

### Dark Themes
- **Bold Signal** — Confident, high-impact, vibrant card on dark
- **Electric Studio** — Clean, professional, split-panel
- **Creative Voltage** — Energetic, retro-modern, electric blue + neon
- **Dark Botanical** — Elegant, sophisticated, warm accents

### Light Themes
- **Notebook Tabs** — Editorial, organized, paper with colorful tabs
- **Pastel Geometry** — Friendly, approachable, vertical pills
- **Split Pastel** — Playful, modern, two-color vertical split
- **Vintage Editorial** — Witty, personality-driven, geometric shapes

### Specialty
- **Neon Cyber** — Futuristic, particle backgrounds, neon glow
- **Terminal Green** — Developer-focused, hacker aesthetic
- **Swiss Modern** — Minimal, Bauhaus-inspired, geometric
- **Paper & Ink** — Literary, drop caps, pull quotes

### Structured
- **Dark Interactive** — 11 interactive component templates with deterministic output. Best for technical presentations and cross-agent reliability.

## Architecture

This skill uses **progressive disclosure** — the main `SKILL.md` is a concise map, with supporting files loaded on-demand:

| File | Purpose | Loaded When |
|------|---------|-------------|
| `SKILL.md` | Core workflow and rules | Always (entry point) |
| `STYLE_PRESETS.md` | 13 curated visual presets | Phase 2 (style selection) |
| `viewport-base.css` | Mandatory responsive CSS | Phase 3 (creative presets) |
| `html-template.md` | HTML structure and JS features | Phase 3 (creative presets) |
| `animation-patterns.md` | CSS/JS animation reference | Phase 3 (creative presets) |
| `component-templates.md` | 11 structured component templates | Phase 3 (Dark Interactive) |
| `dark-interactive.css` | Complete CSS for Dark Interactive | Phase 3 (Dark Interactive) |
| `dark-interactive-nav.js` | Navigation JS for Dark Interactive | Phase 3 (Dark Interactive) |
| `scripts/extract-pptx.py` | PPT content extraction | Phase 4 (conversion) |

## Requirements

- Any IDE-based AI agent that can read local files
- For PPT conversion: Python with `python-pptx` library

## Credits

Originally created by [@zarazhangrui](https://github.com/zarazhangrui) with Claude Code.
Dark Interactive component system added by [@bluedusk](https://github.com/bluedusk).

## License

MIT — Use it, modify it, share it.
