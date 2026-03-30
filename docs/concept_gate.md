# concept_gate.md

## Ranked Gate Outcome
| Rank | Gate | Threshold | Status | Evidence | Release Impact |
|---|---|---|---|---|---|
| 1 | Problem-source fit | Official or first-party source path exists for every v1 service | Pass | Verified Fact: passport deposit path exists via annexe administrative or caïdat [E1][E2][E3]; Casablanca publishes local admin procedure pages [E4]; Rabat and Tanger expose citizen-service portals [E5][E6][E7] | Go |
| 2 | User-value fit | Final answer reachable in fewer than 4 clicks from homepage | Pass | Recommendation: use city-first, service-first, and search-first entry points with deterministic routing | Go |
| 3 | Solo-dev operability | Fewer than 6 core entities and no auth/billing in v1 | Pass | Recommendation: content entities frozen to city, service, office, source, sponsor, guide | Go |
| 4 | SEO viability | At least 3 indexable template families with unique user intent | Pass | Verified Fact: official city portals differ by city and office context [E4][E5][E6][E7]; Inference: city+service pages can be made unique by office availability and source set | Go |
| 5 | Monetization clarity | Ad-safe and sponsor-safe placements explicitly mapped before build | Pass | Recommendation: ads on home, city, service, guide; private sponsor blocks on service and office pages | Go |
| 6 | Data freshness control | Source verification system and stale-state logic defined before build | Pass | Verified Fact: official flows can change and ministries emphasize transparency and user guidance [E8][E9][E10] | Go |
| 7 | Non-copy rule | No reused copy, structure tokens, taxonomy text, or visual assets from reference site | Pass | Recommendation: new brand, new route wording, new layout hierarchy, new component naming | Go |

## Gate Decision
| Decision | Result |
|---|---|
| Concept status | Pass |
| Kill criteria triggered | None |
| Implementation gate | Open |
| V1 scope freeze required before coding | Yes |
| Route map approval required before coding | Yes |
| Monetization surfaces mapped before coding | Yes |
| Risk log required before coding | Yes |

## Frozen Product Concept
| Field | Definition |
|---|---|
| Product name | Houma |
| Product type | Local administrative guidance website for Morocco |
| Geography | Casablanca, Rabat, Tanger only in v1 |
| User promise | Reach the correct local office and required documents in fewer than 4 clicks |
| Positioning | User-first local admin navigation layer; not an official government site |
| Primary jobs | Find the right office; confirm what to prepare; open directions; understand online vs in-person path |

## Kill Criteria Review
| Criterion | Fail Condition | Status | Note |
|---|---|---|---|
| Source coverage | Fewer than 2 trustworthy sources per critical service | Pass | Minimum source stack defined |
| Page uniqueness | City-service pages collapse into duplicate thin pages | Pass | Office, arrondissement, source, and CTA modules vary by city |
| Ops load | More than 15 high-maintenance pages in v1 | Pass | 14 page templates in v1 |
| Legal/compliance | Site implies official affiliation | Pass | Permanent disclaimer and source blocks required |
| Monetization risk | Ads push core instruction below fold on mobile | Pass | CLS-safe sponsor and AdSense rules defined |
| UX risk | Home-to-answer path exceeds 4 clicks | Pass | Search, city, and service routes capped at 3 clicks |


## Evidence Register
| Ref | Label | Source | Access / Date Note |
|---|---|---|---|
| E1 | Verified Fact | https://www.passeport.ma/FormDemande/PrintForm | Live official passport portal accessed 2026-03-27 |
| E2 | Verified Fact | https://www.passeport.ma/AquiSadresser/AuMaroc | Live official passport portal accessed 2026-03-27 |
| E3 | Verified Fact | https://www.passeport.ma/Home/PiecesAuMaroc | Live official passport portal accessed 2026-03-27 |
| E4 | Verified Fact | https://www.casablancacity.ma/fr/demarche/36/attestation-de-vie-individuelle | Live official Casablanca city procedure page accessed 2026-03-27 |
| E5 | Verified Fact | https://mairiederabat.ma/fr-FR/demarches-administratives | Live official Rabat city portal accessed 2026-03-27 |
| E6 | Verified Fact | https://fr.tanger.ma/ | Live official Tanger city portal accessed 2026-03-27 |
| E7 | Verified Fact | https://fr.tanger.ma/sites/?type=admin-fcl | Live official Tanger administrations directory accessed 2026-03-27 |
| E8 | Verified Fact | https://www.mmsp.gov.ma/fr/accueil-dans-les-services-publics | Live ministry page accessed 2026-03-27 |
| E9 | Verified Fact | https://www.mmsp.gov.ma/fr/nos-metiers/simplification-et-digitalisation-des-parcours-usagers | Live ministry page accessed 2026-03-27 |
| E10 | Verified Fact | https://www.mmsp.gov.ma/fr/nos-services/centre-d%E2%80%99appel-et-d%E2%80%99orientation-administrative | Live ministry page accessed 2026-03-27 |
| E11 | Verified Fact | https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots | Official docs last updated 2026-03-25 |
| E12 | Verified Fact | https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap | Official docs last updated 2026-03-25 |
| E13 | Verified Fact | https://nextjs.org/docs/app/getting-started/metadata-and-og-images | Official docs last updated 2026-03-25 |
| E14 | Verified Fact | https://tailwindcss.com/docs/guides/nextjs | Official docs current v4.2 accessed 2026-03-27 |
| E15 | Verified Fact | https://supabase.com/docs/guides/getting-started/quickstarts/nextjs | Official docs current guide accessed 2026-03-27 |
| E16 | Verified Fact | https://supabase.com/docs/guides/troubleshooting/how-to-migrate-from-supabase-auth-helpers-to-ssr-package-5NRunM | Official docs updated 2026-01-14 |
| E17 | Verified Fact | https://vercel.com/docs/analytics/quickstart | Official docs updated 2026-03-11 |
| E18 | Verified Fact | https://vercel.com/docs/speed-insights/quickstart | Official docs updated 2026-03-11 |
| E19 | Verified Fact | https://vercel.com/docs/analytics/troubleshooting | Official docs accessed 2026-03-27 |
