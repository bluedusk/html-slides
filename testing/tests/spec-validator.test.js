import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSlides } from '../lib/validate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, 'fixtures');
const projectRoot = path.join(__dirname, '..', '..');
const examplesDir = path.join(projectRoot, 'examples');

function loadFixture(name) {
  return fs.readFileSync(path.join(fixturesDir, name), 'utf-8');
}

function assertAllPass(results) {
  const failures = results.filter(r => !r.passed);
  assert.equal(failures.length, 0,
    `Expected all rules to pass but failed: ${failures.map(f => `${f.rule}: ${f.message}`).join(', ')}`);
}

function assertRuleFails(results, ruleName) {
  const rule = results.find(r => r.rule === ruleName);
  assert.ok(rule, `Rule "${ruleName}" not found in results`);
  assert.equal(rule.passed, false, `Expected rule "${ruleName}" to fail but it passed: ${rule.message}`);
}

function assertRulePasses(results, ruleName) {
  const rule = results.find(r => r.rule === ruleName);
  assert.ok(rule, `Rule "${ruleName}" not found in results`);
  assert.equal(rule.passed, true, `Expected rule "${ruleName}" to pass but it failed: ${rule.message}`);
}

// --- Positive tests ---

describe('valid files', () => {
  it('passes all 8 rules for valid-minimal.html', () => {
    const results = validateSlides(loadFixture('valid-minimal.html'));
    assert.equal(results.length, 8);
    assertAllPass(results);
  });

  it('passes all 8 rules for valid-with-chartjs.html', () => {
    const results = validateSlides(loadFixture('valid-with-chartjs.html'));
    assert.equal(results.length, 8);
    assertAllPass(results);
  });

  it('passes all 8 rules for intro-to-mcp.html', () => {
    const html = fs.readFileSync(path.join(examplesDir, 'intro-to-mcp.html'), 'utf-8');
    const results = validateSlides(html);
    assert.equal(results.length, 8);
    assertAllPass(results);
  });
});

// --- Negative tests ---

describe('missing deck container', () => {
  it('fails rule 1', () => {
    const results = validateSlides(loadFixture('missing-deck.html'));
    assertRuleFails(results, 'deck-container');
  });
});

describe('missing active class on first slide', () => {
  it('fails rule 3', () => {
    const results = validateSlides(loadFixture('missing-active.html'));
    assertRuleFails(results, 'first-slide-active');
  });
});

describe('gap in data-slide numbering', () => {
  it('fails rule 4', () => {
    const results = validateSlides(loadFixture('gap-in-data-slide.html'));
    assertRuleFails(results, 'sequential-data-slide');
  });
});

describe('goTo inside IIFE', () => {
  it('fails rule 5', () => {
    const results = validateSlides(loadFixture('goto-inside-iife.html'));
    assertRuleFails(results, 'global-goto');
  });
});

describe('external CSS', () => {
  it('fails rule 6', () => {
    const results = validateSlides(loadFixture('external-css.html'));
    assertRuleFails(results, 'inline-css');
  });
});

describe('external script', () => {
  it('fails rule 7', () => {
    const results = validateSlides(loadFixture('external-script.html'));
    assertRuleFails(results, 'inline-js');
  });
});

// --- Edge cases ---

describe('edge cases', () => {
  it('allows Google Fonts @import inside <style>', () => {
    const html = `<!DOCTYPE html><html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=Inter');
      .deck { position: relative; }
      .slide { position: absolute; }
      .slide.active { opacity: 1; }
    </style></head><body>
    <div class="deck" id="deck">
      <div class="slide active" data-slide="0">A</div>
    </div>
    <script>function goTo(i){} function next(){} function prev(){}</script>
    </body></html>`;
    const results = validateSlides(html);
    assertRulePasses(results, 'inline-css');
  });

  it('allows Fontshare <link rel="stylesheet">', () => {
    const html = `<!DOCTYPE html><html><head>
    <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400">
    <style>
      .deck { position: relative; }
      .slide { position: absolute; }
      .slide.active { opacity: 1; }
    </style></head><body>
    <div class="deck" id="deck">
      <div class="slide active" data-slide="0">A</div>
    </div>
    <script>function goTo(i){} function next(){} function prev(){}</script>
    </body></html>`;
    const results = validateSlides(html);
    assertRulePasses(results, 'inline-css');
  });

  it('allows Chart.js CDN with different version paths', () => {
    const html = `<!DOCTYPE html><html><head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js"></script>
    <style>.deck{}.slide{}.slide.active{}</style></head><body>
    <div class="deck" id="deck">
      <div class="slide active" data-slide="0">A</div>
    </div>
    <script>function goTo(i){} function next(){} function prev(){}</script>
    </body></html>`;
    const results = validateSlides(html);
    assertRulePasses(results, 'inline-js');
  });

  it('rejects non-allowlisted CDN script', () => {
    const html = `<!DOCTYPE html><html><head>
    <script src="https://cdn.example.com/d3.min.js"></script>
    <style>.deck{}.slide{}.slide.active{}</style></head><body>
    <div class="deck" id="deck">
      <div class="slide active" data-slide="0">A</div>
    </div>
    <script>function goTo(i){} function next(){} function prev(){}</script>
    </body></html>`;
    const results = validateSlides(html);
    assertRuleFails(results, 'inline-js');
  });

  it('handles deck div with extra classes', () => {
    const html = `<!DOCTYPE html><html><head>
    <style>.deck{}.slide{}.slide.active{}</style></head><body>
    <div class="deck custom-class" id="deck">
      <div class="slide active" data-slide="0">A</div>
    </div>
    <script>function goTo(i){} function next(){} function prev(){}</script>
    </body></html>`;
    const results = validateSlides(html);
    assertRulePasses(results, 'deck-container');
  });

  it('detects goTo in a string literal without false positive', () => {
    const html = `<!DOCTYPE html><html><head>
    <style>.deck{}.slide{}.slide.active{}</style></head><body>
    <div class="deck" id="deck">
      <div class="slide active" data-slide="0">A</div>
    </div>
    <script>
    var x = "function goTo(index) { fake }";
    function goTo(index) { /* real */ }
    function next() {}
    function prev() {}
    </script>
    </body></html>`;
    const results = validateSlides(html);
    assertRulePasses(results, 'global-goto');
  });

  it('returns 8 results always', () => {
    const results = validateSlides('<html><body></body></html>');
    assert.equal(results.length, 8);
  });
});

// --- Integration: validate all HTML files in project root ---

describe('integration: project HTML files', () => {
  const htmlFiles = fs.existsSync(examplesDir)
    ? fs.readdirSync(examplesDir).filter(f => f.endsWith('.html'))
    : [];

  for (const file of htmlFiles) {
    it(`${file} passes all spec rules`, () => {
      const html = fs.readFileSync(path.join(examplesDir, file), 'utf-8');
      const results = validateSlides(html);
      assertAllPass(results);
    });
  }
});
