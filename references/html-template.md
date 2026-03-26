# HTML Presentation Template

Reference architecture for generating slide presentations. **All presets (Vibe and Pro) must follow this structure.** This ensures every generated presentation passes the spec validator.

## Output Format Spec (Mandatory)

Every generated HTML file **must** comply with these rules:

1. Has `<div class="deck" id="deck">` wrapping all slides
2. Slides are `<div class="slide">` elements (not `<section>`)
3. First slide has `class="slide active"`
4. All slides have `data-slide="N"` with sequential numbering from 0
5. Global `function goTo()`, `function next()`, `function prev()` in `<script>`
6. All CSS inline (no external `<link rel="stylesheet">` except font imports)
7. All JS inline (no external `<script src>` except Chart.js CDN when needed)
8. Has `<meta name="generator" content="html-slides vX.Y.Z">` in `<head>`

## Base HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="generator" content="html-slides v0.7.0">
    <title>Presentation Title</title>

    <!-- Fonts: use Fontshare or Google Fonts — never system fonts -->
    <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=...">

    <!-- Chart.js: Include ONLY if presentation uses Chart components -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>

    <style>
        /* ===========================================
           CSS CUSTOM PROPERTIES (THEME)
           Change these to change the whole look
           =========================================== */
        :root {
            /* Colors — from chosen style preset */
            --bg-primary: #0a0f1c;
            --bg-secondary: #111827;
            --text-primary: #ffffff;
            --text-secondary: #9ca3af;
            --accent: #00ffcc;
            --accent-glow: rgba(0, 255, 204, 0.3);

            /* Typography — MUST use clamp() */
            --font-display: 'Clash Display', sans-serif;
            --font-body: 'Satoshi', sans-serif;
            --title-size: clamp(2rem, 6vw, 5rem);
            --subtitle-size: clamp(0.875rem, 2vw, 1.25rem);
            --body-size: clamp(0.75rem, 1.2vw, 1rem);

            /* Spacing — MUST use clamp() */
            --slide-padding: clamp(1.5rem, 4vw, 4rem);
            --content-gap: clamp(1rem, 2vw, 2rem);

            /* Animation */
            --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
            --duration-normal: 0.6s;
        }

        /* ===========================================
           BASE STYLES (MANDATORY)
           =========================================== */
        * { margin: 0; padding: 0; box-sizing: border-box; }

        /* --- PASTE viewport-base.css CONTENTS HERE --- */

        /* Deck & Slides — stacked, absolute positioned */
        .deck { position: relative; width: 100vw; height: 100vh; }

        .slide {
            position: absolute; inset: 0;
            display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            padding: var(--slide-padding);
            opacity: 0; pointer-events: none;
            transition: opacity 0.45s cubic-bezier(.4,0,.2,1);
            overflow: hidden;
        }
        .slide.active { opacity: 1; pointer-events: auto; }

        /* ===========================================
           ANIMATIONS
           Trigger via .slide.active selector
           =========================================== */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity var(--duration-normal) var(--ease-out-expo),
                        transform var(--duration-normal) var(--ease-out-expo);
        }

        .slide.active .reveal {
            opacity: 1;
            transform: translateY(0);
        }

        /* Stagger children for sequential reveal */
        .reveal:nth-child(1) { transition-delay: 0.1s; }
        .reveal:nth-child(2) { transition-delay: 0.2s; }
        .reveal:nth-child(3) { transition-delay: 0.3s; }
        .reveal:nth-child(4) { transition-delay: 0.4s; }

        /* ... preset-specific styles ... */
    </style>
