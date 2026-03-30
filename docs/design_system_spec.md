# design_system_spec.md

## Brand System
| Token Group | Definition |
|---|---|
| Brand name | Qriba |
| Tone | direct, calm, procedural, non-bureaucratic |
| Design goal | remove friction, surface decisions, keep trust visible |
| Visual principle | cards over dense paragraphs; source and action blocks always visible |

## Color Tokens
| Token | Usage | Value |
|---|---|---|
| `--bg` | page background | `#f8fafc` |
| `--surface` | cards | `#ffffff` |
| `--ink` | primary text | `#0f172a` |
| `--muted` | secondary text | `#475569` |
| `--line` | borders | `#dbe4ee` |
| `--brand` | primary CTA | `#0f766e` |
| `--brand-ink` | CTA text | `#ecfeff` |
| `--warn` | stale/fallback states | `#b45309` |
| `--danger` | critical errors | `#b91c1c` |
| `--sponsor` | sponsor label chip | `#7c3aed` |

## Typography
| Token | Desktop | Mobile | Usage |
|---|---|---|---|
| h1 | 40/48 | 30/38 | page hero |
| h2 | 28/36 | 24/32 | section header |
| h3 | 20/28 | 18/26 | card title |
| body | 16/24 | 15/22 | paragraphs |
| meta | 14/20 | 13/18 | verification, source notes |
| label | 12/16 | 12/16 | chips, disclosures |

## Spacing and Radius
| Token | Value |
|---|---|
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 20px |
| space-6 | 24px |
| radius-card | 20px |
| radius-pill | 999px |
| shadow-card | `0 12px 24px rgba(15, 23, 42, 0.06)` |

## Layout Rules
| Rule | Definition |
|---|---|
| max width | 1200px |
| desktop columns | 12 |
| tablet columns | 8 |
| mobile columns | 4 |
| sidebar usage | desktop only on office and guide pages |
| sticky elements | mobile sticky sponsor only after core CTA block |

## Accessibility Guardrails
| Rule | Definition |
|---|---|
| Contrast | WCAG AA minimum |
| Focus ring | visible on all interactive elements |
| Labels | sponsor, ads, outbound links, and error states explicitly labeled |
| Language | `fr-MA` site root |
| Motion | no essential info hidden behind animation |
