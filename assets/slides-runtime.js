/* ===========================================
   SLIDES RUNTIME
   Shared by all Pro themes. Copy verbatim into
   the <script> tag at the end of <body>.
   Handles: particles, navigation, charts,
   speaker notes console logging.
   =========================================== */

// Particles
const pc = document.getElementById('particles');
for (let i = 0; i < 35; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random()*100+'%';
  p.style.animationDuration = (8+Math.random()*14)+'s';
  p.style.animationDelay = Math.random()*10+'s';
  p.style.width = p.style.height = (1+Math.random()*2)+'px';
  pc.appendChild(p);
}

// Navigation
const slides = document.querySelectorAll('.slide');
const progress = document.getElementById('progress');
const counter = document.getElementById('counter');
const slideNav = document.getElementById('slideNav');
let current = 0;
const total = slides.length;

slides.forEach((_, i) => {
  // Buttons give keyboard focus and Enter/Space activation for free.
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'slide-nav-dot' + (i===0?' active':'');
  dot.setAttribute('aria-label', 'Go to slide ' + (i+1) + ' of ' + total);
  if (i===0) dot.setAttribute('aria-current', 'true');
  dot.addEventListener('click', () => goTo(i));
  slideNav.appendChild(dot);
});

// Visually hidden region that announces slide changes to screen readers.
const liveRegion = document.createElement('div');
liveRegion.className = 'sr-only';
liveRegion.setAttribute('aria-live', 'polite');
document.body.appendChild(liveRegion);

// Inactive slides start outside the accessibility tree and tab order.
slides.forEach((s, i) => {
  s.setAttribute('tabindex', '-1');
  if (i !== current) {
    s.setAttribute('inert', '');
    s.setAttribute('aria-hidden', 'true');
  }
});

function updateUI() {
  progress.style.width = ((current+1)/total*100)+'%';
  counter.textContent = `${current+1} / ${total}`;
  document.querySelectorAll('.slide-nav-dot').forEach((d,i) => {
    d.classList.toggle('active', i===current);
    if (i===current) d.setAttribute('aria-current', 'true');
    else d.removeAttribute('aria-current');
  });
}

function goTo(index) {
  if (index<0 || index>=total || index===current) return;
  const prev = current;
  current = index;
  slides.forEach((s,i) => {
    s.classList.toggle('active', i===current);
    // Keep inactive slides out of the reading order and tab order.
    if (i===current) { s.removeAttribute('inert'); s.removeAttribute('aria-hidden'); }
    else { s.setAttribute('inert', ''); s.setAttribute('aria-hidden', 'true'); }
  });
  updateUI();
  slides[current].focus();
  liveRegion.textContent = 'Slide ' + (current+1) + ' of ' + total;
  showSpeakerNotes(current);

  // Chart lifecycle: destroy on exit, create on entry
  if (typeof Chart !== 'undefined') {
    slides[prev].querySelectorAll('.chart-container canvas').forEach(c => destroyChart(c.id));
    setTimeout(() => {
      slides[current].querySelectorAll('.chart-container canvas').forEach(c => createChart(c.id));
    }, 350);
  }
}

function next() { goTo(current+1); }
function prev() { goTo(current-1); }

document.addEventListener('keydown', (e) => {
  if (e.key==='ArrowRight'||e.key===' '||e.key==='PageDown') { e.preventDefault(); next(); }
  if (e.key==='ArrowLeft'||e.key==='PageUp') { e.preventDefault(); prev(); }
  if (e.key==='Home') { e.preventDefault(); goTo(0); }
  if (e.key==='End') { e.preventDefault(); goTo(total-1); }
});

let touchStart = 0;
document.addEventListener('touchstart', (e) => { touchStart=e.touches[0].clientX; });
document.addEventListener('touchend', (e) => {
  const diff = touchStart - e.changedTouches[0].clientX;
  if (Math.abs(diff)>50) { diff>0 ? next() : prev(); }
});

let wheelCD = false;
document.addEventListener('wheel', (e) => {
  if (wheelCD) return; wheelCD = true;
  setTimeout(() => wheelCD=false, 600);
  if (e.deltaY>0||e.deltaX>0) next(); else prev();
}, {passive:true});

updateUI();

// =========================================
// Chart.js Integration
// =========================================

function getThemePalette() {
  const s = getComputedStyle(document.documentElement);
  const get = (v) => s.getPropertyValue(v).trim();
  return {
    text: get('--text') || get('--text-primary') || '#e6edf3',
    textMuted: get('--text-muted') || get('--text-secondary') || '#8b949e',
    textDim: get('--text-dim') || '#6e7681',
    border: get('--border') || 'rgba(255,255,255,0.07)',
    bgCard: get('--bg-card') || get('--bg-secondary') || '#131720',
    colors: [
      get('--accent-blue') || '#58a6ff',
      get('--accent-green') || '#3fb950',
      get('--accent-orange') || '#f0883e',
      get('--accent-purple') || '#a371f7',
      get('--accent-yellow') || '#d29922',
      get('--accent-red') || '#f85149'
    ]
  };
}

