# market_assumptions.md

## Market and Product Assumptions
| Rank | Claim | Label | Evidence | Decision Impact |
|---|---|---|---|---|
| 1 | Moroccan passport applications still require an in-person deposit at the annexe administrative or caïdat of residence after digital form preparation. | Verified Fact | [E1][E2][E3] | City+service pages must prioritize local office discovery, not just document checklists. |
| 2 | Casablanca publishes local administrative procedure pages that explicitly route residents to commune, arrondissement, or annexe administrative touchpoints. | Verified Fact | [E4] | Casablanca can support office-aware landing pages from day one. |
| 3 | Rabat exposes citizen-service and arrondissement navigation at city-portal level. | Verified Fact | [E5] | Rabat city hub can be built with arrondissement-first subnavigation. |
| 4 | Tanger exposes both administration-guide and administrations-directory surfaces. | Verified Fact | [E6][E7] | Tanger city hub can support office directory and outbound resource cards. |
| 5 | Moroccan administration reform prioritizes simplification, digitalization, transparency, and user guidance. | Verified Fact | [E8][E9][E10] | Trust, source visibility, and fallback guidance are product-critical rather than optional. |
| 6 | A narrow city-and-service scope can outperform a national broad scope for day-one usefulness and solo-dev maintainability. | Recommendation | Product constraint based on kill criteria; no current 30-day third-party dataset required | Freeze v1 to 3 cities and 5 services. |
| 7 | Search-led intent will be strong for city+service combinations such as “passeport Casablanca” and “attestation résidence Rabat.” | Inference | No current 30-day keyword dataset included in this pack | Build SEO templates but do not present demand magnitude as fact. |
| 8 | Local professional sponsors such as translators, accountants, file-preparation services, and courier services can be monetization partners without harming utility if clearly labeled. | Inference | No current 30-day sponsor conversion benchmark included | Include private sponsor inventory but gate by ad-safe rules. |
| 9 | Users need a non-official but trusted navigation layer because official information is fragmented across ministry, city, and office surfaces. | Inference | Supported directionally by multi-portal source map [E1][E4][E5][E6][E7][E10] | Build source blocks, confidence notes, and “last verified” UI. |
| 10 | Paywall would reduce day-one trust and slow adoption for this utility product. | Recommendation | No current billing evidence included | Exclude billing from v1. |

## Evidence Handling Rule
| Rule | Implementation |
|---|---|
| Verified Fact | Use only current live official pages or official documentation available on 2026-03-27, or official materials dated within the last 30 days where present. |
| Inference | Use when official current evidence does not directly quantify user demand, revenue, or competition. |
| Recommendation | Use for scope, UX, SEO, monetization, and architecture choices. |


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
