# MarketNav UI — Current State & Analytics Expansion Plan

## 1. Current UI Overview

### General Impression
The current UI presents a **professional, investor-grade analytics dashboard** with a strong emphasis on clarity, hierarchy, and dark-theme data density. It already feels closer to a **market intelligence terminal** than a consumer real-estate app — which aligns perfectly with the product vision.

### Layout Structure
- **Top KPI Bar**
  - Active Listings
  - Average Price (PLN/m²)
  - Median Price (PLN/m²)
  - Sold Rate
  - YoY deltas clearly visible (good for macro context)

- **Map-Centric Core**
  - Choropleth map of Poland by **voivodeship**
  - Color intensity reflects **market supply**
  - Clean, official borders → strong “statistical authority” feel
  - Map is the visual anchor of the page (correct decision)

- **Right-Side Rankings**
  - City rankings by Avg Price (PLN/m²)
  - Tab-switching (Price / Supply / Growth)
  - Compact and scannable

- **Bottom Analytics Row**
  - Time-series price trends (Avg vs Median)
  - Price distribution histogram
  - Supply by property type (stacked bars)

### What Works Well Already
- Clear information hierarchy
- No clutter, no “dashboard noise”
- Map + charts feel logically connected
- Metrics chosen are meaningful (not vanity KPIs)
- Visual language fits B2B / investor audience

---

## 2. Current Analytics Coverage (What You Have)

### Market-Level Analytics
- Supply volume
- Central tendency (avg / median)
- Time trends
- Geographic differentiation
- Property-type segmentation

### Implicit Strength
- The UI already supports **exploratory analysis**, not just reporting
- Foundations are solid for advanced analytics without redesign

---

## 3. Gaps: Where Analytics Depth Is Still Missing

Right now, the UI answers:
> “What is the market like?”

It does **not yet fully answer**:
- *Why is it moving?*
- *Where is risk increasing?*
- *Where is opportunity emerging?*
- *What changed recently vs structurally?*

---

## 4. High-Impact Analytics Improvements (UI-Level)

### 4.1 Temporal Intelligence (Very High Priority)

**Add comparison modes across all charts:**
- Last 30 / 90 / 180 / 365 days
- YoY vs MoM vs WoW toggles
- “Before vs After” split view

**New visuals**
- Price momentum index
- Supply acceleration / deceleration
- New vs removed listings over time

> Insight unlocked: market turning points, not just trends.

---

### 4.2 Supply–Demand Balance Layer

**New composite indicators**
- Supply growth vs price growth quadrant
- Absorption rate (sold / active)
- Time-on-market proxy (derived)

**UI ideas**
- Scatter plot: Supply change vs Price change (city-level)
- Heatmap of absorption rates by region

> Insight unlocked: overheated vs undervalued markets.

---

### 4.3 Volatility & Risk Analytics

**Add volatility metrics**
- Price volatility index (rolling window)
- Distribution widening / tightening
- Outlier concentration

**Risk views**
- High-risk seller density (aggregated, explainable)
- Listings churn rate
- Suspicious pattern concentration (language-safe)

> Insight unlocked: downside risk, not just upside.

---

### 4.4 Distribution-First Thinking (Investor Grade)

You already have histograms — expand them:

- Percentile bands on time-series (P10 / P50 / P90)
- Split distributions by:
  - Primary vs secondary
  - Seller type
  - Property age
- Boxplots per city or district

> Insight unlocked: dispersion, not averages.

---

### 4.5 Map as an Analytical Instrument (Not Just Visual)

**Upgrade map interactions**
- Lasso / box select → filters all charts
- Animated time slider (market evolution)
- Multi-layer toggles:
  - Supply
  - Price growth
  - Volatility
  - Risk score density

**Drill-down UX**
- Click voivodeship → city metrics panel
- Click city → district microstructure

> Insight unlocked: spatial causality and micro-markets.

---

## 5. Advanced Analytics for Pro / Investor Tiers

### Yield & Return Proxies
- Rent vs price implied yield
- Yield trend over time
- Yield dispersion by district

### Change Detection
- “What changed since last week?”
- Largest movers (price / supply / risk)
- New hotspots emerging

### Market Regime Labels
- Expansion
- Cooling
- Overheated
- Stagnant

(derived, explainable, not ML-black-box)

---

## 6. UX Improvements (Without Visual Noise)

- Global **Analytics Mode Toggle**:
  - Overview
  - Trends
  - Risk
  - Opportunity

- Saved views for investors
- Shareable links (filtered state)
- Tooltips that explain *why*, not just *what*

---

## 7. Strategic UI Conclusion

The current UI is:
- Technically strong
- Visually mature
- Correctly positioned

The next step is **not more charts**, but:
> **More derived meaning per pixel**

By layering:
- Temporal intelligence
- Volatility
- Supply–demand balance
- Risk concentration
- Spatial drill-down

…you turn MarketNav from a **market dashboard** into a **decision engine**.

This is exactly where premium subscriptions justify themselves.

