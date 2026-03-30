# responsive_rules.md

## Breakpoint System
| Breakpoint | Min Width | Rule |
|---|---|---|
| mobile | 0 | single-column priority flow |
| tablet | 768px | two-column content, limited sidebar |
| desktop | 1024px | 12-column layout |
| wide | 1280px | max-width content and wider office grids |

## Responsive Rules
| Rule Area | Requirement |
|---|---|
| Stack order | summary card → primary CTA → trust note → sponsor/ad on mobile |
| Ad placement changes by viewport | no hero ad above fold on mobile; sidebar ads desktop-only; sticky sponsor mobile-only |
| Card density | 1 card/row mobile; 2 tablet; 3–4 desktop depending on content type |
| Nav behavior by viewport | top nav collapses to menu button below 768px; persistent search CTA remains visible |
| Sticky elements policy | only city-service mobile sponsor may stick; no multiple sticky elements |
| Table overflow | convert tables to cards under 768px |
| Map/embed fallback | outbound map link + text address; no embedded map required in v1 |
| Long-text behavior | 70ch max readable width on guide pages |
| CTA priority by screen size | mobile shows only primary CTA filled; secondary CTA outlined or text link |
| Sponsor density | max 1 sponsor before first scroll on desktop; 0 before primary CTA on mobile |
