# Style Presets Reference

Curated visual styles for Frontend Slides. Each preset is inspired by real design references — no generic "AI slop" aesthetics. **Abstract shapes only — no illustrations.**

**Viewport CSS:** For mandatory base styles, see [viewport-base.css](../assets/viewport-base.css). Include in every presentation.

---

## Dark Themes

### 1. Bold Signal

**Vibe:** Confident, bold, modern, high-impact

**Layout:** Colored card on dark gradient. Number top-left, navigation top-right, title bottom-left.

**Typography:**
- Display: `Archivo Black` (900)
- Body: `Space Grotesk` (400/500)

**Colors:**
```css
:root {
    --bg-primary: #1a1a1a;
    --bg-gradient: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
    --card-bg: #FF5722;
    --text-primary: #ffffff;
    --text-on-card: #1a1a1a;
}
```

**Signature Elements:**
- Bold colored card as focal point (orange, coral, or vibrant accent)
- Large section numbers (01, 02, etc.)
- Navigation breadcrumbs with active/inactive opacity states
- Grid-based layout for precise alignment

---

### 2. Electric Studio

**Vibe:** Bold, clean, professional, high contrast

**Layout:** Split panel—white top, blue bottom. Brand marks in corners.

**Typography:**
- Display: `Manrope` (800)
- Body: `Manrope` (400/500)

**Colors:**
```css
:root {
    --bg-dark: #0a0a0a;
    --bg-white: #ffffff;
    --accent-blue: #4361ee;
    --text-dark: #0a0a0a;
    --text-light: #ffffff;
}
```

**Signature Elements:**
- Two-panel vertical split
- Accent bar on panel edge
- Quote typography as hero element
- Minimal, confident spacing

---

### 3. Creative Voltage

**Vibe:** Bold, creative, energetic, retro-modern

**Layout:** Split panels—electric blue left, dark right. Script accents.

**Typography:**
- Display: `Syne` (700/800)
- Mono: `Space Mono` (400/700)

**Colors:**
```css
:root {
    --bg-primary: #0066ff;
    --bg-dark: #1a1a2e;
    --accent-neon: #d4ff00;
    --text-light: #ffffff;
}
```

**Signature Elements:**
- Electric blue + neon yellow contrast
- Halftone texture patterns
- Neon badges/callouts
- Script typography for creative flair

---

### 4. Dark Botanical

**Vibe:** Elegant, sophisticated, artistic, premium

**Layout:** Centered content on dark. Abstract soft shapes in corner.

**Typography:**
- Display: `Cormorant` (400/600) — elegant serif
- Body: `IBM Plex Sans` (300/400)

**Colors:**
```css
:root {
    --bg-primary: #0f0f0f;
    --text-primary: #e8e4df;
    --text-secondary: #9a9590;
    --accent-warm: #d4a574;
    --accent-pink: #e8b4b8;
    --accent-gold: #c9b896;
}
```

**Signature Elements:**
- Abstract soft gradient circles (blurred, overlapping)
- Warm color accents (pink, gold, terracotta)
- Thin vertical accent lines
- Italic signature typography
- **No illustrations—only abstract CSS shapes**

---

## Light Themes

### 5. Notebook Tabs

**Vibe:** Editorial, organized, elegant, tactile

**Layout:** Cream paper card on dark background. Colorful tabs on right edge.

**Typography:**
- Display: `Bodoni Moda` (400/700) — classic editorial
- Body: `DM Sans` (400/500)

**Colors:**
```css
:root {
    --bg-outer: #2d2d2d;
    --bg-page: #f8f6f1;
    --text-primary: #1a1a1a;
    --tab-1: #98d4bb; /* Mint */
    --tab-2: #c7b8ea; /* Lavender */
    --tab-3: #f4b8c5; /* Pink */
    --tab-4: #a8d8ea; /* Sky */
    --tab-5: #ffe6a7; /* Cream */
}
```

**Signature Elements:**
- Paper container with subtle shadow
- Colorful section tabs on right edge (vertical text)
- Binder hole decorations on left
- Tab text must scale with viewport: `font-size: clamp(0.5rem, 1vh, 0.7rem)`

---

### 6. Pastel Geometry

**Vibe:** Friendly, organized, modern, approachable

**Layout:** White card on pastel background. Vertical pills on right edge.

