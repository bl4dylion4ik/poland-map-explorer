🔐 Sign In / Sign Up — Product-Oriented Design
1. Core Principles (Important)

Your product is:

data-heavy

analytics-first

B2C + prosumers / investors

So Auth must be:

fast (no friction)

trustworthy

clearly connected to value

Avoid:
❌ long forms
❌ unnecessary profile steps
❌ “social network” style onboarding

2. Entry Points (Where users land)

You should have 3 natural entry points:

Pricing → “Start Free” / “Buy”

Dashboard preview → blurred / locked

Deep link to analytics → gated

All 3 redirect to the same Auth UI.

3. Structure: One Page, Two States
Single Auth Page with Toggle

Instead of separate pages:

[ Sign In ]  |  [ Create Account ]


This keeps UX simple and fast.

4. Sign Up (Minimal, Conversion-Optimized)
Fields (ONLY these):

Email

Password

Password confirmation

Optional (later):

Company name (Investor tier)

VAT (only at checkout, NOT here)

Copy example:

“Create your account to access full market analytics across Poland.”

CTA:

Create account →

5. Sign In (Fast Return)
Fields:

Email

Password

Extras:

“Forgot password”

“Stay signed in” (optional)

6. Authentication Method (Tech Choice)
Recommended:

Email + password first

Why:

Simple

Works everywhere

Required for billing anyway

Optional later:

Google OAuth (nice-to-have, not MVP)

Magic link (can be added later)

7. Post-Login Routing (Very Important)
First-time user:
→ Dashboard (default Poland view)
→ Tooltip: “You’re on the free plan”
→ CTA: “Upgrade to unlock full analytics”

Paid user:
→ Last viewed dashboard
→ No onboarding friction

8. Free vs Paid Access Logic
Free (logged-in):

Limited time range (e.g. 7D / 30D)

Limited drill-down (no city-level)

Blurred advanced charts

No alerts

Paid:

Full map interaction

All time ranges

City & powiat analytics

Alerts (later)

This makes login immediately valuable, even before payment.

9. Security & UX Expectations (Baseline)

Password strength indicator (simple)

Proper error messages:

“Wrong email or password”

“Account already exists”

Email verification (can be delayed until payment)

10. Tech Stack for Auth (Fits Your Backend)
Backend

FastAPI

JWT access + refresh tokens

Password hashing (bcrypt / argon2)

Frontend

React

Auth context / Zustand store

Protected routes

Billing integration

Stripe customer created after signup

Subscription attached later

11. Suggested Routes
/login
/signup
/forgot-password
/dashboard (protected)
/pricing

12. What NOT to Do (Common Mistakes)

❌ Force signup before showing any value
❌ Long onboarding surveys
❌ Ask for payment before user sees analytics
❌ Overcomplicate roles early


🧠 MVP Access Strategy (No Backend Yet)
Goal

Let anyone explore /analytics and understand the value

Keep full power for you during development

Avoid building auth + billing too early

Make future auth integration trivial

1. Route Strategy (Very Clean)
Public (No Backend)
/analytics        → public, limited, blurred

Private (Dev Only)
/full_analytics   → full features, no limits


Later:

/analytics        → gated by auth
/full_analytics   → removed or admin-only

2. /analytics — Public Teaser Mode

This is your marketing + product teaser.

Map behavior (restricted):

Poland-only map

Województwo level only

❌ zoom in / zoom out disabled

❌ click drill-down disabled

❌ city selection disabled

Cursor hover shows basic tooltip only

Example tooltip:

Mazowieckie
Listings: 12,430
Avg price: 12,800 PLN/m²

Charts behavior:

Only top KPIs

Only 1 fixed time range (e.g. 30D)

Advanced charts:

blurred

locked

disabled interactions

Overlay example:

“Sign up to unlock full analytics”

3. Visual Gating (Important)

Do NOT hide features completely.

Instead:

Show them

Blur them

Disable interactions

This creates desire, not frustration.

4. /full_analytics — Developer Mode

This is your internal playground.

Behavior:

Full map interaction

Free zoom & pan

Województwo → powiat → city drill-down

All charts enabled

All time ranges enabled

No blur

No restrictions

Access control (no backend):

Use environment flag or simple front-end guard.

Examples:

const isDev = import.meta.env.DEV


or

const ENABLE_FULL_ANALYTICS = true


Later you replace this with real auth.

5. UI Copy (Very Important)
On /analytics

Add subtle messaging:

“Preview mode — full market analytics available after sign-up.”

On locked interaction:

“This feature is available in full analytics.”

6. Disable Zoom / Interaction (How)

On /analytics:

Lock Mapbox camera

Disable scroll zoom

Disable double click zoom

Disable drag pan

On /full_analytics:

All enabled

7. Why This Is a Great Idea

✔ No backend needed
✔ No auth complexity
✔ You can iterate fast
✔ Users see value
✔ Product feels real
✔ Easy to upgrade later

You’re basically building a demo mode like professional SaaS products do.

8. Future Upgrade Path (Very Smooth)

Later you do:

if (user.plan === 'free') → analytics (limited)
if (user.plan === 'pro')  → full_analytics


And delete the dev-only route.

9. What NOT to Do

❌ Hardcode auth logic everywhere
❌ Build Stripe before analytics work
❌ Block /analytics completely
❌ Hide charts instead of blurring

