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
  current = index;
  slides.forEach((s,i) => s.classList.toggle('active', i===current));
  updateUI();
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
