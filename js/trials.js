// ── THEME ────────────────────────────────────────────────────
const THEME_KEY = 'evyp-theme';
function applyTheme(t) { document.documentElement.setAttribute('data-theme',t); localStorage.setItem(THEME_KEY,t); }
function isDark() { return document.documentElement.getAttribute('data-theme') !== 'light'; }
function initTheme() { const s=localStorage.getItem(THEME_KEY); applyTheme(s||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')); }
document.getElementById('themeToggle').addEventListener('click',()=>{ applyTheme(isDark()?'light':'dark'); setTimeout(redrawAll,60); });

// ── COLOURS ──────────────────────────────────────────────────
const C = { orange:'#E8631A', teal:'#2A9D8F', blue:'#4A90D9', purple:'#9B59B6', gold:'#F4C430', green:'#4CAF50' };
const textC  = ()=> isDark()?'#C0C0C0':'#444444';
const mutedC = ()=> isDark()?'#686868':'#AAAAAA';
const gridC  = ()=> isDark()?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.07)';

// ── TRIAL DATA ───────────────────────────────────────────────
const TRIALS = [
  {
    id:1, crop:'Avocado', year:2020, product:'Amino16', tag:'fruit', location:'Chania, Crete — Hass & Fuerte varieties',
    institution:'Field trial, experimental orchard, 18 trees/treatment',
    headline:'Fruit weight development accelerated in Fuerte variety',
    body:`Three applications of Amino16 at 3 L/stremma per period (spring and autumn) were compared against untreated controls across two avocado varieties. In the <strong>Fuerte variety</strong>, fruit weight increased by <strong>119%</strong> with Amino16 versus 58% in the control — the only statistically significant finding of the trial. Hass showed a positive yield trend (+11.4 kg/tree over control) and increased flowering was observed by the producer after continued use, without reaching statistical significance in a single season. Dry matter and oil content trended positively. The trial underscores that biostimulant effects in perennial tree crops often require multi-season observation to reach significance.`,
    chartType:'grouped_bars',
    chartData:{ title:'Fruit weight increase (%)', groups:['Hass','Fuerte'], series:[{label:'Amino16',color:C.orange,vals:[11,119]},{label:'Control',color:C.teal,vals:[0,58]}], max:130, note:'★ Significant in Fuerte' }
  },
  {
    id:2, crop:'Kiwi', year:2019, product:'Amino16 · Fruitfix', tag:'fruit', location:'Kefalochori, Imathia — Hayward variety',
    institution:'Large-scale field trial, 6.5 stremma, 5 spray applications April–July',
    headline:'Both products outperformed control — via different mechanisms',
    body:`A 6.5-stremma Hayward kiwi field was divided into three plots for a direct head-to-head comparison. <strong>Amino16 achieved the highest yield per tree at 28.24 kg</strong> (vs 20.42 kg control, +38%), primarily through improved fruit set — more fruits per vine. <strong>Fruitfix delivered yield via fruit size</strong> — average fruit weight of 122.4g vs 116.7g control, with better vegetation and greater resilience to temperature stress. This trial is valuable because it reveals two complementary pathways: Amino16 for maximising fruit number, Fruitfix for maximising fruit calibre — and suggests potential synergy if used in sequence.`,
    chartType:'kiwi_bars',
    chartData:{ vals:[28.24,23.50,20.42], labels:['Amino16','Fruitfix','Control'], colors:[C.orange,C.teal,mutedC], weights:[119.6,122.4,116.7] }
  },
  {
    id:3, crop:'Mint & Spearmint', year:2011, product:'Amino16', tag:'vegetable', location:'Aristotle University of Thessaloniki (AUTH)',
    institution:'Hydroponic greenhouse, controlled environment, 42-day cycle',
    headline:'High dose activates antioxidant defences — a controlled stress response',
    body:`This university study deliberately pushed Amino16 to excess (0.50% dose) to map the safety margins of biostimulant use. At this high dose, biomass was reduced by under 30%, but <strong>antioxidant capacity increased by up to +130%</strong> — particularly in spearmint. Antioxidant enzymes APX and POD were activated, preventing severe oxidative damage. Critically, the osmotic stress observed was traced to excess ammonium nitrogen (NH₄⁺), not to electrical conductivity — meaning the formulation itself is not the issue, but over-application of nitrogen with it can be. NaCl salinity caused no stress due to the natural tolerance of these species. This trial defines the ceiling for safe application and confirms that <strong>correct dosing is key</strong>.`,
    chartType:'delta_bars',
    chartData:{ items:[{label:'Antioxidant capacity',delta:+130,color:C.teal},{label:'APX enzyme activity',delta:+85,color:C.teal},{label:'Biomass (0.50% dose)',delta:-28,color:C.orange}], note:'vs control | 0.50% dose in spearmint' }
  },
  {
    id:4, crop:'Mint & Spearmint', year:2021, product:'Amino16', tag:'vegetable', location:'AUTH, Thermi greenhouse — unheated, 24-day cycle',
    institution:'Aristotle University of Thessaloniki, hydroponic floating system',
    headline:'Nitrates cut by 64% — quality improved without yield loss',
    body:`A follow-up study at AUTH refined the 2011 findings using GC-MS and UPLC-MS/MS to characterise product composition changes. At the recommended 0.25–0.50% dose, <strong>nitrate accumulation was reduced by up to 64% in spearmint</strong> — a significant food safety and premium quality benefit. <strong>Essential oil content increased by ~26%</strong> at the high dose in both species. Chlorophyll increased in both. Antioxidant capacity, phenolics, and carotenoids all improved in spearmint. Critically, <strong>fresh weight was not negatively affected</strong> — meaning producers can achieve superior product quality at the same yield, enabling premium market positioning. Essential oil and polyphenol composition profiles were unchanged, confirming the product does not alter the plant's biochemical identity.`,
    chartType:'delta_bars',
    chartData:{ items:[{label:'Nitrates (spearmint)',delta:-64,color:C.teal},{label:'Essential oil yield',delta:+26,color:C.orange},{label:'Chlorophyll',delta:+18,color:C.green},{label:'Fresh weight',delta:+2,color:C.blue}], note:'vs control | recommended dose' }
  },
  {
    id:5, crop:'Cotton', year:2017, product:'Amino16', tag:'field', location:'Larissa, Thessaly — Fiona variety (Bayer)',
    institution:'Internal commercial-scale trial, 10.4 ha field',
    headline:'+4.2% yield across a full commercial 10-hectare field',
    body:`This trial is notable for its commercial scale — a 10.4-hectare field divided into two equal halves, eliminating edge effects common in small-plot trials. Three applications of Amino16 at the 8th node, first flowers, and first bolls produced <strong>4,333 kg/ha vs 4,155 kg/ha</strong> in the untreated half — a +178 kg/ha gain across the entire field. <strong>Fibre yield also improved to 48.4% vs 47.81%</strong>, meaning not just more cotton but better quality fibre. Seed weight was marginally lower with Amino16 (9.58g vs 9.67g per 100 seeds), consistent with resources being directed toward fibre rather than seed reserves. At commercial cotton prices, a +4.2% yield improvement represents a significant return on a low-cost biostimulant input.`,
    chartType:'dual_progress',
    chartData:{ metrics:[{label:'Yield',unit:'kg/ha',treated:4333,control:4155,pct:4.3,color:C.orange},{label:'Fibre',unit:'%',treated:48.4,control:47.81,pct:1.2,color:C.teal}] }
  },
  {
    id:6, crop:'Cereals & Olive', year:null, product:'Amino16 · Amino16 BZn', tag:'field', location:'Chalkidiki — multi-plot trial',
    institution:'Exploratory multi-crop dose study, statistical analysis pending at time of report',
    headline:'Tillering doubled in barley; fruit set doubled in Chalkidiki olive',
    body:`This multi-crop study tested escalating doses of Amino16 and Amino16 BZn across four crops simultaneously. <strong>Barley</strong> showed the most dramatic response: tillering jumped from 4.40 to 9.22 per plant (+109%) and fruit weight per plant from 2.87g to 8.33g — a near 3× increase. <strong>Soft wheat</strong> showed fruit weight rising from 1.5g to 5.56g and biomass from 1.25g to 6.79g. <strong>Durum wheat</strong> grew 20cm taller with improved tillering. <strong>Chalkidiki olive</strong> showed fruit set index rising from 1.41–1.42 (control) to 2.88–3.13 at highest doses — effectively doubling the number of fruits set per branch. Amino16 BZn (with boron and zinc) performed slightly better than plain Amino16 across all crops, suggesting micronutrient co-delivery enhances the amino acid effect.`,
    chartType:'multicrop',
    chartData:{ crops:[{name:'Barley',icon:'🌾',metric:'Tillers/plant',ctrl:4.40,trt:9.22},{name:'Soft Wheat',icon:'🌾',metric:'Fruit wt (g)',ctrl:1.5,trt:5.56},{name:'Durum Wheat',icon:'🌾',metric:'Height (cm)',ctrl:58,trt:78},{name:'Olive',icon:'🫒',metric:'Fruit set',ctrl:1.41,trt:3.13}] }
  },
  {
    id:7, crop:'Olives · Apples · Cherries', year:2017, product:'Amino16', tag:'fruit', location:'Kalamata · Kozani · Edessa',
    institution:'American Farm School — cooperative research agreement with EVYP',
    headline:'Strong olive response under drought; vegetation gains across all crops',
    body:`A three-crop study conducted under the American Farm School's research programme, applying 3–6 foliar sprays at 3–7 L/1000L at key phenological stages. <strong>Olives (Kalamon & Koroneiki)</strong> showed a statistically significant increase in fruiting despite the year's intense drought — demonstrating Amino16's stress-buffering capacity when it matters most. <strong>Apples</strong> showed 19–37cm additional vegetation growth per variety and a yield increase in 'Red Cap' reaching significance despite frost damage reducing the overall sample. <strong>Cherries</strong> exhibited accelerated ripening and improved vegetation in Germanika and Bakirtzeika varieties, with yield trends positive but not statistically significant in a single season. The consistent vegetation and fruiting responses across three very different crop types in one season strengthen the case for Amino16 as a general biostimulant.`,
    chartType:'result_tiles',
    chartData:{ crops:[{icon:'🫒',name:'Olive',result:'Significant fruiting increase',note:'Despite intense drought',color:C.orange},{icon:'🍎',name:'Apple',result:'+19–37cm vegetation',note:'Yield increase in Red Cap',color:C.teal},{icon:'🍒',name:'Cherry',result:'Accelerated ripening',note:'Positive yield trend',color:C.purple}] }
  },
  {
    id:8, crop:'Olive', year:2013, product:'Amino16', tag:'fruit', location:'Ag. Mamas, Chalkidiki — Chondrolia & Kalamon varieties',
    institution:'Dedicated olive dose/timing study, 3 application windows tested',
    headline:'Winter application during vernalization is the critical timing for olive',
    body:`This focused olive trial tested three application timings — winter vernalization, pre-flowering, and post-fruit set — across two varieties with multiple doses. The finding was unambiguous: <strong>the winter application during the vernalization period delivered the greatest fruit set improvement</strong> in both Chondrolia and Kalamon varieties. Pre-flowering was second in impact; post-fruit set added the least. The production increase was driven entirely by <strong>more fruits per branch, not larger fruit size</strong> — confirming Amino16 acts at the cellular level on the flower bud differentiation mechanism. For Chondrolia, 50cc/tree gave the best results. For Kalamon, yield index was significantly higher than the untreated control. This trial provides actionable guidance: for olive growers, winter application is non-negotiable to capture the full biostimulant benefit.`,
    chartType:'timing_impact',
    chartData:{ timings:['Winter\n(vernaliz.)','Pre-\nflowering','Post\nfruit set'], impact:[95,52,30], color:C.orange }
  },
  {
    id:9, crop:'Tobacco', year:'2014–2015', product:'Amino16', tag:'field', location:'Katerini (Pieria) & Imathia',
    institution:'Multi-site seedbed and field trial across Oriental Katerini & FCVirginia NC297 varieties',
    headline:'Seedling quality improved with half the pesticide dose; budworm infestation reduced',
    body:`Two parallel findings make this trial particularly relevant for integrated crop management. First, <strong>seedlings treated with Amino16 alongside a 50% reduced pesticide dose developed greater shoot and root length than full-dose pesticide controls</strong> — suggesting Amino16 can partially compensate for reduced chemical inputs while cutting costs. Second, in the field phase, <strong>Amino16 combined with Bacillus thuringiensis (BT) reduced budworm infestation by 32.8% in Katerini and 39.7% in Virginia vs control</strong> — outperforming BT alone in both locations. This positions Amino16 as a meaningful component of reduced-input and biological pest management programmes, rather than merely a yield-enhancement tool.`,
    chartType:'pest_bars',
    chartData:{ bars:[{label:'BT + Amino16 (Katerini)',val:32.8,color:C.orange},{label:'BT + Amino16 (Virginia)',val:39.7,color:C.orange},{label:'BT only',val:18,color:C.teal},{label:'Control',val:0,color:mutedC}] }
  },
  {
    id:10, crop:'Baby Lettuce', year:2020, product:'Amino16', tag:'vegetable', location:'Greenhouse, AUTH — green Levistro & red Carmesi varieties',
    institution:'Aristotle University of Thessaloniki, hydroponic floating system',
    headline:'50% less nitrogen input — quality maintained and improved at 0.3% dose',
    body:`Under 50% reduced nitrogen input, <strong>Amino16 at 0.3% maintained yield while simultaneously improving phenols, antioxidants, and photosynthetic pigments</strong> — a result of direct commercial relevance for premium and organic lettuce producers facing input cost pressure. The 0.9% dose caused mild osmotic stress (reduced plant weight, inhibited root growth), attributed to increased electrical conductivity rather than the amino acid content itself — confirming that <strong>dose precision matters</strong>. Under full nitrogen, the 0.3% dose improved quality without yield cost. These results support a strategy of pairing Amino16 with a moderately reduced fertiliser programme to achieve better product with lower input cost and reduced nitrate leaching.`,
    chartType:'dose_index',
    chartData:{ doses:['Control\n(100% N)','0.3% Amino16\n(50% N)','0.9% Amino16\n(50% N)'], series:[{label:'Yield',vals:[100,102,78],color:C.orange},{label:'Antioxidants',vals:[100,128,114],color:C.teal},{label:'Nitrates',vals:[100,65,60],color:C.blue}] }
  },
  {
    id:11, crop:'Lettuce', year:2014, product:'Amino16', tag:'vegetable', location:'Greenhouse field trial — cv. Simpson',
    institution:'Controlled greenhouse experiment, 4 treatments, full nutritional analysis',
    headline:'Soil application produced best crop uniformity; both methods prevented nitrate build-up',
    body:`Four treatments were compared: untreated control, ammonium nitrate (soil), Amino16 (soil), and Amino16 (foliar). <strong>Amino16 applied to the soil gave the most uniform crop</strong> — 55% of plants in the optimal 200–249g category, versus 31% with ammonium nitrate. <strong>Foliar application of Amino16 significantly boosted antioxidant capacity</strong>, making it the preferred route for nutritional quality enhancement. Critically, <strong>both Amino16 application methods prevented the nitrate accumulation seen with ammonium nitrate</strong>, without any yield penalty or loss of other quality parameters. For growers selling to quality-conscious buyers or premium retailers, the ability to hit a more consistent size grade while delivering lower-nitrate produce is a direct commercial advantage.`,
    chartType:'uniformity_bars',
    chartData:{ treatments:['Amino16\n(soil)','Amino16\n(foliar)','Ammon.\nNitrate','Control'], optimal:[55,42,31,28], antioxidant:[118,145,98,100], colors:[C.orange,C.teal,C.blue,mutedC] }
  },
  {
    id:12, crop:'Apples', year:2018, product:'Amino16', tag:'fruit', location:'Pyrgoi, Kozani — Red Chief variety, ~15 stremma',
    institution:'Large-scale commercial trial, 32 trees/treatment, full harvest analysis',
    headline:'Heavier, better-coloured fruit enabling earlier — and more profitable — harvest',
    body:`Conducted across 15 stremma of Red Chief apples, this is one of the most commercially grounded trials in the portfolio. Three spray applications at precise phenological windows (10–20mm fruit, 50–60% size, pre-harvest) produced clear improvements across every quality parameter. <strong>Total yield: 1,260 kg vs 1,197 kg</strong>. Average fruit weight: <strong>241g vs 230.5g (+10.6g)</strong>. Fruit length +3mm, width +2mm. <strong>Colouration clearly improved</strong>, especially on the shaded side — the hardest side to colour and the one most scrutinised by supermarket buyers. Acidity was lower (sweeter taste profile) with no hardness penalty, <strong>enabling earlier harvest</strong> which reduces energy costs for cold storage and improves cashflow. The third application (7–10 days before harvest) added no measurable benefit; replacing it with an application 15–20 days after the second is recommended.`,
    chartType:'apple_metrics',
    chartData:{ metrics:[{label:'Total Yield (kg)',treated:1260,control:1197},{label:'Fruit Weight (g)',treated:241,control:230.5},{label:'Length (mm)',treated:73,control:70}], color:C.orange }
  },
  {
    id:13, crop:'Peaches & Nectarines', year:2017, product:'Amino16', tag:'fruit', location:'Imathia (Everts) & Veria (Venus/Nectarine)',
    institution:'Two-site field trial, 15 trees/treatment, two harvest passes measured',
    headline:'+10% yield in both varieties; earlier ripening with higher first-pass production',
    body:`Conducted identically across two separate orchards and two varieties, making this a highly reproducible result. <strong>Everts peach: 127.8 kg/tree vs 115.5 kg control (+10.6%)</strong>. Average fruit weight 159–162g vs 144–146g. Sugar content in the 2nd pass 10.4 vs 9.3 °Brix. <strong>Venus nectarine: 30.2 kg/tree vs 27.4 kg (+10.2%)</strong>. Fruit weight 213–221g vs 200–202g. Red overcolor in 2nd pass improved from 43.8% to 53.6% — a cosmetic quality upgrade that directly affects supermarket acceptance and price. In both varieties, <strong>Amino16 accelerated ripening without degrading hardness</strong>, shifting more production to the first (higher-value) harvest pass. For growers selling to fresh markets, earlier calibre-grade fruit with better colour is worth a meaningful price premium per kg.`,
    chartType:'peach_twin',
    chartData:{ varieties:['Everts (Peach)','Venus (Nectarine)'], yield_ctrl:[115.5,27.4], yield_trt:[127.8,30.2], extras:[{label:'Sugar °Brix',trt:10.4,ctrl:9.3,which:0},{label:'Red overcolor %',trt:53.6,ctrl:43.8,which:1}], color:C.orange }
  },
  {
    id:14, crop:'Tomato', year:'2012–2013', product:'Amino16', tag:'vegetable', location:'AUTH Research Farm, Thessaloniki',
    institution:'Aristotle University — Randomised complete block, 4–5 repetitions, hybrid Belladonna',
    headline:'Fruit weight +16–51% under standard nitrogen; marketable yield +28% under reduced inputs',
    body:`One of the most technically rigorous trials in this collection, designed by the AUTH Laboratory of Vegetable Production. <strong>Under conventional fertilisation, combined root (0.3%) + foliar (0.9%) Amino16 increased average tomato fruit weight by 16–51%</strong> depending on fruit category. <strong>Under 20% reduced nitrogen, marketable production increased by 28%</strong> — meaning Amino16 not only recovered the yield deficit from the nitrogen cut but exceeded the unfertilised baseline. Under 40% reduced nitrogen, a 2.7% root application increased production and fruit number by 17% and 11–12% respectively. The data demonstrates a consistent pattern: <strong>Amino16 is most powerful when nitrogen is constrained</strong>, acting as an efficiency multiplier for the nitrogen that is available. In industrial beans run in parallel, similar trends emerged under reduced fertilisation conditions, with a 16% yield increase and 32% fibre reduction.`,
    chartType:'tomato_scenarios',
    chartData:{ scenarios:['Full N','−20% N','−40% N'], improvement:[33,28,17], note:'Best Amino16 response per scenario', colors:[C.orange,C.teal,C.blue] }
  },
  {
    id:15, crop:'Lettuce — Soil Science', year:2017, product:'Amino16', tag:'soil', location:'ELGO-DEMETER experimental fields, Thessaloniki',
    institution:'Metagenomic analysis — Illumina HiSeq, 445 OTUs, QIIME/SILVA pipeline',
    headline:'Rhizosphere microbiome restructured; soil nitrates significantly reduced',
    body:`This metagenomic study used next-generation sequencing to characterise how Amino16 modifies the living soil environment — an area of growing scientific interest. The key finding: <strong>Amino16 significantly reduced soil NO₃-N concentrations</strong> even when combined with nitrogen fertiliser, suggesting the product activates microbial pathways that prevent nitrate accumulation and leaching. Amino16 application reduced the relative abundance of Acidobacteria across all treatments — this group is associated with nutrient-poor, acidic conditions, so their reduction suggests a shift toward a more biologically active soil state. Combination with nitrogen fertiliser increased Gemmatimonadetes, associated with nutrient cycling. <strong>Lettuce yield was not significantly different between treatments</strong>, confirming that microbiome changes driven by Amino16 do not come at a yield cost. This trial positions Amino16 as a tool for sustainable soil stewardship, not just crop production.`,
    chartType:'text_only'
  },
  {
    id:16, crop:'Pear — Soil Science', year:2019, product:'Amino16', tag:'soil', location:'Tyrnavos, Thessaly — pear orchard with natural Phytophthora infection',
    institution:'Metagenomic sequencing — Illumina V3-V4 16S rRNA, 478,479 sequences, 1,266 OTUs',
    headline:'Amino16 reshapes rhizosphere bacteria; Actinobacteria elevated near Phytophthora infection',
    body:`The first study of its kind for pear orchards, this trial used high-resolution microbiome sequencing across six treatment conditions including naturally Phytophthora-infected trees. Proteobacteria were dominant overall (46.1%), with Acidobacteria (13.2%) and Actinobacteria (12.4%) as secondary phyla. <strong>Amino16 application was consistently associated with increased Proteobacteria abundance</strong> — this group includes many plant-growth-promoting bacteria (PGPB) known to fix nitrogen and solubilise phosphorus. Infected trees (with or without Amino16) showed elevated Actinobacteria — a phylum known to include antibiotic-producing genera that may provide partial biological suppression of soil pathogens. Thaumarchaeota were reduced in infected samples. With 1,266 OTUs identified and ~31% unique per sample, the data reveals <strong>highly site-specific microbiome signatures</strong> that Amino16 consistently shifts toward a more beneficial profile — even under pathogen pressure.`,
    chartType:'text_only'
  },
  {
    id:17, crop:'Rice', year:2022, product:'Amino16', tag:'field', location:'Parrita, Puntarenas, Costa Rica',
    institution:'Randomised field trial — 5 repetitions, ANOVA + Tukey test (p≤0.05)',
    headline:'+45.8% yield in Costa Rica — statistically confirmed with just 2 applications',
    body:`Perhaps the most striking single result in this portfolio: <strong>two foliar applications of Amino16 at 2.5 L/ha, 14 days apart, produced a 45.8% yield increase</strong> — 3,373 kg/ha versus 2,314 kg/ha in the commercial control. <strong>Plant density also increased significantly</strong> — 210.4 vs 177.9 plants/m² (+18.3%). Both results were confirmed by ANOVA and Tukey test at p≤0.05. No phytotoxicity was observed at any assessment point (0, 14, 50, and 75 days). Conducted in a tropical climate (Oryza sativa under Pacific Coast conditions) far outside the Mediterranean context of most other trials, this result demonstrates that <strong>the amino acid biostimulation mechanism is effective across climate zones and agro-ecological systems</strong>. The researchers recommended semi-commercial scale follow-up, which would likely cement the result.`,
    chartType:'hero_bars',
    chartData:{ metrics:[{label:'Yield (kg/ha)',treated:3373,control:2314,pct:45.8},{label:'Plants/m²',treated:210.4,control:177.9,pct:18.3}], color:C.orange }
  },
];

// ── CARD BUILDER ─────────────────────────────────────────────
const TAG_LABELS = { field:'Field Crop', fruit:'Fruit Tree', vegetable:'Vegetable', soil:'Soil Science' };
const TAG_COLORS = { field:C.gold, fruit:C.orange, vegetable:C.green, soil:C.teal };

let activeFilter = 'all';

function buildCards(filter) {
  activeFilter = filter;
  const grid = document.getElementById('trialsGrid');
  const list = filter==='all' ? TRIALS : TRIALS.filter(t=>t.tag===filter);
  grid.innerHTML = list.map((t,idx) => `
    <article class="trial-card" style="animation-delay:${idx*0.05}s">
      <div class="tc-top">
        <div class="tc-meta">
          <span class="tc-tag" style="color:${TAG_COLORS[t.tag]};border-color:${TAG_COLORS[t.tag]}33;background:${TAG_COLORS[t.tag]}14">${TAG_LABELS[t.tag]}</span>
          <span class="tc-year">${t.year||''}</span>
        </div>
        <div class="tc-crop">${t.crop}</div>
        <div class="tc-product">Product: ${t.product}</div>
        <div class="tc-headline">${t.headline}</div>
      </div>
      ${t.chartType !== 'text_only' ? `<div class="tc-chart" id="chart-${t.id}"></div>` : ''}
      <div class="tc-body">${t.body}</div>
      <div class="tc-footer">
        <span class="tc-location">📍 ${t.location}</span>
        <span class="tc-institution">${t.institution}</span>
      </div>
    </article>
  `).join('');

  list.forEach(t => { if(t.chartType !== 'text_only') drawChart(t); });
}

// ── CHART DISPATCHER ─────────────────────────────────────────
function drawChart(t) {
  const el = document.getElementById(`chart-${t.id}`);
  if (!el) return;
  const map = {
    grouped_bars: drawGroupedBars,
    kiwi_bars:    drawKiwiBars,
    delta_bars:   drawDeltaBars,
    dual_progress:drawDualProgress,
    multicrop:    drawMultiCrop,
    result_tiles: drawResultTiles,
    timing_impact:drawTimingImpact,
    pest_bars:    drawPestBars,
    dose_index:   drawDoseIndex,
    uniformity_bars: drawUniformityBars,
    apple_metrics:drawAppleMetrics,
    peach_twin:   drawPeachTwin,
    tomato_scenarios: drawTomatoScenarios,
    hero_bars:    drawHeroBars,
  };
  if(map[t.chartType]) map[t.chartType](el, t.chartData);
}

// ── CANVAS HELPER ─────────────────────────────────────────────
function cv(el, h) {
  el.innerHTML='';
  const c = document.createElement('canvas');
  c.width = el.offsetWidth||340; c.height = h;
  c.style.cssText = `width:100%;height:${h}px;display:block`;
  el.appendChild(c);
  return c;
}
function rr(ctx,x,y,w,h,r=3) {
  if(w<1||h<1) return;
  r=Math.min(r,w/2,h/2);
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}
function pct(v,max){ return Math.max(0,Math.min(1,v/max)); }

// ── 1. GROUPED BARS (Avocado) ────────────────────────────────
function drawGroupedBars(el,d) {
  const c=cv(el,120); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,pad={l:72,r:60,t:22,b:28};
  const bH=14,gap=6,groupGap=16;
  ctx.fillStyle=textC(); ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText(d.title,W/2,12);
  d.groups.forEach((g,gi)=>{
    d.series.forEach((s,si)=>{
      const y=pad.t+gi*(bH*2+gap+groupGap)+si*(bH+gap);
      const w=pct(s.vals[gi],d.max)*(W-pad.l-pad.r);
      const col=typeof s.color==='function'?s.color():s.color;
      ctx.fillStyle=col+(si===1?'77':'CC'); rr(ctx,pad.l,y,w,bH); ctx.fill();
      ctx.fillStyle=col; ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
      ctx.fillText(s.vals[gi]+'%',pad.l+w+4,y+bH-2);
    });
    ctx.fillStyle=textC(); ctx.font='bold 11px sans-serif'; ctx.textAlign='right';
    ctx.fillText(g,pad.l-6,pad.t+gi*(bH*2+gap+groupGap)+bH+gap/2);
  });
  // legend
  d.series.forEach((s,i)=>{ const col=typeof s.color==='function'?s.color():s.color; ctx.fillStyle=col+(i===1?'77':'CC'); ctx.fillRect(pad.l+i*70,2,10,8); ctx.fillStyle=textC(); ctx.font='9px sans-serif'; ctx.textAlign='left'; ctx.fillText(s.label,pad.l+i*70+13,10); });
  if(d.note){ ctx.fillStyle=C.gold; ctx.font='9px sans-serif'; ctx.textAlign='left'; ctx.fillText(d.note,pad.l,H-4); }
}

// ── 2. KIWI BARS ─────────────────────────────────────────────
function drawKiwiBars(el,d) {
  const c=cv(el,130); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,n=d.vals.length;
  const bW=(W-40)/n-12,pad={l:20,t:28,b:36};
  const maxV=32;
  d.vals.forEach((v,i)=>{
    const col=typeof d.colors[i]==='function'?d.colors[i]():d.colors[i];
    const bH=pct(v,maxV)*(H-pad.t-pad.b);
    const x=pad.l+i*(bW+12);
    ctx.fillStyle=col+(i===2?'55':'CC'); rr(ctx,x,H-pad.b-bH,bW,bH,4); ctx.fill();
    ctx.fillStyle=col; ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
    ctx.fillText(v+'kg',x+bW/2,H-pad.b-bH-5);
    ctx.fillStyle=textC(); ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    ctx.fillText(d.labels[i],x+bW/2,H-pad.b+14);
    ctx.fillStyle=mutedC(); ctx.font='9px sans-serif';
    ctx.fillText(d.weights[i]+'g avg',x+bW/2,H-6);
  });
  ctx.fillStyle=mutedC(); ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText('Yield per tree (kg) | Avg fruit weight (g)',W/2,14);
}

// ── 3 & 4. DELTA BARS ────────────────────────────────────────
function drawDeltaBars(el,d) {
  const c=cv(el,d.items.length*32+30); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,pad={l:140,r:70,t:14,b:18};
  const bH=18,gap=8;
  const maxAbs=Math.max(...d.items.map(i=>Math.abs(i.delta)))*1.1;
  d.items.forEach((item,i)=>{
    const y=pad.t+i*(bH+gap);
    const w=pct(Math.abs(item.delta),maxAbs)*(W-pad.l-pad.r);
    const pos=item.delta>=0;
    ctx.fillStyle=item.color+'33'; ctx.fillRect(pad.l,y,pos?w:-w+1,bH);
    ctx.fillStyle=item.color+'CC'; ctx.fillRect(pos?pad.l:pad.l-w,y,w,bH);
    ctx.fillStyle=textC(); ctx.font='11px sans-serif'; ctx.textAlign='right';
    ctx.fillText(item.label,pad.l-8,y+bH-4);
    const badge=(pos?'+':'')+item.delta+'%';
    ctx.fillStyle='#fff'; ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    if(w>28) ctx.fillText(badge,pos?pad.l+w/2:pad.l-w/2,y+bH-4);
    else { ctx.fillStyle=item.color; ctx.textAlign='left'; ctx.fillText(badge,pad.l+w+4,y+bH-4); }
  });
  // zero line
  ctx.strokeStyle=gridC(); ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad.l,pad.t-4); ctx.lineTo(pad.l,H-pad.b); ctx.stroke();
  if(d.note){ ctx.fillStyle=mutedC(); ctx.font='9px sans-serif'; ctx.textAlign='left'; ctx.fillText(d.note,pad.l,H-2); }
}

