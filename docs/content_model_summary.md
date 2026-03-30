# content_model_summary.md

## Content Entity Summary
| Entity | Purpose | Required Fields | Indexable Dependency |
|---|---|---|---|
| city | City landing pages | slug, name, region, summary, featuredServices, sourceRefs, verificationDate | Yes |
| service | National service templates | slug, name, category, summary, genericSteps, sourceRefs | Yes |
| city_service | Final answer pages | citySlug, serviceSlug, officeIds, requiredDocs, feesNote, onlineLinks, fallbackNote, sourceRefs, verificationDate | Yes |
| office | Office directory and detail pages | slug, citySlug, name, district, type, address, mapsUrl, serviceIds, sourceRefs, verificationDate | Yes |
| guide | Supporting SEO content | slug, title, intent, bodySections, sourceRefs | Yes |
| source | Trust and evidence layer | title, url, label, accessedAt, note | No |
| sponsor | Monetization placement | slug, title, category, cityScope, serviceScope, disclosureLabel, ctaLabel, ctaUrl | No |
| form_submission | Issue and sponsor intake | formType, payload, status, createdAt | No |

## Minimum Unique Content Rule for Indexable Pages
| Page Type | Unique Blocks Required |
|---|---|
| city page | hero, office summary, featured services, local guidance, guides |
| service page | generic flow, city switcher, source summary, related guides |
| city-service page | local office card, prep list, online/offline split, source block, fallback note |
| office page | address + map, covered services, what this office is for, related city links |
