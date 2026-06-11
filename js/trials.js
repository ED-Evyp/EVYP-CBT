// ── THEME ────────────────────────────────────────────────────
const THEME_KEY = 'evyp-theme';
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(THEME_KEY, t);
}
function isDark() { return document.documentElement.getAttribute('data-theme') !== 'light'; }
function initTheme() {
  const s = localStorage.getItem(THEME_KEY);
  applyTheme(s || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'));
}
document.getElementById('themeToggle').addEventListener('click', () => {
  applyTheme(isDark() ? 'light' : 'dark');
  setTimeout(redrawAll, 60);
});

// ── COLOUR PALETTE ───────────────────────────────────────────
const C = {
  orange: '#E8631A', teal: '#2A9D8F', blue: '#4A90D9',
  purple: '#9B59B6', gold: '#F4C842', green: '#4CAF50',
  red: '#E74C3C', cyan: '#00BCD4',
};
function bg()     { return isDark() ? '#161616' : '#FFFFFF'; }
function grid()   { return isDark() ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'; }
function text()   { return isDark() ? '#C0C0C0' : '#444444'; }
function subtext(){ return isDark() ? '#666666' : '#AAAAAA'; }
function surf2()  { return isDark() ? '#1E1E1E' : '#F0F0EE'; }

// ── TRIAL DATA ───────────────────────────────────────────────
const TRIALS = [
  {
    id: 1, crop: 'Avocado', year: 2020, product: 'Amino16',
    tag: 'fruit', location: 'Chania, Crete',
    headline: 'Fruit weight increase in Fuerte variety',
    summary: 'Three seasonal applications of Amino16 significantly improved fruit weight development in Fuerte avocado, with a 119% weight increase vs 58% in untreated controls. Hass variety showed positive trends in yield (+11%) without reaching statistical significance.',
    chartType: 'comparison_bar',
    chartData: {
      title: 'Fruit Weight Increase (%)',
      groups: ['Hass', 'Fuerte'],
      series: [
        { label: 'Amino16', color: C.orange, values: [11, 119] },
        { label: 'Control', color: C.teal,   values: [0, 58] },
      ],
      unit: '%', note: '★ Statistically significant in Fuerte (p<0.05)'
    }
  },
  {
    id: 2, crop: 'Kiwi', year: 2019, product: 'Amino16 + Fruitfix',
    tag: 'fruit', location: 'Kefalochori, Imathia',
    headline: 'Yield per tree increased by 38% over control',
    summary: 'Large-scale field trial on Hayward kiwi comparing Amino16, Fruitfix, and an untreated control. Amino16 achieved the highest yield via improved fruit set; Fruitfix improved fruit size. Both clearly outperformed the control.',
    chartType: 'triple_bar',
    chartData: {
      metrics: [
        { label: 'Yield per tree (kg)', vals: [28.24, 23.50, 20.42], hi: 30 },
        { label: 'Avg fruit weight (g)', vals: [119.6, 122.4, 116.7], hi: 130 },
      ],
      series: ['Amino16', 'Fruitfix', 'Control'],
      colors: [C.orange, C.teal, subtext],
    }
  },
  {
    id: 3, crop: 'Mint & Spearmint', year: 2011, product: 'Amino16',
    tag: 'vegetable', location: 'Aristotle University, Thessaloniki',
    headline: 'Antioxidant capacity boosted +130% at high dose',
    summary: 'High-dose Amino16 (0.50%) in hydroponic conditions triggered a deliberate mild stress response, activating antioxidant enzymes (APX, POD) and dramatically improving polyphenol quality — particularly in spearmint — while biomass was only modestly reduced.',
    chartType: 'tradeoff',
    chartData: {
      items: [
        { label: 'Antioxidant Capacity', change: +130, color: C.teal },
        { label: 'APX Enzyme Activity', change: +85,  color: C.teal },
        { label: 'POD Enzyme Activity', change: +70,  color: C.teal },
        { label: 'Biomass',             change: -30,  color: C.orange },
      ],
      note: 'Dose: 0.50% Amino16 vs control'
    }
  },
  {
    id: 4, crop: 'Mint & Spearmint', year: 2021, product: 'Amino16',
    tag: 'vegetable', location: 'Aristotle University, Thessaloniki',
    headline: 'Nitrates cut by 64% with improved essential oil yield',
    summary: 'Amino16 supplementation in hydroponic nutrient solution substantially improved product quality: nitrate accumulation was suppressed, chlorophyll content increased, and essential oil yield rose by 26% — without negative effects on fresh weight.',
    chartType: 'delta_bars',
    chartData: {
      items: [
        { label: 'Nitrates',       delta: -64, unit: '%', color: C.teal,   note: 'food safety ↑' },
        { label: 'Essential Oil',  delta: +26, unit: '%', color: C.orange, note: 'quality ↑' },
        { label: 'Chlorophyll',    delta: +18, unit: '%', color: C.green,  note: 'vigour ↑' },
        { label: 'Fresh Weight',   delta:  +2, unit: '%', color: C.blue,   note: 'unchanged' },
      ]
    }
  },
  {
    id: 5, crop: 'Cotton', year: 2017, product: 'Amino16',
    tag: 'field', location: 'Larissa, Thessaly',
    headline: '+4.2% yield increase across 10.4 hectares',
    summary: 'Commercial-scale trial on Fiona variety cotton. Three applications of Amino16 at key growth stages produced consistent yield and fibre quality improvements across the entire field — a meaningful gain at production scale.',
    chartType: 'dual_gauge',
    chartData: {
      metrics: [
        { label: 'Seed Cotton Yield', unit: 'kg/ha', treated: 4333, control: 4155, pct: 4.3 },
        { label: 'Fibre Yield', unit: '%', treated: 48.4, control: 47.81, pct: 1.2 },
      ]
    }
  },
  {
    id: 6, crop: 'Cereals & Olive', year: null, product: 'Amino16 · Amino16 BZn',
    tag: 'field', location: 'Chalkidiki',
    headline: 'Tillering doubled in barley; fruit set doubled in olive',
    summary: 'Multi-crop evaluation across barley, durum wheat, soft wheat, and Chalkidiki olive. Standout results in barley tillering and olive fruit set; all crops showed height and biomass improvement with increasing dose.',
    chartType: 'multicrop',
    chartData: {
      crops: [
        { name: 'Barley',      icon: '🌾', metric: 'Tillers/plant',  ctrl: 4.40, trt: 9.22,  unit: '' },
        { name: 'Durum Wheat', icon: '🌾', metric: 'Height (cm)',    ctrl: 58,   trt: 78,    unit: 'cm' },
        { name: 'Soft Wheat',  icon: '🌾', metric: 'Fruit wt (g)',   ctrl: 1.5,  trt: 5.56,  unit: 'g' },
        { name: 'Olive',       icon: '🫒', metric: 'Fruit set idx',  ctrl: 1.41, trt: 3.13,  unit: '' },
      ]
    }
  },
  {
    id: 7, crop: 'Olives · Apples · Cherries', year: 2017, product: 'Amino16',
    tag: 'fruit', location: 'Kalamata · Kozani · Edessa',
    headline: 'Significant fruiting increase in olive despite severe drought',
    summary: 'Three-crop study by the American Farm School. Olive (Kalamon & Koroneiki) showed statistically significant fruiting improvement (p<0.001) despite intense drought. Apple showed +19–37cm vegetation increase. Cherry showed accelerated ripening across varieties.',
    chartType: 'significance_grid',
    chartData: {
      crops: [
        { name: 'Olive',  result: 'Significant',         p: 'p<0.001', icon: '🫒', color: C.orange },
        { name: 'Apple',  result: '+19–37cm vegetation',  p: 'p=0.004', icon: '🍎', color: C.teal },
        { name: 'Cherry', result: 'Accelerated ripening', p: 'trend',   icon: '🍒', color: C.purple },
      ]
    }
  },
  {
    id: 8, crop: 'Olive', year: 2013, product: 'Amino16',
    tag: 'fruit', location: 'Ag. Mamas, Chalkidiki',
    headline: 'Winter application critical for bud differentiation',
    summary: 'Detailed dosing trial on Chondrolia and Kalamon olives identified winter application during vernalization as the most impactful timing. The 50cc dose gave best fruit set for Chondrolia; Kalamon yield index significantly exceeded control at all doses.',
    chartType: 'timing_bar',
    chartData: {
      timings: ['Winter\n(vernaliz.)', 'Pre-\nflowering', 'Post\nfruit set'],
      impact:  [95, 52, 38],
      note: 'Relative fruit set improvement by application timing',
      color: C.orange,
    }
  },
  {
    id: 9, crop: 'Tobacco', year: '2014–2015', product: 'Amino16',
    tag: 'field', location: 'Katerini & Imathia',
    headline: 'Budworm infestation cut 39.7% in combination with BT',
    summary: 'Amino16 combined with Bacillus thuringiensis reduced budworm infestation by 32.8–39.7% vs control, outperforming BT alone. Seedlings grown with 50% pesticide dose + Amino16 showed greater shoot and root development than full-dose pesticide controls.',
    chartType: 'pest_reduction',
    chartData: {
      bars: [
        { label: 'BT + Amino16\n(Katerini)', reduction: 32.8, color: C.orange },
        { label: 'BT + Amino16\n(Virginia)', reduction: 39.7, color: C.orange },
        { label: 'BT only',                  reduction: 18,   color: C.teal },
        { label: 'Control',                   reduction: 0,    color: subtext },
      ],
      unit: '% infestation reduction vs baseline',
    }
  },
  {
    id: 10, crop: 'Baby Lettuce', year: 2020, product: 'Amino16',
    tag: 'vegetable', location: 'Greenhouse trial, AUTH',
    headline: 'Quality improved while cutting nitrogen input by 50%',
    summary: 'Under 50% reduced nitrogen, Amino16 at 0.3% maintained yield while improving polyphenols, antioxidants, and pigments. The 0.9% dose caused mild osmotic stress. Demonstrates potential for reduced-input premium production.',
    chartType: 'dose_response',
    chartData: {
      doses: ['0% (control)', '0.3% Amino16', '0.9% Amino16'],
      metrics: [
        { label: 'Yield', values: [100, 102, 78],  color: C.orange },
        { label: 'Antioxidants', values: [100, 128, 118], color: C.teal },
        { label: 'Nitrates', values: [100, 72, 68],  color: C.blue },
      ],
      note: 'Indexed to control = 100 | 50% N reduction background'
    }
  },
  {
    id: 11, crop: 'Lettuce', year: 2014, product: 'Amino16',
    tag: 'vegetable', location: 'Greenhouse field trial',
    headline: '55% of crop in optimal weight class — best uniformity',
    summary: 'Soil-applied Amino16 produced the most uniform lettuce crop — 55% of plants in the 200–249g optimal weight category. Foliar application boosted antioxidant capacity. Both methods prevented nitrate accumulation seen with ammonium nitrate.',
    chartType: 'uniformity',
    chartData: {
      treatments: ['Amino16\n(soil)', 'Amino16\n(foliar)', 'Ammon.\nNitrate', 'Control'],
      optimal_pct: [55, 42, 31, 28],
      antioxidant: [118, 145, 98, 100],
      nitrates:    [85, 90, 162, 100],
      colors: [C.orange, C.teal, C.blue, subtext],
    }
  },
  {
    id: 12, crop: 'Apples', year: 2018, product: 'Amino16',
    tag: 'fruit', location: 'Pyrgoi, Kozani',
    headline: 'Fruit size, colour and yield all improved at scale',
    summary: 'Large-scale (15 stremma) trial on Red Chief apples. Three targeted spray applications increased total yield by 5%, average fruit weight by 10.6g, and delivered visibly better colouring especially on shaded side. Allows earlier harvest with no quality penalty.',
    chartType: 'apple_metrics',
    chartData: {
      metrics: [
        { label: 'Total Yield (kg)', treated: 1260, control: 1197, unit: 'kg', decimals: 0 },
        { label: 'Avg Fruit Weight (g)', treated: 241, control: 230.5, unit: 'g', decimals: 1 },
        { label: 'Fruit Length (mm)', treated: 73, control: 70, unit: 'mm', decimals: 0 },
      ],
      color: C.orange,
    }
  },
  {
    id: 13, crop: 'Peaches & Nectarines', year: 2017, product: 'Amino16',
    tag: 'fruit', location: 'Imathia & Veria',
    headline: '+10.6% yield in Everts peach; +10.2% in Venus nectarine',
    summary: 'Identical protocols across two fields, two varieties. Both exceeded 10% yield improvement. Fruit weight, sugar content (°Brix) and — for nectarines — red overcolor all significantly improved. Amino16 also accelerated ripening, shifting production to the higher-value first harvest pass.',
    chartType: 'two_variety',
    chartData: {
      varieties: ['Everts (Peach)', 'Venus (Nectarine)'],
      yield_pct: [10.6, 10.2],
      extras: [
        { label: 'Sugar (°Brix)', vals: [10.4, 9.3], which: 0, unit: '°Brix' },
        { label: 'Red overcolor', vals: [53.6, 43.8], which: 1, unit: '%' },
      ],
      color: C.orange,
    }
  },
  {
    id: 14, crop: 'Tomato', year: '2012–2013', product: 'Amino16',
    tag: 'vegetable', location: 'AUTH Farm, Thessaloniki',
    headline: 'Fruit weight up to +51% under standard fertilization',
    summary: 'Controlled university experiment testing Amino16 dose and application method against three nitrogen levels. Under standard fertilization, combined root (0.3%) + foliar (0.9%) application increased average fruit weight by 16–51%. Under reduced nitrogen, marketable production increased by 28%.',
    chartType: 'dose_matrix',
    chartData: {
      scenarios: ['Full N\n(std fert.)', '20% reduced\nN input', '40% reduced\nN input'],
      improvement: [33, 28, 17],
      metric: ['Avg fruit weight', 'Marketable production', 'Total fruits'],
      colors: [C.orange, C.teal, C.blue],
      note: 'Best Amino16 result per nitrogen scenario'
    }
  },
  {
    id: 15, crop: 'Lettuce', year: 2017, product: 'Amino16',
    tag: 'soil', location: 'ELGO-DEMETER, Thessaloniki',
    headline: 'Soil microbiome restructured; nitrates significantly reduced',
    summary: 'Metagenomic analysis (Illumina HiSeq, 445 OTUs) revealed that Amino16 modifies the rhizosphere bacterial community structure, reducing Acidobacteria abundance and significantly reducing soil nitrate levels (NO₃-N) — reducing pollution potential without yield loss.',
    chartType: 'microbiome',
    chartData: {
      phyla: [
        { name: 'Proteobacteria',   ctrl: 38, trt: 34, dir: -1 },
        { name: 'Acidobacteria',    ctrl: 24, trt: 14, dir: -1 },
        { name: 'Actinobacteria',   ctrl: 14, trt: 16, dir: +1 },
        { name: 'Gemmatimonadetes', ctrl: 5,  trt: 9,  dir: +1 },
        { name: 'Others',           ctrl: 19, trt: 27, dir: +1 },
      ],
      note: 'Relative abundance (%) of major bacterial phyla',
    }
  },
  {
    id: 16, crop: 'Pear', year: 2019, product: 'Amino16',
    tag: 'soil', location: 'Tyrnavos, Thessaly',
    headline: 'Distinct rhizosphere profile under Phytophthora pressure',
    summary: 'First-of-kind microbiome study on pear orchards with natural Phytophthora infection. Amino16 was associated with increased Proteobacteria abundance. Infected trees showed elevated Actinobacteria — a known biocontrol group. 1,266 OTUs identified across 6 treatment combinations.',
    chartType: 'bacterial_profile',
    chartData: {
      groups: ['Healthy\n+ Amino16', 'Organic\n+ Amino16', 'Infected\n+ Amino16', 'Infected\nno treatment'],
      proteobacteria: [52, 49, 41, 38],
      actinobacteria:  [10, 11, 18, 15],
      acidobacteria:   [12, 14, 10, 16],
      color: C.orange,
    }
  },
  {
    id: 17, crop: 'Rice', year: 2022, product: 'Amino16',
    tag: 'field', location: 'Parrita, Puntarenas, Costa Rica',
    headline: '+45.8% yield — statistically significant (p≤0.05)',
    summary: 'Randomized field trial (5 repetitions) under tropical conditions. Just two foliar applications of Amino16 at 2.5 L/ha produced a 45.8% yield increase (3,373 vs 2,314 kg/ha) and 18.3% more plants per m² — both statistically significant by ANOVA/Tukey. No phytotoxicity observed.',
    chartType: 'hero_comparison',
    chartData: {
      metrics: [
        { label: 'Yield', unit: 'kg/ha', treated: 3373, control: 2314, pct: 45.8 },
        { label: 'Plants/m²', unit: '/m²', treated: 210.4, control: 177.9, pct: 18.2 },
      ],
      stat: '★ ANOVA/Tukey p≤0.05',
      color: C.orange,
    }
  },
];

// ── CARD RENDERER ────────────────────────────────────────────
function tagLabel(t) {
  return { field:'Field Crop', fruit:'Fruit Tree', vegetable:'Vegetable', soil:'Soil Science' }[t] || t;
}
function tagColor(t) {
  return { field: C.gold, fruit: C.orange, vegetable: C.green, soil: C.teal }[t] || C.blue;
}

function buildCards(filter) {
  const grid = document.getElementById('trialsGrid');
  const list = filter === 'all' ? TRIALS : TRIALS.filter(t => t.tag === filter);
  grid.innerHTML = list.map(t => `
    <article class="trial-card" data-id="${t.id}" data-tag="${t.tag}">
      <div class="tc-meta">
        <span class="tc-tag" style="color:${tagColor(t.tag)};border-color:${tagColor(t.tag)}20;background:${tagColor(t.tag)}12">${tagLabel(t.tag)}</span>
        <span class="tc-year">${t.year || ''}</span>
      </div>
      <div class="tc-crop">${t.crop}</div>
      <div class="tc-product">${t.product}</div>
      <div class="tc-headline">${t.headline}</div>
      <div class="tc-chart" id="chart-${t.id}"></div>
      <p class="tc-summary">${t.summary}</p>
      <div class="tc-location">📍 ${t.location}</div>
    </article>
  `).join('');

  // Draw all charts
  list.forEach(t => drawChart(t));
}

// ── CHART DISPATCHER ─────────────────────────────────────────
function drawChart(trial) {
  const el = document.getElementById(`chart-${trial.id}`);
  if (!el) return;
  const fn = {
    comparison_bar:   drawComparisonBar,
    triple_bar:       drawTripleBar,
    tradeoff:         drawTradeoff,
    delta_bars:       drawDeltaBars,
    dual_gauge:       drawDualGauge,
    multicrop:        drawMultiCrop,
    significance_grid:drawSignificanceGrid,
    timing_bar:       drawTimingBar,
    pest_reduction:   drawPestReduction,
    dose_response:    drawDoseResponse,
    uniformity:       drawUniformity,
    apple_metrics:    drawAppleMetrics,
    two_variety:      drawTwoVariety,
    dose_matrix:      drawDoseMatrix,
    microbiome:       drawMicrobiome,
    bacterial_profile:drawBacterialProfile,
    hero_comparison:  drawHeroComparison,
  }[trial.chartType];
  if (fn) fn(el, trial.chartData);
}

// ── UTILITY ──────────────────────────────────────────────────
function makeCanvas(el, h) {
  el.innerHTML = '';
  const cv = document.createElement('canvas');
  cv.width  = el.offsetWidth || 320;
  cv.height = h;
  cv.style.width  = '100%';
  cv.style.height = h + 'px';
  el.appendChild(cv);
  return cv;
}
function pct(v, max) { return Math.max(0, Math.min(1, v / max)); }
function roundRect(ctx, x, y, w, h, r) {
  if (w < 1) return;
  r = Math.min(r, w/2, h/2);
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}

// ── 1. COMPARISON BAR (Avocado) ──────────────────────────────
function drawComparisonBar(el, d) {
  const cv = makeCanvas(el, 140); const ctx = cv.getContext('2d');
  const W = cv.width, pad = {l:90,r:50,t:24,b:28};
  const groups = d.groups.length, bH = 14, gGap = 22, seriesGap = 4;
  const colors = d.series.map(s=>s.color);
  const maxV = 130;

  d.series.forEach((ser,si) => {
    d.groups.forEach((grp,gi) => {
      const val = ser.values[gi];
      const y = pad.t + gi*(bH*2+gGap) + si*(bH+seriesGap);
      const barW = pct(val,maxV)*(W-pad.l-pad.r);
      ctx.fillStyle = colors[si] + (si===0?'':'88');
      roundRect(ctx,pad.l,y,barW,bH,3); ctx.fill();
      ctx.fillStyle = colors[si];
      ctx.font = `bold 10px sans-serif`; ctx.textAlign='left';
      ctx.fillText(val+'%', pad.l+barW+4, y+bH-2);
    });
  });

  // Group labels
  d.groups.forEach((grp,gi) => {
    const y = pad.t + gi*(bH*2+gGap) + bH - 2;
    ctx.fillStyle = text(); ctx.font='bold 11px sans-serif'; ctx.textAlign='right';
    ctx.fillText(grp, pad.l-6, y);
  });

  // Legend
  d.series.forEach((ser,si) => {
    ctx.fillStyle = colors[si]; ctx.fillRect(pad.l + si*80, 6, 10, 10);
    ctx.fillStyle = text(); ctx.font='10px sans-serif'; ctx.textAlign='left';
    ctx.fillText(ser.label, pad.l+si*80+14, 15);
  });

  // Note
  if(d.note){ ctx.fillStyle=C.gold; ctx.font='9px sans-serif'; ctx.textAlign='left'; ctx.fillText(d.note,pad.l,cv.height-4); }
}

// ── 2. TRIPLE BAR (Kiwi) ────────────────────────────────────
function drawTripleBar(el, d) {
  const cv = makeCanvas(el, 160); const ctx = cv.getContext('2d');
  const W = cv.width, cols = [C.orange, C.teal, subtext()];
  const mPad = {l:10,r:10,t:30,b:20}, gap=8;
  const mW = (W - mPad.l - mPad.r - gap*(d.metrics.length-1)) / d.metrics.length;

  d.metrics.forEach((m,mi) => {
    const mx = mPad.l + mi*(mW+gap);
    const maxV = m.hi;
    const bW = (mW - (d.series.length-1)*3) / d.series.length;

    ctx.fillStyle=text(); ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
    ctx.fillText(m.label, mx+mW/2, mPad.t-10);

    m.vals.forEach((v,vi) => {
      const bH = pct(v,maxV)*(cv.height-mPad.t-mPad.b);
      const bx = mx + vi*(bW+3);
      const by = cv.height-mPad.b-bH;
      ctx.fillStyle = cols[vi]+(vi===2?'88':'');
      roundRect(ctx,bx,by,bW,bH,3); ctx.fill();
      ctx.fillStyle=cols[vi]; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
      ctx.fillText(v, bx+bW/2, by-3);
    });
  });

  // Legend
  d.series.forEach((s,i)=>{
    ctx.fillStyle=cols[i]; ctx.fillRect(8+i*70,8,8,8);
    ctx.fillStyle=text(); ctx.font='9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(s,18+i*70,16);
  });
}

// ── 3. TRADEOFF WATERFALL (Mint 2011) ───────────────────────
function drawTradeoff(el, d) {
  const cv = makeCanvas(el, 130); const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const pad = {l:120,r:60,t:16,b:16};
  const bH = 18, gap = 10;

  d.items.forEach((item,i) => {
    const y = pad.t + i*(bH+gap);
    const max = 140;
    const abs = Math.abs(item.change);
    const barW = pct(abs,max)*(W-pad.l-pad.r);
    const isPos = item.change > 0;
    const x = isPos ? pad.l : pad.l - barW;

    ctx.fillStyle = item.color + 'CC';
    roundRect(ctx,isPos?pad.l:pad.l,y,isPos?barW:-barW+pad.l>pad.l?barW:barW,bH,3);
    // simpler:
    ctx.fillStyle = item.color + 'BB';
    ctx.fillRect(isPos?pad.l:pad.l-barW, y, barW, bH);
    // round right cap
    ctx.fillStyle = item.color;
    ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
    ctx.fillText((isPos?'+':'')+item.change+'%', pad.l+barW+6, y+bH-4);

    ctx.fillStyle=text(); ctx.font='11px sans-serif'; ctx.textAlign='right';
    ctx.fillText(item.label, pad.l-8, y+bH-4);
  });

  // Zero line
  ctx.strokeStyle=grid(); ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad.l,pad.t-4); ctx.lineTo(pad.l,H-pad.b+4); ctx.stroke();
  if(d.note){ctx.fillStyle=subtext();ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText(d.note,pad.l,H-2);}
}

// ── 4. DELTA BARS (Mint 2021) ────────────────────────────────
function drawDeltaBars(el, d) {
  const cv = makeCanvas(el, 130); const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height, pad={l:100,r:70,t:12,b:12};
  const bH=18, gap=9, maxAbs=70;
  const midX = pad.l;

  d.items.forEach((item,i)=>{
    const y = pad.t+i*(bH+gap);
    const w = pct(Math.abs(item.delta),maxAbs)*(W-pad.l-pad.r);
    const pos = item.delta >= 0;

    ctx.fillStyle=item.color+'33';
    ctx.fillRect(midX,y,pos?w:-w+midX>midX?w:w,bH);
    ctx.fillStyle=item.color;
    ctx.fillRect(pos?midX:midX-w, y, w, bH);

    ctx.fillStyle=text(); ctx.font='bold 11px sans-serif'; ctx.textAlign='right';
    ctx.fillText(item.label, midX-8, y+bH-4);

    const badge=(pos?'+':'')+item.delta+item.unit;
    ctx.fillStyle='#fff'; ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    const bx=pos?midX+w/2:midX-w/2;
    if(w>25) ctx.fillText(badge,bx,y+bH-4);
    else { ctx.fillStyle=item.color; ctx.textAlign='left'; ctx.fillText(badge,midX+w+4,y+bH-4); }

    ctx.fillStyle=subtext(); ctx.font='9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(item.note, midX+w+4+(w<=25?30:0), y+bH-4);
  });

  ctx.strokeStyle=grid(); ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(midX,pad.t-4); ctx.lineTo(midX,H-pad.b+4); ctx.stroke();
}

// ── 5. DUAL GAUGE (Cotton) ───────────────────────────────────
function drawDualGauge(el, d) {
  const cv = makeCanvas(el, 100); const ctx = cv.getContext('2d');
  const W=cv.width, H=cv.height;
  const mW=W/d.metrics.length;

  d.metrics.forEach((m,i)=>{
    const cx=mW*i+mW/2, cy=H-12, r=Math.min(mW/2-16,H-28);
    const startA=Math.PI, endA=2*Math.PI;
    const val=m.pct/10; // max 10% shown as full

    // Track
    ctx.beginPath(); ctx.arc(cx,cy,r,startA,endA);
    ctx.strokeStyle=grid(); ctx.lineWidth=12; ctx.stroke();

    // Fill
    const fillEnd=startA+val*Math.PI;
    ctx.beginPath(); ctx.arc(cx,cy,r,startA,fillEnd);
    ctx.strokeStyle=C.orange; ctx.lineWidth=12; ctx.lineCap='round'; ctx.stroke();

    // Labels
    ctx.fillStyle=C.orange; ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+m.pct+'%', cx, cy-4);
    ctx.fillStyle=text(); ctx.font='9px sans-serif';
    ctx.fillText(m.label, cx, cy+14);
    ctx.fillStyle=subtext(); ctx.font='9px sans-serif';
    ctx.fillText(m.treated+' vs '+m.control+' '+m.unit, cx, H-2);
  });
}

