// ---------- Taxonomy ----------
const SECTORS = ["Financials","Mining & Resources","Oil & Gas","Telecom","Agriculture & Consumer"];
const REGIONS = ["North Africa","West Africa","East Africa","Southern Africa","Central Africa"];
const CURRENCY_ZONES = [
  {key:"peg", label:"Peg (e.g. CFA franc)"},
  {key:"managed-float", label:"Managed float"},
  {key:"free-float", label:"Free float"},
  {key:"high-risk", label:"High-risk / hyperinflation history"},
];

// ---------- Existing 5 (diversity baseline, not scored) ----------
const EXISTING = [
  {name:"NGX (Nigeria)", region:"West Africa", currencyZone:"free-float", sector:"Financials"},
  {name:"JSE (South Africa)", region:"Southern Africa", currencyZone:"free-float", sector:"Mining & Resources"},
  {name:"NSE (Kenya)", region:"East Africa", currencyZone:"free-float", sector:"Telecom"},
  {name:"GSE (Ghana)", region:"West Africa", currencyZone:"free-float", sector:"Mining & Resources"},
  {name:"EGX (Egypt)", region:"North Africa", currencyZone:"managed-float", sector:"Financials"},
];

// ---------- Candidates ----------
// return2025 / returnYTD2026: null = not disclosed / not comparable -> excluded & reweighted, never zero.
// liquidity/currencyRegime/catalystStrength/politicalRisk/demographicTailwind/momentum/retailTraffic: 1-5, editable.
// DEFAULT_DATA seeds a fresh copy of this artifact. The live, editable copy lives in `DATA` and,
// when a viewer can write to this page, is saved to data/state.json so edits and newly added
// exchanges persist for everyone rather than resetting on reload.
const DEFAULT_DATA = [
  { id:"ma", name:"Casablanca SE", country:"Morocco", region:"North Africa", currencyZone:"managed-float",
    tradingBegan:1929, sector:"Financials", sectorConf:"high",
    return2025:42, return2025IncludedByDefault:true, returnYTD2026:-3.34,
    liquidity:5, currencyRegime:4, catalystStrength:4, politicalRisk:4, demographicTailwind:3, momentum:2, retailTraffic:3,
    note:"Africa's 2nd-largest exchange (~$114B). Deep institutional/Gulf sovereign access; 2026 has been soft so far." },
  { id:"brvm", name:"BRVM", country:"Regional — 8 W. African states", region:"West Africa", currencyZone:"peg",
    tradingBegan:1998, sector:"Financials", sectorConf:"high",
    return2025:42, returnYTD2026:40.4,
    liquidity:3, currencyRegime:5, catalystStrength:3, politicalRisk:3, demographicTailwind:4, momentum:3, retailTraffic:3,
    note:"CFA-franc peg gives currency stability most frontier markets lack. Steady, structurally de-risked growth." },
  { id:"tn", name:"Bourse de Tunis", country:"Tunisia", region:"North Africa", currencyZone:"managed-float",
    tradingBegan:1969, sector:"Financials", sectorConf:"high",
    return2025:49, returnYTD2026:49.6,
    liquidity:3, currencyRegime:3, catalystStrength:3, politicalRisk:3, demographicTailwind:2, momentum:3, retailTraffic:3,
    note:"Consistently strong, under-the-radar performer two years running; less volatile than frontier peers." },
  { id:"tz", name:"Dar es Salaam SE", country:"Tanzania", region:"East Africa", currencyZone:"free-float",
    tradingBegan:1998, sector:"Mining & Resources", sectorConf:"high",
    return2025:28, returnYTD2026:51.6,
    liquidity:3, currencyRegime:3, catalystStrength:5, politicalRisk:4, demographicTailwind:4, momentum:5, retailTraffic:3,
    note:"Genuine gold-mining boom (>10% of GDP); first ETF just launched." },
  { id:"zw", name:"Zimbabwe SE", country:"Zimbabwe", region:"Southern Africa", currencyZone:"high-risk",
    tradingBegan:1946, sector:"Mining & Resources", sectorConf:"low",
    return2025:27, returnYTD2026:71, returnNotUSDComparable:true,
    liquidity:2, currencyRegime:1, catalystStrength:3, politicalRisk:2, demographicTailwind:3, momentum:4, retailTraffic:3,
    note:"Best-performing African exchange of 2026 so far — but returns are local-currency only; repeated redenominations make USD comparison meaningless." },
  { id:"ug", name:"Uganda SE", country:"Uganda", region:"East Africa", currencyZone:"free-float",
    tradingBegan:1998, sector:"Oil & Gas", sectorConf:"low",
    return2025:40, returnYTD2026:35.2,
    liquidity:2, currencyRegime:3, catalystStrength:4, politicalRisk:3, demographicTailwind:4, momentum:3, retailTraffic:3,
    note:"Telecom & financials lead today's listings; East Africa Crude Oil Pipeline is the forward catalyst." },
  { id:"rw", name:"Rwanda SE", country:"Rwanda", region:"East Africa", currencyZone:"managed-float",
    tradingBegan:2011, sector:"Financials", sectorConf:"high",
    return2025:18, returnYTD2026:40.4,
    liquidity:2, currencyRegime:4, catalystStrength:4, politicalRisk:4, demographicTailwind:3, momentum:3, retailTraffic:3,
    note:"Smaller but steady, accelerating in 2026; benefits from a stability and reform reputation." },
  { id:"zm", name:"Lusaka SE", country:"Zambia", region:"Southern Africa", currencyZone:"free-float",
    tradingBegan:1994, sector:"Mining & Resources", sectorConf:"high",
    return2025:112, returnYTD2026:null,
    liquidity:3, currencyRegime:3, catalystStrength:4, politicalRisk:4, demographicTailwind:3, momentum:3, retailTraffic:3,
    note:"2025 standout on copper prices and post-restructuring confidence; 2026 YTD % not disclosed in source (ranked 11th continent-wide)." },
  { id:"et", name:"Ethiopian SE", country:"Ethiopia", region:"East Africa", currencyZone:"high-risk",
    tradingBegan:2025, sector:"Telecom", sectorConf:"high",
    return2025:null, returnYTD2026:null,
    liquidity:1, currencyRegime:2, catalystStrength:5, politicalRisk:2, demographicTailwind:5, momentum:4, retailTraffic:3,
    note:"Opened 2025; too new for a return history. 130M population, largely unbanked; Ethio Telecom privatization drew 47,000+ investors." },
  { id:"ao", name:"BODIVA", country:"Angola", region:"Southern Africa", currencyZone:"high-risk",
    tradingBegan:2014, sector:"Oil & Gas", sectorConf:"low",
    return2025:null, returnYTD2026:null,
    liquidity:1, currencyRegime:2, catalystStrength:4, politicalRisk:3, demographicTailwind:4, momentum:5, retailTraffic:3,
    note:"No % return disclosed in source — only that turnover jumped ~19x in 2025 on Unitel's IPO. Oil/mining enter via the privatization pipeline, not current listings." },
];