**Typography:**
- Display: `Plus Jakarta Sans` (700/800)
- Body: `Plus Jakarta Sans` (400/500)

**Colors:**
```css
:root {
    --bg-primary: #c8d9e6;
    --card-bg: #faf9f7;
    --pill-pink: #f0b4d4;
    --pill-mint: #a8d4c4;
    --pill-sage: #5a7c6a;
    --pill-lavender: #9b8dc4;
    --pill-violet: #7c6aad;
}
```

**Signature Elements:**
- Rounded card with soft shadow
- **Vertical pills on right edge** with varying heights (like tabs)
- Consistent pill width, heights: short → medium → tall → medium → short
- Download/action icon in corner

---

### 7. Split Pastel

**Vibe:** Playful, modern, friendly, creative

**Layout:** Two-color vertical split (peach left, lavender right).

**Typography:**
- Display: `Outfit` (700/800)
- Body: `Outfit` (400/500)

**Colors:**
```css
:root {
    --bg-peach: #f5e6dc;
    --bg-lavender: #e4dff0;
    --text-dark: #1a1a1a;
    --badge-mint: #c8f0d8;
    --badge-yellow: #f0f0c8;
    --badge-pink: #f0d4e0;
}
```

**Signature Elements:**
- Split background colors
- Playful badge pills with icons
- Grid pattern overlay on right panel
- Rounded CTA buttons

---

### 8. Vintage Editorial

**Vibe:** Witty, confident, editorial, personality-driven

**Layout:** Centered content on cream. Abstract geometric shapes as accent.

**Typography:**
- Display: `Fraunces` (700/900) — distinctive serif
- Body: `Work Sans` (400/500)

**Colors:**
```css
:root {
    --bg-cream: #f5f3ee;
    --text-primary: #1a1a1a;
    --text-secondary: #555;
    --accent-warm: #e8d4c0;
}
```

**Signature Elements:**
- Abstract geometric shapes (circle outline + line + dot)
- Bold bordered CTA boxes
- Witty, conversational copy style
- **No illustrations—only geometric CSS shapes**

---

## Specialty Themes

### 9. Neon Cyber

**Vibe:** Futuristic, techy, confident

**Typography:** `Clash Display` + `Satoshi` (Fontshare)