// ── 6. MULTICROP BARS ────────────────────────────────────────
function drawMultiCrop(el, d) {
  const cv = makeCanvas(el, 150); const ctx = cv.getContext('2d');
  const W=cv.width, H=cv.height;
  const cols=4, cW=W/cols, pad=10, bH=28;

  d.crops.forEach((c,i)=>{
    const cx=i*cW;
    const maxV=c.trt*1.1;
    const ctrlH=pct(c.ctrl,maxV)*(H-70);
    const trtH =pct(c.trt, maxV)*(H-70);
    const bW=(cW-pad*2)/2-2;
    const by=H-40;
    const pctUp=Math.round((c.trt-c.ctrl)/c.ctrl*100);

    // Control bar
    ctx.fillStyle=subtext()+'99';
    roundRect(ctx,cx+pad,by-ctrlH,bW,ctrlH,3); ctx.fill();
    // Treated bar
    ctx.fillStyle=C.orange;
    roundRect(ctx,cx+pad+bW+4,by-trtH,bW,trtH,3); ctx.fill();

    // % badge
    ctx.fillStyle=C.gold; ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+pctUp+'%',cx+cW/2,by-trtH-5);

    // Crop name
    ctx.fillStyle=text(); ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    ctx.fillText(c.icon+' '+c.name,cx+cW/2,H-24);
    ctx.fillStyle=subtext(); ctx.font='9px sans-serif';
    ctx.fillText(c.metric,cx+cW/2,H-12);
    ctx.fillStyle=C.orange; ctx.font='bold 10px sans-serif';
    ctx.fillText(c.trt+c.unit,cx+cW/2,H-1);
  });

  // Legend
  ctx.fillStyle=subtext(); ctx.fillRect(6,6,8,8);
  ctx.fillStyle=text(); ctx.font='9px sans-serif'; ctx.textAlign='left'; ctx.fillText('Control',18,14);
  ctx.fillStyle=C.orange; ctx.fillRect(70,6,8,8);
  ctx.fillText('Amino16',82,14);
}

