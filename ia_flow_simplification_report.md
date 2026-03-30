# IA Flow Simplification Report

## Files Changed

- `app/page.tsx`
- `app/demarches/page.tsx`
- `app/demarches/[service]/page.tsx`
- `app/villes/[city]/page.tsx`
- `app/villes/[city]/demarches/[service]/page.tsx`
- `app/villes/[city]/quartiers/[neighborhood]/page.tsx`
- `app/villes/[city]/quartiers/[neighborhood]/demarches/[service]/page.tsx`
- `components/search-form.tsx`
- `components/service-search-block.tsx`
- `components/service-intent-resolver.tsx`
- `components/selected-area-summary.tsx`
- `components/where-to-go-card.tsx`
- `components/office-card.tsx`
- `lib/routes.ts`
- `lib/resolver.ts`
- `tests/smoke.spec.ts`
- `tests/location-detection.spec.ts`
- `tests/ia-correction.spec.ts`
- `tests/watiqa-integration.spec.ts`

## Homepage Flow Changes

- Removed the city-strip step from the main homepage flow.
- Kept the homepage visibly service-first:
  1. hero
  2. service search
  3. popular services
  4. secondary location module
  5. trust strip
- Homepage service cards and service search now feed the same simplified service-intent path.
- The secondary location module remains available, but it no longer blocks service discovery.

## City Page Flow Changes

- City pages remain service hubs.
- Selected area stays compact and contextual.
- Search-in-city and service categories remain above area refinement.
- Service cards now preserve area context in the city/service route query instead of routing the primary flow into neighborhood service pages.
- Local-area refinement and directory access remain secondary.

## All Services Page Flow Changes

- `/demarches` now behaves as a pure service picker.
- Service choice hands off to `/demarches/[service]`, which tries to resolve location immediately.
- The location step stays invisible in high-confidence cases and only shows a compact fallback when needed.

## Service Page Structure Changes

- The final destination remains `/villes/[city]/demarches/[service]`.
- Service pages keep one single authoritative locality answer block.
- Selected area remains context only.
- Responsible authority remains the answer.
- Related-service links now stay in the same city/service route family with context in query params.

## Route Changes

- Primary entry paths now converge as follows:
  - homepage service choice -> `/demarches/[service]` resolver -> `/villes/[city]/demarches/[service]`
  - all services choice -> `/demarches/[service]` resolver -> `/villes/[city]/demarches/[service]`
  - city page service choice -> `/villes/[city]/demarches/[service]`
- Primary service cards and search results no longer prefer neighborhood service routes.
- Change-area actions still preserve the current service.

## Terminology Changes

- Kept the primary terms stable:
  - City
  - Selected area
  - Responsible authority
  - Official source
  - Change area
- Removed old answer-path wording like `Administration locale sélectionnée` from the final service-answer language.
- Kept Watiqa labels as local-area context only.

## Test Results

- `npm run lint`
  - Passed
- `npm run build`
  - Passed
- `npm run test:e2e`
  - Passed: `50 passed (15.0s)`

## Remaining Non-Blocking Limits

- Arabic local-area labels still fall back to French Watiqa labels where the upstream Watiqa source is not bilingual.
- Neighborhood-context routes still exist as secondary/contextual pages, but they are no longer part of the primary service-first path.
- The browser tests still surface Next.js `scroll-behavior: smooth` warnings; they do not block the simplified flow.
