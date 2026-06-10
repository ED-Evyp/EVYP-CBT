// ─── THEME ───────────────────────────────────────────────────────────────────

const THEME_KEY = 'evyp-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('meta-theme').content = theme === 'dark' ? '#0A0A0A' : '#F5F5F3';
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function initTheme() {
  // Respect saved preference, then system preference
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

const PAGES = ['home', 'specs', 'custom', 'usage', 'trials'];

function navigate(id) {
  if (!PAGES.includes(id)) return;

  PAGES.forEach(p => {
    document.getElementById(`page-${p}`)?.classList.remove('active');
    document.getElementById(`nav-${p}`)?.classList.remove('active');
  });

  document.getElementById(`page-${id}`)?.classList.add('active');
  document.getElementById(`nav-${id}`)?.classList.add('active');
  document.getElementById('content').scrollTop = 0;

  history.replaceState(null, '', id === 'home' ? '#' : `#${id}`);
}

function initNavFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  navigate(PAGES.includes(hash) ? hash : 'home');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavFromHash();
});

window.addEventListener('hashchange', initNavFromHash);

// ─── SERVICE WORKER ───────────────────────────────────────────────────────────

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(r => console.log('[EVYP-CBT] SW registered:', r.scope))
      .catch(e => console.warn('[EVYP-CBT] SW failed:', e));
  });
}
