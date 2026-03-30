# Watiqa Integration Report

## Files Changed

- [types/models.ts](/Users/abdilahiqayre/project/types/models.ts)
- [content/local-areas.ts](/Users/abdilahiqayre/project/content/local-areas.ts)
- [content/neighborhoods.ts](/Users/abdilahiqayre/project/content/neighborhoods.ts)
- [lib/content.ts](/Users/abdilahiqayre/project/lib/content.ts)
- [lib/content-validation.ts](/Users/abdilahiqayre/project/lib/content-validation.ts)
- [lib/routes.ts](/Users/abdilahiqayre/project/lib/routes.ts)
- [lib/resolver.ts](/Users/abdilahiqayre/project/lib/resolver.ts)
- [components/search-form.tsx](/Users/abdilahiqayre/project/components/search-form.tsx)
- [components/service-card.tsx](/Users/abdilahiqayre/project/components/service-card.tsx)
- [components/office-card.tsx](/Users/abdilahiqayre/project/components/office-card.tsx)
- [app/villes/[city]/page.tsx](/Users/abdilahiqayre/project/app/villes/[city]/page.tsx)
- [app/villes/[city]/demarches/[service]/page.tsx](/Users/abdilahiqayre/project/app/villes/[city]/demarches/[service]/page.tsx)
- [app/villes/[city]/quartiers/[neighborhood]/page.tsx](/Users/abdilahiqayre/project/app/villes/[city]/quartiers/[neighborhood]/page.tsx)
- [app/villes/[city]/quartiers/[neighborhood]/demarches/[service]/page.tsx](/Users/abdilahiqayre/project/app/villes/[city]/quartiers/[neighborhood]/demarches/[service]/page.tsx)
- [app/bureaux/[office]/page.tsx](/Users/abdilahiqayre/project/app/bureaux/[office]/page.tsx)
- [tests/smoke.spec.ts](/Users/abdilahiqayre/project/tests/smoke.spec.ts)
- [tests/watiqa-integration.spec.ts](/Users/abdilahiqayre/project/tests/watiqa-integration.spec.ts)
- [next.config.mjs](/Users/abdilahiqayre/project/next.config.mjs)

## Normalization Rules Used

- Source rows come from [watiqa_local_administrations_casablanca_rabat_tanger.json](/Users/abdilahiqayre/project/watiqa_local_administrations_casablanca_rabat_tanger.json), which contains 175 extracted Watiqa rows.
- Supported cities are hard-mapped only to `casablanca`, `rabat`, and `tanger`.
- Exact Watiqa labels are preserved in:
  - `provinceOrPrefecture`
  - `commune`
  - `prefectureArrondissement`
  - `arrondissement`
  - `bureauEtatCivil`
- `displayLabelFr` is derived in this order:
  1. `bureauEtatCivil`
  2. `arrondissement`
  3. `prefectureArrondissement`
  4. `commune`
- `displayLabelAr` is left `null` because no authoritative Arabic Watiqa labels were available in the export.
- `officeType` is derived in this order:
  1. `bureau_etat_civil`
  2. `arrondissement`
  3. `prefecture_arrondissement`
  4. `local_admin_unknown`
- `localAreaSlug` is deterministic and path-based:
  - `citySlug`
  - `province_or_prefecture`
  - `commune`
  - `prefecture_arrondissement`
  - `arrondissement`
  - `bureau_etat_civil` or display fallback
- Imported confidence values are normalized from `High`/`Medium`/`Low` to `high`/`medium`/`low`.

## Duplicate-Handling Rules

- Deduplication is semantic, not only raw-string based.
- The semantic key is:
  - city
  - province/prefecture
  - commune
  - prefecture d’arrondissement
  - arrondissement
  - bureau d’état civil
- This pass did not require any semantic merges beyond the already deduplicated export.
- Final normalized count: `175`
- Imported count: `175`
- Merge count: `0`

## UI Behavior Implemented

- Homepage manual flow now includes:
  - `City selector`
  - `Local administration selector`
  - `Confirm area`
  - `Change area`
- The local-administration dropdown is city-scoped:
  - Casablanca only shows Casablanca Watiqa local administrations
  - Rabat only shows Rabat Watiqa local administrations
  - Tanger only shows Tanger Watiqa local administrations
- Users can continue to the city page after selecting only a city.
- When a local administration is selected, the city page opens with `?localArea=<slug>` active and visibly displays the selected Watiqa context.
- City service links switch to the local-context route when a local administration is active.
- The existing `/villes/[city]/quartiers/[neighborhood]` route family now acts as the local-administration route family backed by Watiqa data.

## Resolver Behavior Implemented

- `ResolverInput` now accepts `localAreaSlug`.
- Manual local-area selection is evaluated before any office override.
- Local-jurisdiction and office-match-sensitive services now carry the selected Watiqa local administration into the resolver result.
- Online-first services remain online-first even when a Watiqa local administration is selected.
- Service pages now separate:
  - local-area context from Watiqa
  - city-level office starting points from the existing office registry
- Watiqa labels are not presented as passport offices or CNIE offices.
- Wording on service pages and office cards was adjusted toward:
  - responsible local annexe / arrondissement
  - point de départ ville
  - local administrative context

## Validation Added

- Validation now fails when:
  - a local area references an unsupported city
  - a local-area slug is missing
  - a local-area slug is duplicated
  - a supported city has no local-area options
  - a local-area record is missing all of:
    - `bureauEtatCivil`
    - `arrondissement`
    - `prefectureArrondissement`
    - `commune`
  - the normalized Watiqa row accounting does not match imported count plus semantic merges
  - the UI city order references a missing or wrongly scoped local-area slug
  - a `neighborhood` route record is not backed by a Watiqa local-area record

## Test Results

- `npm run build`
  - passed
- `npm run test:e2e`
  - passed
  - `21/21` tests green

Included coverage now verifies:

- Watiqa normalization count and supported-city coverage
- local-area resolution from city-scoped UI input
- validation failure on duplicate slugs
- validation failure on unsupported city records
- validation failure on unresolvable local-area records
- manual selector city scoping
- confirm-area flow into city page
- selected local administration visibility on city page
- manual local-area precedence in resolver
- no passport/CNIE office mislabeling on local-context service pages

## Remaining Limitations

- Arabic labels for Watiqa local administrations are still `null`; no authoritative Arabic source labels were added in this pass.
- The existing `quartiers` route segment is reused for Watiqa local administrations to avoid a broader route refactor.
- The legacy office registry remains a city-level starting-point dataset; it is not replaced by Watiqa records in this pass.
- Auto-detect behavior was not changed beyond ensuring that manual local-area context takes precedence when present.
