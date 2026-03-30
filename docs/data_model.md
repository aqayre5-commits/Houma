# data_model.md

## Database Tables
| Table | Purpose | Primary Fields |
|---|---|---|
| `cities` | city landing data | `id`, `slug`, `name`, `region`, `summary`, `verification_date`, `is_published` |
| `services` | national service data | `id`, `slug`, `name`, `category`, `summary`, `generic_steps`, `is_published` |
| `city_services` | final answer pages | `id`, `city_id`, `service_id`, `summary`, `required_docs`, `fees_note`, `delay_note`, `online_links`, `fallback_note`, `verification_date`, `is_published` |
| `offices` | local offices | `id`, `city_id`, `slug`, `name`, `district`, `office_type`, `address`, `maps_url`, `verification_date`, `is_published` |
| `office_services` | office/service relation | `office_id`, `service_id`, `priority_rank` |
| `sources` | source registry | `id`, `label`, `title`, `url`, `accessed_at`, `note` |
| `page_sources` | source mapping | `page_type`, `page_key`, `source_id` |
| `guides` | SEO support pages | `id`, `slug`, `title`, `intent`, `body_json`, `verification_date`, `is_published` |
| `sponsors` | paid placements | `id`, `slug`, `title`, `category`, `cta_url`, `city_scope`, `service_scope`, `placement_types`, `is_active` |
| `form_submissions` | lead and issue forms | `id`, `form_type`, `payload_json`, `status`, `created_at` |

## Typed State Models
| Model | States |
|---|---|
| page data | `loading | empty | partial | success | offline | error` |
| sponsor eligibility | `eligible | hidden_by_scope | hidden_by_density | disabled` |
| verification freshness | `fresh | warning | stale` |
