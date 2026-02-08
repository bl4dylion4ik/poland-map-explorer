1.2 Average Time on Market (Line or Area Chart)

What it shows

How long listings stay active before removal

Strong proxy for demand

UI

Line chart over time

Optional percentile bands (p25 / p75


)1.3 Listing Absorption Speed (Bar + Line)

What it shows

How fast new supply is absorbed

Early signal of market stress or overheating

UI

Bars: new listings

Line: removed listings

Secondary axis: absorption ratio


2.1 Price Momentum vs Volatility Matrix (Quadrant Chart)

What it shows

X-axis: 30-day price change (%)

Y-axis: price volatility (std dev)

Each dot = city or voivodeship

Quadrants

Stable growth

Speculative

Declining

Uncertain


2.2 Price Change Distribution (Histogram)

What it shows

Distribution of price changes per listing

Detects sharp drops / abnormal behavior

UI

Histogram

Optional highlight for extreme values


2.3 Median vs Average Price Divergence (Line Chart)

What it shows

When average grows faster than median → luxury-driven market

When median grows faster → broad-based demand

UI

Two lines

Shaded divergence area




3.1 Supply Concentration Index (Map Layer)

What it shows

How concentrated supply is in each region

Identifies overbuilt zones

Metric

Herfindahl-like index or normalized density


3.2 Hot / Cold Districts (Map + Table)

What it shows

Districts with:

fast price growth

shrinking supply

UI

Map layer (green/red)

Ranked table on the side


3.3 City Gravity Plot (Scatter on Map)

What it shows

Cities pulling demand from surrounding regions

Circle size = demand proxy

Color = price growth


4.1 Supply by Area Bucket Over Time (Stacked Area)

What it shows

Shift in apartment sizes being offered

Detects downsizing / upsizing trends



4.2 Supply by Rooms vs Price (Heatmap)

What it shows

Typical price ranges per room count

Helps investors spot mispriced segments

UI

Heatmap (rooms × price_bucket)


4.3 Primary vs Secondary Market Share (Area Chart)

What it shows

Developer-driven vs resale-driven growth

Early-cycle vs late-cycle signals

Already supported by:

market_type




6.1 Region Comparison (Multi-Line)

What it shows

Price evolution of selected regions

Up to 5 regions compared

UI

Multi-line chart

Legend-driven selection



6.2 Top / Bottom Movers (Tables)

What it shows

Fastest growing districts

Biggest decliners

Most volatile regions


7. Investor-Specific (Optional / Pro Tier)
7.1 Estimated Yield Heatmap

Metric

median_rent / median_price

UI

Map layer

Ranking table


7.2 Entry Opportunity Index

Composite score:

Low price growth

High liquidity

Low volatility


1. Dashboards That MUST Support 1 / 7 / 30 / 60 / 90 days

These dashboards describe market behavior, so short windows are extremely valuable.

1.1 Market Supply & Demand Dashboard ✅

Includes

New listings

Removed listings

Active listings

New / Removed ratio

Absorption speed

Time filter

✅ 1 day → “What happened today?”

✅ 7 days → weekly momentum

✅ 30 / 60 / 90 → trend smoothing

Why
Supply dynamics change fast.
Investors and power users care about very recent shifts.

ClickHouse

daily_market_sale
(date, new_listings, removed_listings, listings_count)

1.2 Price Trend Dashboard ✅

Includes

Median price

Average price

Price bands (p25 / p75)

Short-term price momentum

Time filter

✅ 7 / 30 / 60 / 90 days

⚠️ 1 day → optional (low signal, noisy)

Why
Prices don’t change daily, but momentum does.

1.3 Market Volatility Dashboard ✅

Includes

Daily price volatility

Price change distribution

Volatility index

Time filter

✅ 7 / 30 / 60 / 90 days

❌ 1 day (statistically weak)

Why
Volatility needs multiple observations to be meaningful.

1.4 Risk & Anomaly Dashboard (Pro / Investor) ✅

Includes

% of high-risk listings

Risk signals over time

Scam / anomaly concentration

Time filter

✅ 1 / 7 days → early warning

✅ 30 / 60 / 90 → systemic risk

Why
Risk often appears before price moves.

2. Dashboards That Should SUPPORT 7 / 30 / 60 / 90 (but NOT 1)

These describe market structure, not daily movement.

2.1 Price Distribution Dashboard ⚠️

Includes

Histogram of price buckets

Distribution by rooms / area

Time filter

❌ 1 day

✅ 7 / 30 / 60 / 90

Why
One day is meaningless for distributions — sample size too small.

2.2 Supply Structure Dashboard ⚠️

Includes

Supply by area bucket

Supply by rooms

Primary vs secondary share

Time filter

❌ 1 day

✅ 7 / 30 / 60 / 90

Why
Structure changes slowly.
Short windows distort perception.

3. Dashboards That Should ONLY Support 30 / 60 / 90 days

These describe macro-level investment signals.

3.1 Investment / Yield Dashboard ❌(short-term)

Includes

Estimated yield

Entry opportunity index

Long-term trends

Time filter

❌ 1 / 7 days

✅ 30 / 60 / 90 days

Why
Yield and investment quality are long-term concepts.

3.2 Regional Comparison Dashboard ❌(short-term)

Includes

City vs city comparison

Region rankings

Time filter

❌ 1 / 7 days

✅ 30 / 60 / 90 days

Why
Short-term comparisons amplify noise and mislead users.

4. Map Dashboards — Special Rules

Maps behave differently from charts.

4.1 Market Heatmap (Price / Supply) 🗺️

Time filter

✅ 7 / 30 / 60 / 90

⚠️ 1 day → optional, expert-only toggle

Why
Daily maps flicker and confuse users.

4.2 Activity Map (New / Removed Listings) 🗺️

Time filter

✅ 1 / 7 days

❌ 30+ days (overplotting)

Why
Activity is a short-term phenomenon.

5. Recommended UI Pattern (Very Important)
Global Time Selector
[ 1D ] [ 7D ] [ 30D ] [ 60D ] [ 90D ]

BUT…

Each dashboard declares:

which options are enabled

disabled options are visually greyed out

tooltip explains why

Example:

“1-day view disabled for this chart due to insufficient data”

This educates users and increases trust.

