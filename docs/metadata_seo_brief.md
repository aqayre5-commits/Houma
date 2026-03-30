# metadata_seo_brief.md

## Route Indexability Rules
| Route Family | Indexability | Rule |
|---|---|---|
| homepage | index | always |
| city index/page | index | if published |
| service index/page | index | if published |
| city-service page | index | only if 4 unique content modules and at least 2 sources |
| office directory/page | index | if office published |
| guide page | index | if 600+ words equivalent and 2 transactional links |
| search | noindex | always |
| sponsor inquiry | noindex | always |
| report issue | noindex | always |

## Canonical Rules
| Case | Canonical |
|---|---|
| normal page | self |
| filtered search | omit or canonical to `/recherche` with no params |
| duplicate office aliases | canonical to primary office slug |
| guide variants | canonical to base guide slug |

## Sitemap Segmentation Plan
| Sitemap | Includes |
|---|---|
| `sitemap.xml` | root + index pages |
| `sitemap-cities.xml` | city and office pages |
| `sitemap-services.xml` | service and city-service pages |
| `sitemap-guides.xml` | guide pages |

## Robots Strategy
| Rule | Value |
|---|---|
| allow | all published content |
| disallow | `/recherche`, `/annonceurs`, `/signaler-une-erreur`, `/api/` |
| sitemap line | include root sitemap url |

## Metadata Template Logic
| Template | Title Logic | Description Logic | OG Logic |
|---|---|---|---|
| homepage | `Qriba.ma — Démarches locales à Casablanca, Rabat et Tanger` | city/service discovery promise | default OG |
| city | `{City} — démarches locales et bureaux utiles | Qriba` | city-specific office and service summary | city OG |
| service | `{Service} au Maroc — étapes et choix de ville | Qriba` | generic flow + city selector | service OG default |
| city-service | `{Service} à {City} — où aller et quoi préparer | Qriba` | local office + prep list summary | city-service OG |
| office | `{Office Name} — services couverts à {City} | Qriba` | address + supported services | office OG default |
| guide | `{Guide Title} | Qriba` | guide summary + transactional next step | guide OG default |

## Schema Opportunities
| Page Type | Schema |
|---|---|
| homepage | `WebSite` + `SearchAction` |
| city/service/city-service/guide | `WebPage` + `BreadcrumbList` |
| office page | `GovernmentOffice` or `LocalBusiness`-adjacent descriptive schema with caution if confidence insufficient |
| sponsor inquiry | none |
| report issue | none |

## Internal Linking Logic
| From | To |
|---|---|
| homepage | 3 city pages + 5 service pages |
| city page | all mapped city-service pages + office pages |
| service page | all 3 city-service pages |
| city-service page | office page + city page + guide + sources |
| guide page | service page + at least 1 city-service page |

## Thin-Page Prevention Rules
1. No city-service page without office or generic office-type block.
2. No city-service page without source block and verification date.
3. No office page without service coverage list.
4. No guide page without at least 2 transactional internal links.

## Crawl Budget Protection
1. Noindex search and forms.
2. Avoid indexable query-param pages.
3. Limit v1 to 3 cities and 5 services.
4. Publish only verified office pages.
