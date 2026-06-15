// ── THEME ─────────────────────────────────────────────────────
const THEME_KEY = 'evyp-theme';
function applyTheme(t) { document.documentElement.setAttribute('data-theme',t); localStorage.setItem(THEME_KEY,t); }
function initTheme() { const s=localStorage.getItem(THEME_KEY); applyTheme(s||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')); }
document.getElementById('themeToggle').addEventListener('click',()=>{ applyTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'); });

// ── STATE ─────────────────────────────────────────────────────
let activeCrop = null;
let activeOption = null;

// ── OPTION LABELS ─────────────────────────────────────────────
const OPTION_LABELS = {
  'Option A': 'Full Program',
  'Option B': 'Alternative Program',
  'Option C': 'Targeted Intervention',
  'Fertigation': 'Fertigation Program',
  'Spraying': 'Foliar Spray Program',
  'Dosage': 'Recommended Dosage',
  'Root Application': 'Root Application',
  'Foliar Application': 'Foliar Application',
  'Program': 'Recommended Program',
};

// ── BUILD CROP SELECTOR ───────────────────────────────────────
function buildCropSelector() {
  const el = document.getElementById('cropSelector');
  const crops = Object.keys(USAGE_DATA.crops);

  el.innerHTML = crops.map(crop => {
    const data = USAGE_DATA.crops[crop];
    const optCount = Object.keys(data.options).length;
    return `
      <button class="crop-card" data-crop="${crop}" onclick="selectCrop('${crop.replace(/'/g,"\\'")}')">
        <span class="crop-icon">${data.icon}</span>
        <span class="crop-name">${crop}</span>
        <span class="crop-opts">${optCount} option${optCount>1?'s':''}</span>
      </button>`;
  }).join('');
}

// ── SELECT CROP ───────────────────────────────────────────────
function selectCrop(crop) {
  activeCrop = crop;
  activeOption = Object.keys(USAGE_DATA.crops[crop].options)[0];

  document.querySelectorAll('.crop-card').forEach(c => {
    c.classList.toggle('active', c.dataset.crop === crop);
  });

  document.getElementById('programView').style.display = 'block';
  buildOptionTabs(crop);
  buildTimeline(crop, activeOption);

  document.getElementById('programView').scrollIntoView({ behavior:'smooth', block:'start' });
}

// ── OPTION TABS ───────────────────────────────────────────────
function buildOptionTabs(crop) {
  const options = Object.keys(USAGE_DATA.crops[crop].options);
  const el = document.getElementById('optionTabs');

  el.innerHTML = `
    <div class="option-tabs-inner">
      <div class="option-crop-label">
        <span class="option-crop-icon">${USAGE_DATA.crops[crop].icon}</span>
        <span class="option-crop-name">${crop}</span>
        <button class="change-crop-btn" onclick="changeCrop()">&larr; Change crop</button>
      </div>
      ${options.length > 1 ? `
      <div class="option-btn-row">
        ${options.map(opt => `
          <button class="opt-btn${opt===activeOption?' active':''}" data-opt="${opt.replace(/'/g,"\\'")}" onclick="selectOption('${opt.replace(/'/g,"\\'")}')">
            <span class="opt-label">${OPTION_LABELS[opt]||opt}</span>
            <span class="opt-sub">${opt}</span>
          </button>`).join('')}
      </div>` : ''}
    </div>`;
}

function selectOption(opt) {
  activeOption = opt;
  document.querySelectorAll('.opt-btn').forEach(b => b.classList.toggle('active', b.dataset.opt === opt));
  buildTimeline(activeCrop, opt);
}

function changeCrop() {
  document.getElementById('programView').style.display = 'none';
  document.querySelectorAll('.crop-card').forEach(c => c.classList.remove('active'));
  activeCrop = null;
  document.getElementById('cropSelector').scrollIntoView({ behavior:'smooth', block:'start' });
}

// ── TIMELINE ──────────────────────────────────────────────────
function buildTimeline(crop, option) {
  const stages = USAGE_DATA.crops[crop].options[option];
  const el = document.getElementById('timelineWrap');

  el.innerHTML = `
    <div class="timeline">
      ${stages.map((s, i) => buildStageCard(s, i, stages.length)).join('')}
    </div>`;

  el.querySelectorAll('.stage-card').forEach((c,i) => {
    c.style.animationDelay = `${i*0.06}s`;
  });
}

function buildStageCard(s, idx, total) {
  const products = s.products || [];
  const productHTML = products.length > 0
    ? products.map(p => `
      <div class="prod-item">
        <span class="prod-dot"></span>
        <div class="prod-info">
          <span class="prod-name">${p.name}</span>
          ${p.dose ? `<span class="prod-dose">${p.dose}</span>` : ''}
        </div>
      </div>`).join('')
    : `<div class="prod-empty">No application at this stage</div>`;

  const isLast = idx === total - 1;
  const icon = STAGE_ICONS[s.icon] || STAGE_ICONS.generic;

  return `
    <div class="stage-card">
      <div class="stage-connector">
        <div class="stage-node"></div>
        ${!isLast ? '<div class="stage-line"></div>' : ''}
      </div>
      <div class="stage-body">
        <div class="stage-icon-wrap">${icon}</div>
        <div class="stage-header">${s.header}</div>
        <div class="stage-products">${productHTML}</div>
      </div>
    </div>`;
}

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  buildCropSelector();
});
