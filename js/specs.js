// ── THEME ────────────────────────────────────────────────────
const THEME_KEY = 'evyp-theme';
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const mt = document.getElementById('meta-theme');
  if (mt) mt.content = t === 'dark' ? '#0A0A0A' : '#F5F5F3';
  localStorage.setItem(THEME_KEY, t);
}
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) { applyTheme(saved); return; }
  applyTheme(window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
}
document.getElementById('themeToggle').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
});

// ── HELPERS ──────────────────────────────────────────────────
function numVal(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return v;
  if (typeof v === 'object') return v.mid ?? v.num ?? null;
  return null;
}
function displayVal(v) {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'number') return v;
  if (typeof v === 'object') return v.range ?? v.label ?? '—';
  return v;
}
function isDark() { return document.documentElement.getAttribute('data-theme') !== 'light'; }
function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

// ── PRODUCT SELECTOR ─────────────────────────────────────────
let activeProduct = PRODUCTS[0];
function buildSelector() {
  const wrap = document.getElementById('prodSelector');
  wrap.innerHTML = PRODUCTS.map(p =>
    `<button class="prod-tab${p===activeProduct?' active':''}" data-p="${p}" onclick="selectProduct('${p}')">${p}</button>`
  ).join('');
}
function selectProduct(p) {
  activeProduct = p;
  document.querySelectorAll('.prod-tab').forEach(b => b.classList.toggle('active', b.dataset.p === p));
  renderProduct(p);
}

// ── MAIN RENDER ──────────────────────────────────────────────
function renderProduct(p) {
  const d = PRODUCT_DATA[p];
  const el = document.getElementById('prodContent');
  el.innerHTML = `
    ${renderGeneral(d.general)}
    ${renderContent(d.content)}
    ${renderAminogram(d.aminoacids_free, d.aminoacids_total)}
    ${renderOsmoSugar(d.osmolytes, d.sugars)}
    ${renderPhytohormones(d.phytohormones)}
    ${renderMicroorganisms(d.microorganisms, p)}
    ${renderScores(d.scores)}
  `;
  // Draw all canvases after DOM insertion
  setTimeout(() => {
    drawAminogram(d.aminoacids_free, d.aminoacids_total);
    drawOsmolytes(d.osmolytes);
    drawSugars(d.sugars);
    drawPhytohormones(d.phytohormones);
    drawSpider(d.scores);
  }, 30);
}

// ── SECTION: GENERAL ─────────────────────────────────────────
function renderGeneral(g) {
  const items = Object.entries(g).filter(([,v]) => v !== null);
  if (!items.length) return '';
  const pills = items.map(([k,v]) => {
    const shortKey = k.replace(' at 25oC','').replace(' at 20oC','');
    return `<div class="gen-pill"><span class="gen-pill-key">${shortKey}</span><span class="gen-pill-val">${displayVal(v)}</span></div>`;
  }).join('');
  return `<div class="spec-section gen-section">${pills}</div>`;
}

// ── SECTION: CONTENT ─────────────────────────────────────────
function renderContent(c) {
  const items = Object.entries(c).filter(([,v]) => v !== null);
  if (!items.length) return '';

  // Separate amino totals (big) from the rest
  const freeAA  = c['Free L-Amino Acids (% w/w)'];
  const totalAA = c['Total Amino Acids (% w/w)'];
  const others = items.filter(([k]) => k !== 'Free L-Amino Acids (% w/w)' && k !== 'Total Amino Acids (% w/w)');

  const heroCards = [
    freeAA  !== null ? `<div class="content-hero-card"><div class="content-hero-val">${displayVal(freeAA)}<span class="content-hero-unit">% w/w</span></div><div class="content-hero-label">Free L-Amino Acids</div></div>` : '',
    totalAA !== null ? `<div class="content-hero-card accent"><div class="content-hero-val">${displayVal(totalAA)}<span class="content-hero-unit">% w/w</span></div><div class="content-hero-label">Total Amino Acids</div></div>` : '',
  ].join('');

  const otherRows = others.map(([k,v]) => {
    const clean = k.replace(' (% w/w)','').replace(' Total','');
    return `<div class="content-row"><span class="content-row-key">${clean}</span><span class="content-row-val">${displayVal(v)}</span></div>`;
  }).join('');

  return `
    <div class="spec-section">
      <div class="section-label">COMPOSITION</div>
      <div class="content-hero-grid">${heroCards}</div>
      ${otherRows ? `<div class="content-other">${otherRows}</div>` : ''}
    </div>`;
}

