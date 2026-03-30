# route_map.md

## Explicit Route Definitions
| Rank | Route | Template Type | Indexable | Purpose | Primary Data | Monetization Surface |
|---|---|---|---|---|---|---|
| 1 | `/` | homepage | Yes | City/service discovery entry | city summary, featured services, sponsor inventory | hero sponsor, AdSense mid, commercial CTA |
| 2 | `/recherche` | search page | No | Query and filter results | cities, services, offices | sponsor card only |
| 3 | `/villes` | city index | Yes | Overview of available cities | cities | AdSense inline |
| 4 | `/villes/[city]` | city hub | Yes | Local office and service entry for city | city, offices, services, guides | AdSense inline, sponsor block |
| 5 | `/demarches` | service index | Yes | Service-family browse | services | AdSense inline |
| 6 | `/demarches/[service]` | national service page | Yes | Explain generic flow before city selection | service, sources, city list | sponsor block |
| 7 | `/villes/[city]/demarches/[service]` | city-service detail | Yes | Final answer page | city, service, office matches, source block | in-content sponsor, sticky mobile sponsor |
| 8 | `/bureaux` | office directory | Yes | Browse offices by city and type | offices | sidebar sponsor |
| 9 | `/bureaux/[office]` | office detail | Yes | Office-specific routes, directions, covered services | office, city, services, sources | sponsor card, map CTA |
| 10 | `/guides/[slug]` | guide article | Yes | Supportive SEO content | guide, sources, internal links | AdSense inline, newsletter sponsor |
| 11 | `/annonceurs` | sponsor inquiry | No | Sponsor lead capture | lead form | none |
| 12 | `/signaler-une-erreur` | issue report | No | Error intake | issue form | none |
| 13 | `/methodologie` | methodology | Yes | Trust + editorial process | static | none |
| 14 | `/sources` | sources index | Yes | Source transparency | static + source registry | none |
| 15 | `/a-propos` | about | Yes | Product definition, limitations | static | none |
| 16 | `/robots.txt` | metadata file | Yes | Crawl rules | env + route rules | none |
| 17 | `/sitemap.xml` | metadata file | Yes | XML sitemap | route registry | none |

## Click Depth Rules
| Entry Path | Max Clicks | Path |
|---|---|---|
| Homepage → city → city-service | 3 | `/` → `/villes/[city]` → `/villes/[city]/demarches/[service]` |
| Homepage → service → city-service | 3 | `/` → `/demarches/[service]` → `/villes/[city]/demarches/[service]` |
| Homepage → search → result | 2 | `/` → `/recherche` → target page |
| Office directory → office → service | 3 | `/bureaux` → `/bureaux/[office]` → `/villes/[city]/demarches/[service]` |
