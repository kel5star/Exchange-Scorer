# SPROUT Exchange Score Calculator — Framework v1

Internal decision rubric for evaluating candidate exchanges. Draft for team review — not customer-facing.

## Purpose

Sprout covers five exchanges today (NGX, JSE, NSE, GSE, EGX) and has a Next 10 shortlist ranked informally by returns and growth catalysts. As that list grows, "which exchange next" needs a repeatable method, not a one-person call. Each candidate gets scored under a few different lenses rather than one overall number, since "best exchange to add" depends on what Sprout is optimizing for — weak on raw performance can still be strong on portfolio diversity.

Scope is intentionally larger than the Next 10: the real candidate pool is every African exchange Sprout doesn't already cover.

## Candidate Universe

Beyond the five covered exchanges, the Next 10 shortlist: Casablanca, BRVM (regional, 8 countries), Bourse de Tunis, Dar es Salaam, Zimbabwe SE, Uganda SE, Rwanda SE, Lusaka SE, Ethiopian SE, and BODIVA (Angola). 

Four were explicitly deprioritized — Mauritius, Botswana, Namibia, Malawi — worth revisiting once the framework can score Malawi's 248% 2025 return against its currency volatility. 

Roughly thirteen more African exchanges exist but aren't yet profiled: BVMAC, Algeria, Mozambique, Cabo Verde, Eswatini, Sudan, Seychelles, Libya, Lesotho. Sudan and Libya may screen out fast, but belong in the universe as a documented decision, not a silent gap.

## How Scoring Works

Each candidate gets a 0–100 score per lens. Quantitative metrics (returns, market cap, turnover) are min-max normalized within the candidate set. Qualitative metrics use a 1–5 rubric with written anchors, ×20 to reach the same scale. 

**One rule matters most:** exchanges without USD-comparable returns (Zimbabwe — redenomination; Ethiopia — too new) get **excluded from return metrics and reweighted, never scored as zero**, so a data gap doesn't quietly read as a real weakness.

### Metrics

| Metric | Type | Low (1) Anchor | High (5) Anchor |
|--------|------|---|---|
| Return (2025 FY, 2026 YTD) | Quant | — normalized directly | — normalized directly |
| Market cap / turnover trend | Quant | — normalized directly | — normalized directly |
| Market maturity, dominant sector | Quant/Categorical | — feeds maturity & sector lens | — feeds maturity & sector lens |
| Currency regime | Qual | Hyperinflation/redenomination history | Multi-decade peg to a reserve currency |
| Reform & catalyst strength | Qual | No identifiable pipeline | Multiple funded catalysts in motion |
| Political & regulatory risk | Qual | Active instability, capital controls | Stable governance, easy repatriation |
| Demographic tailwind | Qual | Small, slow-growing, well-banked | Large, young, fast-growing, underbanked |
| Retail investment traffic | Qual | No visible retail base, or too illiquid | Growing retail turnover, clear popular sector/stock |

## The Five Lenses

### Best Performing
**Weights:** 2026 YTD 35% · 2025 return 25% · Liquidity 20% · Currency stability 20%

**Rewards:** Proven, comparable returns without just rewarding volatility (e.g. Tunisia)

### Best Growth Opportunity
**Weights:** Catalysts 25% · Demographic tailwind 20% · Retail traffic 15% · Momentum 15% · Political risk 15% · Size (inverse) 10%

**Rewards:** Forward catalysts and real organic demand, not just a macro story (e.g. Ethiopia, Angola)

### Strongest in Sector
**Weights:** Sector concentration + tailwind + performance attribution + retail demand in-sector

**Rewards:** A family of scores (Mining, Oil & Gas, Financials, Telecom, Agriculture)

### Consumer Engagement
**Weights:** Retail investment traffic 40% · Demographic tailwind (market size) 35% · Listing / volume momentum 25%

**Rewards:** How much retail demand this market can realistically generate — market size and actual trading growth, not just how the exchange itself is performing. Retail traffic carries the most weight by design, even though it's the metric with no real data yet — this lens is built to sharpen automatically as that gets filled in.

### Diversity / Portfolio Fit
**Weights:** Currency-regime difference 30% · New region 25% · New sector 25% · Uncorrelated driver 20%

**Rewards:** Relative to the current 5-exchange portfolio (e.g. BRVM's CFA peg)

## Next 10 — Founding Year and Dominant Sector

| Exchange | Trading Began | Dominant Sector(s) | Confidence |
|----------|---------------|--------------------|------------|
| Casablanca | 1929 | Financials lead; telecom, materials | High |
| BRVM | 1998 | Banking; telecom (Sonatel), agriculture | High |
| Bourse de Tunis | 1969 | Financial services, industrials | High |
| Dar es Salaam | 1998 | Financials by count; gold/mining is the story | High |
| Zimbabwe SE | 1946 | Consumer/industrials + financials, mining exposure | Low |
| Uganda SE | 1998 | Telecom, financials now; oil/energy is the catalyst | High |
| Rwanda SE | 2011 | Banking, plus consumer/beverage, telecom | High |
| Lusaka SE | 1994 | Financials/banking, energy-mining, consumer | High |
| Ethiopian SE | 2025 | Telecom, financials — too early for a pattern | High |
| BODIVA | 2014 | Thin data; financials confirmed, oil/mining via pipeline only | Low |

## Gaps and Next Steps

**Open:** market cap/turnover beyond Morocco, a confirmed Zimbabwe sector mix, real BODIVA data, a display rule for "excluded, not zero," the thirteen extended-universe exchanges (no data yet), and retail investment traffic (no sourced data for any of the ten — needs brokerage/app/local-media sources, not the historical facts the rest draws on). 

**Next:** Once weights get pushback and gaps close, the next step is a spreadsheet version: one sheet per exchange, formulas above built in, ranked output per lens.

## Sources

- [Casablanca SE](https://www.casablancabourse.com/)
- [BRVM](https://www.brvm.org/)
- [Bourse de Tunis](https://www.bvmt.com.tn/)
- [Zimbabwe SE](https://www.zimbabweexchange.co.zw/)
- [Rwanda SE](https://www.rse.rw/)
- [Uganda SE](https://www.use.or.ug/)
- [Dar es Salaam SE](https://www.dse.or.tz/)
- [Lusaka SE](https://www.luse.co.zm/)
- [BODIVA](https://www.bodiva.ao/)
- [List of African stock exchanges](https://en.wikipedia.org/wiki/List_of_stock_exchanges#Africa)
