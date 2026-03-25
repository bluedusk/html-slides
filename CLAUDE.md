# Project Instructions

## Version Bumps

See [RELEASE.md](RELEASE.md) for the release process. Version must be updated in **all 4 locations** simultaneously — never update just one:

1. `.claude-plugin/plugin.json`
2. `.claude-plugin/marketplace.json` (2 entries)
3. `SKILL.md` frontmatter
4. `references/html-template.md` — the `<meta name="generator">` tag version

## Project Structure

- `SKILL.md` — Main skill entry point (Pro + Vibe modes)
- `assets/components.css` — Shared component CSS for all Pro themes
- `assets/themes/` — Theme CSS files (one per Pro theme)
- `assets/dark-interactive-nav.js` — Shared navigation JS for all Pro themes
- `references/` — Supporting docs loaded on-demand by the skill
- `.claude-plugin/` — Plugin manifest and marketplace config