// ── 5. DUAL PROGRESS ARCS (Cotton) ──────────────────────────
function drawDualProgress(el,d) {
  const c=cv(el,110); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,mW=W/d.metrics.length;
  d.metrics.forEach((m,i)=>{
    const cx=mW*i+mW/2,cy=H-18,r=Math.min(mW/2-18,H-36);
    ctx.beginPath(); ctx.arc(cx,cy,r,Math.PI,2*Math.PI);
    ctx.strokeStyle=gridC(); ctx.lineWidth=10; ctx.stroke();
    const fillEnd=Math.PI+pct(m.pct,12)*Math.PI;
    ctx.beginPath(); ctx.arc(cx,cy,r,Math.PI,fillEnd);
    ctx.strokeStyle=m.color; ctx.lineWidth=10; ctx.lineCap='round'; ctx.stroke();
    ctx.fillStyle=m.color; ctx.font='bold 15px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+m.pct+'%',cx,cy-8);
    ctx.fillStyle=textC(); ctx.font='10px sans-serif';
    ctx.fillText(m.label,cx,cy+14);
    ctx.fillStyle=mutedC(); ctx.font='9px sans-serif';
    ctx.fillText(m.treated+' vs '+m.control+' '+m.unit,cx,H-2);
  });
}

// ── 6. MULTICROP ─────────────────────────────────────────────
function drawMultiCrop(el,d) {
  const c=cv(el,150); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,n=d.crops.length;
  const cW=W/n,pad={t:28,b:42};
  d.crops.forEach((crop,i)=>{
    const cx=i*cW,maxV=crop.trt*1.15;
    const ctrlH=pct(crop.ctrl,maxV)*(H-pad.t-pad.b);
    const trtH=pct(crop.trt,maxV)*(H-pad.t-pad.b);
    const bW=(cW-20)/2-2,by=H-pad.b;
    ctx.fillStyle=mutedC()+'66'; rr(ctx,cx+10,by-ctrlH,bW,ctrlH,3); ctx.fill();
    ctx.fillStyle=C.orange+'CC'; rr(ctx,cx+14+bW,by-trtH,bW,trtH,3); ctx.fill();
    const pctUp=Math.round((crop.trt-crop.ctrl)/crop.ctrl*100);
    ctx.fillStyle=C.gold; ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+pctUp+'%',cx+cW/2,by-trtH-5);
    ctx.fillStyle=textC(); ctx.font='10px sans-serif'; ctx.textAlign='center';
    ctx.fillText(crop.icon+' '+crop.name,cx+cW/2,H-pad.b+14);
    ctx.fillStyle=mutedC(); ctx.font='8px sans-serif';
    ctx.fillText(crop.metric,cx+cW/2,H-pad.b+26);
    ctx.fillStyle=C.orange; ctx.font='bold 10px sans-serif';
    ctx.fillText(crop.trt,cx+cW/2,H-4);
  });
  ctx.fillStyle=mutedC()+'66'; ctx.fillRect(8,8,8,8);
  ctx.fillStyle=textC(); ctx.font='9px sans-serif'; ctx.textAlign='left'; ctx.fillText('Control',20,16);
  ctx.fillStyle=C.orange+'CC'; ctx.fillRect(70,8,8,8); ctx.fillText('Amino16',82,16);
}

