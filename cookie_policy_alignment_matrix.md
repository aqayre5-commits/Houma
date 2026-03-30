# Cookie / Policy Alignment Matrix

Date: 2026-03-30

| Item | Implementation reality | Current policy text after alignment | Mismatch type | Severity | Fix direction |
| --- | --- | --- | --- | --- | --- |
| `qriba_lang` cookie | Set by language action/API, read server-side for locale | Described on `/cookies` and `/confidentialite` as the active necessary cookie | accurately disclosed | Low | none |
| `qriba_confirmed_location_v2` localStorage key | Current live code only removes this stale key; no active persistence/restore | Described as legacy cleanup only, not as active preference storage | accurately disclosed after fix | Low | none |
| `qriba_location_v1` sessionStorage key | Exists only in an unused secondary component, not in the main live flow | Public policy no longer treats it as active live storage; dormant existence is acknowledged conservatively | previously disclosed but inaccurate | Medium | fixed in copy; keep audit note until code is removed or component is wired back in |
| Precise browser geolocation | Triggered after explicit user action; raw coordinates used transiently | `/confidentialite` and `/cookies` now say geolocation is user-triggered and raw coordinates are not stored in browser storage by the live flow | previously partially disclosed | High | fixed in copy |
| Reverse-geocode request with `lat` and `lon` | Browser sends coordinates to internal API route; internal API calls Nominatim | Privacy/cookies pages now describe transient use rather than persistent browser storage | previously undisclosed detail | Medium | fixed in copy; keep operator TODO for logs and transfers |
| Vercel Analytics | Runtime analytics loaded in production, event payloads sent through `window.va` | `/cookies` and `/confidentialite` mention production-only analytics and no current in-product consent UI | partially disclosed | Medium | fixed in copy; operator must decide consent posture |
| Vercel Speed Insights | Runtime performance measurement loaded in production | `/cookies` and `/confidentialite` mention production-only performance measurement | partially disclosed | Low | fixed in copy |
| Analytics consent state | No banner or preference center exists in code | `/cookies` now explicitly says no independent analytics consent interface currently exists | consent mismatch remains explicit | High | unresolved product/legal decision: gate analytics or keep disabled until reviewed |
| Supabase form storage | Error report / sponsor forms may be stored in Supabase if env vars are configured | `/confidentialite` mentions Supabase as conditional processor | accurately disclosed conservatively | Low | none |
| IP-based approximate location | Secondary component can use `/api/detect-location`, but this is not part of the current primary live flow | Public policy does not present it as an active live behavior | accurately scoped after audit | Low | none |

## Summary

Main mismatches found before alignment:

- sessionStorage key treated too much like active live storage
- transient precise-location handling not described precisely enough
- analytics disclosure lacked an explicit statement that no current consent UI exists

Main mismatches remaining after alignment:

- non-essential analytics are present in production code without any in-product gating or preference surface
- production vendor behavior and provider retention still need operator confirmation