// Live, editable copy — populated at boot from saved state if available, else DEFAULT_DATA.
let DATA = [];

// ---------- Lens definitions ----------
const LENSES = {
  performing: {
    label:"Best Performing",
    desc:"Proven, comparable returns — with a liquidity and currency-stability check so the score isn't just rewarding volatility.",
    weights:[
      {key:"returnYTD2026", label:"2026 YTD return", w:35, type:"quant"},
      {key:"return2025", label:"2025 return", w:25, type:"quant"},
      {key:"liquidity", label:"Liquidity", w:20, type:"qual"},
      {key:"currencyRegime", label:"Currency stability", w:20, type:"qual"},
    ]
  },
  growth: {
    label:"Best Growth Opportunity",
    desc:"Forward catalysts and headroom — treats a small, new market as an asset, not a liability.",
    weights:[
      {key:"catalystStrength", label:"Catalyst strength", w:25, type:"qual"},
      {key:"demographicTailwind", label:"Demographic tailwind", w:20, type:"qual"},
      {key:"retailTraffic", label:"Retail investment traffic", w:15, type:"qual"},
      {key:"momentum", label:"Listing / volume momentum", w:15, type:"qual"},
      {key:"politicalRisk", label:"Political & regulatory risk", w:15, type:"qual"},
      {key:"sizeInverse", label:"Size (smaller scores higher)", w:10, type:"derived"},
    ]
  },
  sector: {
    label:"Strongest in Sector",
    desc:"Filtered to one sector at a time. Scored on catalyst strength (concentration), momentum (tailwind), realized return (performance attribution), and retail traffic (sector demand) — equally weighted.",
    weights:[
      {key:"catalystStrength", label:"Sector concentration", w:25, type:"qual"},
      {key:"momentum", label:"Sector tailwind", w:25, type:"qual"},
      {key:"perfAttribution", label:"Performance attribution", w:25, type:"derived"},
      {key:"retailTraffic", label:"Retail demand in sector", w:25, type:"qual"},
    ]
  },
  diversity: {
    label:"Diversity / Portfolio Fit",
    desc:"Scored relative to Sprout's current 5 exchanges, not the candidate in isolation — how different is this market's currency regime, region, and sector from what's already covered.",
    weights:[
      {key:"currencyDiff", label:"Currency-regime difference", w:30, type:"derived"},
      {key:"regionDiff", label:"New region", w:25, type:"derived"},
      {key:"sectorDiff", label:"New sector", w:25, type:"derived"},
      {key:"driverDiff", label:"Uncorrelated growth driver", w:20, type:"derived"},
    ]
  }
};
const LENS_ORDER = ["performing","growth","sector","diversity"];
const DEFAULT_WEIGHTS = {}; // lensKey -> {metricKey: value}
LENS_ORDER.forEach(lk => {
  DEFAULT_WEIGHTS[lk] = {};
  LENSES[lk].weights.forEach(m => DEFAULT_WEIGHTS[lk][m.key] = m.w);
});
let currentWeights = JSON.parse(JSON.stringify(DEFAULT_WEIGHTS));
let currentLens = "performing";
let currentSector = "Mining & Resources";
let openRowId = null;
let openEditorId = null;

