# Cookie & Storage Inventory

Date: 2026-03-30
Scope: live site behavior first, then dormant or legacy code paths that still exist in the repo

## Live site inventory

| Item | Type | Where set | Where read/used | Purpose | Lifetime | Category | First/third party | Personal-data risk | Current user-facing disclosure | Current consent gating |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `qriba_lang` | cookie | [`app/actions/set-lang.ts`](/Users/abdilahiqayre/project/app/actions/set-lang.ts), [`app/api/set-lang/route.ts`](/Users/abdilahiqayre/project/app/api/set-lang/route.ts) | [`lib/lang.ts`](/Users/abdilahiqayre/project/lib/lang.ts) | Memorize interface language choice | 1 year (`maxAge: 60 * 60 * 24 * 365`) | necessary / preference | first-party | no | yes | not applicable |
| `qriba_confirmed_location_v2` | localStorage | not actively set anymore; only removed in [`lib/location-storage.ts`](/Users/abdilahiqayre/project/lib/location-storage.ts) | removal-only path in [`lib/location-storage.ts`](/Users/abdilahiqayre/project/lib/location-storage.ts) | Cleanup of stale legacy local-area context so it is not auto-restored | n/a in current live flow | necessary / legacy cleanup | first-party | unclear | yes, after alignment | not applicable |
| Browser precise geolocation | other | browser permission flow in [`lib/service-entry-client.ts`](/Users/abdilahiqayre/project/lib/service-entry-client.ts) and [`hooks/use-location-detection.ts`](/Users/abdilahiqayre/project/hooks/use-location-detection.ts) | service entry flow, service resolver, service area picker | Identify city or local-area context when the user explicitly shares precise location | transient in memory | necessary for optional location feature | first-party browser API | yes | yes, after alignment | user permission prompt, but no site-level consent layer |
| Raw `lat` / `lon` request to `/api/reverse-geocode` | other | browser fetches in [`lib/service-entry-client.ts`](/Users/abdilahiqayre/project/lib/service-entry-client.ts), [`hooks/use-location-detection.ts`](/Users/abdilahiqayre/project/hooks/use-location-detection.ts), [`components/location-detector.tsx`](/Users/abdilahiqayre/project/components/location-detector.tsx) | [`app/api/reverse-geocode/route.ts`](/Users/abdilahiqayre/project/app/api/reverse-geocode/route.ts) | Convert coordinates into city / local-address context | transient request only in visible code | necessary for optional location feature | first-party request, with third-party upstream lookup to Nominatim | yes | yes, after alignment | user permission prompt, but no site-level consent layer |
| Vercel Analytics runtime | other | mounted in production in [`app/layout.tsx`](/Users/abdilahiqayre/project/app/layout.tsx) | `window.va` events from [`lib/analytics.ts`](/Users/abdilahiqayre/project/lib/analytics.ts) and tracked UI components | Audience measurement and event tracking | unknown from code alone | analytics | third-party runtime service | yes / unclear | yes | no |
| Vercel Speed Insights runtime | other | mounted in production in [`app/layout.tsx`](/Users/abdilahiqayre/project/app/layout.tsx) | automatic performance reporting | Performance measurement | unknown from code alone | analytics | third-party runtime service | unclear | yes | no |
| Form submission payloads | other | POST requests from form UI into [`app/api/forms/error-report/route.ts`](/Users/abdilahiqayre/project/app/api/forms/error-report/route.ts) and [`app/api/forms/sponsor-inquiry/route.ts`](/Users/abdilahiqayre/project/app/api/forms/sponsor-inquiry/route.ts) | server-side insertion through [`lib/supabase.ts`](/Users/abdilahiqayre/project/lib/supabase.ts) when env vars exist | Error reports and sponsor inquiries | unknown from code alone | necessary | first-party UI with possible third-party processor | yes | yes | not applicable |

## Dormant / legacy code still present in repo

These items exist in code but are not part of the current primary live site flow.

| Item | Type | Where set | Where read/used | Purpose | Lifetime | Category | First/third party | Personal-data risk | Current user-facing disclosure | Current consent gating |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `qriba_location_v1` | sessionStorage | [`components/location-detector.tsx`](/Users/abdilahiqayre/project/components/location-detector.tsx) | same component only | Persist state of a secondary location-detector module across one browser session | browser session | dormant / technical | first-party | yes / unclear because it may contain local address text | yes, after alignment, but marked dormant | not applicable |
| IP-based location hint | other | fetch to [`/api/detect-location`](/Users/abdilahiqayre/project/app/api/detect-location/route.ts) from [`components/location-detector.tsx`](/Users/abdilahiqayre/project/components/location-detector.tsx) | same secondary component only | Approximate city / unsupported place hint from request headers | transient | dormant / technical | first-party | unclear | no dedicated public description as active behavior, intentionally | n/a |

## Negative findings

Items searched for and not found in active code:

- no `document.cookie` writes outside Next cookie helpers
- no `indexedDB`
- no `next/script` third-party tag loading
- no marketing or retargeting SDK in `package.json`
- no explicit ad-network cookies or embed SDKs
- no consent banner component
- no middleware setting tracking cookies

## Geolocation and local-context notes

- Current live flow requests precise location after a user action tied to service discovery or area refinement.
- Raw coordinates are sent to the internal reverse-geocode route, which then calls Nominatim.
- The visible code does not store raw coordinates in cookies, localStorage, or sessionStorage for the current live flow.
- The current live flow also does not auto-restore a previously confirmed manual area from localStorage.
- The only remaining localStorage touchpoint is removal of a stale legacy key.

## Unknowns that code alone cannot prove

- whether Vercel Analytics or Speed Insights create client identifiers or cookies in the deployed production environment
- whether hosting or provider logs retain IP addresses or geolocation-related request data
- exact retention of analytics telemetry once sent to third-party services
- whether any deployment-specific reverse proxy or CDN layer adds extra cookies not visible in repo code