const chartInstances = {};

function createChart(canvasId) {
  if (typeof Chart === 'undefined') return;
  const el = document.getElementById(canvasId);
  if (!el) return;
  const configEl = document.querySelector(`[data-chart-config="${canvasId}"]`);
  if (!configEl) return;

  // Destroy existing instance
  if (chartInstances[canvasId]) {
    chartInstances[canvasId].destroy();
    delete chartInstances[canvasId];
  }

  try {
    const palette = getThemePalette();
    const userConfig = JSON.parse(configEl.textContent);
    const chartType = userConfig.type;

    // Auto-assign theme colors to datasets
    userConfig.data.datasets.forEach((ds, i) => {
      const color = palette.colors[i % palette.colors.length];
      if (!ds.backgroundColor) {
        if (['pie','doughnut','polarArea'].includes(chartType)) {
          ds.backgroundColor = palette.colors.slice(0, ds.data.length);
          ds.borderColor = palette.bgCard;
          ds.borderWidth = 2;
        } else {
          ds.backgroundColor = color + '33';
          ds.borderColor = color;
          ds.borderWidth = 2;
        }
      }
      if (!ds.pointBackgroundColor && ['line','radar','scatter','bubble'].includes(chartType)) {
        ds.pointBackgroundColor = color;
      }
    });

    // Theme-aware defaults
    const themedOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: {
          labels: { color: palette.textMuted, font: { family: "'Inter', sans-serif", size: 12 } }
        },
        tooltip: {
          backgroundColor: palette.bgCard,
          titleColor: palette.text,
          bodyColor: palette.textMuted,
          borderColor: palette.border,
          borderWidth: 1
        }
      }
    };

    // Add themed scales for axis-based charts
    if (['bar','line','scatter','bubble'].includes(chartType)) {
      themedOptions.scales = {
        x: {
          ticks: { color: palette.textDim, font: { family: "'Inter', sans-serif", size: 11 } },
          grid: { color: palette.border }
        },
        y: {
          ticks: { color: palette.textDim, font: { family: "'Inter', sans-serif", size: 11 } },
          grid: { color: palette.border }
        }
      };
    }

    // Merge user options over themed defaults
    if (userConfig.options) {
      Object.assign(themedOptions.plugins, userConfig.options.plugins || {});
      Object.assign(themedOptions, userConfig.options, { plugins: themedOptions.plugins });
    }

    chartInstances[canvasId] = new Chart(el, {
      type: chartType,
      data: userConfig.data,
      options: themedOptions
    });
  } catch (e) {
    // Graceful fallback if Chart.js fails
    el.parentElement.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;">Chart unavailable</p>';
  }
}

function destroyChart(canvasId) {
  if (chartInstances[canvasId]) {
    chartInstances[canvasId].destroy();
    delete chartInstances[canvasId];
  }
}

// Initialize charts on first slide
if (typeof Chart !== 'undefined') {
  setTimeout(() => {
    slides[0].querySelectorAll('.chart-container canvas').forEach(c => createChart(c.id));
  }, 400);
}

// =========================================
// Speaker Notes (Console)
// =========================================

function showSpeakerNotes(index) {
  const slide = slides[index];
  const notesEl = slide.querySelector('script.slide-notes') || slide.querySelector('[class="slide-notes"]');
  console.clear();
  if (notesEl) {
    try {
      const n = JSON.parse(notesEl.textContent);
      const title = n.title || 'Slide ' + (index + 1);
      const script = n.script || '';
      const notes = n.notes || [];
      var parts = ['\n%c\ud83d\udccb Slide ' + (index+1) + '/' + total + ': ' + title + '\n'];
      var styles = ['font-size:16px;font-weight:bold;color:#2563eb;'];
      if (script) {
        parts.push('\n%c' + script + '\n');
        styles.push('font-size:14px;color:#d97706;line-height:1.6;');
      }
      if (notes.length) {
        notes.forEach(function(note) {
          parts.push('\n  %c\u2022%c ' + note);
          styles.push('color:#16a34a;font-size:14px;');
          styles.push('color:#16a34a;font-size:14px;');
        });
        parts.push('\n');
      }
      parts.push('\n\n\n\n%cUse HTMLSlides presenter app for notes editing and more features.\nhtmlslides.com\n');
      styles.push('font-size:10px;color:#9ca3af;');
      console.log.apply(console, [parts.join('')].concat(styles));
    } catch(e) {}
  } else {
    console.log('%c\ud83d\udccb Slide ' + (index+1) + '/' + total + '\n\n%cNo speaker notes for this slide.',
      'font-size:16px;font-weight:bold;color:#2563eb;', 'font-size:12px;color:#9ca3af;');
  }
}

// Show notes for first slide on load
setTimeout(function() { showSpeakerNotes(0); }, 500);