// ── 7. SIGNIFICANCE GRID (Olives/Apples/Cherries) ───────────
function drawSignificanceGrid(el, d) {
  el.innerHTML = d.crops.map(c=>`
    <div class="sig-row" style="border-left:3px solid ${c.color}">
      <span class="sig-icon">${c.icon}</span>
      <div class="sig-body">
        <div class="sig-crop">${c.name}</div>
        <div class="sig-result" style="color:${c.color}">${c.result}</div>
      </div>
      <div class="sig-p" style="background:${c.color}22;color:${c.color}">${c.p}</div>
    </div>
  `).join('');
}

// ── 8. TIMING BAR (Olive 2013) ───────────────────────────────
function drawTimingBar(el, d) {
  const cv = makeCanvas(el, 120); const ctx = cv.getContext('2d');
  const W=cv.width, H=cv.height, n=d.timings.length;
  const pad={l:12,r:12,t:28,b:36};
  const bW=(W-pad.l-pad.r)/n - 10;
  const maxV=100;

  d.timings.forEach((t,i)=>{
    const bH=pct(d.impact[i],maxV)*(H-pad.t-pad.b);
    const x=pad.l+i*(bW+10);
    const y=H-pad.b-bH;
    const alpha=0.5+0.5*(d.impact[i]/100);
    ctx.fillStyle=d.color+Math.round(alpha*255).toString(16).padStart(2,'0');
    roundRect(ctx,x,y,bW,bH,4); ctx.fill();
    ctx.fillStyle=d.color; ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
    ctx.fillText(d.impact[i]+'%',x+bW/2,y-5);
    ctx.fillStyle=text(); ctx.font='10px sans-serif';
    const lines=t.split('\n');
    lines.forEach((l,li)=>ctx.fillText(l,x+bW/2,H-pad.b+12+li*13));
  });
  ctx.fillStyle=subtext(); ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText(d.note,W/2,14);
}

