# Cookie / Storage Policy Report

Date: 2026-03-30

## Files changed

- `/Users/abdilahiqayre/project/content/legal-copy.ts`
- `/Users/abdilahiqayre/project/app/confidentialite/page.tsx`
- `/Users/abdilahiqayre/project/app/cookies/page.tsx`
- `/Users/abdilahiqayre/project/components/location-detector.tsx`
- `/Users/abdilahiqayre/project/tests/smoke.spec.ts`
- `/Users/abdilahiqayre/project/cookie_storage_inventory.md`
- `/Users/abdilahiqayre/project/cookie_policy_alignment_matrix.md`
- `/Users/abdilahiqayre/project/privacy_geo_alignment.md`
- `/Users/abdilahiqayre/project/consent_alignment_audit.md`
- `/Users/abdilahiqayre/project/cookie_policy_operator_todos.md`

## Actual storage items found

### Active live behavior
- `qriba_lang` cookie
- legacy localStorage cleanup for `qriba_confirmed_location_v2`
- user-triggered precise browser geolocation
- transient reverse-geocode request carrying raw coordinates
- Vercel Analytics in production
- Vercel Speed Insights in production
- conditional Supabase-backed form submission storage

### Dormant / secondary code behavior
- `qriba_location_v1` sessionStorage in an unused secondary detector component
- IP-based location hint route used only by that dormant secondary component

## Policy mismatches found

- privacy/cookies pages previously treated `qriba_location_v1` too much like active live storage
- privacy/cookies pages did not clearly explain that raw coordinates are used transiently rather than stored in browser storage by the current live flow
- analytics disclosure did not make the absence of an in-product consent/preferences surface explicit enough
- a secondary detector component still claimed “Aucune donnée n'est conservée” even though it can write sessionStorage and analytics events

## Fixes implemented

- restructured legal storage copy into active live items, legacy cleanup, dormant code, runtime services, and geolocation handling
- updated `/confidentialite` to describe transient geolocation use more precisely
- updated `/cookies` to distinguish active storage from dormant technical code
- clarified that analytics are production-only runtime services and that no current in-product consent UI exists
- corrected the secondary detector copy so it no longer falsely says no data is retained
- added a regression test covering cookie/privacy wording

## Unresolved legal / operator unknowns

- whether Vercel Analytics or Speed Insights set cookies or similar client identifiers in the actual production deployment
- exact retention and processor terms for Vercel services
- hosting / CDN / proxy request-log retention
- Nominatim transfer and retention posture as part of reverse geocoding
- Supabase regional hosting / retention details when configured
- CNDP status

## Is a consent mechanism currently needed based on the code?

Conservative answer:

- The site does **not** appear to use only necessary storage.
- The visible code mounts non-essential analytics/performance tooling in production.
- There is currently **no** in-product consent or preferences surface for those tools.
- This has been made explicit in the policy text and audit documents.
- Whether a consent mechanism is legally required cannot be claimed as a fact from code alone, so that decision remains an operator/legal action item.