// ── 7. RESULT TILES (Olives/Apples/Cherries) ────────────────
function drawResultTiles(el,d) {
  el.innerHTML=d.crops.map(c=>`
    <div class="res-tile" style="border-left:3px solid ${c.color}">
      <span class="res-icon">${c.icon}</span>
      <div>
        <div class="res-name">${c.name}</div>
        <div class="res-result" style="color:${c.color}">${c.result}</div>
        <div class="res-note">${c.note}</div>
      </div>
    </div>`).join('');
}

// ── 8. TIMING IMPACT ─────────────────────────────────────────
function drawTimingImpact(el,d) {
  const c=cv(el,120); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,n=d.timings.length;
  const bW=(W-32)/n-12,pad={l:16,t:24,b:40};
  d.timings.forEach((t,i)=>{
    const bH=pct(d.impact[i],110)*(H-pad.t-pad.b);
    const x=pad.l+i*(bW+12);
    const alpha=0.4+0.6*(d.impact[i]/100);
    ctx.fillStyle=d.color+Math.round(alpha*255).toString(16).padStart(2,'0');
    rr(ctx,x,H-pad.b-bH,bW,bH,4); ctx.fill();
    ctx.fillStyle=d.color; ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
    ctx.fillText(d.impact[i]+'%',x+bW/2,H-pad.b-bH-5);
    ctx.fillStyle=textC(); ctx.font='9px sans-serif';
    t.split('\n').forEach((l,li)=>ctx.fillText(l,x+bW/2,H-pad.b+12+li*13));
  });
  ctx.fillStyle=mutedC(); ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText('Relative fruit set improvement by application timing',W/2,13);
}

