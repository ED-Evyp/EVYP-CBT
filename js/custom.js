// ── THEME ─────────────────────────────────────────────────────
const THEME_KEY = 'evyp-theme';
function applyTheme(t) { document.documentElement.setAttribute('data-theme',t); localStorage.setItem(THEME_KEY,t); }
function initTheme() { const s=localStorage.getItem(THEME_KEY); applyTheme(s||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')); }
document.getElementById('themeToggle').addEventListener('click',()=>{ applyTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'); });

// ── BASE DEFINITIONS ──────────────────────────────────────────
const BASES = [
  {
    id: 'green',
    name: 'Green',
    subtitle: 'Balanced Broad-Spectrum',
    ref: 'Ultra Green',
    freeAA: 6.4,
    totalAA: 12.32,
    aaTypes: 16,
    nitrogen: '1.8–2.2%',
    character: 'A well-rounded amino acid base with balanced free and total AA content. Ideal for general biostimulation, foliar programmes, and crops where a broad amino acid spectrum is prioritised over high concentration.',
    color: '#4CAF50',
  },
  {
    id: 'power',
    name: 'Power',
    subtitle: 'High Free-L Concentration',
    ref: 'Amino Power',
    freeAA: 10.04,
    totalAA: 14.49,
    aaTypes: 18,
    nitrogen: '2.1–2.5%',
    character: 'Maximum free-L amino acid availability with all 18 proteinogenic amino acids. Fast plant uptake and rapid metabolic response. Suited to high-value crops and intensive foliar programmes.',
    color: '#E8631A',
  },
  {
    id: 'legacy',
    name: 'Legacy',
    subtitle: 'Maximum Total AA Content',
    ref: 'Amino16',
    freeAA: 11.89,
    totalAA: 19.0,
    aaTypes: 16,
    nitrogen: '2.8–3.2%',
    character: 'The highest total amino acid content in our range, delivering sustained release and prolonged biostimulant activity. The proven base behind our flagship product line with field data across 12+ crops.',
    color: '#4A90D9',
  },
  {
    id: 'cell',
    name: 'Cell',
    subtitle: 'Premium Cellular Activation',
    ref: 'Amino Cell Antistress',
    freeAA: 14.5,
    totalAA: 18.67,
    aaTypes: 18,
    nitrogen: '2.8–3.2%',
    character: 'The highest free-L amino acid concentration in our range, combined with all 18 amino acids. Designed for cellular-level activation, stress recovery, and premium crop quality programmes.',
    color: '#9B59B6',
  },
];

// ── ADD-ON CATEGORIES ─────────────────────────────────────────
const ADDON_CATEGORIES = [
  {
    id: 'botanical',
    label: 'Seaweed, Botanical & Microorganisms',
    color: '#2A9D8F',
    items: [
      { id: 'ascophyllum', name: 'Ascophyllum Nodosum',  note: 'Cytokinin-rich brown seaweed — fruit set & cell division', simple: false },
      { id: 'ecklonia',    name: 'Ecklonia Maxima',      note: 'High auxin content — root development & early growth',    simple: false },
      { id: 'sargassum',  name: 'Sargassum Extract',    note: 'Polyphenol-rich — antioxidant & stress buffer',           simple: false },
      { id: 'polysacc',   name: 'Polysaccharides',      note: 'Structural carbohydrates — biostimulant & soil activity', simple: false },
      { id: 'betaine',    name: 'Betaine',               note: 'Osmolyte — drought & salinity stress protection',         simple: false },
      { id: 'humic',      name: 'Humic & Fulvic Acids', note: 'Nutrient uptake efficiency & soil bioavailability',       simple: false },
      { id: 'microorg',   name: 'Microorganisms',        note: 'Beneficial bacteria consortium (Bacillus, Azotobacter, Derxia)', simple: true },
    ]
  },
  {
    id: 'vitamins',
    label: 'Vitamins',
    color: '#F4C430',
    items: [
      { id: 'vitb1',  name: 'B1 (Thiamine)',     note: 'Root development — lateral root initiation',         simple: false },
      { id: 'vitb2',  name: 'B2 (Riboflavin)',   note: 'Systemic resistance induction — ISR pathway',       simple: false },
      { id: 'vitb6',  name: 'B6 (Pyridoxine)',   note: 'Amino acid metabolism co-factor',                   simple: false },
      { id: 'vitb12', name: 'B12 (Cobalamin)',   note: 'Chlorophyll synthesis support',                     simple: false },
      { id: 'vitc',   name: 'C (Ascorbic Acid)', note: 'Antioxidant — oxidative stress mitigation',         simple: false },
      { id: 'vite',   name: 'E (Tocopherol)',    note: 'Membrane protection under thermal stress',           simple: false },
    ]
  },
  {
    id: 'trace',
    label: 'Trace Elements',
    color: '#9B59B6',
    items: [
      { id: 'zinc',   name: 'Zinc (Zn)',       note: 'Auxin synthesis & pollen viability',              simple: false },
      { id: 'boron',  name: 'Boron (B)',        note: 'Cell wall integrity — pollen tube growth',        simple: false },
      { id: 'moly',   name: 'Molybdenum (Mo)', note: 'Nitrate reductase — nitrogen use efficiency',     simple: false },
      { id: 'mang',   name: 'Manganese (Mn)',  note: 'Photosystem II — oxygen evolution complex',       simple: false },
      { id: 'iron',   name: 'Iron (Fe)',        note: 'Chlorophyll synthesis & electron transport',      simple: false },
      { id: 'copper', name: 'Copper (Cu)',      note: 'Lignin biosynthesis — cell wall strengthening',   simple: false },
    ]
  },
  {
    id: 'macro',
    label: 'Macro Elements',
    color: '#4A90D9',
    items: [
      { id: 'potassium',  name: 'Potassium (K)',  note: 'Stomatal regulation & fruit sugar transport',   simple: false },
      { id: 'phosphorus', name: 'Phosphorus (P)', note: 'Energy transfer (ATP), root dev & flowering',   simple: false },
      { id: 'calcium',    name: 'Calcium (Ca)',   note: 'Fruit firmness & tip burn prevention',          simple: false },
      { id: 'magnesium',  name: 'Magnesium (Mg)', note: 'Chlorophyll core atom — photosynthesis',       simple: false },
      { id: 'sulfur',     name: 'Sulfur (S)',     note: 'Cysteine & methionine synthesis',               simple: false },
      { id: 'silicon',    name: 'Silicon (Si)',   note: 'Structural hardening — pest & disease barrier', simple: false },
    ]
  },
];

// ── STATE ─────────────────────────────────────────────────────
let activeBase = null;
// Map: addon id → volume % (default 100)
const selected = new Map();

// ── BASE SELECTOR ─────────────────────────────────────────────
function renderBases() {
  const el = document.getElementById('baseSelector');
  el.innerHTML = BASES.map(b => `
    <button class="base-option" data-id="${b.id}" onclick="selectBase('${b.id}')"
      style="--base-color:${b.color}">
      <div class="bo-top">
        <span class="bo-name" style="color:${b.color}">${b.name}</span>
        <span class="bo-sub">${b.subtitle}</span>
      </div>
      <div class="bo-stats">
        <div class="bo-stat"><span class="bos-val">${b.freeAA}%</span><span class="bos-lbl">Free-L</span></div>
        <div class="bo-stat"><span class="bos-val">${b.totalAA}%</span><span class="bos-lbl">Total AA</span></div>
        <div class="bo-stat"><span class="bos-val">${b.aaTypes}</span><span class="bos-lbl">AA Types</span></div>
      </div>
    </button>`).join('');
}

function selectBase(id) {
  activeBase = id;
  document.querySelectorAll('.base-option').forEach(b => {
    b.classList.toggle('active', b.dataset.id === id);
  });
  // Show base character text
  const base = BASES.find(b => b.id === id);
  const charEl = document.getElementById('baseCharacter');
  charEl.style.display = 'block';
  charEl.innerHTML = `
    <span class="bc-ref">Based on <strong>${base.ref}</strong> · N: ${base.nitrogen}</span>
    <p>${base.character}</p>`;
  charEl.style.borderColor = base.color + '44';
  updateSummary();
}

// ── ADD-ON CATEGORIES ─────────────────────────────────────────
function renderCategories() {
  const el = document.getElementById('addonCategories');
  el.innerHTML = ADDON_CATEGORIES.map(cat => `
    <div class="addon-category">
      <div class="addon-cat-label" style="color:${cat.color}">${cat.label}</div>
      <div class="addon-chips">
        ${cat.items.map(item => item.simple
          ? renderSimpleChip(item, cat.color)
          : renderVolumeChip(item, cat.color)
        ).join('')}
      </div>
    </div>`).join('');
}

function renderSimpleChip(item, color) {
  return `
    <button class="addon-chip simple-chip" data-id="${item.id}"
      style="--chip-color:${color}"
      onclick="toggleSimple('${item.id}', this)">
      <span class="chip-name">${item.name}</span>
      <span class="chip-note">${item.note}</span>
    </button>`;
}

function renderVolumeChip(item, color) {
  return `
    <div class="addon-chip volume-chip" data-id="${item.id}" style="--chip-color:${color}">
      <div class="vc-top">
        <button class="vc-toggle" onclick="toggleVolume('${item.id}', this)">
          <span class="chip-name">${item.name}</span>
          <span class="chip-note">${item.note}</span>
        </button>
      </div>
      <div class="vc-controls" id="vctrl-${item.id}" style="display:none">
        <button class="vol-btn" onclick="adjustVolume('${item.id}', -10)">−</button>
        <span class="vol-display" id="vol-${item.id}">100%</span>
        <button class="vol-btn" onclick="adjustVolume('${item.id}', +10)">+</button>
      </div>
    </div>`;
}

function toggleSimple(id, btn) {
  if (selected.has(id)) {
    selected.delete(id);
    btn.classList.remove('active');
  } else {
    selected.set(id, 100);
    btn.classList.add('active');
  }
  updateSummary();
}

function toggleVolume(id, btn) {
  const chip = btn.closest('.volume-chip');
  const ctrl = document.getElementById(`vctrl-${id}`);
  if (selected.has(id)) {
    selected.delete(id);
    chip.classList.remove('active');
    ctrl.style.display = 'none';
  } else {
    selected.set(id, 100);
    chip.classList.add('active');
    ctrl.style.display = 'flex';
  }
  updateSummary();
}

function adjustVolume(id, delta) {
  if (!selected.has(id)) return;
  const current = selected.get(id);
  const next = Math.max(10, Math.min(200, current + delta));
  selected.set(id, next);
  const display = document.getElementById(`vol-${id}`);
  if (display) display.textContent = next + '%';
  // Visual cue: colour intensity shifts
  const chip = document.querySelector(`[data-id="${id}"]`);
  if (chip) {
    chip.style.setProperty('--vol-opacity', (next / 200).toFixed(2));
  }
  updateSummary();
}

// ── NAME GENERATOR ────────────────────────────────────────────
function generateName() {
  if (!activeBase) return '';
  const base = BASES.find(b => b.id === activeBase);
  if (selected.size === 0) return `AminoCell ${base.name}`;
  const codes = [];
  if ([...selected.keys()].some(id => ['ascophyllum','ecklonia','sargassum','polysacc'].includes(id))) codes.push('SX');
  if ([...selected.keys()].some(id => id.startsWith('vit'))) codes.push('V');
  if ([...selected.keys()].some(id => ['zinc','boron','moly','mang','iron','copper'].includes(id))) codes.push('TE');
  if ([...selected.keys()].some(id => ['potassium','phosphorus','calcium','magnesium','sulfur','silicon'].includes(id))) codes.push('PK');
  if (selected.has('microorg')) codes.push('Bio');
  if (selected.has('betaine') || selected.has('humic')) codes.push('OS');
  return `AminoCell ${base.name}${codes.length ? ' · ' + codes.join('+') : ''}`;
}

// ── SUMMARY ───────────────────────────────────────────────────
function resetBuilder() {
  selected.clear();
  document.querySelectorAll('.addon-chip.active').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.vc-controls').forEach(c => c.style.display = 'none');
  document.querySelectorAll('.vol-display').forEach(d => d.textContent = '100%');
  updateSummary();
}

function updateSummary() {
  const empty  = document.getElementById('summaryEmpty');
  const active = document.getElementById('summaryActive');
  const nameEl = document.getElementById('summaryName');
  const chips  = document.getElementById('summaryChips');

  if (!activeBase) {
    empty.style.display  = 'flex';
    active.style.display = 'none';
    return;
  }

  const base = BASES.find(b => b.id === activeBase);
  empty.style.display  = 'none';
  active.style.display = 'block';
  nameEl.textContent   = generateName();
  nameEl.style.color   = base.color;

  // Base chip
  let html = `<div class="sum-chip base-chip" style="background:${base.color};border-color:${base.color}">
    <span class="sum-chip-title">${base.name} Base</span>
    <span class="sum-chip-note">${base.freeAA}% Free-L · ${base.totalAA}% Total · ${base.aaTypes} AAs</span>
  </div>`;

  // Add-on chips
  ADDON_CATEGORIES.forEach(cat => {
    cat.items.forEach(item => {
      if (!selected.has(item.id)) return;
      const vol = selected.get(item.id);
      const volLabel = vol !== 100 ? ` · ${vol}%` : '';
      html += `<div class="sum-chip" style="border-color:${cat.color}44;background:${cat.color}12;color:${cat.color}">
        <span class="sum-chip-title">${item.name}${volLabel}</span>
        <span class="sum-chip-note">${item.note}</span>
      </div>`;
    });
  });

  chips.innerHTML = html;
}

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderBases();
  renderCategories();
});