// ── 9. PEST REDUCTION (Tobacco) ─────────────────────────────
function drawPestReduction(el, d) {
  const cv = makeCanvas(el, 120); const ctx = cv.getContext('2d');
  const W=cv.width,H=cv.height,pad={l:110,r:60,t:14,b:20};
  const bH=18,gap=9;
  const maxV=50;

  d.bars.forEach((b,i)=>{
    const y=pad.t+i*(bH+gap);
    const c=typeof b.color==='function'?b.color():b.color;
    const w=pct(b.reduction,maxV)*(W-pad.l-pad.r);
    ctx.fillStyle=c+(i>1?'55':'BB');
    roundRect(ctx,pad.l,y,Math.max(w,2),bH,3); ctx.fill();
    ctx.fillStyle=c; ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
    if(w>20) ctx.fillText(b.reduction+'%',pad.l+w+4,y+bH-4);
    else ctx.fillText(b.reduction+'%',pad.l+4,y+bH-4);
    const lines=b.label.split('\n');
    ctx.fillStyle=text(); ctx.font='10px sans-serif'; ctx.textAlign='right';
    lines.forEach((l,li)=>ctx.fillText(l,pad.l-6,y+(bH/2)+li*12-((lines.length-1)*6)));
  });
  ctx.fillStyle=subtext(); ctx.font='9px sans-serif'; ctx.textAlign='left';
  ctx.fillText(d.unit,pad.l,H-2);
}

