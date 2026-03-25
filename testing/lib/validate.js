import { parse } from 'node-html-parser';

/**
 * Validates an HTML slide presentation against the mandatory format spec.
 * @param {string} html - The full HTML string of the presentation file.
 * @returns {{ rule: string, passed: boolean, message: string, details?: string }[]}
 */
export function validateSlides(html) {
  const root = parse(html);
  return [
    checkDeckContainer(root),
    checkSlideElements(root),
    checkFirstSlideActive(root),
    checkSequentialDataSlide(root),
    checkGlobalGoTo(root),
    checkInlineCSS(root, html),
    checkInlineJS(root),
    checkGeneratorMeta(root),
  ];
}

// Rule 1: Deck container
function checkDeckContainer(root) {
  const deck = root.querySelector('div#deck');
  if (!deck) {
    return fail('deck-container', 'Expected <div class="deck" id="deck"> but found none');
  }
  const classes = deck.getAttribute('class') || '';
  if (!classes.split(/\s+/).includes('deck')) {
    return fail('deck-container', `Found <div id="deck"> but missing class "deck" (has: "${classes}")`);
  }
  return pass('deck-container', '<div class="deck" id="deck"> found');
}

// Rule 2: Slide elements
function checkSlideElements(root) {
  const slides = getSlides(root);
  if (slides.length === 0) {
    return fail('slide-elements', 'Expected at least one <div class="slide"> element, found 0');
  }
  return pass('slide-elements', `Found ${slides.length} slide element(s)`);
}

// Rule 3: First slide active
function checkFirstSlideActive(root) {
  const slides = getSlides(root);
  if (slides.length === 0) {
    return fail('first-slide-active', 'No slide elements found to check');
  }
  const first = slides[0];
  const classes = (first.getAttribute('class') || '').split(/\s+/);
  if (!classes.includes('active')) {
    return fail('first-slide-active', `First slide has classes "${first.getAttribute('class')}" but expected "slide active"`);
  }
  return pass('first-slide-active', 'First slide has class "active"');
}

// Rule 4: Sequential data-slide
function checkSequentialDataSlide(root) {
  const slides = getSlides(root);
  if (slides.length === 0) {
    return fail('sequential-data-slide', 'No slide elements found to check');
  }

  const values = slides.map((s, i) => ({
    index: i,
    raw: s.getAttribute('data-slide'),
    parsed: parseInt(s.getAttribute('data-slide'), 10),
  }));

  // Check all have data-slide
  const missing = values.filter(v => v.raw === null || v.raw === undefined);
  if (missing.length > 0) {
    return fail('sequential-data-slide', `Slide(s) at position ${missing.map(m => m.index).join(', ')} missing data-slide attribute`);
  }

  // Check sequential from 0
  const actual = values.map(v => v.parsed);
  const expected = values.map((_, i) => i);

  for (let i = 0; i < actual.length; i++) {
    if (actual[i] !== expected[i]) {
      return fail('sequential-data-slide',
        `data-slide values are [${actual.join(',')}] — expected [${expected.join(',')}], mismatch at index ${i}`);
    }
  }

  return pass('sequential-data-slide', `All ${slides.length} slides have sequential data-slide 0..${slides.length - 1}`);
}

