# kill_criteria.md

## Ranked Kill Criteria
| Rank | Criterion | Measurement Rule | Fail Threshold | Blocker | Owner |
|---|---|---|---|---|---|
| 1 | Official source coverage | Count direct official sources per critical flow | < 2 sources for passport, residence certificate, birth certificate, CNIE, signature legalization | Yes | Content |
| 2 | Click depth | Homepage to final city-service page | > 3 clicks | Yes | Product |
| 3 | Thin-page risk | Unique content blocks per indexable template | < 4 unique blocks | Yes | SEO |
| 4 | Data decay | Manual verification date on critical page | Missing or older than 90 days | Yes | Ops |
| 5 | Mobile readability | Core instructions visible above first sponsor/ad on 390px viewport | No | Yes | UX |
| 6 | Ad deception | Sponsored block visually mimics office result or CTA | Yes | Yes | Monetization |
| 7 | Solo-dev complexity | Required integrations outside Next.js, Supabase, Vercel, map linkouts, form email | > 5 integrations | Yes | Engineering |
| 8 | Unsupported subsystem creep | Auth, billing, accounts, appointment booking added in v1 | Any inclusion | Yes | Scope |
| 9 | City sprawl | More than 3 cities in v1 | > 3 | Yes | Scope |
| 10 | Broken trust layer | Missing disclaimer, sources, verification date, or error-report CTA on critical pages | Any missing | Yes | Trust |

## Current Status
| Criterion | Status | Note |
|---|---|---|
| 1 | Green | v1 limited to 5 services with documented official source paths |
| 2 | Green | Route design locks to 2–3 clicks |
| 3 | Green | Page modules vary by city, service, office, and source block |
| 4 | Green | Verification badge and stale-state rules included |
| 5 | Green | Mobile CTA and sponsor stack rules documented |
| 6 | Green | Sponsored labels mandated |
| 7 | Green | Stack frozen |
| 8 | Green | Auth and billing excluded |
| 9 | Green | Casablanca, Rabat, Tanger only |
| 10 | Green | Trust modules required on every critical page |