// ── SECTION: AMINOGRAM ───────────────────────────────────────
function renderAminogram(free, total) {
  const allKeys = Array.from(new Set([...Object.keys(free), ...Object.keys(total)]));
  const hasData = allKeys.some(k => numVal(free[k]) > 0 || numVal(total[k]) > 0);
  if (!hasData) return '';
  return `
    <div class="spec-section">
      <div class="section-label">AMINO ACID PROFILE</div>
      <div class="aminogram-legend">
        <span class="legend-dot free"></span><span>Free L</span>
        <span class="legend-dot total"></span><span>Total</span>
      </div>
      <canvas id="cvAmino" class="chart-canvas aminogram-canvas"></canvas>
    </div>`;
}
function drawAminogram(free, total) {
  const cv = document.getElementById('cvAmino'); if (!cv) return;
  const allKeys = Array.from(new Set([...Object.keys(free), ...Object.keys(total)]));
  // Sort by total descending
  const sorted = allKeys.sort((a,b) => (numVal(total[b])||0) - (numVal(total[a])||0));
  
  const labels = sorted.map(k => {
    const m = k.match(/\((\w+)\)/);
    return m ? m[1] : k.split(' ')[0];
  });
  const freeVals  = sorted.map(k => numVal(free[k]) || 0);
  const totalVals = sorted.map(k => numVal(total[k]) || 0);

  const barH = 20, gap = 8, pad = { top: 12, right: 60, bottom: 30, left: 52 };
  const n = sorted.length;
  const ch = pad.top + n * (barH * 2 + gap) + pad.bottom;
  cv.height = ch;
  cv.width = cv.parentElement.offsetWidth || 400;
  const cw = cv.width;
  const plotW = cw - pad.left - pad.right;
  const maxVal = Math.max(...totalVals, 0.1);
  const ctx = cv.getContext('2d');

  const orange = '#E8631A', teal = isDark() ? '#4EC9B0' : '#2A9D8F';
  const textCol = isDark() ? '#C0C0C0' : '#444444';
  const gridCol = isDark() ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';

  ctx.clearRect(0, 0, cw, ch);

  // Grid lines
  for (let i = 0; i <= 5; i++) {
    const x = pad.left + (i / 5) * plotW;
    ctx.strokeStyle = gridCol; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, ch - pad.bottom); ctx.stroke();
    const label = ((maxVal * i / 5)).toFixed(1);
    ctx.fillStyle = textCol; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(label, x, ch - 12);
  }

  sorted.forEach((key, i) => {
    const y = pad.top + i * (barH * 2 + gap);
    const fv = freeVals[i], tv = totalVals[i];
    const fw = (fv / maxVal) * plotW, tw = (tv / maxVal) * plotW;

    // Total bar (back)
    ctx.fillStyle = teal;
    ctx.beginPath(); roundRect(ctx, pad.left, y, tw, barH, 2); ctx.fill();

    // Free bar (front)
    ctx.fillStyle = orange;
    ctx.beginPath(); roundRect(ctx, pad.left, y + barH, fw, barH, 2); ctx.fill();

    // AA label
    ctx.fillStyle = textCol; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(labels[i], pad.left - 6, y + barH + 1);

    // Value labels
    if (tv > 0) { ctx.fillStyle = teal; ctx.font = '10px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(tv.toFixed(2), pad.left + tw + 4, y + barH - 4); }
    if (fv > 0) { ctx.fillStyle = orange; ctx.font = '10px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(fv.toFixed(2), pad.left + fw + 4, y + barH * 2 - 4); }
  });

  // Axis label
  ctx.fillStyle = textCol; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('% w/w', cw / 2, ch - 2);
}

function roundRect(ctx, x, y, w, h, r) {
  if (w < r * 2) r = w / 2;
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
}

// ── SECTION: OSMOLYTES + SUGARS ──────────────────────────────
function renderOsmoSugar(osmo, sugar) {
  const hasOsmo  = Object.values(osmo).some(v => v !== null);
  const hasSugar = Object.values(sugar).some(v => v !== null);
  if (!hasOsmo && !hasSugar) return '';
  return `
    <div class="spec-section osmo-sugar-grid">
      ${hasOsmo ? `<div class="osmo-block"><div class="section-label">OSMOLYTES</div><canvas id="cvOsmo" class="chart-canvas"></canvas></div>` : ''}
      ${hasSugar ? `<div class="sugar-block"><div class="section-label">SUGAR PROFILE</div><canvas id="cvSugar" class="chart-canvas"></canvas></div>` : ''}
    </div>`;
}
function drawSimpleBar(canvasId, dataObj, color) {
  const cv = document.getElementById(canvasId); if (!cv) return;
  const entries = Object.entries(dataObj).filter(([,v]) => v !== null && numVal(v) !== null);
  if (!entries.length) return;
  const labels = entries.map(([k]) => k);
  const vals = entries.map(([,v]) => numVal(v));
  const maxVal = Math.max(...vals, 0.1);

  const barH = 24, gap = 10, pad = { top: 8, right: 52, bottom: 24, left: 120 };
  cv.height = pad.top + entries.length * (barH + gap) + pad.bottom;
  cv.width = cv.parentElement.offsetWidth || 300;
  const cw = cv.width, ch = cv.height;
  const plotW = cw - pad.left - pad.right;
  const ctx = cv.getContext('2d');
  const textCol = isDark() ? '#C0C0C0' : '#444444';
  const gridCol = isDark() ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
  ctx.clearRect(0, 0, cw, ch);

  entries.forEach(([key, v], i) => {
    const val = numVal(v);
    const y = pad.top + i * (barH + gap);
    const w = (val / maxVal) * plotW;

    // Bar
    ctx.fillStyle = color;
    ctx.beginPath(); roundRect(ctx, pad.left, y, Math.max(w, 2), barH, 3); ctx.fill();

    // Label
    ctx.fillStyle = textCol; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(key.split(' ')[0], pad.left - 8, y + barH / 2 + 4);

    // Value
    const dispV = displayVal(v);
    ctx.fillStyle = color; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(dispV, pad.left + w + 6, y + barH / 2 + 4);
  });

  // x axis
  ctx.strokeStyle = gridCol; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad.left, ch - pad.bottom + 4); ctx.lineTo(cw - pad.right, ch - pad.bottom + 4); ctx.stroke();
}
function drawOsmolytes(o) { drawSimpleBar('cvOsmo', o, isDark() ? '#7EC8E3' : '#0077A8'); }
function drawSugars(s) {
  const filtered = Object.fromEntries(Object.entries(s).filter(([k]) => k !== 'Total Sugars'));
  drawSimpleBar('cvSugar', filtered, isDark() ? '#C3A6FF' : '#7B5EA7');
}

