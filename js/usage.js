// ── THEME ─────────────────────────────────────────────────────
const THEME_KEY = 'evyp-theme';
function applyTheme(t) { document.documentElement.setAttribute('data-theme',t); localStorage.setItem(THEME_KEY,t); }
function initTheme() { const s=localStorage.getItem(THEME_KEY); applyTheme(s||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')); }
document.getElementById('themeToggle').addEventListener('click',()=>{ applyTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'); });

// ── PRODUCT COLOUR MAP ────────────────────────────────────────
// EVYP products get an orange accent; other products get a neutral style
const EVYP_MATCH = [
  'amino16','amino power','amino cell','aminocell','fruitfix','granbrix',
  'micrors','nf hyd','bmc fixer',
];
function isEVYP(name) {
  return true; // All recommended products are EVYP CBT products
}

// ── STATE ─────────────────────────────────────────────────────
let activeCrop   = null;
let activeOption = null;

// ── BUILD CROP SELECTOR ───────────────────────────────────────
function buildCropSelector() {
  const el = document.getElementById('cropSelector');
  const crops = Object.keys(USAGE_DATA.crops);

  el.innerHTML = crops.map(crop => {
    const data = USAGE_DATA.crops[crop];
    const optCount = Object.keys(data.options).length;
    return `
      <button class="crop-card" data-crop="${crop}" onclick="selectCrop('${crop}')">
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

  // Update card states
  document.querySelectorAll('.crop-card').forEach(c => {
    c.classList.toggle('active', c.dataset.crop === crop);
  });

  document.getElementById('programView').style.display = 'block';
  buildOptionTabs(crop);
  buildTimeline(crop, activeOption);

  // Smooth scroll to program on mobile
  document.getElementById('programView').scrollIntoView({ behavior:'smooth', block:'start' });
}

// ── OPTION TABS ───────────────────────────────────────────────
function buildOptionTabs(crop) {
  const options = Object.keys(USAGE_DATA.crops[crop].options);
  const el = document.getElementById('optionTabs');

  const labels = {
    'Option A': 'Full Program',
    'Option B': 'Alternative Program',
    'Option C': 'Targeted Intervention',
  };

  el.innerHTML = `
    <div class="option-tabs-inner">
      <div class="option-crop-label">
        <span class="option-crop-icon">${USAGE_DATA.crops[crop].icon}</span>
        <span class="option-crop-name">${crop}</span>
        <button class="change-crop-btn" onclick="changeCrop()">← Change crop</button>
      </div>
      <div class="option-btn-row">
        ${options.map(opt => `
          <button class="opt-btn${opt===activeOption?' active':''}" data-opt="${opt}" onclick="selectOption('${opt}')">
            <span class="opt-label">${labels[opt]||opt}</span>
            <span class="opt-sub">${opt}</span>
          </button>`).join('')}
      </div>
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
  const stages    = USAGE_DATA.crops[crop].options[option];
  const headers   = USAGE_DATA.stageHeaders[crop];
  const images    = USAGE_DATA.stageImages[crop];
  const el        = document.getElementById('timelineWrap');

  // Count non-empty stages
  const activeStages = stages.map((s,i) => ({ stage:s, header:headers[i], img:images[i] }))
                             .filter(s => s.stage !== null);

  el.innerHTML = `
    <div class="timeline">
      ${activeStages.map((s, i) => buildStageCard(s, i, activeStages.length)).join('')}
    </div>`;

  // Animate in
  el.querySelectorAll('.stage-card').forEach((c,i) => {
    c.style.animationDelay = `${i*0.08}s`;
  });
}

function buildStageCard(s, idx, total) {
  const products = s.stage;
  const evypProds = products.filter(p => isEVYP(p.name));
  const otherProds = products.filter(p => !isEVYP(p.name));

  const productHTML = [
    ...evypProds.map(p => `
      <div class="prod-item evyp">
        <span class="prod-dot evyp-dot"></span>
        <div class="prod-info">
          <span class="prod-name">${p.name}</span>
          ${p.dose ? `<span class="prod-dose">${p.dose}</span>` : ''}
        </div>
      </div>`),
    ...otherProds.map(p => `
      <div class="prod-item other">
        <span class="prod-dot other-dot"></span>
        <div class="prod-info">
          <span class="prod-name other-name">${p.name}</span>
          ${p.dose ? `<span class="prod-dose">${p.dose}</span>` : ''}
        </div>
      </div>`)
  ].join('');

  const isLast = idx === total - 1;

  return `
    <div class="stage-card" style="animation-delay:${idx*0.08}s">
      <div class="stage-connector">
        <div class="stage-node"></div>
        ${!isLast ? '<div class="stage-line"></div>' : ''}
      </div>
      <div class="stage-body">
        <div class="stage-img-wrap">
          <img src="images/stages/${s.img}" alt="${s.header}" class="stage-img${activeCrop==='Olives'?' olive-img':''}" loading="lazy"/>
        </div>
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
