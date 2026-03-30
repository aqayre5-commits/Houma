# user_flow_map.md

## Core Flow Map
| Rank | Flow | Entry | Steps | Final Route | Acceptance Criteria |
|---|---|---|---|---|---|
| 1 | City-first | Homepage | home → city → city-service | `/villes/[city]/demarches/[service]` | 3 clicks max |
| 2 | Service-first | Homepage | home → service → city-service | `/villes/[city]/demarches/[service]` | 3 clicks max |
| 3 | Search-first | Homepage | home → search → result | any target route | 2 clicks max |
| 4 | Office-first | Office directory | directory → office → city-service | `/villes/[city]/demarches/[service]` | 3 clicks max |
| 5 | Trust verification | Any critical page | source block → source page or methodology | `/sources` or `/methodologie` | 1 click |
| 6 | Error recovery | Any critical page | page → report issue | `/signaler-une-erreur` | 1 click |

## Edge Flow Map
| Flow | Trigger | Result |
|---|---|---|
| City-service page with no mapped office | partial data | show generic office type, source block, fallback note, issue-report CTA |
| Office not confirmed | stale data | show stale warning, hide confident language, keep map CTA optional |
| Search returns none | empty state | city shortcuts + service shortcuts + issue report |
| External map unavailable | blocked outbound | reveal address copy block + manual directions note |