// ── SECTION: PHYTOHORMONES ───────────────────────────────────
function renderPhytohormones(ph) {
  const hasData = Object.values(ph).some(v => v !== null);
  if (!hasData) return '';
  return `
    <div class="spec-section">
      <div class="section-label">PLANT PHYTOHORMONES</div>
      <canvas id="cvHorm" class="chart-canvas"></canvas>
    </div>`;
}
function drawPhytohormones(ph) {
  const cv = document.getElementById('cvHorm'); if (!cv) return;
  const entries = Object.entries(ph).filter(([,v]) => v !== null && numVal(v) !== null);
  if (!entries.length) return;

  // Short names
  const shortNames = {
    'Indole-3-Butyric Acid (mg IBA/kg)': 'IBA',
    'Indole-3-Acetic Acid (mg IAA/kg)': 'IAA',
    'Cytokinin (mg Kinetin/kg)': 'Cytokinin',
    'Gibberellin (mg GA/kg)': 'GA',
    'Absisic Acid (mg ABA/kg)': 'ABA',
    'Ethylene (< of)': 'Ethylene',
  };
  const unitLabels = {
    'Indole-3-Butyric Acid (mg IBA/kg)': 'mg/kg',
    'Indole-3-Acetic Acid (mg IAA/kg)': 'mg/kg',
    'Cytokinin (mg Kinetin/kg)': 'mg/kg',
    'Gibberellin (mg GA/kg)': 'mg/kg',
    'Absisic Acid (mg ABA/kg)': 'mg/kg',
    'Ethylene (< of)': 'mg/kg',
  };

  const colors = ['#E8631A','#F4A261','#E9C46A','#2A9D8F','#264653','#A8DADC'];
  const barH = 28, gap = 12;
  const pad = { top: 10, right: 70, bottom: 24, left: 100 };
  cv.height = pad.top + entries.length * (barH + gap) + pad.bottom;
  cv.width = cv.parentElement.offsetWidth || 400;
  const cw = cv.width, ch = cv.height;
  const plotW = cw - pad.left - pad.right;
  const vals = entries.map(([,v]) => numVal(v) || 0);
  const maxVal = Math.max(...vals, 0.1);
  const ctx = cv.getContext('2d');
  const textCol = isDark() ? '#C0C0C0' : '#444444';
  const gridCol = isDark() ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
  ctx.clearRect(0, 0, cw, ch);

  entries.forEach(([key, v], i) => {
    const val = numVal(v) || 0;
    const y = pad.top + i * (barH + gap);
    const w = Math.max((val / maxVal) * plotW, 2);
    const c = colors[i % colors.length];

    // Background track
    ctx.fillStyle = gridCol;
    ctx.beginPath(); roundRect(ctx, pad.left, y, plotW, barH, 3); ctx.fill();

    // Value bar
    ctx.fillStyle = c;
    ctx.beginPath(); roundRect(ctx, pad.left, y, w, barH, 3); ctx.fill();

    // Hormone name
    ctx.fillStyle = textCol; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(shortNames[key] || key, pad.left - 8, y + barH / 2 + 4);

    // Value + unit
    const dispV = displayVal(v);
    ctx.fillStyle = c; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`${dispV} mg/kg`, pad.left + w + 6, y + barH / 2 + 4);
  });
}