// ── 9. PEST BARS (Tobacco) ───────────────────────────────────
function drawPestBars(el,d) {
  const c=cv(el,d.bars.length*32+28); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,pad={l:148,r:56,t:14,b:16};
  const bH=18,gap=8,maxV=50;
  d.bars.forEach((b,i)=>{
    const y=pad.t+i*(bH+gap);
    const col=typeof b.color==='function'?b.color():b.color;
    const w=pct(b.val,maxV)*(W-pad.l-pad.r);
    ctx.fillStyle=col+(i>1?'55':'BB'); rr(ctx,pad.l,y,Math.max(w,2),bH,3); ctx.fill();
    ctx.fillStyle=col; ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
    ctx.fillText(b.val>0?b.val+'%':'—',pad.l+w+4,y+bH-4);
    ctx.fillStyle=textC(); ctx.font='10px sans-serif'; ctx.textAlign='right';
    ctx.fillText(b.label,pad.l-6,y+bH-4);
  });
  ctx.fillStyle=mutedC(); ctx.font='9px sans-serif'; ctx.textAlign='left';
  ctx.fillText('% budworm infestation reduction vs untreated',pad.l,H-2);
}

// ── 10. DOSE INDEX (Baby Lettuce) ────────────────────────────
function drawDoseIndex(el,d) {
  const c=cv(el,140); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,n=d.doses.length;
  const gW=(W-24)/n,pad={l:12,t:36,b:32};
  const bW=(gW-8)/d.series.length;
  d.series.forEach((s,si)=>{
    d.doses.forEach((dose,di)=>{
      const v=s.vals[di];
      const bH=pct(v,160)*(H-pad.t-pad.b);
      const x=pad.l+di*gW+si*(bW+2);
      const y=H-pad.b-bH;
      ctx.fillStyle=s.color+(v<100?'66':'BB'); rr(ctx,x,y,bW,bH,2); ctx.fill();
    });
  });
  // baseline
  const bY=H-pad.b-pct(100,160)*(H-pad.t-pad.b);
  ctx.strokeStyle=C.gold+'88'; ctx.lineWidth=1; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(pad.l,bY); ctx.lineTo(W-12,bY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle=C.gold; ctx.font='9px sans-serif'; ctx.textAlign='right';
  ctx.fillText('baseline (100)',W-14,bY-3);
  d.doses.forEach((dose,di)=>{
    ctx.fillStyle=textC(); ctx.font='9px sans-serif'; ctx.textAlign='center';
    dose.split('\n').forEach((l,li)=>ctx.fillText(l,pad.l+di*gW+gW/2,H-pad.b+12+li*12));
  });
  d.series.forEach((s,i)=>{ ctx.fillStyle=s.color+'BB'; ctx.fillRect(8+i*80,8,8,8); ctx.fillStyle=textC(); ctx.font='9px sans-serif'; ctx.textAlign='left'; ctx.fillText(s.label,20+i*80,16); });
}

// ── 11. UNIFORMITY BARS (Lettuce 2014) ───────────────────────
function drawUniformityBars(el,d) {
  const c=cv(el,140); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,n=d.treatments.length;
  const bW=(W-20)/n-8,pad={l:10,t:22,b:44};
  d.treatments.forEach((t,i)=>{
    const col=typeof d.colors[i]==='function'?d.colors[i]():d.colors[i];
    const x=pad.l+i*(bW+8);
    const bH=pct(d.optimal[i],70)*(H-pad.t-pad.b);
    rr(ctx,x,H-pad.b-bH,bW,bH,4); ctx.fillStyle=col+(i>1?'66':'CC'); ctx.fill();
    ctx.fillStyle=col; ctx.font='bold 12px sans-serif'; ctx.textAlign='center';
    ctx.fillText(d.optimal[i]+'%',x+bW/2,H-pad.b-bH-5);
    t.split('\n').forEach((l,li)=>{ ctx.fillStyle=textC(); ctx.font='9px sans-serif'; ctx.textAlign='center'; ctx.fillText(l,x+bW/2,H-pad.b+13+li*12); });
  });
  ctx.fillStyle=mutedC(); ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText('% plants in optimal 200–249g weight class',W/2,13);
}

// ── 12. APPLE METRICS ────────────────────────────────────────
function drawAppleMetrics(el,d) {
  const c=cv(el,120); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,n=d.metrics.length,mW=W/n;
  d.metrics.forEach((m,i)=>{
    const cx=i*mW+mW/2,cy=52,r=30;
    ctx.beginPath(); ctx.arc(cx,cy,r,0,2*Math.PI);
    ctx.strokeStyle=gridC(); ctx.lineWidth=7; ctx.stroke();
    const ratio=Math.min((m.treated/m.control-1)*5,1);
    ctx.beginPath(); ctx.arc(cx,cy,-Math.PI/2,-Math.PI/2+ratio*2*Math.PI);
    ctx.strokeStyle=d.color; ctx.lineWidth=7; ctx.lineCap='round'; ctx.stroke();
    const pctUp=((m.treated-m.control)/m.control*100).toFixed(1);
    ctx.fillStyle=d.color; ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+pctUp+'%',cx,cy+4);
    ctx.fillStyle=textC(); ctx.font='9px sans-serif';
    ctx.fillText(m.label,cx,H-20);
    ctx.fillStyle=mutedC(); ctx.font='9px sans-serif';
    ctx.fillText(m.treated+' vs '+m.control,cx,H-7);
  });
}

