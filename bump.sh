#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

# Read current version from SKILL.md (source of truth)
current=$(grep 'version:' "$REPO_DIR/SKILL.md" | head -1 | sed 's/.*version:[[:space:]]*"\(.*\)"/\1/')

if [ -z "$current" ]; then
  echo "Error: Could not read version from SKILL.md"
  exit 1
fi

IFS='.' read -r major minor patch <<< "$current"

# Determine bump type
bump="${1:-patch}"
case "$bump" in
  patch) patch=$((patch + 1)) ;;
  minor) minor=$((minor + 1)); patch=0 ;;
  major) major=$((major + 1)); minor=0; patch=0 ;;
  *)
    echo "Usage: ./bump.sh [patch|minor|major]"
    echo "  patch  $current → $major.$minor.$((patch + 1))"
    echo "  minor  $current → $major.$((minor + 1)).0"
    echo "  major  $current → $((major + 1)).0.0"
    exit 1
    ;;
esac

new="$major.$minor.$patch"

echo "Bumping $current → $new"

# Update all three files
sed -i '' "s/version: \"$current\"/version: \"$new\"/" "$REPO_DIR/SKILL.md"
sed -i '' "s/\"version\": \"$current\"/\"version\": \"$new\"/g" "$REPO_DIR/.claude-plugin/plugin.json"
sed -i '' "s/\"version\": \"$current\"/\"version\": \"$new\"/g" "$REPO_DIR/.claude-plugin/marketplace.json"

echo "Updated:"
echo "  SKILL.md                      → $new"
echo "  .claude-plugin/plugin.json    → $new"
echo "  .claude-plugin/marketplace.json → $new"

# Commit and push (triggers release workflow)
git -C "$REPO_DIR" add SKILL.md .claude-plugin/plugin.json .claude-plugin/marketplace.json
git -C "$REPO_DIR" commit -m "Bump to v$new"
git -C "$REPO_DIR" push

echo ""
echo "Pushed. Release workflow will create tag v$new automatically."
