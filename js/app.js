// ─── NAVIGATION ─────────────────────────────────────────────────────────────

const PAGES = ['home', 'specs', 'custom', 'usage', 'trials'];

function navigate(id) {
  if (!PAGES.includes(id)) return;

  // Deactivate all pages
  PAGES.forEach(p => {
    const page = document.getElementById(`page-${p}`);
    const nav  = document.getElementById(`nav-${p}`);
    if (page) page.classList.remove('active');
    if (nav)  nav.classList.remove('active');
  });

  // Activate target
  const target    = document.getElementById(`page-${id}`);
  const targetNav = document.getElementById(`nav-${id}`);
  if (target)    target.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  // Scroll content to top
  const content = document.getElementById('content');
  if (content) content.scrollTop = 0;

  // Update URL hash without pushing to history
  history.replaceState(null, '', id === 'home' ? '#' : `#${id}`);
}

// Handle initial hash on load
function initNavFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  const target = PAGES.includes(hash) ? hash : 'home';
  navigate(target);
}

window.addEventListener('DOMContentLoaded', initNavFromHash);
window.addEventListener('hashchange', initNavFromHash);

// ─── SERVICE WORKER REGISTRATION ────────────────────────────────────────────

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('[EVYP-CBT] SW registered:', reg.scope))
      .catch(err => console.warn('[EVYP-CBT] SW registration failed:', err));
  });
}
