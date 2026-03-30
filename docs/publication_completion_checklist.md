# publication_completion_checklist.md

## Purpose

This checklist must be completed by the operator before public launch.

It is not a substitute for legal advice.
It is a publication-completion and compliance-readiness checklist for the live site.

---

## 1. Legal identity

| Item | Required input | Owner | Evidence | Status |
|---|---|---|---|---|
| Legal publisher/operator name | Exact legal entity or individual publisher name | Operator | Registration or official ID/business proof | ☐ |
| Responsible publication name | Person legally responsible for publication | Operator | Internal confirmation | ☐ |
| Registered address | Full legal address | Operator | Official registration/address proof | ☐ |
| Public contact email | Contact email displayed on legal/privacy pages | Operator | Inbox confirmed working | ☐ |
| Privacy-rights contact method | Email or form for access/correction/privacy requests | Operator | Test submission received | ☐ |
| Support contact method | User support contact path | Operator | Test submission received | ☐ |

---

## 2. Hosting and infrastructure

| Item | Required input | Owner | Evidence | Status |
|---|---|---|---|---|
| Hosting provider name | Exact provider name | Operator | Provider account details | ☐ |
| Hosting address or jurisdiction | Country and address if available | Operator | Provider legal/hosting docs | ☐ |
| Hosting support URL/email | Public or internal support reference | Operator | Provider docs | ☐ |
| CDN / edge provider | List if separate from main host | Operator | Provider config/docs | ☐ |
| Data storage regions | Regions/countries where app data may be stored | Operator | Deployment settings | ☐ |
| Backup/storage providers | Any additional storage vendors | Operator | Infra inventory | ☐ |

---

## 3. Personal-data processing inventory

| Item | Required input | Owner | Evidence | Status |
|---|---|---|---|---|
| Contact forms | Confirm whether personal data is collected | Operator | Live form review | ☐ |
| Error-report forms | Confirm collected fields and recipients | Operator | Code + inbox verification | ☐ |
| Analytics events | Confirm vendor, identifiers, and scope | Operator | Analytics config | ☐ |
| Geolocation usage | Confirm what is detected, stored, and for how long | Operator | Code/config review | ☐ |
| Local storage/session storage | Confirm all user-related keys in live deployment | Operator | Storage inventory | ☐ |
| Server logs | Confirm whether IPs or user-agent data are retained | Operator | Hosting/provider docs | ☐ |
| Email/newsletter tools | Confirm whether any third-party email tool is used | Operator | Tool inventory | ☐ |

---

## 4. Privacy-policy completion

| Item | Required input | Owner | Evidence | Status |
|---|---|---|---|---|
| Controller identity | Replace placeholder with real publisher/operator | Operator | Legal page review | ☐ |
| Data categories | Confirm actual categories collected | Operator | Data-flow inventory | ☐ |
| Purposes | Confirm why each data category is used | Operator | Internal processing note | ☐ |
| Recipients/processors | Confirm third parties and subprocessors | Operator | Vendor list | ☐ |
| Retention approach | Confirm retention period or rule per category | Operator | Internal policy | ☐ |
| Rights process | Confirm access/correction/deletion contact path | Operator | Internal workflow | ☐ |
| Cross-border note | Confirm hosting/data-transfer posture | Operator | Provider/legal review | ☐ |

---

## 5. Cookies and analytics decision

| Item | Required input | Owner | Evidence | Status |
|---|---|---|---|---|
| Cookie/storage inventory approval | Confirm inventory matches production | Operator | Production verification | ☐ |
| Necessary vs non-essential classification | Final classification of each item | Operator + Legal | Inventory review | ☐ |
| Consent requirement decision | Decide whether current setup needs consent/control UX | Operator + Legal | Legal review | ☐ |
| Consent UX implementation | If required, banner/preferences flow live | Engineering | Production test | ☐ |
| Cookie policy alignment | Cookie page matches actual live behavior | Operator | Production review | ☐ |
| Analytics disclosure alignment | Privacy/cookie pages reflect actual analytics use | Operator | Production review | ☐ |