// ---------- Normalization helpers ----------
function minMax(values){
  const v = values.filter(x => x!==null && x!==undefined && !isNaN(x));
  if(v.length===0) return null;
  return {min:Math.min(...v), max:Math.max(...v)};
}
function normalize(value, range){
  if(value===null || value===undefined || isNaN(value) || !range) return null;
  if(range.max===range.min) return 100;
  return ((value-range.min)/(range.max-range.min))*100;
}
function qualToScore(v){ return v*20; } // 1-5 -> 20-100

function getQuantRange(key){
  const values = DATA.map(d => {
    if(key==="returnYTD2026") return (d.returnNotUSDComparable) ? null : d.returnYTD2026;
    if(key==="return2025") return (d.returnNotUSDComparable) ? null : d.return2025;
    return null;
  });
  return minMax(values);
}

// ---------- Diversity tag matching ----------
function matchFraction(list, key, val){
  return list.filter(x => x[key]===val).length / list.length;
}
function diversityComponents(d){
  const currDiff = (1 - matchFraction(EXISTING,"currencyZone", d.currencyZone)) * 100;
  const regDiff  = (1 - matchFraction(EXISTING,"region", d.region)) * 100;
  const secDiff  = (1 - matchFraction(EXISTING,"sector", d.sector)) * 100;
  return {currencyDiff:currDiff, regionDiff:regDiff, sectorDiff:secDiff, driverDiff:secDiff};
}

