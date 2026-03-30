# Service Flow Cleanup Report

## Files Changed

- `app/demarches/[service]/page.tsx`
- `app/villes/[city]/demarches/[service]/page.tsx`
- `app/villes/[city]/quartiers/[neighborhood]/demarches/[service]/page.tsx`
- `components/service-intent-resolver.tsx`
- `components/service-area-picker.tsx`
- `components/where-to-go-card.tsx`
- `lib/resolver.ts`
- `tests/ia-correction.spec.ts`
- `tests/location-detection.spec.ts`
- `tests/smoke.spec.ts`

## Resolver-Flow Changes

- Known-city cases now route immediately to the final city/service page.
- Header-based city detection redirects on the server from `/demarches/[service]`.
- Client-side stored or freshly detected city context still auto-routes from the lightweight resolver step.
- The resolver fallback now appears only when the city is still unknown.

## Service-Page Cleanup Changes

- The default city/service page remains in answer mode.
- The final answer block still appears once, via `WhereToGoCard`.
- Locality copy was shortened so the page no longer reads like a setup wizard.

## Removed Default Setup UI

- The old expanded detection/setup presentation was removed from the default post-selection experience.
- `/demarches/[service]` now shows only a compact city-first fallback when direct routing is not possible.
- The city/service page no longer sends users back to the city hub to change their area.

## New Change-Area Interaction

- `WhereToGoCard` now opens an on-demand area picker.
- The picker supports:
  - precise location
  - manual city selection
  - manual local-area selection when relevant
  - same-page confirmation
- Confirming a new area keeps the user on the same service and updates the answer by routing to the same service page in the chosen city/context.

## Copy Changes

- Removed prototype-like default wording from the main service answer flow.
- Standardized the main answer block around:
  - `Ville`
  - `Zone sélectionnée`
  - `Autorité responsable`
  - `Source officielle`
  - `Changer la zone` / `Ajouter une zone`
- Reduced raw state jargon in the service-page answer and replaced it with compact product wording.

## Test Results

- `npm run build`
  - passed
  - `✓ Compiled successfully in 1805ms`
- `npm run lint`
  - passed
- `npm run test:e2e`
  - passed
  - `52 passed (15.5s)`

## Remaining Non-Blocking Limits

- Arabic local-area labels still fall back to French Watiqa labels when the upstream source has no Arabic.
- When no city can be detected at all, the compact resolver still needs a manual city choice before the final city/service page can open.