---

## 6. CNDP and regulatory formalities

| Item | Required input | Owner | Evidence | Status |
|---|---|---|---|---|
| CNDP applicability review | Confirm whether filing/notification is required | Operator + Legal | Legal memo/review | ☐ |
| CNDP filing/receipt reference | Insert verified reference if applicable | Operator | Official receipt/reference | ☐ |
| Cross-border transfer review | Confirm whether foreign hosting/storage requires additional step | Operator + Legal | Legal review | ☐ |
| Internal compliance record | Keep a dated record of the decision and formalities | Operator | Internal archive | ☐ |

---

## 7. Content and ambiguity control

| Item | Required input | Owner | Evidence | Status |
|---|---|---|---|---|
| Non-official disclaimer visible | Homepage, footer, service pages | Operator | Production review | ☐ |
| No “official portal” ambiguity | No wording that implies official government status | Operator | Content QA | ☐ |
| No “submit here” ambiguity | Site does not imply it files requests itself | Operator | CTA review | ☐ |
| Responsible authority wording | Uses cautious, accurate wording | Operator | Service-page QA | ☐ |
| Official source links | Present on service pages and working | Operator | Link QA | ☐ |
| Last checked / updated text | Confirm dates/labels work as intended | Operator | Production review | ☐ |

---

## 8. Monetization and disclosure

| Item | Required input | Owner | Evidence | Status |
|---|---|---|---|---|
| Sponsored labels | Confirm any sponsor blocks are clearly labeled | Operator | Production review | ☐ |
| Affiliate labels | Confirm affiliate links are labeled | Operator | Production review | ☐ |
| Ads separation | Paid placements are visually distinct from guidance | Operator | Production review | ☐ |
| No deceptive placement | Paid modules do not look like official actions | Operator | Production review | ☐ |

---

## 9. Language and publication QA

| Item | Required input | Owner | Evidence | Status |
|---|---|---|---|---|
| Legal pages in launch language(s) | Confirm French is complete; Arabic/English as applicable | Operator | Production review | ☐ |
| No placeholder text left visible | Remove all TODOs from public routes before launch | Operator | Full-site review | ☐ |
| Contact details consistent | Same contact identity across legal/privacy/footer pages | Operator | Page review | ☐ |
| Brand consistency | Public brand and legal pages use the same brand/operator framing | Operator | Production review | ☐ |

---

## 10. Final pre-launch sign-off

| Check | Required sign-off | Status |
|---|---|---|
| Legal pages complete with real facts | Operator | ☐ |
| Privacy and cookie text match production behavior | Operator | ☐ |
| CNDP/cross-border review completed | Operator + Legal | ☐ |
| Consent decision made and implemented if required | Operator + Legal | ☐ |
| No public placeholders remain | Operator | ☐ |
| Final production QA completed | Operator | ☐ |

---

## Operator sign-off

| Field | Entry |
|---|---|
| Operator name |  |
| Role |  |
| Date |  |
| Version / release tag |  |
| I confirm that the legal identity, hosting, privacy, cookie, and disclosure information published on the site has been reviewed and completed with verified facts. | ☐ Yes |
| I confirm that unresolved items have been escalated and are not silently left as placeholders. | ☐ Yes |

---

## Blocking launch conditions

Do **not** treat the site as publication-complete if any of these remain:

- legal identity placeholders still visible
- hosting/provider facts still unknown
- privacy-rights contact path not operational
- unresolved decision on whether current analytics/cookies require consent/control
- CNDP/cross-border review not completed where applicable
- sponsor/affiliate/ads not clearly labeled

---

## Codex implementation notes

- Create this file at `/docs/publication_completion_checklist.md`
- Do not fabricate legal or operator facts
- Preserve empty fields for operator completion
- Keep checkbox format intact
- Ensure terminology matches the live legal pages
- Link this file from any internal release/handoff documentation if such docs exist
