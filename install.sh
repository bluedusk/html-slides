#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_NAME="html-slides"

echo "HTML Slides Installer"
echo "====================="
echo "Repo: $REPO_DIR"
echo ""

# --- Agent Skills standard (all agents) ---
AGENTS_DIR="$HOME/.agents/skills"
SKILL_LINK="$AGENTS_DIR/$SKILL_NAME"

mkdir -p "$AGENTS_DIR"

if [ -e "$SKILL_LINK" ]; then
  current="$(readlink "$SKILL_LINK" 2>/dev/null || true)"
  if [ "$current" != "$REPO_DIR" ]; then
    rm -f "$SKILL_LINK"
    ln -s "$REPO_DIR" "$SKILL_LINK"
    echo "[Agent Skills] Updated symlink to $REPO_DIR"
  else
    echo "[Agent Skills] Already installed at $SKILL_LINK"
  fi
else
  ln -s "$REPO_DIR" "$SKILL_LINK"
  echo "[Agent Skills] Installed to $SKILL_LINK"
fi

# --- Claude Code plugin (optional, for marketplace/slash command support) ---
if command -v claude &>/dev/null; then
  echo ""
  MARKETPLACE_DIR="$HOME/.claude/plugins/local-marketplace"
  PLUGIN_LINK="$MARKETPLACE_DIR/plugins/$SKILL_NAME"

  if [ -d "$MARKETPLACE_DIR" ]; then
    if [ -e "$PLUGIN_LINK" ]; then
      echo "[Claude Code] Plugin already linked"
    else
      ln -s "$REPO_DIR" "$PLUGIN_LINK"
      echo "[Claude Code] Linked plugin into local marketplace"
    fi
    claude plugin marketplace update local-plugins 2>/dev/null || true
    claude plugin update "$SKILL_NAME@local-plugins" 2>/dev/null \
      || claude plugin install "$SKILL_NAME@local-plugins" 2>/dev/null \
      || true
    echo "[Claude Code] Plugin installed. Restart to apply."
  else
    echo "[Claude Code] No local marketplace found. Skill is still available via Agent Skills path."
  fi
fi

echo ""
echo "Done. This skill is now available to:"
echo "  - Claude Code"
echo "  - Gemini CLI"
echo "  - GitHub Copilot"
echo "  - OpenAI Codex"
echo ""
echo "Restart your agent to pick up the new skill."
