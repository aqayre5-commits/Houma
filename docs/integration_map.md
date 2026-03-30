# integration_map.md

## Explicit Dependencies
| Rank | Integration | Purpose | Required in v1 | Dependency Type | Failure Fallback |
|---|---|---|---|---|---|
| 1 | Next.js App Router | Routing, metadata, server rendering | Yes | Core | Static fallback pages |
| 2 | Tailwind CSS | Utility styling | Yes | Core | None |
| 3 | Supabase Postgres | Structured content and forms storage | Yes | Core | Local seed JSON during development |
| 4 | Supabase SSR package | Future-safe data access pattern | Yes | Core | Server-only anon reads |
| 5 | Vercel Analytics | Page/event analytics | Yes | Core | Graceful no-op analytics helper |
| 6 | Vercel Speed Insights | Performance monitoring | Yes | Core | Manual Lighthouse checks |
| 7 | Google Maps outbound links | User directions | Yes | External linkout | Text address only |
| 8 | AdSense | Programmatic monetization | Yes | Revenue | Placeholder reserve slots |
| 9 | Private sponsor CMS records | Sponsor placements | Yes | Revenue | Hide block |
| 10 | Email notification via Supabase function or provider | Form notifications | Recommendation | Optional | Dashboard review queue |

## Excluded Integrations
| Integration | Status | Reason |
|---|---|---|
| Auth provider | Excluded | No v1 user account need |
| Billing provider | Excluded | No v1 paywall |
| Booking API | Excluded | Outbound-only links allowed |
| Geocoding API | Excluded | Store maps URLs manually in v1 |