// ---------- Score computation with exclude-and-reweight ----------
function computeLensScore(d, lensKey){
  const lens = LENSES[lensKey];
  const rows = [];
  lens.weights.forEach(m => {
    let raw=null, norm=null, included=true, note="";
    if(m.type==="quant"){
      const range = getQuantRange(m.key);
      const val = d.returnNotUSDComparable ? null : d[m.key];
      raw = d[m.key];
      if(val===null || val===undefined){
        included=false;
        note = d.returnNotUSDComparable ? "local-currency only, not USD-comparable" : "not disclosed in source";
      } else {
        norm = normalize(val, range);
      }
    } else if(m.type==="qual"){
      raw = d[m.key];
      norm = qualToScore(raw);
    } else if(m.type==="derived"){
      if(m.key==="sizeInverse"){ raw=d.liquidity; norm = 120 - qualToScore(d.liquidity); }
      if(m.key==="perfAttribution"){
        const r25 = d.returnNotUSDComparable? null : normalize(d.return2025, getQuantRange("return2025"));
        const rY  = d.returnNotUSDComparable? null : normalize(d.returnYTD2026, getQuantRange("returnYTD2026"));
        const vals = [r25,rY].filter(x=>x!==null);
        if(vals.length===0){ included=false; note="no comparable return data"; }
        else { norm = vals.reduce((a,b)=>a+b,0)/vals.length; raw="avg of available returns"; }
      }
      if(["currencyDiff","regionDiff","sectorDiff","driverDiff"].includes(m.key)){
        const dv = diversityComponents(d);
        norm = dv[m.key]; raw = norm.toFixed(0)+" / 100";
      }
    }
    rows.push({key:m.key, label:m.label, weight:currentWeights[lensKey][m.key], raw, norm, included, note});
  });
  const includedRows = rows.filter(r=>r.included);
  const weightSum = includedRows.reduce((a,r)=>a+r.weight,0);
  let score = null;
  if(weightSum>0){
    score = includedRows.reduce((a,r)=> a + (r.norm * (r.weight/weightSum)), 0);
  }
  return {score, rows, weightSum};
}

// ---------- Render: lens tabs ----------
function renderLensTabs(){
  const el = document.getElementById("lensTabs");
  el.innerHTML = "";
  LENS_ORDER.forEach(lk=>{
    const b = document.createElement("div");
    b.className = "lens-tab" + (lk===currentLens?" active":"");
    b.textContent = LENSES[lk].label;
    b.onclick = ()=>{ currentLens = lk; openRowId=null; renderAll(); };
    el.appendChild(b);
  });
}

function renderSectorPicker(){
  const el = document.getElementById("sectorPicker");
  if(currentLens!=="sector"){ el.style.display="none"; return; }
  el.style.display="flex";
  el.innerHTML="";
  SECTORS.forEach(s=>{
    const count = DATA.filter(d=>d.sector===s).length;
    const chip = document.createElement("div");
    chip.className = "sector-chip" + (s===currentSector?" active":"");
    chip.textContent = s + " (" + count + ")";
    if(count===0){ chip.setAttribute("disabled","true"); }
    else { chip.onclick = ()=>{ currentSector=s; openRowId=null; renderAll(); }; }
    el.appendChild(chip);
  });
}

// ---------- Render: weight sliders ----------
// Built once per lens switch; drag events only patch text content so the
// slider element under the pointer is never replaced mid-drag.
function buildWeights(){
  const el = document.getElementById("weightsPanel");
  el.innerHTML = "";
  const lens = LENSES[currentLens];
  lens.weights.forEach(m=>{
    const row = document.createElement("div");
    row.className = "weight-row";
    row.dataset.key = m.key;
    row.innerHTML = `
      <label>${m.label}</label>
      <input type="range" min="0" max="50" value="${currentWeights[currentLens][m.key]}" data-key="${m.key}">
      <span class="pct num"></span>
    `;
    row.querySelector("input").oninput = (e)=>{
      currentWeights[currentLens][m.key] = parseInt(e.target.value,10);
      updateWeightPercentages();
      renderRanking();
    };
    el.appendChild(row);
  });
  updateWeightPercentages();
}
function updateWeightPercentages(){
  const el = document.getElementById("weightsPanel");
  const lens = LENSES[currentLens];
  const sum = lens.weights.reduce((a,m)=>a+currentWeights[currentLens][m.key],0);
  el.querySelectorAll(".weight-row").forEach(row=>{
    const key = row.dataset.key;
    const norm = sum>0 ? Math.round((currentWeights[currentLens][key]/sum)*100) : 0;
    row.querySelector(".pct").textContent = norm + "%";
  });
  document.getElementById("weightSum").textContent = "Sliders show relative importance — normalized to 100% automatically.";
}
document.getElementById("resetWeights").onclick = ()=>{
  currentWeights[currentLens] = JSON.parse(JSON.stringify(DEFAULT_WEIGHTS[currentLens]));
  buildWeights(); renderRanking();
};

