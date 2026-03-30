# Remove Legacy Area Flow Report

## Root Cause

The old setup experience was still visible because the `/demarches/[service]` resolver page kept rendering an inline city-and-area wizard when direct city detection failed. That page still behaved like a setup step instead of a compact fallback.

The app also still wrote confirmed location context into `localStorage`, which kept the stale manual-area mechanism alive even though fresh entry should depend only on current detection, current route context, or an explicit current-session area change.

## Files Changed

- `components/service-intent-resolver.tsx`
- `lib/location-storage.ts`
- `tests/smoke.spec.ts`
- `tests/location-detection.spec.ts`
- `tests/ia-correction.spec.ts`

## Removed UI Surfaces

From the default service resolver flow:

- inline local-area selector
- inline local-area confirmation path
- old “selected city and area” setup behavior
- old “confirm area” setup button before reaching the final service page

The fallback resolver now asks only for the city when direct routing is not possible. Local-area correction remains available only from the final service page through `Add area` / `Change area`.

## Storage / Resolver Changes

- `ServiceIntentResolver` no longer saves confirmed manual area context before opening the final service page.
- `lib/location-storage.ts` now treats the old persisted location payload as deprecated and no longer restores it.
- Fresh entry now uses only:
  - current detection
  - explicit current route params
  - current-session area edits triggered from the service page

## Before / After Behavior

### Before

- A service click could land on a large resolver page with city, area, and confirmation controls.
- The resolver behaved like a setup wizard instead of a minimal fallback.
- Old persisted manual area data could remain in browser storage and risk reappearing in future flows.

### After

- Service selection still attempts immediate detection first.
- If city detection succeeds, the user goes directly to the final city/service page.
- If city detection is unavailable, the fallback page asks only for the city and opens the final service page immediately after that.
- Area editing stays on-demand from the service page only.
- Stale manual area data is no longer part of the active product flow.

## Test Results

- `npm run build`
  - passed
- `npm run lint`
  - passed
- `npm run test:e2e`
  - passed

## Remaining Non-Blocking Limits

- Arabic local-area labels still fall back to French Watiqa labels where the upstream source has no Arabic.
- If no city can be detected at all, the compact resolver still needs a manual city choice before opening the final service page.
