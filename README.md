# Exchange Scorer

A multi-lens scoring system for evaluating African stock exchange candidates. Built to help Sprout Investing systematically evaluate which exchanges to add to its portfolio based on performance, growth potential, sector strength, and portfolio fit.

**🚀 [Open the Calculator Online](https://cdn.jsdelivr.net/gh/kel5star/Exchange-Scorer@main/calculator.html)** *(no installation required)*

## Overview

The Exchange Scorer is an interactive web application that scores exchange candidates across five distinct lenses:

- **Best Performing** — Proven, comparable returns with liquidity and currency stability checks
- **Best Growth Opportunity** — Forward catalysts and organic demand, not just macro stories  
- **Strongest in Sector** — Performance within specific sectors (Mining, Oil & Gas, Financials, Telecom, Agriculture)
- **Consumer Engagement** — Retail demand generation potential based on market size and trading growth
- **Diversity / Portfolio Fit** — Relative to Sprout's current 5 exchanges (NGX, JSE, NSE, GSE, EGX)

Each lens combines quantitative metrics (returns, market trends) with qualitative assessments (liquidity, political risk, demographic tailwind) using a 1–5 rubric, normalized to a 0–100 scale.

## Quick Start

### Online (Recommended)
Click the link above: **[Open the Calculator Online](https://cdn.jsdelivr.net/gh/kel5star/Exchange-Scorer@main/calculator.html)**

No installation needed — updates automatically whenever changes are pushed.

### Locally
1. **Clone or download** this repository
2. **Open** `calculator.html` in your browser
3. **Explore:** Click between lenses at the top to see candidates ranked under different criteria
3. **Adjust weights:** Drag sliders to reweight metrics within a lens in real time
4. **Inspect scores:** Click any exchange to see a detailed breakdown of how its score was calculated
5. **Edit data:** Expand the "Edit exchange data" section to update returns, liquidity, catalyst strength, etc.

## Data Structure

### Current Candidates (10)

The tool includes the Next 10 shortlist:
- Casablanca SE (Morocco)
- BRVM (8 W. African states)
- Bourse de Tunis (Tunisia)
- Dar es Salaam SE (Tanzania)
- Zimbabwe SE (Zimbabwe)
- Uganda SE (Uganda)
- Rwanda SE (Rwanda)
- Lusaka SE (Zambia)
- Ethiopian SE (Ethiopia)
- BODIVA (Angola)

### Baseline (5 Existing Exchanges)

Used for diversity scoring but not ranked themselves:
- NGX (Nigeria)
- JSE (South Africa)
- NSE (Kenya)
- GSE (Ghana)
- EGX (Egypt)

## Adding Future Exchanges

### Quick Add (In-Browser)

1. Open the calculator
2. Scroll to "Edit exchange data" section
3. Click **+ Add exchange**
4. Fill in the exchange details:
   - **Identity:** Name, country, region, sector, currency zone, founding year
   - **Returns:** 2025 FY and 2026 YTD % (leave blank if not disclosed)
   - **Qualitative (1–5):** Liquidity, currency regime, catalyst strength, political risk, demographic tailwind, momentum, retail traffic

Changes only save locally until you click "Save changes" — the browser remembers your edits if you close and reopen without saving.

### Programmatic Add (Code)

Edit `calculator.js` and add to the `DEFAULT_DATA` array:

```javascript
{
  id:"xx",                              // unique 2-letter code
  name:"Exchange Name",
  country:"Country",
  region:"Region",                       // North/West/East/Southern/Central Africa
  currencyZone:"free-float",             // peg, managed-float, free-float, high-risk
  tradingBegan:2020,
  sector:"Financials",                   // or Mining & Resources, Oil & Gas, Telecom, Agriculture & Consumer
  sectorConf:"high",                     // high or low confidence
  return2025:25.5,                       // or null if not disclosed
  returnYTD2026:12.3,                    // or null if not disclosed
  returnNotUSDComparable:false,          // true only if Zimbabwe/Ethiopia situation
  liquidity:3,                           // 1–5
  currencyRegime:4,
  catalystStrength:4,
  politicalRisk:4,
  demographicTailwind:3,
  momentum:3,
  retailTraffic:3,
  note:"Short context about this exchange"
}
```

**Important:** The `id` field must be unique and brief (2–3 chars). It's used internally to track state.

## Updating Metrics as Markets Change

### Return Data

1. **Browser edit:** Click an exchange in "Edit exchange data" and update the 2025 or 2026 YTD % fields
2. **Code edit:** Update `return2025` or `returnYTD2026` in `calculator.js`

**Key behavior:** If a return is `null` (not disclosed), that exchange is excluded from return-based metrics and remaining weights are reweighted. It never scores as zero.

### Qualitative Scores (1–5)

Update any of these fields as conditions change:
- **Liquidity** — Trading volume, bid-ask spreads
- **Currency regime** — Stability of local currency (affects repatriation risk)
- **Catalyst strength** — Identifiable near-term growth drivers
- **Political risk** — Governance stability, capital controls
- **Demographic tailwind** — Population growth, banking penetration
- **Momentum** — Recent listing or volume trends
- **Retail traffic** — Growing retail investor base

Drag the sliders in the editor or edit values directly in `calculator.js`.

### Sectors

If a new sector emerges that matters more than the current five, update `SECTORS` in `calculator.js`:

```javascript
const SECTORS = [
  "Financials",
  "Mining & Resources",
  "Oil & Gas",
  "Telecom",
  "Agriculture & Consumer",
  // "New Sector Name" — add here
];
```

## Modifying Lenses and Weights

### Default Weights

Each lens has a default weight distribution defined in `LENSES` in `calculator.js`. For example, "Best Performing":

```javascript
performing: {
  label:"Best Performing",
  desc:"Proven, comparable returns — with a liquidity and currency-stability check.",
  weights:[
    {key:"returnYTD2026", label:"2026 YTD return", w:35, type:"quant"},
    {key:"return2025", label:"2025 return", w:25, type:"quant"},
    {key:"liquidity", label:"Liquidity", w:20, type:"qual"},
    {key:"currencyRegime", label:"Currency stability", w:20, type:"qual"},
  ]
}
```

The `w` values are the default weights. Users can adjust them with sliders, but these defaults apply when they click "Reset to framework defaults."

To change default weights, edit the `w` values here and in `DEFAULT_WEIGHTS`.

### Adding a New Lens

To add a sixth lens or beyond:

1. Add a new entry to the `LENSES` object with a unique key (e.g., `"innovation"`)
2. Define its `label`, `desc`, and `weights` array
3. Add the key to `LENS_ORDER` (currently `["performing","growth","sector","engagement","diversity"]`) to make it appear in the UI
4. If using new metrics, implement scoring logic in `computeLensScore()` function

## Technical Structure

### Files

- **calculator.html** — DOM structure and metadata (minimal, ~280 lines)
- **calculator.css** — Styling, theme system, responsive layout (~250 lines)
- **calculator.js** — All logic: state, scoring, rendering, persistence (~860 lines)
- **FRAMEWORK.md** — Framework documentation and reference

### Architecture Highlights

**Data flow:**
1. `DEFAULT_DATA` or saved state (`data/state.json`) → `DATA` (live copy)
2. User edits `DATA` in the browser
3. Clicking "Save changes" publishes `DATA` to `data/state.json`
4. Next visitor loads from `data/state.json`

**Scoring pipeline:**
1. `computeLensScore(exchange, lensKey)` calculates a 0–100 score
2. For each metric:
   - Quantitative: min-max normalize across the candidate pool
   - Qualitative: 1–5 rubric × 20 = 0–100
   - Derived: computed from other metrics (e.g., size inverse, performance attribution, diversity components)
3. Excluded metrics (missing data) are reweighted: `score = Σ(normalized × weight_adjusted)`
4. Exchanges are ranked by score descending

**Persistence:**
- If `window.claude.use("artifact")` is available (in an Artifact context), edits are saved to `data/state.json`
- Otherwise, edits stay local to the browser tab
- Discarding changes re-fetches `data/state.json` or falls back to `DEFAULT_DATA`

### Key Functions

| Function | Purpose |
|----------|---------|
| `computeLensScore(d, lensKey)` | Core scoring: input exchange and lens, output {score, rows breakdown, weightSum} |
| `renderRanking()` | Display ranked exchanges with bars and optional breakdowns |
| `renderEditor()` | Display the data editor UI |
| `renderAll()` | Re-render all UI after a state change |
| `minMax(values)` | Find min/max of a numeric array (for normalization range) |
| `normalize(value, range)` | Min-max normalize a single value to 0–100 |
| `diversityComponents(d)` | Calculate diversity scores (currency/region/sector difference vs. existing 5) |

## Common Updates & Maintenance

### Q: How do I add deprioritized exchanges (Mauritius, Botswana, Namibia, Malawi)?

Add them to `DEFAULT_DATA` with their data. They'll appear in the UI and be scoreable immediately. Mark the `sectorConf` as "low" if data is spotty.

### Q: How do I handle a new exchange with no return history (like Ethiopian SE)?

Set both `return2025` and `returnYTD2026` to `null`. The scorer will exclude it from return-based lenses and reweight the remaining metrics. It can still score high on "Best Growth Opportunity" if catalysts and demographics are strong.

### Q: How do I flag an exchange as not USD-comparable (like Zimbabwe SE)?

Set `returnNotUSDComparable: true`. This signals to exclude it from *all* return metrics, even if values are present. Useful for local-currency-only or hyperinflation situations.

### Q: Can I change the five baseline exchanges (for diversity scoring)?

Yes. Edit `EXISTING` in `calculator.js`:

```javascript
const EXISTING = [
  {name:"NGX (Nigeria)", region:"West Africa", currencyZone:"free-float", sector:"Financials"},
  // ... add/remove as needed
];
```

Diversity scores automatically recalculate relative to the new baseline.

### Q: How do I track which exchanges are in the "extended universe" but not yet profiled?

The framework mentions 13 extended-universe exchanges (BVMAC, Algeria, Mozambique, etc.) with no data yet. Consider adding stubs to `DEFAULT_DATA` with all `null` values and a note like `"Not yet profiled"`. They'll appear in the UI and can be filled in as data becomes available.

## Future Enhancements

### Short Term
- **Market cap / turnover trend** — Currently mentioned in the framework but not implemented; add quantitative tracking
- **Retail investment traffic** — No sourced data yet; integrate broker APIs, app downloads, or local media monitoring
- **Zimbabwe sector mix** — Clarify the true dominant sector (framework notes low confidence)
- **BODIVA data** — Richer data on the Angola exchange as it matures

### Medium Term
- **Spreadsheet export** — Export current rankings and data as CSV for external analysis
- **Scenario modeling** — Save/load different weight scenarios ("Conservative," "Growth-focused," etc.)
- **Historical snapshots** — Track how scores change month-over-month to spot trends
- **Source links** — Attach URLs/citations to each data point for auditability

### Long Term
- **Portfolio simulation** — Model returns if Sprout adds an exchange, accounting for correlation
- **Watchlist alerts** — Notify when an exchange's score crosses a threshold or climbs N positions
- **Mobile app** — Native iOS/Android version with offline access

## Troubleshooting

**Q: Changes aren't saving.**
- Check that you're clicking "Save changes" (not just editing). The status should show "Saved ✓".
- If in an Artifact context, you should have write permissions. If read-only, you can explore locally but edits won't persist across sessions.

**Q: An exchange is missing from the "Strongest in Sector" lens.**
- Check that its `sector` field matches one of the values in `SECTORS` exactly. Typos hide exchanges from sector filtering.

**Q: Scores seem wrong for an exchange.**
- Click the exchange to expand its breakdown. You'll see exactly which metrics were included, their normalized scores, and the weights applied. Compare to the lens's default weights.

**Q: How do I reset to shipped defaults?**
- Click "Reset to framework defaults" in the Lens card to restore default weights for the current lens.
- To reset all data, clear your browser's site data for this page, or if in an Artifact, discard changes.

## References

- **Framework v1 doc:** See `FRAMEWORK.md` for the full scoring methodology
- **Source data:** Exchange websites, Next 10 shortlist, Sprout internal research
- **Built with:** Vanilla JavaScript, CSS Grid, no dependencies

## Hosting & Deployment

### Live Link (jsDelivr CDN)

The calculator is served via jsDelivr CDN and updates automatically on each push:  
**https://cdn.jsdelivr.net/gh/kel5star/Exchange-Scorer@main/calculator.html**

This is the primary live link — no additional setup needed.

### GitHub Pages (Optional Alternative)

If you prefer to use GitHub Pages instead:

1. Go to **Settings → Pages** on your GitHub repo
2. Under "Source," select **Deploy from a branch**
3. Choose **main** branch and **root** folder
4. Save
5. Your site will be available at `https://[your-username].github.io/Exchange-Scorer/calculator.html` (may take 2-5 minutes to deploy)

## License & Attribution

Internal Sprout Investing tool. Framework v1 designed for team review and decision support, not customer-facing.
