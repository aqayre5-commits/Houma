# qa_report.md

## Route-by-Route QA Matrix
| Scenario | Setup | Expected Result | Failure Risk | Severity | Release Blocker | Remediation Note |
|---|---|---|---|---|---|---|
| Homepage loads with city and service entry | production build | hero, cities, services, trust strip render | blank hero | Critical | Yes | verify data seed and layout |
| Search query returns matching city-service route | search `passeport rabat` | result list contains Rabat passport route | no result mapping | High | Yes | normalize slug synonyms |
| City page shows only local offices | open `/villes/casablanca` | Casablanca offices only | cross-city leakage | High | Yes | filter by city slug |
| Service page forces city selection before local answer | open `/demarches/passeport-marocain` | city switcher visible above fold | users get generic dead-end | High | Yes | move city switcher higher |
| City-service page shows office card and docs | open `/villes/tanger/demarches/attestation-residence` | office, docs, trust block visible | partial data not handled | Critical | Yes | render partial-state fallback |
| Office page directions CTA works | open office detail | outbound map link opens target | broken map URL | High | Yes | validate URL pattern |
| Report issue form validates fields | submit empty | inline errors shown | silent failure | High | Yes | add server validation |
| Sponsor inquiry form success | submit valid payload | success confirmation and stored record | lost lead | High | Yes | log server response |
| Methodology page reflects live trust rules | open page | source hierarchy and freshness rules visible | trust mismatch | Medium | No | update copy |
| Sources page lists source labels | open page | all refs labeled and readable | opaque evidence | Medium | No | enforce registry shape |

## Component-State QA Matrix
| Component | State | Check |
|---|---|---|
| OfficeCard | partial | generic office type + caution note renders |
| TrustBlock | error | missing source set shows alert and issue-report CTA |
| SponsorBlock | hidden_by_density | no visual gap beyond reserved safe spacing |
| AdSlot | loading | reserved height prevents CLS |
| FormPanel | error | field and server messages render separately |

## Responsive QA Matrix
| Viewport | Scenario | Expected |
|---|---|---|
| 390x844 | city-service page | primary CTA visible before sponsor |
| 768x1024 | city page | 2-column cards, no overflow |
| 1440x900 | office directory | sidebar sponsor visible, filters usable |
| 390x844 | sources page | tables collapse into cards |
| 390x844 | guide page | long text wraps without horizontal scroll |

## SEO QA Checklist
| Check | Expected |
|---|---|
| canonical | self-referential on indexable pages |
| robots | noindex on search and forms |
| sitemap | includes only published indexable routes |
| metadata | title + description + OG per route |
| thin-page prevention | no city-service page published without 4 unique blocks |
| internal linking | each guide links to 2 transactional pages minimum |

## Analytics QA Checklist
| Check | Expected |
|---|---|
| page event | fires once per route |
| CTA events | primary and secondary labeled distinctly |
| map clicks | include office and city slugs |
| sponsor clicks | include placement and sponsor slug |
| form events | start, success, error all captured |

## Form Handling QA Checklist
| Check | Expected |
|---|---|
| required field errors | inline and summary |
| invalid email | blocked on sponsor form |
| spam trap | hidden honeypot or rate limit recommendation |
| success state | confirmation message and cleared form |
| server failure | retry guidance |

## Ad Rendering QA Checklist
| Check | Expected |
|---|---|
| label | all ads labeled |
| spacing | 24px minimum from core instruction block |
| density | mobile max 1 sponsor/ad visible before second viewport |
| CLS | fixed min-height placeholders |
| deception | no ad uses office-card styling |

## Fallback Behavior QA Checklist
| Check | Expected |
|---|---|
| missing office | generic office type + issue report |
| missing source date | “indicative” label shown |
| map blocked | address copy visible |
| analytics disabled | no user-facing error |
| sponsor missing | layout closes gap gracefully |

## Scope QA Status
| Area | Status |
|---|---|
| Auth status | Not in Scope |
| Billing status | Not in Scope |
| Analytics firing | In Scope |
| Form handling | In Scope |
| Responsive behavior | In Scope |
| SEO-critical surfaces | In Scope |
