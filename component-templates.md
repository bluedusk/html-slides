# Component Templates Reference

Structured, copy-ready HTML component templates for building slide presentations with deterministic output. Use these when you need reliable, interactive slide components rather than creative interpretation.

## When to Use Component Templates

Use these templates when:
- You need **deterministic, consistent output** across different AI agents
- The content fits naturally into one of the 11 component types below
- You want interactive elements (flip cards, expandable cards, code blocks)

For more creative, style-diverse presentations, use the style presets in [STYLE_PRESETS.md](STYLE_PRESETS.md) instead.

---

## Content-to-Component Decision Table

Use this table to pick the right component for each piece of content:

| Content Pattern | Best Component | Why |
|---|---|---|
| Opening / title / author | **Title Slide** | Sets the topic and tone |
| Bold statement or key insight | **Statement Slide** | Large centered text with glow |
| 4 related concepts/features | **Flip Cards** | Each gets a front (summary) + back (detail) |
| 2 things being compared | **VS/Comparison** | Side-by-side with visual contrast |
| 3-step process or pipeline | **Architecture Flow** | Boxes with arrows show flow |
| Code example, config, or API | **Code Block** | Syntax-highlighted macOS terminal |
| Good vs bad / before vs after | **Auth Flip Compare** | Two large flip cards with red/green |
| 3 metrics or numbers | **Stats Cards** | Large bouncing numbers with labels |
| 4 items with hidden details | **Expandable Cards** | Click to reveal hidden content |
| 3-6 status items or timeline | **Status Timeline** | Vertical list with colored dots |
| Resources, links, next steps | **CTA Box** | Gradient box with bullet list |

## Recommended Slide Narrative Structure

| Slide Position | Purpose | Recommended Component |
|---|---|---|
| 1 | **Title** — topic + author | Title Slide (always) |
| 2 | **Hook** — dramatic statement or question | Statement Slide |
| 3-4 | **Problem** — what's broken/missing | Flip Cards or Statement |
| 5-6 | **Solution** — introduce the answer | VS/Comparison or Architecture |
| 7-9 | **Evidence** — show how it works | Code Block, Stats, Expandable Cards |
| 10-11 | **Depth** — deeper details or comparison | Auth Flip Compare, Status Timeline |
| 12-13 | **Impact** — results, metrics, outcomes | Stats Cards or Statement |
| Last | **CTA** — resources and next steps | CTA Box (always) |

---

## HTML Component Templates

### 1. Title Slide

The opening slide with large hero text, rainbow gradient title, glow blobs, and a rainbow divider line.

```html
<div class="slide active" data-slide="0">
  <div class="glow-blob glow-blue" style="top:-100px;left:-100px;"></div>
  <div class="glow-blob glow-purple" style="bottom:-120px;right:-80px;"></div>
  <p class="slide-tag anim-1">[TAG_LINE]</p>
  <h1 class="anim-2">[TITLE_LINE_1]<br>[TITLE_LINE_2]<br><span class="rainbow-text">[HIGHLIGHT_WORD]</span> [TITLE_LINE_3]</h1>
  <p class="subtitle anim-3">[SUBTITLE_TEXT]</p>
  <div class="rainbow-line anim-4"></div>
  <p class="subtitle anim-5" style="font-size:14px;margin-top:8px;">by <strong>[AUTHOR]</strong></p>
</div>
```

**When to use**: Always the first slide. Sets the topic and tone.

### 2. Statement Slide

A bold statement with large text, optional glow blob background, and a subtitle below.

```html
<div class="slide" data-slide="[N]">
  <div class="glow-blob glow-purple" style="top:50%;left:50%;transform:translate(-50%,-50%);"></div>
  <p class="slide-tag anim-1">[TAG]</p>
  <h1 class="anim-2" style="font-size:clamp(32px,4.5vw,56px);">[STATEMENT_TEXT]<br><span class="highlight-[COLOR]">[HIGHLIGHTED_PHRASE]</span></h1>
  <div class="rainbow-line anim-3"></div>
  <p class="subtitle anim-4">[SUPPORTING_TEXT]</p>
</div>
```

**When to use**: Hook slides, problem statements, key takeaways, dramatic reveals.

### 3. Flip Cards (2x2 Grid)

Four interactive cards in a 2x2 grid. Each card flips on click to reveal a detail on the back.

**CRITICAL**: The `bounce-N` animation class goes on the `.flip-bounce-wrap` wrapper, NOT on the `.flip-card` itself. This prevents the bounceIn animation from overriding the flip transform.

