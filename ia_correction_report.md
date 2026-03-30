# IA Correction Report

## Ranked Changes Completed

1. Homepage is now service-first.
   - Hero stays first.
   - Search now appears before any detection or manual area tooling.
   - Popular services now appear before city selection and area confirmation.
   - The detect/manual area flow remains available, but as a secondary module.

2. City pages now behave as service hubs.
   - The selected area is reduced to a compact context summary.
   - Search-in-city and service browsing now lead the page body.
   - Local-area refinement moved lower on the page.
   - The default city page no longer behaves like an office wall.

3. Service pages now expose one single locality answer block.
   - A unified `WhereToGoCard` now presents city, selected area, responsible authority, why it applies, confidence/source context, change-area action, and official source.
   - Competing blocks such as separate selected-locality, city-starting-point, and office-answer sections were removed from the main flow.
   - Online-first services stay explicitly digital-first.

4. Terminology was normalized across the IA correction.
   - Primary labels now center on City, Selected area, Responsible authority, Official source, and Change area.
   - Old phrasing like `Administration locale sélectionnée` was removed from core service-page answer flows.
   - Supporting office cards were kept secondary and renamed away from `Point de départ ville`.

5. Route behavior now follows the service-first model.
   - Homepage search can open city/service answer pages directly.
   - Homepage city choice opens the city hub.
   - Service links preserve city and selected-area context.
   - Change-area flows now preserve the current service through city-page handoff where possible.

6. Tests now explicitly cover the new IA.
   - Added focused IA behavior coverage.
   - Updated smoke and location-detection tests for the new hierarchy, secondary manual selector, and unified locality answer block.

## Files Changed

- `app/page.tsx`
- `app/recherche/page.tsx`
- `app/villes/[city]/page.tsx`
- `app/villes/[city]/demarches/[service]/page.tsx`
- `app/villes/[city]/quartiers/[neighborhood]/page.tsx`
- `app/villes/[city]/quartiers/[neighborhood]/demarches/[service]/page.tsx`
- `components/search-form.tsx`
- `components/service-search-block.tsx`
- `components/selected-area-summary.tsx`
- `components/where-to-go-card.tsx`
- `components/office-card.tsx`
- `lib/routes.ts`
- `lib/resolver.ts`
- `tests/smoke.spec.ts`
- `tests/location-detection.spec.ts`
- `tests/ia-correction.spec.ts`
- `tests/watiqa-integration.spec.ts`

## Homepage Hierarchy Changes

- Search moved ahead of location detection and manual area setup.
- Featured services now appear before city selection.
- City selection remains available as a direct hub entry.
- The detect/manual area module stays on the homepage, but no longer frames the core journey.

## City Page Hierarchy Changes

- Added compact active-area summary instead of a dominant local-administration lead block.
- Added city-scoped service search near the top.
- Added category navigation and top procedures before area refinement.
- Moved local-area refinement to a lower-priority section.
- Replaced the default office-heavy section with a lighter directory entry point.

## Service Page Locality-Block Changes

- Added a single `WhereToGoCard` as the authoritative locality answer.
- Removed competing locality blocks from the main page body.
- Kept Watiqa-derived area labels as context only, never as passport/CNIE office identity.
- Kept online-first services out of annexe-style language.

## Terminology Changes

- `Administration locale sélectionnée` in core answer messaging became `Zone sélectionnée`.
- `Point de départ ville` became `Repère ville` in supporting office contexts.
- Service pages now emphasize `Autorité responsable` as the answer and `Zone sélectionnée` as context.

## Route-Behavior Changes

- Homepage service search resolves directly into answer routes when intent is clear.
- City-page service cards preserve selected-area context.
- Neighborhood-sensitive services use contextual routes when a selected area is present.
- Change-area from service pages preserves the current service via query handoff on the city page.

## Tests Added or Updated

- Added `tests/ia-correction.spec.ts`.
- Updated `tests/smoke.spec.ts`.
- Updated `tests/location-detection.spec.ts`.
- Updated `tests/watiqa-integration.spec.ts` to match normalized locality wording.

## Exact Command Results

- `npm run lint`
  - Passed
- `npm run build`
  - Passed
- `npm run test:e2e`
  - Passed: `47 passed (16.4s)`

## Remaining Non-Blocking Limits

- Arabic local-area labels still fall back to French Watiqa labels where the source dataset does not provide Arabic.
- The app still emits Next.js `scroll-behavior: smooth` warnings during browser tests; this does not block the corrected IA behavior.