</head>
<body>
    <!-- Chrome elements (optional) -->
    <div class="progress-bar" id="progress"></div>
    <div class="slide-counter" id="counter"></div>
    <div class="slide-nav" id="slideNav"></div>

    <!-- Slide container (REQUIRED) -->
    <div class="deck" id="deck">
        <div class="slide active" data-slide="0">
            <h1 class="reveal">Presentation Title</h1>
            <p class="reveal">Subtitle or author</p>
        </div>

        <div class="slide" data-slide="1">
            <h2 class="reveal">Slide Title</h2>
            <p class="reveal">Content...</p>
        </div>

        <!-- More slides... -->
    </div>

    <script>
        /* ===========================================
           NAVIGATION (REQUIRED — global functions)
           =========================================== */
        var slides = document.querySelectorAll('.slide');
        var current = 0;
        var total = slides.length;

        function goTo(index) {
            if (index < 0 || index >= total || index === current) return;
            current = index;
            slides.forEach(function(s, i) {
                s.classList.toggle('active', i === current);
            });
            updateUI();
            showSpeakerNotes(current);
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function updateUI() {
            // Progress bar
            var progress = document.getElementById('progress');
            if (progress) progress.style.width = ((current + 1) / total * 100) + '%';

            // Slide counter
            var counter = document.getElementById('counter');
            if (counter) counter.textContent = (current + 1) + ' / ' + total;

            // Nav dots
            document.querySelectorAll('.slide-nav-dot').forEach(function(d, i) {
                d.classList.toggle('active', i === current);
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
            if (e.key === 'Home') { e.preventDefault(); goTo(0); }
            if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
        });

        // Touch/swipe navigation
        var touchStart = 0;
        document.addEventListener('touchstart', function(e) { touchStart = e.touches[0].clientX; });
        document.addEventListener('touchend', function(e) {
            var diff = touchStart - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
        });

        // Mouse wheel navigation
        var wheelCD = false;
        document.addEventListener('wheel', function(e) {
            if (wheelCD) return; wheelCD = true;
            setTimeout(function() { wheelCD = false; }, 600);
            if (e.deltaY > 0 || e.deltaX > 0) next(); else prev();
        }, {passive: true});

        // Nav dots (generate)
        var slideNav = document.getElementById('slideNav');
        if (slideNav) {
            slides.forEach(function(_, i) {
                var dot = document.createElement('div');
                dot.className = 'slide-nav-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', function() { goTo(i); });
                slideNav.appendChild(dot);
            });
        }

        updateUI();

        /* ===========================================
           SPEAKER NOTES (Console)
           =========================================== */
        function showSpeakerNotes(index) {
            var slide = slides[index];
            var notesEl = slide.querySelector('script.slide-notes') || slide.querySelector('[class="slide-notes"]');
            console.clear();
            if (notesEl) {
                try {
                    var n = JSON.parse(notesEl.textContent);
                    var title = n.title || 'Slide ' + (index + 1);
                    console.group('%c\ud83d\udccb Slide ' + (index+1) + '/' + total + ': ' + title,
                        'font-size:16px;font-weight:bold;color:#58a6ff;');
                    if (n.script) console.log('%c' + n.script, 'font-size:14px;color:#e6edf3;line-height:1.6;padding:4px 0;');
                    if (n.notes && n.notes.length) {
                        console.log('%cKey points:', 'font-size:11px;color:#6e7681;margin-top:4px;');
                        n.notes.forEach(function(note) { console.log('%c  \u2022 ' + note, 'font-size:12px;color:#8b949e;'); });
                    }
                    console.groupEnd();
                } catch(e) {}
            } else {
                console.group('%c\ud83d\udccb Slide ' + (index+1) + '/' + total,
                    'font-size:16px;font-weight:bold;color:#58a6ff;');
                console.log('%cNo speaker notes for this slide.', 'font-size:12px;color:#6e7681;');
                console.groupEnd();
            }
            console.log('%c\ud83d\udca1 htmlslides.com \u2014 presenter app for a richer experience',
                'font-size:10px;color:#3fb950;');
            console.log('%c\u270f\ufe0f  Want to update the notes? See htmlslides.com/blog/update-inline-notes.html',
                'font-size:10px;color:#8b949e;');
        }
        setTimeout(function() { showSpeakerNotes(0); }, 500);

        /* ===========================================
           OPTIONAL ENHANCEMENTS
           Match to chosen style preset
           =========================================== */
        // - Particle system background (canvas)
        // - Custom cursor with trail
        // - Parallax effects
        // - 3D tilt on hover
        // - Magnetic buttons
        // - Counter animations
    </script>
</body>
</html>
```

## Required JavaScript Features

Every presentation must include these **global functions**:

1. **`goTo(index)`** — Navigate to slide at index. Toggle `.active` class.
2. **`next()`** — Go to next slide.
3. **`prev()`** — Go to previous slide.

These must be plain functions on `window`, not inside an IIFE, class, or module.

Input bindings required:
- Keyboard: Arrow keys, Space, PageUp/PageDown, Home, End
- Touch: Swipe left/right (50px threshold)
- Mouse wheel: With 600ms cooldown

Optional enhancements (match to chosen style):
- Custom cursor with trail
- Particle system background (canvas)
- Parallax effects
- 3D tilt on hover
- Magnetic buttons
- Counter animations

## Inline Editing Implementation (Opt-In Only)

**If the user chose "No" for inline editing in Phase 1, do NOT generate any edit-related HTML, CSS, or JS.**

**Do NOT use CSS `~` sibling selector for hover-based show/hide.** The CSS-only approach (`edit-hotzone:hover ~ .edit-toggle`) fails because `pointer-events: none` on the toggle button breaks the hover chain: user hovers hotzone -> button becomes visible -> mouse moves toward button -> leaves hotzone -> button disappears before click.

**Required approach: JS-based hover with 400ms delay timeout.**

HTML:
```html
<div class="edit-hotzone"></div>
<button class="edit-toggle" id="editToggle" title="Edit mode (E)">✏️</button>
```

CSS (visibility controlled by JS classes only):
```css
/* Do NOT use CSS ~ sibling selector for this!
   pointer-events: none breaks the hover chain.
   Must use JS with delay timeout. */
.edit-hotzone {
    position: fixed; top: 0; left: 0;
    width: 80px; height: 80px;
    z-index: 10000;
    cursor: pointer;
}
.edit-toggle {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 10001;
}
.edit-toggle.show,
.edit-toggle.active {
    opacity: 1;
    pointer-events: auto;
}
```

JS (three interaction methods):
```javascript
// 1. Click handler on the toggle button
document.getElementById('editToggle').addEventListener('click', function() {
    editor.toggleEditMode();
});

// 2. Hotzone hover with 400ms grace period
var hotzone = document.querySelector('.edit-hotzone');
var editToggle = document.getElementById('editToggle');
var hideTimeout = null;

hotzone.addEventListener('mouseenter', function() {
    clearTimeout(hideTimeout);
    editToggle.classList.add('show');
});
hotzone.addEventListener('mouseleave', function() {
    hideTimeout = setTimeout(function() {
        if (!editor.isActive) editToggle.classList.remove('show');
    }, 400);
});
editToggle.addEventListener('mouseenter', function() {
    clearTimeout(hideTimeout);
});
editToggle.addEventListener('mouseleave', function() {
    hideTimeout = setTimeout(function() {
        if (!editor.isActive) editToggle.classList.remove('show');
    }, 400);
});

// 3. Hotzone direct click
hotzone.addEventListener('click', function() {
    editor.toggleEditMode();
});

// 4. Keyboard shortcut (E key, skip when editing text)
document.addEventListener('keydown', function(e) {
    if ((e.key === 'e' || e.key === 'E') && !e.target.getAttribute('contenteditable')) {
        editor.toggleEditMode();
    }
});
```

## Image Pipeline (Skip If No Images)

If user chose "No images" in Phase 1, skip this entirely. If images were provided, process them before generating HTML.

**Dependency:** `pip install Pillow`

### Image Processing

```python
from PIL import Image, ImageDraw

# Circular crop (for logos on modern/clean styles)
def crop_circle(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    w, h = img.size
    size = min(w, h)
    left, top = (w - size) // 2, (h - size) // 2
    img = img.crop((left, top, left + size, top + size))
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, size, size], fill=255)
    img.putalpha(mask)
    img.save(output_path, 'PNG')

