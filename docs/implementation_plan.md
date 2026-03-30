# implementation_plan.md

## Build Order
| Rank | Workstream | Deliverable | Dependency | Acceptance Criteria |
|---|---|---|---|---|
| 1 | Scope lock | route map + entities frozen | concept gate | no new subsystems |
| 2 | Foundation | Next.js + Tailwind + Vercel baseline | scope lock | home route renders |
| 3 | Data seed | local JSON and Supabase schema | foundation | city/service/office pages can render |
| 4 | Core templates | homepage, city, service, city-service, office | data seed | all critical routes reachable |
| 5 | Trust layer | methodology, sources, verification UI | core templates | every critical page shows trust block |
| 6 | Monetization | sponsor block, ad slot reserve, commercial CTA | core templates | no CLS and no deceptive labels |
| 7 | Forms | issue and sponsor forms | trust layer | valid submission stores record |
| 8 | SEO pack | metadata, robots, sitemap, schema | route completion | crawl surfaces render |
| 9 | Analytics | event helper + firing map | core templates | required events emit |
| 10 | QA pass | route, component, responsive, SEO, analytics | all above | blockers closed |

## Release Gate
| Gate | Required Before Next Step |
|---|---|
| Gate A | concept pass + kill criteria logged |
| Gate B | v1 scope frozen + route map approved internally |
| Gate C | monetization surfaces mapped |
| Gate D | trust layer implemented |
| Gate E | analytics + QA complete |