// Rule 5: Global goTo function
function checkGlobalGoTo(root) {
  const scripts = root.querySelectorAll('script')
    .filter(s => !s.getAttribute('src') && !s.getAttribute('type'));
  const scriptText = scripts.map(s => s.textContent || s.text || '').join('\n');

  if (!scriptText) {
    return fail('global-goto', 'No inline <script> tags found');
  }

  if (isGlobalFunction(scriptText, 'goTo')) {
    return pass('global-goto', 'function goTo found in global scope');
  }

  // Check if it exists at all but not global
  if (/function\s+goTo\s*\(/.test(scriptText)) {
    return fail('global-goto', 'function goTo found but not in global scope (nested inside block/IIFE/class)');
  }

  return fail('global-goto', 'function goTo not found in any inline script');
}

// Rule 6: Inline CSS
function checkInlineCSS(root, html) {
  const FONT_ALLOWLIST = [
    /fonts\.googleapis\.com/,
    /api\.fontshare\.com/,
  ];

  // Check <link rel="stylesheet"> tags
  const links = root.querySelectorAll('link[rel="stylesheet"]');
  const violations = [];

  for (const link of links) {
    const href = link.getAttribute('href') || '';
    const allowed = FONT_ALLOWLIST.some(re => re.test(href));
    if (!allowed) {
      violations.push(`<link href="${href}">`);
    }
  }

  // Check @import in <style> tags
  const styles = root.querySelectorAll('style');
  for (const style of styles) {
    const text = style.textContent || style.text || '';
    const imports = text.match(/@import\s+(?:url\()?['"]?([^'"\s);]+)/g) || [];
    for (const imp of imports) {
      const urlMatch = imp.match(/['"]?([^'"\s);]+)['"]?\s*\)?$/);
      const url = urlMatch ? urlMatch[1] : imp;
      const allowed = FONT_ALLOWLIST.some(re => re.test(url));
      if (!allowed) {
        violations.push(`@import "${url}"`);
      }
    }
  }

  if (violations.length > 0) {
    return fail('inline-css', `Found external stylesheet(s): ${violations.join(', ')} — only font imports allowed`);
  }
  return pass('inline-css', 'All CSS is inline (font imports allowed)');
}

// Rule 7: Inline JS
function checkInlineJS(root) {
  const SCRIPT_ALLOWLIST = [
    /cdn\.jsdelivr\.net\/npm\/chart\.js/,
  ];

  const scripts = root.querySelectorAll('script[src]');
  const violations = [];

  for (const script of scripts) {
    const src = script.getAttribute('src') || '';
    const allowed = SCRIPT_ALLOWLIST.some(re => re.test(src));
    if (!allowed) {
      violations.push(`<script src="${src}">`);
    }
  }

  if (violations.length > 0) {
    return fail('inline-js', `Found external script(s): ${violations.join(', ')} — only Chart.js CDN allowed`);
  }
  return pass('inline-js', 'All JS is inline (Chart.js CDN allowed)');
}

// Rule 8: Generator meta tag
function checkGeneratorMeta(root) {
  const meta = root.querySelector('meta[name="generator"]');
  if (!meta) {
    return fail('generator-meta', 'Missing <meta name="generator" content="html-slides vX.Y.Z"> in <head>');
  }
  const content = meta.getAttribute('content') || '';
  if (!content.startsWith('html-slides')) {
    return fail('generator-meta', `Generator meta found but content is "${content}" — expected "html-slides vX.Y.Z"`);
  }
  return pass('generator-meta', `Generator meta: ${content}`);
}

// --- Helpers ---

function getSlides(root) {
  return root.querySelectorAll('div.slide').filter(el => {
    // Exclude elements like slide-nav, slide-counter, etc.
    const classes = (el.getAttribute('class') || '').split(/\s+/);
    return classes.includes('slide');
  });
}

function pass(rule, message) {
  return { rule, passed: true, message };
}

function fail(rule, message, details) {
  return { rule, passed: false, message, ...(details ? { details } : {}) };
}

/**
 * Checks if `function <name>` is defined at brace-depth 0 in the script text.
 * Skips string literals and comments to avoid false positives.
 */
function isGlobalFunction(text, name) {
  const pattern = `function ${name}`;
  let depth = 0;
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    // Skip single-line comments
    if (ch === '/' && text[i + 1] === '/') {
      i = text.indexOf('\n', i);
      if (i === -1) break;
      i++;
      continue;
    }

    // Skip multi-line comments
    if (ch === '/' && text[i + 1] === '*') {
      i = text.indexOf('*/', i + 2);
      if (i === -1) break;
      i += 2;
      continue;
    }

    // Skip string literals
    if (ch === '"' || ch === "'" || ch === '`') {
      i = skipString(text, i);
      continue;
    }

    // Track brace depth
    if (ch === '{') { depth++; i++; continue; }
    if (ch === '}') { depth--; i++; continue; }

    // Check for the function declaration at depth 0
    if (depth === 0 && text.startsWith(pattern, i)) {
      // Ensure it's followed by whitespace or (
      const after = text[i + pattern.length];
      if (after === '(' || after === ' ' || after === '\t' || after === '\n') {
        return true;
      }
    }

    i++;
  }

  return false;
}

function skipString(text, start) {
  const quote = text[start];
  let i = start + 1;
  while (i < text.length) {
    if (text[i] === '\\') { i += 2; continue; }
    if (text[i] === quote) return i + 1;
    i++;
  }
  return text.length;
}