// ---------- Render: ranking ----------
function renderRanking(){
  document.getElementById("rankTitle").textContent = LENSES[currentLens].label;
  document.getElementById("rankSub").textContent = LENSES[currentLens].desc + (currentLens==="sector" ? "  Currently viewing: " + currentSector + "." : "");

  let pool = DATA;
  if(currentLens==="sector"){ pool = DATA.filter(d=>d.sector===currentSector); }

  const scored = pool.map(d=>({d, ...computeLensScore(d,currentLens)}));
  scored.sort((a,b)=> (b.score??-1) - (a.score??-1));

  const el = document.getElementById("rankList");
  el.innerHTML = "";
  if(scored.length===0){
    el.innerHTML = '<div class="sub" style="padding:12px 4px;">No candidates currently tagged to this sector.</div>';
    return;
  }
  scored.forEach((s,i)=>{
    const row = document.createElement("div");
    row.className = "rank-row" + (openRowId===s.d.id ? " open":"");
    const partial = s.rows.some(r=>!r.included);
    const pct = s.score===null ? 0 : Math.max(2,s.score);
    row.innerHTML = `
      <div class="rank-n num${i===0?' gold':''}">${i+1}</div>
      <div class="rank-name">${s.d.name}<span class="country">${s.d.country}</span>
        ${partial ? '<div class="flags"><span class="flag warn">PARTIAL DATA</span></div>' : ''}
      </div>
      <div class="bar-track"><div class="bar-fill ${partial?'partial':''} ${s.score===null?'na':''}" style="width:${pct}%"></div></div>
      <div class="rank-score ${s.score===null?'na':''} num">${s.score===null ? '—' : s.score.toFixed(1)}</div>
    `;
    row.onclick = ()=>{ openRowId = (openRowId===s.d.id) ? null : s.d.id; renderRanking(); };
    el.appendChild(row);

    if(openRowId===s.d.id){
      const bd = document.createElement("div");
      bd.className = "breakdown";
      let tableRows = s.rows.map(r=>{
        if(!r.included){
          return `<tr><td class="m">${r.label}</td><td colspan="3" class="excl">excluded — ${r.note}, remaining weights reweighted</td></tr>`;
        }
        const usedPct = s.weightSum>0 ? Math.round((r.weight/s.weightSum)*100) : 0;
        const rawDisp = typeof r.raw === "number" ? r.raw.toFixed(r.raw%1===0?0:1) : (r.raw ?? "—");
        return `<tr><td class="m">${r.label}</td><td class="num">${rawDisp}</td><td class="num">${r.norm.toFixed(0)}</td><td class="num">${usedPct}%</td></tr>`;
      }).join("");
      bd.innerHTML = `
        <table>
          <tr><th>Metric</th><th class="num">Raw</th><th class="num">Normalized</th><th class="num">Weight used</th></tr>
          ${tableRows}
        </table>
        <div class="note">${s.d.note}</div>
      `;
      row.after(bd);
    }
  });
}

