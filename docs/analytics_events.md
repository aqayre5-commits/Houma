# analytics_events.md

## Analytics Event Definitions
| Event Name | Trigger | Page(s) | Properties | Why It Matters | KPI Mapping |
|---|---|---|---|---|---|
| `page_view_template_type` | page render | all | `template_type`, `route`, `city_slug?`, `service_slug?`, `office_slug?` | compares template performance | sessions by template |
| `click_primary_cta` | main CTA click | all major pages | `cta_name`, `route`, `city_slug?`, `service_slug?` | core journey measurement | task-start CTR |
| `click_secondary_cta` | secondary CTA click | all major pages | `cta_name`, `route` | UX tradeoff analysis | support CTA usage |
| `ad_impression` | ad slot visible | homepage, city, guide, service | `placement`, `route`, `viewport` | inventory measurement | RPM readiness |
| `ad_click_outbound` | ad click | ad-supported pages | `placement`, `route` | revenue behavior | monetization CTR |
| `sponsor_block_click` | sponsor CTA click | homepage, city-service, office, guide | `placement`, `sponsor_slug`, `route` | sponsor performance | sponsor CTR |
| `affiliate_cta_click` | commercial CTA click | homepage, city-service | `category`, `route`, `city_slug?` | commercial intent measurement | commercial CTR |
| `form_submit_start` | first submit attempt | issue, sponsor forms | `form_type`, `route` | measure friction | form start rate |
| `form_submit_success` | valid submission | issue, sponsor forms | `form_type`, `route` | lead and correction throughput | lead completion rate |
| `form_submit_error` | validation/server failure | issue, sponsor forms | `form_type`, `route`, `error_type` | identify friction | form error rate |
| `share_click` | share button | city-service, guide | `route`, `city_slug?`, `service_slug?` | discover advocacy | share rate |
| `search_filter_apply` | filter/search submit | search, office directory | `query`, `city_slug?`, `service_slug?`, `filter_count` | understand discovery behavior | search success rate |
| `outbound_map_click` | directions click | city-service, office | `office_slug`, `city_slug`, `route` | measure action completion | map CTR |
| `outbound_booking_click` | external official booking click | service or city-service when official booking exists | `provider`, `route` | reserved for official appointment links only | online handoff rate |

## KPI Definitions
| KPI | Formula |
|---|---|
| Task-start CTR | `click_primary_cta / page_view_template_type(homepage)` |
| Map CTR | `outbound_map_click / page_view_template_type(city-service + office)` |
| Search success rate | `result click sessions / search_filter_apply` |
| Sponsor CTR | `sponsor_block_click / sponsor impressions` |
| Form completion rate | `form_submit_success / form_submit_start` |