// ── 13. PEACH TWIN ───────────────────────────────────────────
function drawPeachTwin(el,d) {
  const c=cv(el,130); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,half=W/2;
  d.varieties.forEach((v,i)=>{
    const cx=i===0?half/2:half+half/2,cy=54,r=32;
    const yldPct=(d.yield_trt[i]-d.yield_ctrl[i])/d.yield_ctrl[i];
    ctx.beginPath(); ctx.arc(cx,cy,r,0,2*Math.PI);
    ctx.strokeStyle=gridC(); ctx.lineWidth=8; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+Math.min(yldPct*4,1)*2*Math.PI);
    ctx.strokeStyle=d.color; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke();
    ctx.fillStyle=d.color; ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+((yldPct)*100).toFixed(1)+'%',cx,cy+5);
    ctx.fillStyle=textC(); ctx.font='9px sans-serif'; ctx.fillText(v,cx,cy+r+14);
    const ex=d.extras.find(e=>e.which===i);
    if(ex){ ctx.fillStyle=mutedC(); ctx.font='9px sans-serif'; ctx.fillText(ex.label+': '+ex.trt+' vs '+ex.ctrl,cx,H-4); }
  });
}

// ── 14. TOMATO SCENARIOS ─────────────────────────────────────
function drawTomatoScenarios(el,d) {
  const c=cv(el,130); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,n=d.scenarios.length;
  const bW=(W-24)/n-10,pad={l:12,t:24,b:44};
  d.scenarios.forEach((sc,i)=>{
    const bH=pct(d.improvement[i],55)*(H-pad.t-pad.b);
    const x=pad.l+i*(bW+10);
    ctx.fillStyle=d.colors[i]+'CC'; rr(ctx,x,H-pad.b-bH,bW,bH,4); ctx.fill();
    ctx.fillStyle=d.colors[i]; ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+d.improvement[i]+'%',x+bW/2,H-pad.b-bH-6);
    sc.split('\n').forEach((l,li)=>{ ctx.fillStyle=textC(); ctx.font='9px sans-serif'; ctx.textAlign='center'; ctx.fillText(l,x+bW/2,H-pad.b+13+li*12); });
  });
  ctx.fillStyle=C.gold; ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText(d.note,W/2,13);
}