**Colors:** Deep navy (#0a0f1c), cyan accent (#00ffcc), magenta (#ff00aa)

**Signature:** Particle backgrounds, neon glow, grid patterns

---

### 10. Terminal Green

**Vibe:** Developer-focused, hacker aesthetic

**Typography:** `JetBrains Mono` (monospace only)

**Colors:** GitHub dark (#0d1117), terminal green (#39d353)

**Signature:** Scan lines, blinking cursor, code syntax styling

---

### 11. Swiss Modern

**Vibe:** Clean, precise, Bauhaus-inspired

**Typography:** `Archivo` (800) + `Nunito` (400)

**Colors:** Pure white, pure black, red accent (#ff3300)

**Signature:** Visible grid, asymmetric layouts, geometric shapes

---

### 12. Paper & Ink

**Vibe:** Editorial, literary, thoughtful

**Typography:** `Cormorant Garamond` + `Source Serif 4`

**Colors:** Warm cream (#faf9f7), charcoal (#1a1a1a), crimson accent (#c41e3a)

**Signature:** Drop caps, pull quotes, elegant horizontal rules

---

## Font Pairing Quick Reference

| Preset | Display Font | Body Font | Source |
|--------|--------------|-----------|--------|
| Bold Signal | Archivo Black | Space Grotesk | Google |
| Electric Studio | Manrope | Manrope | Google |
| Creative Voltage | Syne | Space Mono | Google |
| Dark Botanical | Cormorant | IBM Plex Sans | Google |
| Notebook Tabs | Bodoni Moda | DM Sans | Google |
| Pastel Geometry | Plus Jakarta Sans | Plus Jakarta Sans | Google |
| Split Pastel | Outfit | Outfit | Google |
| Vintage Editorial | Fraunces | Work Sans | Google |
| Neon Cyber | Clash Display | Satoshi | Fontshare |
| Terminal Green | JetBrains Mono | JetBrains Mono | JetBrains |
| Excalidraw Light | Virgil | Virgil / Caveat | Bundled / Google |
| Excalidraw Dark | Virgil | Virgil / Caveat | Bundled / Google |
| Editorial Light | Inter | Space Grotesk | Google |
| Binary Architect | Space Grotesk | JetBrains Mono | Google / JetBrains |

---

## Structured Themes

### 13. Obsidian

**Vibe:** Technical, polished, GitHub-dark aesthetic with interactive components

**Layout:** Centered content on dark background. Floating particles. 11 structured component types.

**Typography:**
- Display: `Inter` (700/800/900)
- Mono: `JetBrains Mono` (400/500/600)

**Colors:**
```css
:root {
    --bg: #0b0e14;
    --bg-card: #131720;
    --accent-blue: #58a6ff;
    --accent-green: #3fb950;
    --accent-orange: #f0883e;
    --accent-red: #f85149;
    --accent-purple: #a371f7;
    --accent-yellow: #d29922;
}
```

**Signature Elements:**
- 11 structured component templates (flip cards, expandable cards, code blocks, architecture flows, stats, timelines, comparisons, etc.)
- Floating particle background
- Interactive flip/expand animations on click
- One Dark Pro syntax highlighting for code blocks
- Rainbow gradient text for hero titles
- Glow blob ambient lighting

**Special:** This preset uses a **structured component system** instead of creative interpretation. Read [component-templates.md](component-templates.md) for the 13 HTML templates, [dark-interactive.css](../assets/dark-interactive.css) for the complete CSS, and [dark-interactive-nav.js](../assets/dark-interactive-nav.js) for the navigation JS. Copy CSS and JS verbatim, use HTML templates as building blocks.

**Best for:** Technical presentations, developer talks, API/architecture overviews, and cases where deterministic output across different AI agents is more important than visual variety.

---

### 14. Excalidraw Light

**Vibe:** Hand-drawn, sketchy, whiteboard aesthetic inspired by excalidraw.com

**Layout:** Same structured component system as Obsidian, but with a hand-drawn visual overlay on a white background.

**Typography:**
- Body: `Virgil` (Excalidraw's hand-drawn font), fallback `Caveat`, cursive
- Mono: `Cascadia Code`

**Colors:**
```css
:root {
    --bg: #ffffff;
    --bg-card: #fcfcfa;
    --accent-blue: #1971c2;
    --accent-green: #2f9e44;
    --accent-orange: #e8590c;
    --accent-red: #e03131;
    --accent-purple: #9c36b5;
    --accent-yellow: #e8b627;
    --border: #1e1e1e;
}
```

**Signature Elements:**
- Hachure fill patterns on cards (single-direction diagonal lines at -37deg)
- Offset drop shadows (hand-drawn feel)
- Rounded corners (14px) on all components
- Subdued glow blobs and particles for light background
- Same 14 component templates as Obsidian

**Special:** Uses the same component templates as Obsidian. Load [excalidraw.css](../assets/themes/excalidraw.css) as the theme CSS alongside the shared component CSS.

**Best for:** Informal presentations, brainstorming sessions, educational content, whiteboard-style walkthroughs.

---

### 15. Excalidraw Dark

**Vibe:** Hand-drawn, sketchy, whiteboard aesthetic on a dark background

**Layout:** Same structured component system as Obsidian, with hand-drawn visual overlay on a dark background.

**Typography:**
- Body: `Virgil` (Excalidraw's hand-drawn font), fallback `Caveat`, cursive
- Mono: `Cascadia Code`

**Colors:**
```css
:root {
    --bg: #121212;
    --bg-card: #232329;
    --accent-blue: #4dabf7;
    --accent-green: #51cf66;
    --accent-orange: #ff922b;
    --accent-red: #ff6b6b;
    --accent-purple: #cc5de8;
    --accent-yellow: #fcc419;
    --border: #e3e3e8;
}
```

**Signature Elements:**
- Hachure fill patterns on cards (single-direction diagonal lines at -37deg, tuned for dark bg)
- Light offset drop shadows
- Rounded corners (14px) on all components
- Subtle glow blobs and particles
- Same 14 component templates as Obsidian

**Special:** Uses the same component templates as Obsidian. Load [excalidraw-dark.css](../assets/themes/excalidraw-dark.css) as the theme CSS alongside the shared component CSS.

**Best for:** Informal presentations in dark mode, brainstorming sessions, educational content with a cozy feel.

---

### 16. Editorial Light

**Vibe:** Luminous, editorial, tech-forward minimalism — "The Lucid Gallery"

**Layout:** Same structured component system as Obsidian, with an airy light-mode aesthetic. Elements float in generous white space with ambient shadows.

**Typography:**
- Display/Body: `Inter` (300–900) — tight letter-spacing (-0.02em) for headlines
- Labels/Mono: `Space Grotesk` (400–700) — tech-forward sans-serif for metadata and tags

**Colors:**
```css
:root {
    --bg: #f9f9ff;
    --bg-card: #ffffff;
    --bg-card-hover: #f2f3fc;
    --text: #191c22;
    --text-muted: #414752;
    --accent-blue: #0060aa;
    --accent-green: #006e21;
    --accent-orange: #e8590c;
    --accent-red: #ba1a1a;
    --accent-purple: #733fc4;
    --accent-yellow: #c48f00;
    --border: rgba(192, 199, 212, 0.15);
}
```

**Signature Elements:**
- "No-Line Rule" — no 1px solid borders; boundaries via tonal shifts and ghost borders (15% opacity)
- Ambient shadows with 32–48px blur at 4–8% opacity (soft glow, not hard drop)
- Primary-to-container gradient accents (blue #0060aa → #58a6ff)
- Code windows stay dark (editorial contrast against light canvas)
- Surface hierarchy: surface → surface-container-low → surface-container-lowest
- Same 14 component templates as Obsidian

**Special:** Uses the same component templates as Obsidian. Load [editorial-light.css](../assets/themes/editorial-light.css) as the theme CSS alongside the shared component CSS.

**Best for:** Product launches, investor decks, design-forward technical presentations, any context where editorial polish matters.

---

### 17. Binary Architect

**Vibe:** Hacker-elite, organic brutalism, "command center" aesthetic

**Layout:** Same structured component system as Obsidian, with sharp 0px corners, void-black canvas, and neon signal accents. 24px grid overlay.

**Typography:**
- Display: `Space Grotesk` (500–700) — all-caps, +0.05em letter-spacing ("System Headers")
- Body/Data: `JetBrains Mono` / `Fira Code` — monospaced throughout for terminal feel

**Colors:**
```css
:root {
    --bg: #0e0e0e;
    --bg-card: #131313;
    --bg-void: #000000;
    --bg-elevated: #201f1f;
    --text: #e8e8e8;
    --text-muted: #adaaaa;
    --accent-blue: #00eefc;
    --accent-green: #9cff93;
    --accent-orange: #ff7351;
    --accent-purple: #c4a5ff;
    --accent-yellow: #ffda6e;
    --border: rgba(72, 72, 71, 0.2);
}
```

**Signature Elements:**
- **Zero border-radius** — 0px on all elements, including nav dots (squares)
- 24px grid pattern overlay on the deck background
- Glow states instead of shadows (neon color at 4–6% opacity)
- Ghost borders (outline-variant at 20% opacity)
- Monospaced body text throughout (JetBrains Mono)
- All headings uppercase with letter-spacing
- Same 14 component templates as Obsidian

**Special:** Uses the same component templates as Obsidian. Load [binary-architect.css](../assets/themes/binary-architect.css) as the theme CSS alongside the shared component CSS.

**Best for:** Developer talks, security/infosec presentations, CLI tool demos, anything where a terminal/hacker aesthetic fits the content.

---

## DO NOT USE (Generic AI Patterns)

**Fonts:** Inter, Roboto, Arial, system fonts as display

**Colors:** `#6366f1` (generic indigo), purple gradients on white

**Layouts:** Everything centered, generic hero sections, identical card grids

**Decorations:** Realistic illustrations, gratuitous glassmorphism, drop shadows without purpose

---

## CSS Gotchas

### Negating CSS Functions

**WRONG — silently ignored by browsers (no console error):**
```css
right: -clamp(28px, 3.5vw, 44px);   /* Browser ignores this */
margin-left: -min(10vw, 100px);      /* Browser ignores this */
```

**CORRECT — wrap in `calc()`:**
```css
right: calc(-1 * clamp(28px, 3.5vw, 44px));  /* Works */
margin-left: calc(-1 * min(10vw, 100px));     /* Works */
```

CSS does not allow a leading `-` before function names. The browser silently discards the entire declaration — no error, the element just appears in the wrong position. **Always use `calc(-1 * ...)` to negate CSS function values.**