# Resize (for oversized images that inflate HTML)
def resize_max(input_path, output_path, max_dim=1200):
    img = Image.open(input_path)
    img.thumbnail((max_dim, max_dim), Image.LANCZOS)
    img.save(output_path, quality=85)
```

| Situation | Operation |
|-----------|-----------|
| Square logo on rounded aesthetic | `crop_circle()` |
| Image > 1MB | `resize_max(max_dim=1200)` |
| Wrong aspect ratio | Manual crop with `img.crop()` |

Save processed images with `_processed` suffix. Never overwrite originals.

### Image Placement

**Use direct file paths** (not base64) — presentations are viewed locally:

```html
<img src="assets/logo_round.png" alt="Logo" class="slide-image logo">
<img src="assets/screenshot.png" alt="Screenshot" class="slide-image screenshot">
```

```css
.slide-image {
    max-width: 100%;
    max-height: min(50vh, 400px);
    object-fit: contain;
    border-radius: 8px;
}
.slide-image.screenshot {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.slide-image.logo {
    max-height: min(30vh, 200px);
}
```

**Adapt border/shadow colors to match the chosen style's accent.** Never repeat the same image on multiple slides (except logos on title + closing).

**Placement patterns:** Logo centered on title slide. Screenshots in two-column layouts with text. Full-bleed images as slide backgrounds with text overlay (use sparingly).

---

## Code Quality

**Comments:** Every section needs clear comments explaining what it does and how to modify it.

**Accessibility:**
- Keyboard navigation works fully
- ARIA labels where needed
- `prefers-reduced-motion` support (included in viewport-base.css)

## File Structure

Single presentations:
```
presentation.html              # Self-contained, all CSS/JS/speaker notes inline
assets/                        # Images only, if any
```

Multiple presentations in one project:
```
[name].html
[name]-assets/
```