// ---------- Render: data editor ----------
const QUAL_FIELDS = [
  {key:"liquidity", label:"Liquidity"},
  {key:"currencyRegime", label:"Currency regime"},
  {key:"catalystStrength", label:"Catalyst strength"},
  {key:"politicalRisk", label:"Political / reg. risk"},
  {key:"demographicTailwind", label:"Demographic tailwind"},
  {key:"momentum", label:"Listing / volume momentum"},
  {key:"retailTraffic", label:"Retail investment traffic"},
];
function renderEditor(){
  const el = document.getElementById("editorList");
  el.innerHTML = "";
  DATA.forEach(d=>{
    const row = document.createElement("div");
    row.className = "editor-row" + (openEditorId===d.id?" open":"");
    const head = document.createElement("div");
    head.className = "editor-head";
    head.innerHTML = `<h3>${d.name}<span class="country">${d.country}</span></h3><span class="chev">▸</span>`;
    head.onclick = ()=>{ openEditorId = (openEditorId===d.id)?null:d.id; renderEditor(); };
    row.appendChild(head);

    const body = document.createElement("div");
    body.className = "editor-body";

    const idGroup = document.createElement("div");
    idGroup.className = "field-group full";
    idGroup.innerHTML = `<h4>Identity</h4>`;
    [
      {key:"name", label:"Name", type:"text"},
      {key:"country", label:"Country", type:"text"},
      {key:"region", label:"Region", type:"select", options:REGIONS},
      {key:"sector", label:"Sector", type:"select", options:SECTORS},
      {key:"currencyZone", label:"Currency zone", type:"select", options:CURRENCY_ZONES.map(z=>z.key), optionLabels:CURRENCY_ZONES},
      {key:"tradingBegan", label:"Trading began", type:"text"},
    ].forEach(f=>{
      const wrap = document.createElement("div");
      wrap.className = "nfield";
      if(f.type==="select"){
        const opts = f.optionLabels
          ? f.optionLabels.map(o=>`<option value="${o.key}" ${d[f.key]===o.key?"selected":""}>${o.label}</option>`).join("")
          : f.options.map(o=>`<option value="${o}" ${d[f.key]===o?"selected":""}>${o}</option>`).join("");
        wrap.innerHTML = `<label>${f.label}</label><select>${opts}</select>`;
        wrap.querySelector("select").onchange = (e)=>{
          d[f.key] = e.target.value; renderEditor(); renderRanking(); markDirty();
        };
      } else {
        wrap.innerHTML = `<label>${f.label}</label><input type="text" value="${d[f.key]??''}">`;
        wrap.querySelector("input").onchange = (e)=>{
          if(f.key==="tradingBegan"){ const n=parseInt(e.target.value,10); d[f.key]=isNaN(n)?d[f.key]:n; }
          else { d[f.key] = e.target.value; }
          renderEditor(); renderRanking(); markDirty();
        };
      }
      idGroup.appendChild(wrap);
    });
    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove";
    removeBtn.textContent = "Remove this exchange";
    removeBtn.onclick = ()=>{
      if(confirm(`Remove ${d.name} from the calculator? This can't be undone here.`)){
        DATA = DATA.filter(x=>x.id!==d.id);
        if(openEditorId===d.id) openEditorId=null;
        renderEditor(); renderRanking(); markDirty();
      }
    };
    idGroup.appendChild(removeBtn);
    body.appendChild(idGroup);

    const quantGroup = document.createElement("div");
    quantGroup.className = "field-group";
    quantGroup.innerHTML = `<h4>Returns (quant, sourced)</h4>`;
    ["return2025","returnYTD2026"].forEach(key=>{
      const wrap = document.createElement("div");
      wrap.className = "nfield";
      const val = d[key];
      wrap.innerHTML = `<label>${key==="return2025"?"2025 return %":"2026 YTD %"}</label>
        <input type="text" inputmode="decimal" placeholder="not disclosed" value="${val===null||val===undefined?'':val}">`;
      const input = wrap.querySelector("input");
      input.onchange = (e)=>{
        const n = parseFloat(e.target.value);
        d[key] = isNaN(n) ? null : n;
        renderRanking();
        markDirty();
      };
      quantGroup.appendChild(wrap);
    });
    if(d.returnNotUSDComparable){
      const note = document.createElement("div");
      note.className = "data-note";
      note.textContent = "Flagged not USD-comparable — excluded from return metrics regardless of value entered above.";
      quantGroup.appendChild(note);
    }
    body.appendChild(quantGroup);

    const qualGroup = document.createElement("div");
    qualGroup.className = "field-group";
    qualGroup.innerHTML = `<h4>Qualitative (1–5, editable)</h4>`;
    QUAL_FIELDS.forEach(f=>{
      const wrap = document.createElement("div");
      wrap.className = "qfield";
      const nodata = f.key==="retailTraffic" ? '<span class="badge-nodata">NO DATA</span>' : '';
      wrap.innerHTML = `<label>${f.label}${nodata}</label>
        <input type="range" min="1" max="5" step="1" value="${d[f.key]}">
        <span class="v num">${d[f.key]}</span>`;
      wrap.querySelector("input").oninput = (e)=>{
        d[f.key] = parseInt(e.target.value,10);
        wrap.querySelector(".v").textContent = d[f.key];
        renderRanking();
        markDirty();
      };
      qualGroup.appendChild(wrap);
    });
    body.appendChild(qualGroup);

    row.appendChild(body);
    el.appendChild(row);
  });
}

function renderAll(){
  renderLensTabs();
  renderSectorPicker();
  buildWeights();
  renderRanking();
  const pill = document.getElementById("candidateCountPill");
  if(pill) pill.textContent = DATA.length + " candidate" + (DATA.length===1?"":"s") + " scored";
}

