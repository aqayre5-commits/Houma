# Privacy / Geolocation Alignment

Date: 2026-03-30

## Actual implementation

- The main live service-entry flow requests browser geolocation after a user action, not silently on page load.
- The service area picker can also request precise location after a user action.
- The browser-provided coordinates are used to call the internal route `/api/reverse-geocode`.
- The internal reverse-geocode route forwards the lookup to Nominatim and returns a structured city / local-address detail.
- The live flow stores derived context in memory for the current UI state.
- The visible live flow does not store raw coordinates in cookies, localStorage, or sessionStorage.
- The live flow does not restore old manual area selections from localStorage.
- A legacy localStorage key is only removed.

## Policy alignment result

### What is now described correctly

- precise location is user-triggered
- location is used to improve city / local-area guidance
- raw coordinates are used transiently rather than stored in browser storage
- the active flow does not keep a permanent precise-location preference in browser storage
- the live flow may still rely on public/offical sources and user verification even when location is detected

### What remains intentionally conservative

- whether infrastructure or hosting logs retain IP addresses or request-level coordinate traces
- whether production analytics tooling correlates location-related events in a way that requires extra disclosures
- exact retention once third-party providers receive telemetry

## Dormant code note

- `components/location-detector.tsx` still contains a sessionStorage key and an IP fallback path.
- This is not wired into the current primary live site flow.
- Public policy text has therefore been aligned to the live flow first, while the dormant code is documented in audit artifacts rather than presented as a primary user-facing behavior.
