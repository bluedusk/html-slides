# Project Instructions

## Upstream Dependency

This project (html-slides) builds on top of **frontend-slides** (https://github.com/zarazhangrui/frontend-slides), a third-party Claude Code plugin for generating HTML presentations. We extend it with content-driven design, additional CDN libraries (Mermaid.js, anime.js), and improved style discovery. The upstream project's files (viewport-base.css, components.css, slides-runtime.js, theme CSS, component-templates.md, html-template.md, STYLE_PRESETS.md) should not be modified unless fixing a confirmed upstream bug.

## Version Bumps

See [RELEASE.md](RELEASE.md) for the release process. Version must be updated in **all 5 locations** simultaneously — never update just one:

1. `.claude-plugin/plugin.json`
2. `.claude-plugin/marketplace.json` (2 entries)
3. `SKILL.md` frontmatter
4. `references/html-template.md` — the `<meta name="generator">` tag version
5. `references/presentation-layer.md` — the `<meta name="generator">` tag version

## Project Structure

- `SKILL.md` — Main skill entry point (Pro + Vibe modes)
- `assets/components.css` — Shared component CSS for all Pro themes
- `assets/themes/` — Theme CSS files (one per Pro theme)
- `assets/slides-runtime.js` — Shared runtime JS for all Pro themes (nav, charts, particles, speaker notes)
- `references/` — Supporting docs loaded on-demand by the skill
- `.claude-plugin/` — Plugin manifest and marketplace config