```html
<div class="slide" data-slide="[N]">
  <h2 class="anim-1">[HEADING] <span class="highlight-[COLOR]">[HIGHLIGHT]</span></h2>
  <p class="subtitle anim-2" style="font-size:15px;">Click cards to flip &amp; reveal details</p>
  <div class="flip-grid anim-3">
    <div class="flip-bounce-wrap bounce-1">
      <div class="flip-card" onclick="this.classList.toggle('flipped')">
        <div class="flip-front border-[COLOR]">
          <div class="flip-icon">[EMOJI]</div>
          <div class="flip-title">[CARD_TITLE]</div>
          <div class="flip-subtitle highlight-[COLOR]">[CARD_SUBTITLE]</div>
          <div class="flip-hint">click to flip</div>
        </div>
        <div class="flip-back">
          <div class="flip-icon-big">[EMOJI]</div>
          <div class="flip-detail">[BACK_TEXT with <strong>bold keywords</strong>]</div>
        </div>
      </div>
    </div>
    <!-- Repeat for bounce-2, bounce-3, bounce-4 -->
  </div>
</div>
```

**Border color options**: `border-orange`, `border-yellow`, `border-red`
**When to use**: 4 related concepts, problems, features, or comparisons.

### 4. VS / Comparison Cards

Two side-by-side cards with a pulsing "+" connector between them.

```html
<div class="slide" data-slide="[N]">
  <div class="glow-blob glow-blue" style="top:30%;left:20%;"></div>
  <p class="slide-tag anim-1">[TAG]</p>
  <h2 class="anim-2">[HEADING]</h2>
  <div class="vs-container anim-3">
    <div class="vs-card card-left slide-l">
      <div class="vs-label-top highlight-purple">[LEFT_LABEL]</div>
      <div class="vs-name highlight-purple">[LEFT_NAME]</div>
      <div class="vs-desc">[LEFT_DESC]</div>
      <div class="vs-badge">[LEFT_BADGE]</div>
    </div>
    <div class="vs-plus anim-3">+</div>
    <div class="vs-card card-right slide-r">
      <div class="vs-label-top highlight-blue">[RIGHT_LABEL]</div>
      <div class="vs-name gradient-text">[RIGHT_NAME]</div>
      <div class="vs-desc">[RIGHT_DESC]</div>
      <div class="vs-badge">[RIGHT_BADGE]</div>
    </div>
  </div>
  <p class="subtitle anim-4 mt-24" style="font-size:15px;">[BOTTOM_TEXT]</p>
</div>
```

**When to use**: Comparing two technologies, approaches, or before/after states.

### 5. Architecture Flow

Three boxes connected by arrows in a horizontal flow.

```html
<div class="slide" data-slide="[N]">
  <p class="slide-tag anim-1">[TAG]</p>
  <h2 class="anim-2">[HEADING]</h2>
  <p class="subtitle anim-2" style="font-size:14px;">[FLOW_SUMMARY]</p>
  <div class="arch-flow anim-3">
    <div class="arch-box box-blue bounce-1">
      <div class="arch-icon">[EMOJI]</div>
      <div class="arch-label text-blue">[BOX_1_NAME]</div>
      <div class="arch-role">[BOX_1_ROLE]</div>
      <div class="arch-detail">[BOX_1_DETAIL]</div>
    </div>
    <div class="arch-arrow anim-3">
      <span>[ARROW_1_LABEL]</span>
      <div class="arrow-line"></div>
    </div>
    <div class="arch-box box-yellow bounce-2">
      <div class="arch-icon">[EMOJI]</div>
      <div class="arch-label text-yellow">[BOX_2_NAME]</div>
      <div class="arch-role">[BOX_2_ROLE]</div>
      <div class="arch-detail">[BOX_2_DETAIL]</div>
    </div>
    <div class="arch-arrow anim-3">
      <span>[ARROW_2_LABEL]</span>
      <div class="arrow-line"></div>
    </div>
    <div class="arch-box box-green bounce-3">
      <div class="arch-icon">[EMOJI]</div>
      <div class="arch-label text-green">[BOX_3_NAME]</div>
      <div class="arch-role">[BOX_3_ROLE]</div>
      <div class="arch-detail">[BOX_3_DETAIL]</div>
    </div>
  </div>
  <p class="subtitle anim-4 mt-24" style="font-size:14px;">[BOTTOM_TEXT]</p>
</div>
```

