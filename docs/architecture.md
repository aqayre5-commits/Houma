# architecture.md

## Architecture Summary
| Layer | Decision | Reason |
|---|---|---|
| Framework | Next.js App Router | supports metadata files, server rendering, static generation [E11][E12][E13] |
| Styling | Tailwind CSS v4-style setup | low-overhead utility styling with Next.js guide [E14] |
| Database | Supabase Postgres | simple structured content and forms [E15][E16] |
| Hosting | Vercel | first-party fit for Next.js, analytics, speed insights [E17][E18] |
| Analytics | Vercel Analytics + custom event helper | low-ops event capture [E17][E19] |
| Performance | static generation for content pages, no embedded maps, reserved ad slots | reduce LCP and CLS risk |
| Search strategy | server-rendered route pages + local search page | simple pSEO without client-heavy search dependency |

## Rendering Strategy
| Route Family | Rendering Mode | Revalidation |
|---|---|---|
| homepage | static | 1 hour |
| city pages | static | 6 hours |
| service pages | static | 6 hours |
| city-service pages | static | 6 hours |
| office pages | static | 6 hours |
| guides | static | 24 hours |
| forms | dynamic POST handlers | n/a |
| robots/sitemap | generated metadata files | on build or request |

## State Definitions
| State | Definition |
|---|---|
| loading | skeletons and reserved slot space |
| empty | no matched data but route valid |
| partial | route valid but office or source set incomplete |
| success | fully populated and verified |
| offline | cached/static fallback when external dependency unavailable |
| error | invalid route or unhandled server failure |
