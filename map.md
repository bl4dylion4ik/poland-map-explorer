MAP REFINEMENT PROMPT — POLAND-ONLY, ADMINISTRATIVE, ANALYTICS-FIRST
Critical Requirement (Must Be Applied)
The current map shows the entire world / Europe context.
This is not needed and must be removed.
👉 The map must display ONLY Poland, its official borders, and nothing outside of it.
No neighboring countries.
No global context.
No unnecessary geography.
1. Base Map Scope (Poland Only)
Replace:
World / Europe basemap
Visible Germany, Czechia, Belarus, etc.
With:
Poland-only map
Clipped strictly to Poland’s official border
Everything outside Poland:
hidden
masked
darkened or removed entirely
The map should feel like a national statistical map, not a navigation map.
2. Default View — Województwo Level
What is visible by default:
All województwa polygons
Exact official borders
No other administrative levels visible
Visual encoding:
Województwa filled by market supply intensity
Clear legend: low → high
Hover on Województwo (Mandatory Tooltip)
When the cursor hovers over a województwo, show a tooltip with exactly this structure:
Mazowieckie
Listings: 12,430
Avg price: 12,800 PLN/m²
Rules:
Tooltip appears instantly
Clean typography
No extra fields
No abbreviations
3. Click on Województwo — Drill-Down Behavior
When a województwo is clicked:
Map behavior:
Smooth zoom-in animation
Map recenters on the selected województwo
All other województwa fade out or are hidden
What must be visible after click:
ONLY the selected województwo border
ALL powiat borders inside this województwo
ONLY the 2 largest cities in this województwo
Examples:
Mazowieckie → Warszawa + Radom
Małopolskie → Kraków + Tarnów
Dolnośląskie → Wrocław + Legnica
4. Powiat Interaction Rules
Powiat visibility:
Powiat borders visible
NO powiat labels rendered by default
Hover on Powiat:
Show tooltip with:
Powiat warszawski zachodni
Listings: 1,240
Avg price: 11,900 PLN/m²
Powiat names must appear only in tooltips, never as static labels.
5. Major Cities Overlay (Strict Rules)
City markers:
Only 2 biggest cities per województwo
Rendered as:
distinct circles or markers
clearly clickable
City names visible at this zoom level
Click on City:
Zoom into city
Switch analytics context to city-level
Update global filters automatically
6. What Must NOT Happen (Explicit)
❌ Do NOT show the whole Earth
❌ Do NOT show neighboring countries
❌ Do NOT show all cities
❌ Do NOT show all powiat names
❌ Do NOT overlap labels
❌ Do NOT use abstract shapes or blobs
7. Map Size Requirement (Analytics Page)
On /analytics page:
Increase map height to ~1.5× current size
Map must visually dominate the page
Charts and tables are secondary
This is a map-first analytics view.
8. Technology Constraints (Mandatory)
Mapbox GL JS
basemap
borders
clipping to Poland
zoom & navigation
deck.gl
polygon fills (supply / price)
city markers
hover & click interactions
All borders must come from official Polish GeoJSON datasets.
9. UX & Visual Style
Clean, uncluttered
Administrative / statistical feel
Smooth transitions
Always-readable legend
Breadcrumb visible at all times:
Poland → Mazowieckie → (City or Powiat)
10. Success Criteria
After applying this prompt:
The map shows only Poland
Województwa are readable and comparable
Drill-down reveals powiats without clutter
Major cities act as clear entry points
Tooltips deliver key analytics instantly
The map feels authoritative and professional probably you dont need to use mapbox for this. Create a plan how you will be implement it. Only Poland borders, without earth map at all