// ── 17. HERO BARS (Rice) ─────────────────────────────────────
function drawHeroBars(el,d) {
  const c=cv(el,140); const ctx=c.getContext('2d');
  const W=c.width,H=c.height,n=d.metrics.length,mW=W/n;
  d.metrics.forEach((m,i)=>{
    const cx=i*mW+mW/2,bW=Math.min(mW*0.28,44);
    const maxV=m.treated*1.12,by=H-28;
    const ctrlH=pct(m.control,maxV)*(H-52);
    const trtH=pct(m.treated,maxV)*(H-52);
    ctx.fillStyle=mutedC()+'55'; rr(ctx,cx-bW-4,by-ctrlH,bW,ctrlH,4); ctx.fill();
    ctx.fillStyle=d.color+'CC'; rr(ctx,cx+4,by-trtH,bW,trtH,4); ctx.fill();
    ctx.fillStyle=mutedC(); ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    ctx.fillText(m.control,cx-bW/2-4,by-ctrlH-6);
    ctx.fillStyle=d.color; ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
    ctx.fillText(m.treated,cx+bW/2+4,by-trtH-6);
    ctx.fillStyle=C.gold; ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
    ctx.fillText('+'+m.pct+'%',cx,by-Math.max(trtH,ctrlH)/2);
    ctx.fillStyle=textC(); ctx.font='9px sans-serif'; ctx.textAlign='center';
    ctx.fillText(m.label,cx,H-14);
  });
  // stat label
  ctx.fillStyle=C.gold; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
  ctx.fillText('★ Confirmed ANOVA/Tukey p≤0.05',W/2,H-2);
}

// ── FILTER ───────────────────────────────────────────────────
function redrawAll() { buildCards(activeFilter); }
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    buildCards(btn.dataset.filter);
  });
});

// ── INIT ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded',()=>{
  initTheme();
  buildCards('all');
  let rt;
  window.addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(redrawAll,200); });
});