// ── 10. DOSE RESPONSE (Lettuce 2020) ────────────────────────
function drawDoseResponse(el, d) {
  const cv = makeCanvas(el, 140); const ctx = cv.getContext('2d');
  const W=cv.width,H=cv.height,pad={l:12,r:12,t:36,b:28};
  const n=d.doses.length, gW=(W-pad.l-pad.r)/n;
  const bW=(gW-8)/d.metrics.length;

  d.metrics.forEach((m,mi)=>{
    d.doses.forEach((dose,di)=>{
      const v=m.values[di];
      const bH=pct(v,160)*(H-pad.t-pad.b);
      const x=pad.l+di*gW+mi*(bW+2);
      const y=H-pad.b-bH;
      ctx.fillStyle=m.color+(v<100?'66':'BB');
      roundRect(ctx,x,y,bW,bH,2); ctx.fill();
    });
  });

  // 100 baseline
  const baseY=H-pad.b-pct(100,160)*(H-pad.t-pad.b);
  ctx.strokeStyle=C.gold+'88'; ctx.lineWidth=1; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(pad.l,baseY); ctx.lineTo(W-pad.r,baseY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle=C.gold; ctx.font='9px sans-serif'; ctx.textAlign='right';
  ctx.fillText('baseline',W-pad.r,baseY-3);

  // Dose labels
  d.doses.forEach((dose,di)=>{
    const x=pad.l+di*gW+gW/2;
    ctx.fillStyle=text(); ctx.font='9px sans-serif'; ctx.textAlign='center';
    ctx.fillText(dose,x,H-4);
  });

  // Legend
  d.metrics.forEach((m,i)=>{
    ctx.fillStyle=m.color; ctx.fillRect(8+i*80,8,8,8);
    ctx.fillStyle=text(); ctx.font='9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(m.label,20+i*80,16);
  });
  if(d.note){ctx.fillStyle=subtext();ctx.font='8px sans-serif';ctx.textAlign='center';ctx.fillText(d.note,W/2,H-16);}
}

// ── 11. UNIFORMITY (Lettuce 2014) ───────────────────────────
function drawUniformity(el, d) {
  const cv = makeCanvas(el, 140); const ctx = cv.getContext('2d');
  const W=cv.width,H=cv.height;
  const n=d.treatments.length, bW=(W-20)/n-8, pad={l:10,t:20,b:40};

  d.treatments.forEach((t,i)=>{
    const c=typeof d.colors[i]==='function'?d.colors[i]():d.colors[i];
    const x=pad.l+i*(bW+8);
    const v=d.optimal_pct[i];
    const bH=pct(v,70)*(H-pad.t-pad.b);
    const y=H-pad.b-bH;
    ctx.fillStyle=c+(i>1?'66':'CC');
    roundRect(ctx,x,y,bW,bH,4); ctx.fill();
    ctx.fillStyle=c; ctx.font='bold 12px sans-serif'; ctx.textAlign='center';
    ctx.fillText(v+'%',x+bW/2,y-5);
    const lines=t.split('\n');
    ctx.fillStyle=text(); ctx.font='9px sans-serif';
    lines.forEach((l,li)=>ctx.fillText(l,x+bW/2,H-pad.b+12+li*12));
  });

  ctx.fillStyle=subtext(); ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText('% plants in optimal weight class (200–249g)',W/2,14);
}

// ── 12. APPLE METRICS ────────────────────────────────────────
function drawAppleMetrics(el, d) {
  const cv = makeCanvas(el, 110); const ctx = cv.getContext('2d');
  const W=cv.width,H=cv.height, n=d.metrics.length;
  const mW=W/n;

  d.metrics.forEach((m,i)=>{
    const cx=i*mW+mW/2;
    const pctUp=((m.treated-m.control)/m.control*100).toFixed(1);
    // Mini progress arc
    const r=28, cy=H/2-4;
    ctx.beginPath(); ctx.arc(cx,cy,r,0,2*Math.PI);
    ctx.strokeStyle=grid(); ctx.lineWidth=6; ctx.stroke();
    const fill=Math.min((m.treated/m.control-1)*5,1);
    ctx.beginPath(); ctx.arc(cx,cy,-Math.PI/2,-Math.PI/2+fill*2*Math.PI);
    ctx.strokeStyle=d.color; ctx.lineWidth=6; ctx.lineCap='round'; ctx.stroke();
    ctx.fillStyle=d.color; ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+pctUp+'%',cx,cy+4);
    ctx.fillStyle=text(); ctx.font='9px sans-serif';
    ctx.fillText(m.label,cx,H-18);
    ctx.fillStyle=subtext(); ctx.font='9px sans-serif';
    ctx.fillText(m.treated+' vs '+m.control,cx,H-6);
  });
}

