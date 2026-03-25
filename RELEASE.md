# Release Process

## Version Locations

The version number lives in **3 files**. All must be updated together:

| File | Field |
|------|-------|
| `.claude-plugin/plugin.json` | `"version"` |
| `.claude-plugin/marketplace.json` | `"version"` (2 entries — both plugins) |
| `SKILL.md` | frontmatter `version` |

## How to Bump

1. Update all 3 files to the new version
2. Commit with message: `Bump to vX.Y.Z`
3. Push to main

## Versioning

- **Patch** (0.6.x) — Theme additions, font/layout tweaks, doc updates
- **Minor** (0.x.0) — New components, mode changes, breaking workflow changes
- **Major** (x.0.0) — Complete redesign or architecture overhaul
