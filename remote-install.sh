#!/usr/bin/env bash
set -euo pipefail

SKILL_NAME="html-slides"
REPO_URL="https://github.com/bluedusk/html-slides.git"
INSTALL_DIR="$HOME/.html-slides"

echo ""
echo "  HTML Slides Installer"
echo "  ====================="
echo ""

# --- Clone or update repo ---
if [ -d "$INSTALL_DIR/.git" ]; then
  echo "  Updating $INSTALL_DIR..."
  git -C "$INSTALL_DIR" pull --quiet
  echo "  ✓ Updated to latest"
else
  echo "  Cloning to $INSTALL_DIR..."
  git clone --quiet "$REPO_URL" "$INSTALL_DIR"
  echo "  ✓ Cloned"
fi

echo ""

# --- Detect agents ---
agents=()
command -v claude &>/dev/null && agents+=("claude")
command -v gemini &>/dev/null && agents+=("gemini")
command -v gh &>/dev/null     && agents+=("copilot")
command -v codex &>/dev/null  && agents+=("codex")

if [ ${#agents[@]} -eq 0 ]; then
  echo "  No supported agents detected."
  echo "  Skill downloaded to $INSTALL_DIR"
  echo "  Symlink it manually — see README.md"
  exit 0
fi

echo "  Detected: ${agents[*]}"
echo ""

install_skill() {
  local target_dir="$1"
  local label="$2"
  local link="$target_dir/$SKILL_NAME"

  mkdir -p "$target_dir"
  if [ -L "$link" ]; then
    current="$(readlink "$link" 2>/dev/null || true)"
    if [ "$current" = "$INSTALL_DIR" ]; then
      echo "  ✓ $label — up to date"
      return
    fi
    rm -f "$link"
  fi
  if [ -e "$link" ]; then
    echo "  ✗ $label — path exists, skipping"
    return
  fi
  ln -s "$INSTALL_DIR" "$link"
  echo "  ✓ $label — installed"
}

# --- Install for each agent ---
for agent in "${agents[@]}"; do
  case "$agent" in
    claude)
      # Claude Code: plugin marketplace
      if claude plugin marketplace list 2>/dev/null | grep -q "html-slides"; then
        claude plugin marketplace update html-slides 2>/dev/null || true
        claude plugin update "$SKILL_NAME@html-slides" 2>/dev/null \
          || claude plugin install "$SKILL_NAME@html-slides" 2>/dev/null \
          || true
        echo "  ✓ Claude Code plugin — updated"
      else
        claude plugin marketplace add bluedusk/html-slides 2>/dev/null || true
        claude plugin install "$SKILL_NAME@html-slides" 2>/dev/null || true
        echo "  ✓ Claude Code plugin — installed"
      fi
      ;;
    gemini)
      install_skill "$HOME/.gemini/skills" "Gemini CLI"
      ;;
    copilot)
      echo "  ℹ GitHub Copilot — project-level only. Run from your project:"
      echo "    ln -s $INSTALL_DIR .github/skills/$SKILL_NAME"
      ;;
    codex)
      install_skill "$HOME/.codex/skills" "OpenAI Codex"
      ;;
  esac
done

echo ""
echo "  Done. Restart your agent to pick up the skill."
echo "  To update later, run this command again."
echo ""