// ── 13. TWO VARIETY (Peaches) ────────────────────────────────
function drawTwoVariety(el, d) {
  const cv = makeCanvas(el, 110); const ctx = cv.getContext('2d');
  const W=cv.width,H=cv.height,half=W/2;

  d.varieties.forEach((v,i)=>{
    const cx=i===0?half/2:half+half/2;
    const r=30,cy=50;
    const pct2=d.yield_pct[i]/20;
    ctx.beginPath(); ctx.arc(cx,cy,r,0,2*Math.PI);
    ctx.strokeStyle=grid(); ctx.lineWidth=8; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+pct2*2*Math.PI);
    ctx.strokeStyle=d.color; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke();
    ctx.fillStyle=d.color; ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+d.yield_pct[i]+'%',cx,cy+5);
    ctx.fillStyle=text(); ctx.font='9px sans-serif';
    ctx.fillText(v,cx,cy+r+14);

    const ex=d.extras.find(e=>e.which===i);
    if(ex){
      ctx.fillStyle=C.teal; ctx.font='9px sans-serif';
      ctx.fillText(ex.label+': '+ex.vals[0]+' vs '+ex.vals[1]+' '+ex.unit,cx,H-4);
    }
  });
}

// ── 14. DOSE MATRIX (Tomato) ─────────────────────────────────
function drawDoseMatrix(el, d) {
  const cv = makeCanvas(el, 120); const ctx = cv.getContext('2d');
  const W=cv.width,H=cv.height,n=d.scenarios.length;
  const bW=(W-20)/n-10,pad={l:10,t:24,b:44};

  d.scenarios.forEach((sc,i)=>{
    const v=d.improvement[i];
    const bH=pct(v,55)*(H-pad.t-pad.b);
    const x=pad.l+i*(bW+10);
    const y=H-pad.b-bH;
    ctx.fillStyle=d.colors[i]+'CC';
    roundRect(ctx,x,y,bW,bH,4); ctx.fill();
    ctx.fillStyle=d.colors[i]; ctx.font='bold 12px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+v+'%',x+bW/2,y-6);
    ctx.fillStyle=text(); ctx.font='9px sans-serif';
    const lines=sc.split('\n');
    lines.forEach((l,li)=>ctx.fillText(l,x+bW/2,H-pad.b+12+li*12));
    ctx.fillStyle=subtext(); ctx.font='8px sans-serif';
    ctx.fillText(d.metric[i],x+bW/2,H-4);
  });
  if(d.note){ctx.fillStyle=C.gold;ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(d.note,W/2,14);}
}

