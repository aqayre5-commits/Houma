# component_state_map.md

## Component-State Matrix
| Component | loading | empty | partial | success | offline | error |
|---|---|---|---|---|---|---|
| SearchBar | skeleton input | disabled submit with hint | active with incomplete suggestions | active with suggestions | cached placeholder only | inline message |
| CityCardGrid | skeleton cards | no cities published | 1–2 cities only | 3 cities visible | cached cards | retry block |
| ServiceCardGrid | skeleton cards | no services | subset visible | all services | cached cards | retry block |
| OfficeCard | skeleton | hidden if no office | generic office type + caution note | full address + CTA | address only | unavailable note |
| TrustBlock | skeleton | hidden on non-critical pages | missing one source or date | sources + date + disclaimer | cached last verified | missing-data alert |
| SponsorBlock | reserved height placeholder | hidden | hidden if invalid targeting | rendered with label | hidden | hidden |
| AdSlot | reserved height placeholder | hidden if disabled | hidden below threshold | rendered when safe | hidden | hidden |
| SourceList | skeleton rows | no sources note | 1 source only | full list | cached copy | unavailable note |
| FormPanel | disabled fields | N/A | save draft unsupported | success message | queue locally unsupported | field + server errors |