**Box color options**: `box-blue`/`text-blue`, `box-yellow`/`text-yellow`, `box-green`/`text-green`
**When to use**: System architecture, data pipelines, any 3-step process.

### 6. Code Block

macOS-style terminal window with syntax highlighting (One Dark Pro).

```html
<div class="slide" data-slide="[N]">
  <p class="slide-tag anim-1">[TAG]</p>
  <h2 class="anim-2">[HEADING]</h2>
  <p class="subtitle anim-2" style="font-size:14px;">[CODE_DESCRIPTION]</p>
  <div class="code-window anim-3">
    <div class="code-titlebar">
      <div class="code-dot red"></div>
      <div class="code-dot yellow"></div>
      <div class="code-dot green"></div>
      <span class="code-filename">[FILENAME]</span>
    </div>
    <div class="code-body">
<span class="ln">1</span>[SYNTAX_HIGHLIGHTED_LINE_1]
<span class="ln">2</span>[SYNTAX_HIGHLIGHTED_LINE_2]
    </div>
  </div>
  <p class="subtitle anim-4 mt-16" style="font-size:14px;">[BOTTOM_TEXT]</p>
</div>
```

**When to use**: Code examples, config files, API usage, CLI commands.
**See**: [Syntax Highlighting Guide](#syntax-highlighting-guide) below.

### 7. Auth Flip Compare

Two large flippable cards with a "vs" label. Good vs bad / before vs after.

**CRITICAL**: The `slide-l`/`slide-r` animation class goes on the `.auth-flip-wrap` wrapper, NOT on the `.auth-flip` itself.

```html
<div class="slide" data-slide="[N]">
  <h2 class="anim-1">[HEADING]</h2>
  <p class="subtitle anim-2" style="font-size:14px;">Click to flip and compare</p>
  <div class="auth-compare anim-3">
    <div class="auth-flip-wrap slide-l">
      <div class="auth-flip" onclick="this.classList.toggle('flipped')">
        <div class="auth-front bad">
          <div class="auth-icon">[BAD_EMOJI]</div>
          <div class="auth-name">[BAD_NAME]</div>
          <div class="auth-status">&#10060;</div>
          <div class="auth-desc">[BAD_SHORT_DESC]</div>
          <div class="flip-hint">click to flip</div>
        </div>
        <div class="auth-back">
          <div class="auth-icon">[BAD_EMOJI]</div>
          <div class="auth-name">[BAD_DETAIL_NAME]</div>
          <div class="flip-detail" style="font-size:13px;color:var(--text-muted);margin-top:8px;">[BAD_DETAIL_TEXT]<br><strong style="color:var(--accent-red);">[BAD_CONCLUSION]</strong></div>
        </div>
      </div>
    </div>
    <div class="auth-vs">vs</div>
    <div class="auth-flip-wrap slide-r">
      <div class="auth-flip" onclick="this.classList.toggle('flipped')">
        <div class="auth-front good">
          <div class="auth-icon">[GOOD_EMOJI]</div>
          <div class="auth-name">[GOOD_NAME]</div>
          <div class="auth-status">&#10004;&#65039;</div>
          <div class="auth-desc">[GOOD_SHORT_DESC]</div>
          <div class="flip-hint">click to flip</div>
        </div>
        <div class="auth-back">
          <div class="auth-icon">[GOOD_EMOJI]</div>
          <div class="auth-name">[GOOD_DETAIL_NAME]</div>
          <div class="flip-detail" style="font-size:13px;color:var(--text-muted);margin-top:8px;">[GOOD_DETAIL_TEXT]<br><strong style="color:var(--accent-green);">[GOOD_CONCLUSION]</strong></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**When to use**: Before/after comparisons, good vs bad practices, old vs new approaches.

### 8. Stats Cards

Three large number displays in a row with bounce animation.

```html
<div class="slide" data-slide="[N]">
  <p class="slide-tag anim-1">[TAG]</p>
  <h2 class="anim-2">[HEADING]</h2>
  <div class="stats-row">
    <div class="stat-card pop-1">
      <div class="stat-number blue">[NUMBER_1]<span style="font-size:0.45em;">[UNIT]</span></div>
      <div class="stat-label">[LABEL_1]</div>
      <div class="stat-desc">[DESC_1]</div>
    </div>
    <div class="stat-card pop-2">
      <div class="stat-number green">[NUMBER_2]<span style="font-size:0.45em;">[UNIT]</span></div>
      <div class="stat-label">[LABEL_2]</div>
      <div class="stat-desc">[DESC_2]</div>
    </div>
    <div class="stat-card pop-3">
      <div class="stat-number orange">[NUMBER_3]<span style="font-size:0.45em;">[UNIT]</span></div>
      <div class="stat-label">[LABEL_3]</div>
      <div class="stat-desc">[DESC_3]</div>
    </div>
  </div>
  <p class="subtitle anim-4 mt-24" style="font-size:15px;">[BOTTOM_TEXT]</p>
</div>
```

**Number color options**: `blue`, `green`, `orange`
**When to use**: Performance metrics, survey results, key statistics.

### 9. Expandable Cards (2x2 Grid)

Four cards that expand on click to reveal hidden content.

```html
<div class="slide" data-slide="[N]">
  <h2 class="anim-1">[HEADING]</h2>
  <p class="subtitle anim-2" style="font-size:15px;">Click any card to expand details</p>
  <div class="use-case-grid anim-3">
    <div class="card-v2 glow-orange bounce-1" onclick="this.classList.toggle('expanded')">
      <div class="card-icon">[EMOJI]</div>
      <div class="card-title">[CARD_1_TITLE]</div>
      <div class="card-desc">[CARD_1_DESC]</div>
      <div class="card-expand"><div class="card-expand-inner">[CARD_1_EXPANDED with <code>code_terms</code>]</div></div>
      <div class="expand-hint">&#9660;</div>
    </div>
    <div class="card-v2 glow-blue bounce-2" onclick="this.classList.toggle('expanded')">
      <!-- same structure -->
    </div>
    <div class="card-v2 glow-purple bounce-3" onclick="this.classList.toggle('expanded')">
      <!-- same structure -->
    </div>
    <div class="card-v2 glow-green bounce-4" onclick="this.classList.toggle('expanded')">
      <!-- same structure -->
    </div>
  </div>
</div>
```

**Glow color options**: `glow-orange`, `glow-blue`, `glow-purple`, `glow-green`
**When to use**: Use cases, features, benefits — anything where 4 items each need short + detailed views.

### 10. Status Timeline

Vertical list of items with colored status dots that stagger-animate in.

```html
<div class="slide" data-slide="[N]">
  <p class="slide-tag anim-1">[TAG]</p>
  <h2 class="anim-2">[HEADING]</h2>
  <div class="status-timeline">
    <div class="status-item stag-1"><div class="status-dot green"></div><div class="status-text"><strong>[ITEM_1]</strong> &mdash; [TEXT_1]</div></div>
    <div class="status-item stag-2"><div class="status-dot yellow"></div><div class="status-text"><strong>[ITEM_2]</strong> &mdash; [TEXT_2]</div></div>
    <div class="status-item stag-3"><div class="status-dot orange"></div><div class="status-text"><strong>[ITEM_3]</strong> &mdash; [TEXT_3]</div></div>
    <div class="status-item stag-4"><div class="status-dot red"></div><div class="status-text"><strong>[ITEM_4]</strong> &mdash; [TEXT_4]</div></div>
  </div>
</div>
```

**Dot colors**: `green` (done), `yellow` (in progress), `orange` (warning), `red` (blocked)
**Can have 3-6 items** using `stag-1` through `stag-5`.
**When to use**: Timelines, status reports, checklists, roadmaps.

### 11. CTA Box

A call-to-action slide with resources list in a gradient-bordered box.

```html
<div class="slide" data-slide="[N]">
  <div class="glow-blob glow-blue" style="top:30%;left:30%;"></div>
  <div class="glow-blob glow-green" style="bottom:20%;right:20%;"></div>
  <h2 class="anim-1" style="font-size:clamp(28px,3.5vw,44px);">[CTA_HEADLINE with <span class="gradient-text">gradient highlight</span>]</h2>
  <p class="subtitle anim-2 mt-16">[CTA_SUBTITLE]</p>
  <div class="cta-box anim-3">
    <p style="font-size:16px;font-weight:600;color:var(--text-muted);">[BOX_TITLE]</p>
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;font-size:14px;text-align:left;">
      <div style="display:flex;gap:8px;align-items:center;"><span style="color:var(--accent-blue);">&#9679;</span><span>[RESOURCE_1]</span></div>
      <div style="display:flex;gap:8px;align-items:center;"><span style="color:var(--accent-green);">&#9679;</span><span>[RESOURCE_2]</span></div>
      <div style="display:flex;gap:8px;align-items:center;"><span style="color:var(--accent-purple);">&#9679;</span><span>[RESOURCE_3]</span></div>
      <div style="display:flex;gap:8px;align-items:center;"><span style="color:var(--accent-orange);">&#9679;</span><span>[RESOURCE_4]</span></div>
    </div>
  </div>
  <div class="rainbow-line anim-4 mt-24"></div>
  <p class="subtitle anim-5" style="font-size:13px;margin-top:8px;">[ATTRIBUTION]</p>
</div>
```

**When to use**: Always the last slide. Resources, links, next steps.

---

## Chrome Elements

These go directly inside `<body>`, BEFORE the `<div class="deck">`. They provide ambient particles, branding, navigation dots, progress bar, and keyboard hints.

```html
<div class="particles" id="particles"></div>

<div class="branding"><div class="branding-icon">[INITIAL]</div> [BRAND_NAME]</div>
<div class="slide-nav" id="slideNav"></div>
<div class="progress-bar" id="progress"></div>
<div class="slide-counter" id="counter"></div>
<div class="nav-hints"><span><kbd>&larr;</kbd><kbd>&rarr;</kbd> navigate</span></div>
```

---

## Syntax Highlighting Guide

For code blocks, use `<span>` classes following the One Dark Pro theme:

| Class | Color | Use for |
|---|---|---|
| `.tag` | `#e06c75` | HTML tag names, error types |
| `.attr` | `#d19a66` | Attribute names, parameter names |
| `.str` | `#98c379` | String literals (in quotes) |
| `.kw` | `#c678dd` | Keywords (`async`, `return`, `const`, `if`) |
| `.fn` | `#61afef` | Function/method names |
| `.prop` | `#e5c07b` | Object property names, variables |
| `.punc` | `#56b6c2` | Punctuation, brackets, operators |
| `.comment` | `#5c6370` | Comments (renders italic) |
| `.ln` | `#4b5263` | Line numbers (auto-styled, user-select: none) |

**Example — syntax-highlighted JavaScript:**
```html
<span class="ln">1</span><span class="kw">const</span> <span class="prop">result</span> <span class="punc">=</span> <span class="kw">await</span> <span class="fn">fetchData</span><span class="punc">(</span><span class="str">"api/users"</span><span class="punc">);</span>
```

---

## Animation Classes Reference

| Class | Animation | Delay | Use for |
|---|---|---|---|
| `anim-1` | fadeInUp | 0.1s | First element (tag lines) |
| `anim-2` | fadeInUp | 0.25s | Headings |
| `anim-3` | bounceInSoft | 0.35s | Main content area |
| `anim-4` | fadeInUp | 0.55s | Supporting text |
| `anim-5` | fadeInUp | 0.7s | Attribution |
| `bounce-1`–`bounce-4` | bounceIn | 0.2s–0.65s | Cards in a grid |
| `slide-l` | slideInLeft | 0.3s | Left comparison card |
| `slide-r` | slideInRight | 0.3s | Right comparison card |
| `pop-1`–`pop-3` | countPop | 0.3s–0.6s | Stat numbers |
| `stag-1`–`stag-5` | bounceInSoft | 0.15s–0.55s | Timeline items |

**IMPORTANT**: Never place `bounce-N` or `slide-l`/`slide-r` directly on elements that use CSS transforms for interactivity (like flip cards). Use a wrapper element for the animation class.

---

## Color Accent Classes Reference

### Text highlights
- `highlight-blue` — primary accent, tech, features
- `highlight-green` — success, positive, solutions
- `highlight-orange` — warning, attention, problems
- `highlight-red` — danger, errors, failures
- `highlight-purple` — secondary accent, branding
- `highlight-yellow` — caution, in-progress
- `gradient-text` — blue-to-purple gradient (hero words)
- `rainbow-text` — full rainbow gradient (title keywords)

### Card borders (flip cards)
`border-orange`, `border-yellow`, `border-red`

### Card glows (expandable cards)
`glow-orange`, `glow-blue`, `glow-green`, `glow-purple`

### Architecture box colors
`box-blue`/`text-blue`, `box-yellow`/`text-yellow`, `box-green`/`text-green`

### Stat number colors
`blue`, `green`, `orange`

### Status dot colors
`green` (done), `yellow` (in progress), `orange` (warning), `red` (blocked)

### Glow blobs (background)
`glow-blue`, `glow-purple`, `glow-green`

### Color cycling rule
Rotate through blue → purple → green → orange → yellow → red across slides. Don't use the same accent on consecutive slides.
