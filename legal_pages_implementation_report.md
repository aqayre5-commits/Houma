# Legal Pages Implementation Report

Date: 2026-03-30
Brand implemented in current repo: Houma

## Files changed

- `/Users/abdilahiqayre/project/content/legal-copy.ts`
- `/Users/abdilahiqayre/project/lib/routes.ts`
- `/Users/abdilahiqayre/project/lib/i18n.ts`
- `/Users/abdilahiqayre/project/components/footer.tsx`
- `/Users/abdilahiqayre/project/app/page.tsx`
- `/Users/abdilahiqayre/project/components/where-to-go-card.tsx`
- `/Users/abdilahiqayre/project/app/a-propos/page.tsx`
- `/Users/abdilahiqayre/project/app/methodologie/page.tsx`
- `/Users/abdilahiqayre/project/app/sources/page.tsx`
- `/Users/abdilahiqayre/project/components/form-panel.tsx`
- `/Users/abdilahiqayre/project/app/mentions-legales/page.tsx`
- `/Users/abdilahiqayre/project/app/confidentialite/page.tsx`
- `/Users/abdilahiqayre/project/app/cookies/page.tsx`
- `/Users/abdilahiqayre/project/app/sitemap.ts`
- `/Users/abdilahiqayre/project/legal_clarity_audit.md`

## Disclaimer surfaces added

- Homepage under the hero:
  - short non-official disclaimer clarifying that Houma is a private, non-official guide
- Footer:
  - retained short “Guide privé, non officiel.” positioning
  - added permanent legal links
- Service pages:
  - added short guidance-role wording near the official source surface
  - added reminder to verify the relevant administration before travel
- About page:
  - added a short non-official note near the page intro
- Methodology page:
  - added a short limitations note explaining that the shown local authority may be a likely responsible authority rather than a guaranteed exact desk
- Sources page:
  - clarified that Houma compiles procedures from public and official sources but is not an official portal and does not file requests for the user

## Legal pages created or updated

### Created
- `/mentions-legales`
- `/confidentialite`
- `/cookies`

### Updated
- `/methodologie`
- `/sources`
- `/a-propos`

## Placeholders requiring operator completion

These were intentionally not fabricated and must be completed by the operator before final legal publication:

- `TODO: Replace with legal publisher/operator name`
- `TODO: Replace with responsible publication name`
- `TODO: Replace with registered address`
- `TODO: Replace with legal/privacy contact email`
- `TODO: Replace with privacy rights contact method`
- `TODO: Confirm hosting provider`
- `TODO: Confirm hosting address`
- `TODO: Confirm hosting support URL or email`
- `TODO: Insert CNDP filing/receipt reference if applicable`
- `TODO: Confirm hosting/data transfer posture`
- `TODO: Confirm any additional processors or subprocessors not visible in the codebase`

## Storage and cookie findings

Documented current implementation conservatively, based on code present in the repo:

- Necessary cookie/storage:
  - `qriba_lang` cookie for language preference
  - `qriba_confirmed_location_v2` localStorage key still referenced for cleanup/legacy behavior
  - `qriba_location_v1` sessionStorage key used by the location detector flow
- Geolocation:
  - precise location may be requested to improve city/local-area guidance
- Analytics/runtime tooling:
  - `@vercel/analytics`
  - `@vercel/speed-insights`
  - both mounted in production only
- Forms/processors:
  - issue-report and sponsor-inquiry forms may store submissions in Supabase when deployment environment variables are configured

## Missing compliance-critical items still requiring operator or legal action

- Fill all publisher/operator identity placeholders
- Confirm hosting identity and any cross-border transfer posture
- Confirm whether CNDP formalities apply and insert the correct reference if applicable
- Confirm the privacy contact / rights-request channel
- Review whether production analytics usage requires a dedicated consent/control mechanism in the deployment context

## Exact command results

### `npm run build`

Passed

Key result:
```text
✓ Compiled successfully in 2.3s
```

### `npm run lint`

Passed

### `npm run test:e2e`

Passed

Exact result:
```text
54 passed (27.5s)
```

## Remaining non-blocking limits

- Public-facing brand is Houma, while some technical cookie/storage keys still use older `qriba_*` identifiers.
- The legal pages intentionally use explicit TODO placeholders for facts that are not present in the repository.
- Privacy/cookie wording is conservative because some runtime processors depend on deployment environment variables.

## Remaining blocking legal/compliance gaps

- Legal publication is not complete until the operator replaces the placeholder identity, address, hosting, contact, and CNDP fields with verified facts.
- If legal review determines that current analytics tooling requires consent before activation, the site still needs a dedicated consent/control UX before final launch.
