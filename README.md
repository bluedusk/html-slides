# HTML Slides

[![Version](https://img.shields.io/github/v/tag/bluedusk/html-slides?label=version)](https://github.com/bluedusk/html-slides/releases) [![Agent Skills](https://img.shields.io/badge/Agent_Skills-compatible-green)](https://agentskills.io) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A skill for creating stunning, animation-rich HTML presentations — from scratch or by converting PowerPoint files. Works with AI coding agents (Claude Code, Gemini CLI, GitHub Copilot, OpenAI Codex).

**[htmlslides.com](https://htmlslides.com)** | **[Live Demo: Intro to MCP](https://bluedusk.github.io/html-slides/intro-to-mcp.html)**

## What This Does

**HTML Slides** helps non-designers create beautiful web presentations without knowing CSS or JavaScript. It offers two modes:

1. **Advanced (Recommended)** — Interactive components (flip cards, charts, tables, code blocks, and more) with deterministic output. This is the default when no mode is specified.
2. **Simple** — Multiple creative themes with AI-driven layout. Pick a mood, see previews, get a polished deck.

### Key Features

- **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools, no frameworks.
- **Agent Skills Standard** — One install works across Claude Code, Gemini CLI, GitHub Copilot, and OpenAI Codex.
- **Visual Style Discovery** — Can't articulate design preferences? Pick from generated visual previews.
- **Rich Component Library** — Flip cards, expandable cards, code blocks, architecture flows, stats cards, charts (via Chart.js), tables, timelines, and more.
- **PPT Conversion** — Convert existing PowerPoint files to web, preserving all images and content.
- **Anti-AI-Slop** — Curated distinctive styles that avoid generic AI aesthetics.

## Installation

### Quick Install (Recommended)

```bash
curl -sSL https://raw.githubusercontent.com/bluedusk/html-slides/main/remote-install.sh | bash
```

This one command clones the repo, detects your agents, and sets up everything. **Run the same command again to update.**

### Install from cloned repo

```bash
git clone https://github.com/bluedusk/html-slides.git
cd html-slides
./install.sh
```

Interactive installer with user-level vs project-level scope choice.

### Manual Install

Pick your agent(s) below. Replace `/path/to/html-slides` with the actual path to your cloned repo.

#### Claude Code

**Via plugin marketplace (recommended):**

```bash
claude plugin marketplace add bluedusk/html-slides
claude plugin install html-slides
```

**Via skill symlink:**

```bash
# User-level (available in all projects)
ln -s /path/to/html-slides ~/.claude/skills/html-slides

# Project-level (available only in current project)
ln -s /path/to/html-slides .claude/skills/html-slides
```

#### Gemini CLI

```bash
# User-level (available in all projects)
ln -s /path/to/html-slides ~/.gemini/skills/html-slides

# Project-level (available only in current project)
ln -s /path/to/html-slides .gemini/skills/html-slides
```

#### GitHub Copilot

```bash
# Project-level only (Copilot reads .github/skills/)
ln -s /path/to/html-slides .github/skills/html-slides
```

#### OpenAI Codex

```bash
# User-level (available in all projects)
ln -s /path/to/html-slides ~/.codex/skills/html-slides

# Project-level (available only in current project)
ln -s /path/to/html-slides .codex/skills/html-slides
```

All agents also support the universal `~/.agents/skills/` path as defined by the [Agent Skills standard](https://agentskills.io/specification).

## Two Modes

HTML Slides offers two modes. **Advanced is the default** — if you don't specify a mode, you get the full interactive component system.

### Advanced Mode — Dark Interactive (Default)

Structured interactive components with deterministic output. The AI maps your content to the right component type automatically.

> "Create a presentation about [topic]"

**Components included:**

| Component | What it does |
|-----------|-------------|
| Title Slide | Opening with hero text and rainbow gradient |
| Statement | Bold centered text with glow |
| Flip Cards | 2x2 grid, click to reveal back side |
| VS/Comparison | Side-by-side with visual contrast |
| Architecture Flow | Connected boxes showing a pipeline |
| Code Block | Syntax-highlighted terminal window |
| Auth Flip Compare | Before/after with red/green flip cards |
| Stats Cards | Large animated numbers |
| Expandable Cards | Click to reveal hidden details |
| Status Timeline | Vertical list with colored status dots |
| Table | Styled data table with hover highlights |
| Chart | 8 chart types via Chart.js (bar, line, pie, doughnut, radar, polar, scatter, bubble) |
| CTA Box | Call-to-action with resource links |

Best for: technical talks, product demos, data-rich presentations, API overviews.

### Simple Mode — Creative Themes

AI interprets your content freely with distinctive visual styles. No structured templates — the AI decides the best layout for your content.

> "Create a simple presentation about [topic]"

The skill will:
1. Ask about your content (slides, messages, images)
2. Ask about the feeling you want (impressed? excited? calm?)
3. Generate 3 visual style previews to compare
4. Create the full presentation in your chosen style

**Available themes:**

| Category | Themes |
|----------|--------|
| Dark | Bold Signal, Electric Studio, Creative Voltage, Dark Botanical |
| Light | Notebook Tabs, Pastel Geometry, Split Pastel, Vintage Editorial |
| Specialty | Neon Cyber, Terminal Green, Swiss Modern, Paper & Ink |

Best for: pitch decks, keynotes, non-technical presentations.

### Convert a PowerPoint

> "Convert my presentation.pptx to a web slideshow"

## Architecture

This skill uses **progressive disclosure** — the main `SKILL.md` is a concise map, with supporting files loaded on-demand:

| File | Purpose | Loaded When |
|------|---------|-------------|
| `SKILL.md` | Core workflow and rules | Always (entry point) |
| `references/STYLE_PRESETS.md` | Curated visual presets | Phase 2 (style selection) |
| `references/html-template.md` | HTML structure and JS features | Phase 3 (Simple) |
| `references/animation-patterns.md` | CSS/JS animation reference | Phase 3 (Simple) |
| `references/component-templates.md` | Structured component templates | Phase 3 (Advanced) |
| `assets/viewport-base.css` | Mandatory responsive CSS | Phase 3 (Simple) |
| `assets/dark-interactive.css` | Complete CSS for Dark Interactive | Phase 3 (Advanced) |
| `assets/dark-interactive-nav.js` | Navigation JS + Chart.js integration | Phase 3 (Advanced) |
| `scripts/extract-pptx.py` | PPT content extraction | Phase 4 (conversion) |

## Requirements

- Any agent supporting the [Agent Skills standard](https://agentskills.io)
- For PPT conversion: Python with `python-pptx` library

## Credits

Originally created by [@zarazhangrui](https://github.com/zarazhangrui) with Claude Code.
Dark Interactive component system added by [@bluedusk](https://github.com/bluedusk).

## License

MIT — Use it, modify it, share it.
