# Location Detection Report

## Files changed

- `types/models.ts`
- `content/postcodes.ts`
- `lib/location-ip.ts`
- `lib/location-postcode.ts`
- `lib/location-gps.ts`
- `lib/location-storage.ts`
- `lib/resolver.ts`
- `lib/routes.ts`
- `lib/content-validation.ts`
- `lib/analytics.ts`
- `hooks/use-location-detection.ts`
- `app/page.tsx`
- `app/api/detect-location/route.ts`
- `app/api/reverse-geocode/route.ts`
- `app/villes/[city]/page.tsx`
- `app/villes/[city]/demarches/[service]/page.tsx`
- `app/villes/[city]/quartiers/[neighborhood]/page.tsx`
- `app/villes/[city]/quartiers/[neighborhood]/demarches/[service]/page.tsx`
- `components/search-form.tsx`
- `tests/smoke.spec.ts`
- `tests/location-detection.spec.ts`
- `tests/watiqa-integration.spec.ts`

## IP prefill implementation

- Server-side IP hinting now lives in `lib/location-ip.ts`.
- The homepage reads request headers through `next/headers` in `app/page.tsx`.
- Supported city normalization is restricted to:
  - `casablanca`
  - `rabat`
  - `tanger`
- Postal code is captured as a hint only.
- Missing or unsupported headers degrade to `source: none` with no false city preselection.
- `app/api/detect-location/route.ts` now returns the same normalized detection structure instead of doing a separate network lookup.

## GPS implementation

- Browser geolocation is requested only after the user clicks `Use precise location`.
- The client flow is handled in `hooks/use-location-detection.ts`.
- Reverse geocoding still goes through `app/api/reverse-geocode/route.ts`.
- GPS matching logic lives in `lib/location-gps.ts`.
- GPS derives:
  - supported city
  - candidate local area
  - optional postcode from reverse geocoding
- GPS never auto-confirms the final authority and never routes directly to a service.

## Postcode hint implementation

- The postcode hint layer is implemented in `content/postcodes.ts` and `lib/location-postcode.ts`.
- The dataset is scoped to supported cities only.
- Each postcode record maps:
  - `citySlug`
  - `postalCode`
  - `candidateLocalAreaSlugs`
  - source metadata
- Postcode is used only to narrow and rank local-area candidates.
- Postcode alone does not produce a final annexe assignment.

## Watiqa preselection logic

- `components/search-form.tsx` now accepts `initialDetectedContext`.
- If IP suggests a supported city, the city selector is prefilled.
- If GPS yields one strong local-area candidate, the Watiqa dropdown is preselected.
- If postcode and GPS leave multiple candidates, the dropdown stays unconfirmed and ranked suggestions are shown.
- Manual controls remain available at all times:
  - `City selector`
  - `Local administration selector`
  - `Confirm area`
  - `Change area`
- Confirmation always opens the city page, never a service page.

## Confidence rules

- Shared state is represented by `DetectedLocationContext` in `types/models.ts`.
- Sources:
  - `none`
  - `ip`
  - `gps`
  - `ip_gps`
  - `manual`
- Confidence values:
  - `high`
  - `medium`
  - `low`
  - `conflict`
  - `unsupported`
- Current behavior:
  - `ip`: `medium` when city plus postcode exist, otherwise `low`
  - `gps`: `high` when GPS produces one strong local-area match with acceptable accuracy
  - `gps`: `medium` when city is supported but multiple candidates remain
  - `conflict`: when GPS city and IP city disagree
  - `unsupported`: when no supported city can be derived
- Manual confirmation always overrides detected state through `resolveDetectedLocationContext` in `lib/resolver.ts`.

## Conflict handling

- IP/GPS disagreements are represented explicitly as `confidence: conflict`.
- The UI keeps the city/local controls editable and does not preselect a final local area in conflict mode.
- Conflict reasons are shown to the user instead of being swallowed silently.
- `location_conflict` analytics is emitted when conflict is detected.

## Privacy and storage behavior

- Lightweight persistence is implemented in `lib/location-storage.ts`.
- Persisted fields only:
  - `citySlug`
  - `neighborhoodSlug`
  - `localAreaSlug`
  - `postalCode`
  - `source`
  - `confidence`
  - `confirmedByUser`
- Raw GPS coordinates are used only for immediate matching and are not persisted.
- Manual city/local-area changes clear stale detected context before storing the new confirmed state.

## Resolver behavior implemented

- `lib/resolver.ts` now supports the unified detection model and manual override flow.
- `shouldUseNeighborhoodServiceRoute(...)` preserves local-area context for local-jurisdiction services.
- Online-first services remain online-first even when a detected local area is present.
- Service pages use local-administration wording and do not present Watiqa records as passport or CNIE offices.

## Analytics added

- `location_ip_prefill`
- `location_postcode_hint`
- `location_gps_request`
- `location_gps_success`
- `location_gps_error`
- `location_conflict`
- `location_local_area_preselected`
- `location_confirm_detected`
- `location_confirm_manual`
- `location_change`

## Validation added

- `lib/content-validation.ts` now validates postcode hints against supported-city and known-local-area data.
- Validation fails when:
  - a postcode hint points to an unsupported city
  - a postcode hint has no candidates
  - a postcode hint points to an unknown local area
  - a postcode hint crosses city boundaries

## Test results

- `npm run build`: passed
- `npm run test:e2e`: passed
- Playwright total: `33/33`

Coverage added or updated includes:

- homepage renders without Vercel geolocation headers
- supported IP city prefill
- unsupported IP city no prefill
- postcode narrowing without auto-confirm
- GPS success with high-confidence Watiqa preselection
- GPS denied path
- medium-confidence ranked-candidate path
- manual override over detected state
- confirmed context opening the city page
- online-first services avoiding false annexe implication
- local-jurisdiction services preserving local context
- postcode validation tied to known Watiqa local areas

## Known limitations

- IP city detection depends on deployment headers being available. Local development falls back cleanly to no prefill.
- The postcode dataset is intentionally narrow and city-scoped for this pass. It is a ranking layer, not a full national postcode model.
- Reverse geocoding quality depends on upstream geocoder labels; ambiguous GPS text can still land in `medium` rather than `high`.
- Arabic labels for Watiqa local areas remain unavailable where the source export did not provide them, so FR labels are still shown for local-area names in those cases.