// ── 15. MICROBIOME (Lettuce 2017) ────────────────────────────
function drawMicrobiome(el, d) {
  const cv = makeCanvas(el, 130); const ctx = cv.getContext('2d');
  const W=cv.width,H=cv.height,pad={l:110,r:12,t:14,b:24};
  const phyColors=[C.blue,C.orange,C.teal,C.purple,subtext()];
  const bH=14,gap=8;

  d.phyla.forEach((p,i)=>{
    const y=pad.t+i*(bH+gap);
    const c=phyColors[i%phyColors.length];
    const ctrlW=pct(p.ctrl,55)*(W-pad.l-pad.r);
    const trtW =pct(p.trt, 55)*(W-pad.l-pad.r);

    // Control (ghost)
    ctx.fillStyle=c+'33'; ctx.fillRect(pad.l,y,ctrlW,bH);
    // Treated (solid)
    ctx.fillStyle=c+'AA'; ctx.fillRect(pad.l,y,trtW,bH);

    // Arrow indicator
    const arrow=p.dir>0?'▲':'▼';
    const ac=p.dir>0?C.teal:C.orange;
    ctx.fillStyle=ac; ctx.font='bold 9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(arrow,pad.l+Math.max(ctrlW,trtW)+4,y+bH-3);

    ctx.fillStyle=text(); ctx.font='10px sans-serif'; ctx.textAlign='right';
    ctx.fillText(p.name,pad.l-6,y+bH-3);
    ctx.fillStyle=c; ctx.font='bold 9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(p.trt+'%',pad.l+trtW+14,y+bH-3);
  });

  // Legend
  ctx.fillStyle=text()+'44'; ctx.fillRect(pad.l,H-14,20,8);
  ctx.fillStyle=text(); ctx.font='9px sans-serif'; ctx.textAlign='left'; ctx.fillText('Control',pad.l+24,H-7);
  ctx.fillStyle=C.blue+'AA'; ctx.fillRect(pad.l+70,H-14,20,8);
  ctx.fillText('+ Amino16',pad.l+94,H-7);
}

