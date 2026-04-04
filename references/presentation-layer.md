# Presentation Layer

Shared requirements for all HTML Slides presentations, regardless of style preset. This is the layer that turns a designed HTML page into a functional slide presentation.

## Slide Structure

Every presentation must use this HTML structure:

```html
<div class="deck" id="deck">
  <div class="slide active" data-slide="0">
    <!-- slide content -->
    <script type="application/json" class="slide-notes">
    {"title":"...","script":"...","notes":["..."]}
    </script>
  </div>
  <div class="slide" data-slide="1">
    <!-- slide content -->
    <script type="application/json" class="slide-notes">
    {"title":"...","script":"...","notes":["..."]}
    </script>
  </div>
  <!-- ... more slides ... -->
</div>
```

- All slides are `<div class="slide">` inside `<div class="deck" id="deck">`
- Sequential `data-slide` numbering from `0` to `N`
- First slide gets `class="slide active"`, no other slide has `active`
- Each slide's last child is a `<script class="slide-notes">` block

## Speaker Notes

Every slide **must** include an inline `<script type="application/json" class="slide-notes">` block as its last child.

**Format:**
```json
{
  "title": "Slide heading",
  "script": "What the presenter reads aloud. Natural, conversational, professional.",
  "notes": ["Key point 1", "Key point 2", "Key point 3"]
}
```

- `title` — Slide heading (for console display and presenter apps)
- `script` — What the presenter would **say** to the audience. Not a description of the slide — the actual words.
- `notes` — Bullet points summarizing the key talking points

**Script tone:** Conversational but professional.
- GOOD: "Here's what makes this different — everything lives in one HTML file."
- BAD: "This slide uses a Statement component with a glow blob background."

**Notes content:** What the slide communicates, not how it's built.
- GOOD: ["Single self-contained HTML file", "No build tools", "Works offline"]
- BAD: ["Large centered text", "Glow blob in background", "fadeInUp animation"]

**Never include:** delivery instructions, transition cues, presentation advice, or meta commentary.

## Spec Rules (8 total)

After generating or modifying ANY presentation, verify all 8 rules:

1. `<div class="deck" id="deck">` exists
2. All slides are `<div class="slide">` with sequential `data-slide="0"` through `data-slide="N"`
3. First slide has `class="slide active"`, no other slide has `active`
4. Global `goTo()`, `next()`, `prev()` functions exist
5. All CSS inline (except font imports)
6. All JS inline (except CDN libraries: Chart.js, Mermaid, anime.js)
7. No broken numbering gaps after insertions or deletions
8. `<meta name="generator" content="html-slides vX.Y.Z">` exists in `<head>`

## Content Density Limits

Each slide must fit exactly within 100vh. No scrolling, ever.

| Slide Type | Maximum Content |
|------------|-----------------|
| Title slide | 1 heading + 1 subtitle + optional tagline |
| Content slide | 1 heading + 4-6 bullet points OR 1 heading + 2 paragraphs |
| Feature grid | 1 heading + 6 cards maximum (2x3 or 3x2) |
| Code slide | 1 heading + 8-10 lines of code |
| Quote slide | 1 quote (max 3 lines) + attribution |
| Image slide | 1 heading + 1 image (max 60vh height) |
| Chart slide | 1 heading + 1 chart (max 50vh height) + optional subtitle |

Content exceeds limits? Split into multiple slides. Never cram, never scroll.

## Navigation Requirements

The presentation must support:
- Keyboard: Arrow keys, Space, PageUp/PageDown, Home/End
- Touch: Swipe left/right (50px threshold)
- Scroll: Mouse wheel with ~600ms cooldown
- Click: Navigation dots

Build navigation inline following the pattern in [html-template.md](html-template.md). Generate `goTo()`, `next()`, `prev()` as global functions, plus speaker notes console logging on each slide change.

## Generator Meta Tag

Every presentation must include in `<head>`:
```html
<meta name="generator" content="html-slides v0.9.3">
```
