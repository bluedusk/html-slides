# HTML Slides

[![Version](https://img.shields.io/github/v/tag/bluedusk/html-slides?label=version)](https://github.com/bluedusk/html-slides/releases) [![Agent Skills](https://img.shields.io/badge/Agent_Skills-compatible-green)](https://agentskills.io) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A skill for creating stunning, animation-rich HTML presentations — from scratch or by converting PowerPoint files. Works with AI coding agents (Claude Code, Gemini CLI, GitHub Copilot, OpenAI Codex).

**[htmlslides.com](https://htmlslides.com)** | **[Live Demo: Intro to MCP](https://bluedusk.github.io/html-slides/intro-to-mcp.html)**

## What This Does

**HTML Slides** helps non-designers create beautiful web presentations without knowing CSS or JavaScript. It offers two modes:

1. **Creative mode** — "show, don't tell" style discovery with 13 curated visual presets
2. **Structured mode** — deterministic output using 13 interactive component templates (flip cards, code blocks, architecture flows, stats, etc.)

### Key Features

- **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools, no frameworks.
- **Agent Skills Standard** — One install works across Claude Code, Gemini CLI, GitHub Copilot, and OpenAI Codex.
- **Visual Style Discovery** — Can't articulate design preferences? Pick from generated visual previews.
- **13 Interactive Components** — Flip cards, expandable cards, code blocks, architecture flows, stats cards, charts (via Chart.js), tables, timelines, and more.
- **PPT Conversion** — Convert existing PowerPoint files to web, preserving all images and content.
- **Anti-AI-Slop** — Curated distinctive styles that avoid generic AI aesthetics.

## Installation

```bash
git clone https://github.com/bluedusk/html-slides.git
cd html-slides
./install.sh
```

The install script:
1. Symlinks the repo into `~/.agents/skills/html-slides` ([Agent Skills standard](https://agentskills.io/specification)) — works for all agents
2. If Claude Code is detected, also installs as a plugin for marketplace updates and `/html-slides` slash command

Or install manually:

```bash
# All agents (Agent Skills standard)
ln -s /path/to/html-slides ~/.agents/skills/html-slides

# Claude Code plugin (optional, for marketplace support)
ln -s /path/to/html-slides ~/.claude/plugins/local-marketplace/plugins/html-slides
claude plugin marketplace update local-plugins
claude plugin install html-slides@local-plugins
```

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

This uses the 13 component templates with copy-verbatim CSS/JS for consistent results across different AI agents.

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
- **Dark Interactive** — 13 interactive component templates with deterministic output. Best for technical presentations and cross-agent reliability.

## Architecture

This skill uses **progressive disclosure** — the main `SKILL.md` is a concise map, with supporting files loaded on-demand:

| File | Purpose | Loaded When |
|------|---------|-------------|
| `SKILL.md` | Core workflow and rules | Always (entry point) |
| `references/STYLE_PRESETS.md` | 13 curated visual presets | Phase 2 (style selection) |
| `references/html-template.md` | HTML structure and JS features | Phase 3 (creative presets) |
| `references/animation-patterns.md` | CSS/JS animation reference | Phase 3 (creative presets) |
| `references/component-templates.md` | 13 structured component templates | Phase 3 (Dark Interactive) |
| `assets/viewport-base.css` | Mandatory responsive CSS | Phase 3 (creative presets) |
| `assets/dark-interactive.css` | Complete CSS for Dark Interactive | Phase 3 (Dark Interactive) |
| `assets/dark-interactive-nav.js` | Navigation JS + Chart.js integration | Phase 3 (Dark Interactive) |
| `scripts/extract-pptx.py` | PPT content extraction | Phase 4 (conversion) |

## Requirements

- Any agent supporting the [Agent Skills standard](https://agentskills.io)
- For PPT conversion: Python with `python-pptx` library

## Credits

Originally created by [@zarazhangrui](https://github.com/zarazhangrui) with Claude Code.
Dark Interactive component system added by [@bluedusk](https://github.com/bluedusk).

## License

MIT — Use it, modify it, share it.