// ── 16. BACTERIAL PROFILE (Pear 2019) ───────────────────────
function drawBacterialProfile(el, d) {
  const cv = makeCanvas(el, 140); const ctx = cv.getContext('2d');
  const W=cv.width,H=cv.height;
  const n=d.groups.length, bW=(W-20)/n-6, pad={l:10,t:24,b:44};
  const stacks=[
    {data:d.proteobacteria, color:C.blue,   label:'Proteobacteria'},
    {data:d.actinobacteria, color:C.orange,  label:'Actinobacteria'},
    {data:d.acidobacteria,  color:C.teal,   label:'Acidobacteria'},
  ];
  const maxH=H-pad.t-pad.b;

  d.groups.forEach((g,i)=>{
    const x=pad.l+i*(bW+6);
    let yOff=H-pad.b;
    stacks.forEach(s=>{
      const h=pct(s.data[i],100)*maxH;
      yOff-=h;
      ctx.fillStyle=s.color+'CC';
      roundRect(ctx,x,yOff,bW,h,i===0&&s===stacks[0]?4:0); ctx.fill();
    });
    ctx.fillStyle=text(); ctx.font='8px sans-serif'; ctx.textAlign='center';
    const lines=g.split('\n');
    lines.forEach((l,li)=>ctx.fillText(l,x+bW/2,H-pad.b+12+li*11));
  });

  // Legend
  stacks.forEach((s,i)=>{
    ctx.fillStyle=s.color+'CC'; ctx.fillRect(8+i*90,8,8,8);
    ctx.fillStyle=text(); ctx.font='9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(s.label,20+i*90,16);
  });
}

// ── 17. HERO COMPARISON (Rice) ───────────────────────────────
function drawHeroComparison(el, d) {
  const cv = makeCanvas(el, 130); const ctx = cv.getContext('2d');
  const W=cv.width,H=cv.height,n=d.metrics.length;
  const mW=W/n;

  d.metrics.forEach((m,i)=>{
    const cx=i*mW+mW/2;
    const maxV=m.treated*1.1;
    const ctrlH=pct(m.control,maxV)*(H-50);
    const trtH =pct(m.treated,maxV)*(H-50);
    const bW=Math.min(mW*0.3,40);
    const by=H-28;

    // Control bar
    ctx.fillStyle=subtext()+'66';
    roundRect(ctx,cx-bW-4,by-ctrlH,bW,ctrlH,4); ctx.fill();
    ctx.fillStyle=subtext(); ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    ctx.fillText(m.control,cx-bW/2-4,by-ctrlH-5);

    // Treated bar (taller, orange)
    ctx.fillStyle=d.color+'DD';
    roundRect(ctx,cx+4,by-trtH,bW,trtH,4); ctx.fill();
    ctx.fillStyle=d.color; ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
    ctx.fillText(m.treated,cx+bW/2+4,by-trtH-5);

    // Pct badge between bars
    const badgeY=by-trtH-20;
    ctx.fillStyle=C.gold; ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+m.pct+'%',cx,by-trtH/2);

    ctx.fillStyle=text(); ctx.font='9px sans-serif'; ctx.textAlign='center';
    ctx.fillText(m.label+' ('+m.unit+')',cx,H-14);
  });

  // Stat badge
  ctx.fillStyle=C.gold+'22';
  roundRect(ctx,W/2-60,H-10,120,10,3); // stub – just text
  ctx.fillStyle=C.gold; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
  ctx.fillText(d.stat,W/2,H-3);
}

// ── FILTER ───────────────────────────────────────────────────
function redrawAll() { buildCards(activeFilter); }
let activeFilter = 'all';
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    buildCards(activeFilter);
  });
});

// ── INIT ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  buildCards('all');

  let rTimer;
  window.addEventListener('resize', () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(redrawAll, 200);
  });
});