// ── SECTION: MICROORGANISMS ──────────────────────────────────
function renderMicroorganisms(micro, productName) {
  const entries = Object.entries(micro).filter(([,v]) => v !== null);
  if (!entries.length) return '';
  const rows = entries.map(([k,v]) => {
    const val = displayVal(v);
    return `<div class="micro-row"><span class="micro-name">${k}</span><span class="micro-val">${val} CFU/mL</span></div>`;
  }).join('');
  return `
    <div class="spec-section">
      <div class="section-label">MICROORGANISMS</div>
      <div class="micro-note">Beneficial soil microorganism consortium</div>
      <div class="micro-table">${rows}</div>
    </div>`;
}

// ── SECTION: SPIDER / RADAR ──────────────────────────────────
function renderScores(scores) {
  const entries = Object.entries(scores).filter(([,v]) => v !== null);
  if (!entries.length) return '';
  return `
    <div class="spec-section score-section">
      <div class="section-label">BIOACTIVITY PROFILE</div>
      <div class="spider-wrap">
        <canvas id="cvSpider" class="spider-canvas"></canvas>
      </div>
      <div class="score-legend" id="scoreLegend"></div>
    </div>`;
}
function drawSpider(scores) {
  const cv = document.getElementById('cvSpider'); if (!cv) return;
  const entries = Object.entries(scores).filter(([,v]) => v !== null);
  if (!entries.length) return;
  const n = entries.length;
  const size = Math.min(cv.parentElement.offsetWidth, 360);
  cv.width = size; cv.height = size;
  const cx = size / 2, cy = size / 2;
  const R = size * 0.36, maxScore = 10;
  const ctx = cv.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  const orange = '#E8631A';
  const gridCol  = isDark() ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const axisCol  = isDark() ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const textCol  = isDark() ? '#C0C0C0' : '#555555';
  const fillCol  = isDark() ? 'rgba(232,99,26,0.22)' : 'rgba(232,99,26,0.15)';

  const angleStep = (Math.PI * 2) / n;
  const startAngle = -Math.PI / 2;

  // Grid rings
  for (let ring = 1; ring <= 5; ring++) {
    const r = R * ring / 5;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = startAngle + i * angleStep;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = gridCol; ctx.lineWidth = 1; ctx.stroke();
    // Ring label (score value)
    if (ring % 2 === 0) {
      ctx.fillStyle = isDark() ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
      ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(ring * 2, cx + 4, cy - r + 3);
    }
  }

  // Axis spokes
  for (let i = 0; i < n; i++) {
    const a = startAngle + i * angleStep;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
    ctx.strokeStyle = axisCol; ctx.lineWidth = 1; ctx.stroke();
  }

  // Data polygon
  ctx.beginPath();
  entries.forEach(([,v], i) => {
    const val = typeof v === 'number' ? v : (v?.mid ?? 0);
    const r = R * (val / maxScore);
    const a = startAngle + i * angleStep;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = fillCol; ctx.fill();
  ctx.strokeStyle = orange; ctx.lineWidth = 2.5; ctx.stroke();

  // Data points
  entries.forEach(([,v], i) => {
    const val = typeof v === 'number' ? v : (v?.mid ?? 0);
    const r = R * (val / maxScore);
    const a = startAngle + i * angleStep;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = orange; ctx.fill();
    ctx.strokeStyle = isDark() ? '#0A0A0A' : '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
  });

  // Axis labels (outside ring)
  const shortLabels = {
    'Nitrogen Metabolism & Protein Synthesis': 'N Metabolism',
    'Stress Tolerance & Osmoregulation': 'Stress Tolerance',
    'Root Development & Nutrient Uptake': 'Root Dev.',
    'Photosynthesis & Energy Metabolism': 'Photosynthesis',
    'Growth Regulation & Hormone Precursors': 'Growth Reg.',
    'Reproductive Development & Quality': 'Reprod. Dev.',
  };
  const labelR = R + 26;
  entries.forEach(([key, v], i) => {
    const a = startAngle + i * angleStep;
    const x = cx + labelR * Math.cos(a), y = cy + labelR * Math.sin(a);
    const label = shortLabels[key] || key;
    ctx.fillStyle = textCol; ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = Math.cos(a) > 0.1 ? 'left' : Math.cos(a) < -0.1 ? 'right' : 'center';
    ctx.fillText(label, x, y + 3);
  });

  // Score legend below
  const legend = document.getElementById('scoreLegend');
  if (legend) {
    legend.innerHTML = entries.map(([key, v]) => {
      const val = typeof v === 'number' ? v : (v?.mid ?? 0);
      const short = shortLabels[key] || key;
      const pct = Math.round(val * 10);
      return `<div class="score-item">
        <div class="score-bar-wrap"><div class="score-bar" style="width:${pct}%"></div></div>
        <div class="score-meta"><span class="score-name">${short}</span><span class="score-val">${val}/10</span></div>
      </div>`;
    }).join('');
  }
}

// ── INIT ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  buildSelector();
  renderProduct(activeProduct);
  // Re-render on theme change to repaint canvases
  document.getElementById('themeToggle').addEventListener('click', () => {
    setTimeout(() => renderProduct(activeProduct), 50);
  });
  // Re-render on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => renderProduct(activeProduct), 200);
  });
});
