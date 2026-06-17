// ── THEME ─────────────────────────────────────────────────────
const THEME_KEY = 'evyp-theme';
function applyTheme(t) { document.documentElement.setAttribute('data-theme',t); localStorage.setItem(THEME_KEY,t); }
function initTheme() { const s=localStorage.getItem(THEME_KEY); applyTheme(s||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')); }
document.getElementById('themeToggle').addEventListener('click',()=>{ applyTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'); });

// ── ADD-ON DATA ───────────────────────────────────────────────
const ADDON_CATEGORIES = [
  {
    id: 'seaweed',
    label: 'Seaweed & Botanical Extracts',
    color: '#2A9D8F',
    items: [
      { id: 'ascophyllum', name: 'Ascophyllum Nodosum', note: 'Cytokinin-rich brown seaweed extract — promotes cell division and fruit set' },
      { id: 'ecklonia',    name: 'Ecklonia Maxima',     note: 'High auxin content — root development and early growth' },
      { id: 'sargassum',  name: 'Sargassum Extract',   note: 'Polyphenol-rich — antioxidant and stress buffer properties' },
      { id: 'polysacc',   name: 'Polysaccharides',      note: 'Structural carbohydrates — biostimulant and soil conditioning activity' },
      { id: 'betaine',    name: 'Betaine',               note: 'Osmolyte — drought and salinity stress protection' },
      { id: 'humic',      name: 'Humic & Fulvic Acids', note: 'Soil bioavailability enhancement — nutrient uptake efficiency' },
    ]
  },
  {
    id: 'vitamins',
    label: 'Vitamins',
    color: '#F4C430',
    items: [
      { id: 'vitb1',  name: 'Vitamin B1 (Thiamine)',    note: 'Root development — lateral root initiation' },
      { id: 'vitb2',  name: 'Vitamin B2 (Riboflavin)',  note: 'Systemic resistance induction — ISR pathway activation' },
      { id: 'vitb6',  name: 'Vitamin B6 (Pyridoxine)',  note: 'Amino acid metabolism co-factor' },
      { id: 'vitb12', name: 'Vitamin B12 (Cobalamin)',  note: 'Chlorophyll synthesis support' },
      { id: 'vitc',   name: 'Vitamin C (Ascorbic Acid)',note: 'Antioxidant — oxidative stress mitigation' },
      { id: 'vite',   name: 'Vitamin E (Tocopherol)',   note: 'Membrane protection under thermal stress' },
    ]
  },
  {
    id: 'trace',
    label: 'Trace Elements',
    color: '#9B59B6',
    items: [
      { id: 'zinc',  name: 'Zinc (Zn)',        note: 'Enzyme co-factor — auxin synthesis, pollen viability' },
      { id: 'boron', name: 'Boron (B)',         note: 'Cell wall integrity — pollen tube growth, fruit set' },
      { id: 'moly',  name: 'Molybdenum (Mo)',   note: 'Nitrate reductase co-factor — nitrogen efficiency' },
      { id: 'mang',  name: 'Manganese (Mn)',    note: 'Photosystem II — oxygen evolution complex' },
      { id: 'iron',  name: 'Iron (Fe)',          note: 'Chlorophyll synthesis — electron transport chain' },
      { id: 'copper',name: 'Copper (Cu)',        note: 'Lignin biosynthesis — cell wall strengthening' },
    ]
  },
  {
    id: 'macro',
    label: 'Macro Elements',
    color: '#4A90D9',
    items: [
      { id: 'potassium',   name: 'Potassium (K)',   note: 'Stomatal regulation, sugar transport, fruit quality' },
      { id: 'phosphorus',  name: 'Phosphorus (P)',  note: 'Energy transfer (ATP), root development, flowering' },
      { id: 'calcium',     name: 'Calcium (Ca)',    note: 'Cell wall structure, fruit firmness, tip burn prevention' },
      { id: 'magnesium',   name: 'Magnesium (Mg)', note: 'Chlorophyll central atom — photosynthesis efficiency' },
      { id: 'sulfur',      name: 'Sulfur (S)',      note: 'Cysteine and methionine synthesis — protein structure' },
      { id: 'silicon',     name: 'Silicon (Si)',    note: 'Structural hardening — pest and disease physical barrier' },
    ]
  },
  {
    id: 'micro',
    label: 'Microorganisms',
    color: '#4CAF50',
    items: [
      { id: 'bacillus',    name: 'Bacillus spp.',         note: 'Soil health — ISR, phosphate solubilisation, biocontrol' },
      { id: 'azotobacter', name: 'Azotobacter spp.',      note: 'Free-living nitrogen fixation — reduces N fertiliser need' },
      { id: 'trichoderma', name: 'Trichoderma spp.',      note: 'Root coloniser — biocontrol, phosphate release' },
      { id: 'mychorizha',  name: 'Mycorrhizal Fungi',     note: 'Hyphal water and nutrient uptake network' },
      { id: 'derxia',      name: 'Derxia sp.',             note: 'Diazotrophic — atmospheric nitrogen fixation' },
    ]
  },
];

// ── SELECTED STATE ────────────────────────────────────────────
const selected = new Set();

// ── NAME GENERATOR ────────────────────────────────────────────
function generateName() {
  if (selected.size === 0) return '';
  const parts = ['AminoCell'];
  const hasSeaweed  = [...selected].some(id => ['ascophyllum','ecklonia','sargassum','polysacc'].includes(id));
  const hasVitamins = [...selected].some(id => id.startsWith('vit'));
  const hasTrace    = [...selected].some(id => ['zinc','boron','moly','mang','iron','copper'].includes(id));
  const hasMacro    = [...selected].some(id => ['potassium','phosphorus','calcium','magnesium','sulfur','silicon'].includes(id));
  const hasMicro    = [...selected].some(id => ['bacillus','azotobacter','trichoderma','mychorizha','derxia'].includes(id));
  const codes = [];
  if (hasSeaweed)  codes.push('SX');
  if (hasVitamins) codes.push('V');
  if (hasTrace)    codes.push('TE');
  if (hasMacro)    codes.push('PK');
  if (hasMicro)    codes.push('Bio');
  if (codes.length) parts.push(codes.join('+'));
  return parts.join(' ');
}

// ── RENDER ────────────────────────────────────────────────────
function renderCategories() {
  const el = document.getElementById('addonCategories');
  el.innerHTML = ADDON_CATEGORIES.map(cat => `
    <div class="addon-category">
      <div class="addon-cat-label" style="color:${cat.color}">${cat.label}</div>
      <div class="addon-chips">
        ${cat.items.map(item => `
          <button class="addon-chip" data-id="${item.id}"
            style="--chip-color:${cat.color}"
            onclick="toggleAddon('${item.id}', this)"
            title="${item.note}">
            <span class="chip-name">${item.name}</span>
            <span class="chip-note">${item.note}</span>
          </button>`).join('')}
      </div>
    </div>`).join('');
}

function toggleAddon(id, btn) {
  if (selected.has(id)) {
    selected.delete(id);
    btn.classList.remove('active');
  } else {
    selected.add(id);
    btn.classList.add('active');
  }
  updateSummary();
}

function resetBuilder() {
  selected.clear();
  document.querySelectorAll('.addon-chip.active').forEach(c => c.classList.remove('active'));
  updateSummary();
}

function updateSummary() {
  const empty  = document.getElementById('summaryEmpty');
  const active = document.getElementById('summaryActive');
  const nameEl = document.getElementById('summaryName');
  const chips  = document.getElementById('summaryChips');

  if (selected.size === 0) {
    empty.style.display  = 'flex';
    active.style.display = 'none';
    return;
  }
  empty.style.display  = 'none';
  active.style.display = 'block';

  nameEl.textContent = generateName();

  // Collect selected items with their category colour
  const items = [];
  ADDON_CATEGORIES.forEach(cat => {
    cat.items.forEach(item => {
      if (selected.has(item.id)) items.push({ ...item, color: cat.color });
    });
  });

  chips.innerHTML = `
    <div class="sum-chip base-chip">
      <span>Amino Acid Base</span>
    </div>
    ${items.map(i => `
      <div class="sum-chip" style="border-color:${i.color}33;background:${i.color}14;color:${i.color}">
        <span>${i.name}</span>
        <span class="sum-chip-note">${i.note}</span>
      </div>`).join('')}`;
}

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCategories();
});
