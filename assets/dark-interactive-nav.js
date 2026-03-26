/* ===========================================
   DARK INTERACTIVE NAVIGATION
   Copy this script into the <script> tag at the
   end of <body> when using the Dark Interactive preset.
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
  const dot = document.createElement('div');
  dot.className = 'slide-nav-dot' + (i===0?' active':'');
  dot.addEventListener('click', () => goTo(i));
  slideNav.appendChild(dot);
});

function updateUI() {
  progress.style.width = ((current+1)/total*100)+'%';
  counter.textContent = `${current+1} / ${total}`;
  document.querySelectorAll('.slide-nav-dot').forEach((d,i) => d.classList.toggle('active', i===current));
}

function goTo(index) {
  if (index<0 || index>=total || index===current) return;
  const prev = current;
  current = index;
  slides.forEach((s,i) => s.classList.toggle('active', i===current));
  updateUI();
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
      console.group('%c\ud83d\udccb Slide ' + (index+1) + '/' + total + ': ' + title,
        'font-size:16px;font-weight:bold;color:#58a6ff;');
      if (script) console.log('%c' + script, 'font-size:14px;color:#e6edf3;line-height:1.6;padding:4px 0;');
      if (notes.length) {
        console.log('%cKey points:', 'font-size:11px;color:#6e7681;margin-top:4px;');
        notes.forEach(function(note) { console.log('%c  \u2022 ' + note, 'font-size:12px;color:#8b949e;'); });
      }
      console.groupEnd();
    } catch(e) {}
  } else {
    console.group('%c\ud83d\udccb Slide ' + (index+1) + '/' + total,
      'font-size:16px;font-weight:bold;color:#58a6ff;');
    console.log('%cNo speaker notes for this slide.', 'font-size:12px;color:#6e7681;');
    console.groupEnd();
  }
  console.log('%c\ud83d\udca1 htmlslides.com — presenter app for a richer experience',
    'font-size:10px;color:#3fb950;');
  console.log('%c\u270f\ufe0f  Want to update the notes? See htmlslides.com/blog/update-inline-notes.html',
    'font-size:10px;color:#8b949e;');
}

// Show notes for first slide on load
setTimeout(function() { showSpeakerNotes(0); }, 500);