document.getElementById("addExchange").onclick = ()=>{
  const id = "cand-" + Date.now().toString(36);
  DATA.push({
    id, name:"New exchange", country:"—", region:"East Africa", currencyZone:"free-float",
    tradingBegan:new Date().getFullYear(), sector:"Financials", sectorConf:"low",
    return2025:null, returnYTD2026:null,
    liquidity:3, currencyRegime:3, catalystStrength:3, politicalRisk:3, demographicTailwind:3, momentum:3, retailTraffic:3,
    note:"Newly added — fill in identity, returns, and estimates."
  });
  openEditorId = id;
  renderEditor();
  renderAll();
  markDirty();
};

// ---------- Shared persistence (artifact capability) ----------
// DATA changes only reach data/state.json — and therefore every other
// viewer — when someone clicks "Save changes". Exploring (dragging sliders,
// typing test numbers, adding a throwaway exchange) never sticks on its
// own: close the tab without saving and the next person who opens this
// link still sees exactly what was last deliberately saved.
let artifactAPI = null;
let dirty = false;
let readOnly = false;
let lastSavedJSON = "";

const SAVE_STATUS_TEXT = {
  "local-only":"Editing in this browser tab only — nothing here can be shared.",
  "ready":"Nothing to save yet — matches what's shared.",
  "dirty":"Unsaved changes — only visible in this tab until you save.",
  "saving":"Saving…",
  "saved":"Saved ✓ — visible to everyone with this link.",
  "readonly":"Read-only here — your edits won't be saved for others.",
  "error":"Couldn't save — try again.",
};
function setSaveStatus(state){
  const el = document.getElementById("saveStatus");
  if(el){ el.textContent = SAVE_STATUS_TEXT[state] || ""; el.className = "save-status " + state; }
  const saveBtn = document.getElementById("saveChanges");
  const discardBtn = document.getElementById("discardChanges");
  if(saveBtn) saveBtn.disabled = !(dirty && artifactAPI && !readOnly);
  if(discardBtn) discardBtn.style.display = dirty ? "inline" : "none";
}

async function initSaveCapability(){
  if(!window.claude || !window.claude.use){ setSaveStatus("local-only"); return; }
  try{
    artifactAPI = await window.claude.use("artifact");
  } catch(e){ artifactAPI = null; }
  setSaveStatus(artifactAPI ? "ready" : "local-only");
}

function markDirty(){
  dirty = (JSON.stringify(DATA) !== lastSavedJSON);
  if(!artifactAPI){ setSaveStatus("local-only"); return; }
  setSaveStatus(readOnly ? "readonly" : (dirty ? "dirty" : "ready"));
}

async function doSave(){
  if(!artifactAPI || readOnly || !dirty) return;
  setSaveStatus("saving");
  try{
    const json = JSON.stringify(DATA);
    await artifactAPI.publish({ "data/state.json": json });
    lastSavedJSON = json;
    dirty = false;
    setSaveStatus("saved");
  } catch(err){
    const code = err && err.code;
    if(code==="not_writer" || code==="not_granted"){
      readOnly = true;
      setSaveStatus("readonly");
    } else {
      setSaveStatus("error");
    }
  }
}
document.getElementById("saveChanges").onclick = doSave;

async function discardChanges(){
  try{
    const res = await fetch("data/state.json", {cache:"no-store"});
    DATA = res.ok ? await res.json() : JSON.parse(JSON.stringify(DEFAULT_DATA));
  } catch(e){
    DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
  lastSavedJSON = JSON.stringify(DATA);
  dirty = false;
  openEditorId = null; openRowId = null;
  renderAll(); renderEditor();
  setSaveStatus(!artifactAPI ? "local-only" : (readOnly ? "readonly" : "ready"));
}
document.getElementById("discardChanges").onclick = discardChanges;

// ---------- Boot ----------
async function boot(){
  try{
    const res = await fetch("data/state.json", {cache:"no-store"});
    DATA = res.ok ? await res.json() : JSON.parse(JSON.stringify(DEFAULT_DATA));
  } catch(e){
    DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
  lastSavedJSON = JSON.stringify(DATA);
  renderAll();
  renderEditor();
  initSaveCapability();
}
boot();
