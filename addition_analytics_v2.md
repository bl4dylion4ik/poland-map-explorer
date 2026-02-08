1. OVERVIEW TAB — Make it “Market Health”, not just summary
Add 1️⃣ Market Health Composite Index

Type: Line chart + badge
What: A normalized index (0–100) combining:

supply growth

absorption speed

price momentum

volatility

Why:
One-glance answer to “Is this market healthy or stressed?”

ClickHouse: new aggregate

market_health_index_sale
(date, region_id, health_score)

Add 2️⃣ Supply Pressure Gauge

Type: Gauge / bullet chart
Metric: new_listings / removed_listings

Why:
Visually communicates tightening vs oversupply much better than raw numbers.

2. SUPPLY & DEMAND TAB — Add efficiency & friction

You already have:

absorption speed

time on market

Add these 👇

Add 3️⃣ Listing Lifecycle Funnel

Type: Funnel chart
Stages:

new

active

price drop

removed

Why:
Shows where listings get stuck.

Derived from: SCD2 events.

Add 4️⃣ Price Drop Frequency Over Time

Type: Bar + line
Metric: % of listings with ≥1 price drop

Why:
Early signal of weakening demand.

Add 5️⃣ Days-on-Market Distribution

Type: Histogram
Why:
Mean hides skew — this reveals whether market is polarized.

3. PRICES & VOLATILITY TAB — Add risk interpretation

You already have:

avg vs median

momentum vs volatility

Add these 👇

Add 6️⃣ Price Change Distribution (Δ%)

Type: Histogram
What: distribution of listing-level price changes

Why:
Detects speculative behavior, sharp corrections.

Add 7️⃣ Volatility Regime Chart

Type: Regime bands over time
States:

low / medium / high volatility

Why:
Investors think in regimes, not raw std-dev.

Add 8️⃣ Price Stickiness Index

Type: Line chart
Metric: % of listings with unchanged price after X days

Why:
Measures seller confidence / rigidity.

4. MARKET STRUCTURE TAB — Add concentration & segmentation

You already have:

area buckets

rooms vs price heatmap

Add these 👇

Add 9️⃣ Supply Concentration Index

Type: Line or bar
Metric: Herfindahl-style concentration by:

area

rooms

price bucket

Why:
Shows whether supply is diversified or crowded into one segment.

Add 🔟 Segment Growth Matrix

Type: Heatmap
Axes:

area bucket × rooms

color = YoY or 30D growth

Why:
Finds growing niches, not just averages.

Add 11️⃣ Luxury vs Mass Market Split

Type: Stacked area
Definition: top 20% price vs rest

Why:
Identifies whether growth is elite-driven or broad-based.

5. REGIONAL TAB — Add competitive & opportunity views

You already have:

city rankings

Add these 👇

Add 12️⃣ Regional Opportunity Matrix

Type: Scatter / quadrant
Axes:

X = price growth

Y = absorption speed

Quadrants:

undervalued growth

overheated

stagnant

declining

Why:
This is pure investor gold.

Add 13️⃣ Regional Volatility Map (mini-map or table)

Metric: rolling volatility score

Why:
Helps risk-averse vs aggressive investors.

Add 14️⃣ Rank Change Tracker

Type: Slopegraph
What: city rank movement over time

Why:
Shows momentum, not static position.

6. CROSS-TAB ADVANCED (Power User / Investor)

These can be collapsible or Pro-only.

Add 15️⃣ Correlation Explorer

Type: Correlation matrix
Between:

supply growth

price growth

volatility

absorption

Why:
Lets users understand market mechanics.

Add 16️⃣ Scenario Sensitivity Panel

Type: Small multiples
What: metrics recalculated under:

supply +10%

demand −10%

Why:
Forward-looking thinking without forecasting.
