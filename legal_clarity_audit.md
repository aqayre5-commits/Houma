# Legal Clarity Audit

Date: 2026-03-30
Brand observed in codebase: Houma
Audit scope: legal/disclaimer surfaces, privacy/storage, footer/legal links, service-page clarity, and currently implemented analytics/location handling

## Findings

### LC-001
- Severity: High
- Blocker: Yes
- File path: `/Users/abdilahiqayre/project/components/footer.tsx`
- Route: All routes
- Issue: Legal pages were not reachable from a permanent footer surface.
- Risk: Users could not easily access legal notice, privacy, cookies, methodology, or sources information from every page.
- Fix direction: Add a dedicated legal column in the footer with permanent links to legal and clarity pages.

### LC-002
- Severity: High
- Blocker: Yes
- File path: `/Users/abdilahiqayre/project/app/page.tsx`
- Route: `/`
- Issue: The homepage did not clearly state that the site is a private, non-official guide.
- Risk: A first-time user could confuse the site with an official filing portal or administrative website.
- Fix direction: Add a short, always-visible non-official disclaimer directly under the hero copy.

### LC-003
- Severity: High
- Blocker: Yes
- File path: `/Users/abdilahiqayre/project/components/where-to-go-card.tsx`
- Route: `/villes/[city]/demarches/[service]`
- Issue: The final answer block did not clearly explain Qriba/Houma's role as a guidance layer rather than the filing authority.
- Risk: Users could over-trust the displayed authority or assume the site itself is the official submission portal.
- Fix direction: Add short guidance-role wording and a verification reminder next to the official source surface.

### LC-004
- Severity: High
- Blocker: Yes
- File path: Missing dedicated pages
- Route: `/mentions-legales`, `/confidentialite`, `/cookies`
- Issue: Core legal pages were missing.
- Risk: Operator identity, privacy/storage practices, and cookie handling were not explained in a centralized, user-facing way.
- Fix direction: Create dedicated legal pages with explicit placeholders for unknown legal facts.

### LC-005
- Severity: Medium
- Blocker: No
- File path: `/Users/abdilahiqayre/project/components/form-panel.tsx`
- Route: `/signaler-une-erreur`, `/annonceurs`
- Issue: User-facing forms collected submitted data without an inline privacy pointer.
- Risk: Users could submit information without a clear path to understand how it is stored or used.
- Fix direction: Add a short privacy note and link to the confidentiality page near the submit surface.

### LC-006
- Severity: High
- Blocker: Yes
- File path: `/Users/abdilahiqayre/project/app/layout.tsx`, `/Users/abdilahiqayre/project/lib/analytics.ts`
- Route: All routes in production
- Issue: Vercel Analytics and Vercel Speed Insights are present in production, but no dedicated consent/control UI exists in the product.
- Risk: Depending on deployment, audience, and operator obligations, policy disclosure alone may be insufficient for non-essential analytics tooling.
- Fix direction: Document the implementation accurately now; require operator/legal decision on whether a consent surface must be added before public launch.

### LC-007
- Severity: Medium
- Blocker: No
- File path: `/Users/abdilahiqayre/project/lib/location-storage.ts`, `/Users/abdilahiqayre/project/components/location-detector.tsx`, `/Users/abdilahiqayre/project/hooks/use-location-detection.ts`
- Route: Location-aware flows
- Issue: The app uses precise geolocation and browser storage/session mechanisms, but this was not previously explained in privacy/cookie documentation.
- Risk: Users and operators could misunderstand what location data is used, when it is requested, and what is persisted in the browser.
- Fix direction: Document geolocation and storage use in legal pages and keep public UI explanations concise and non-technical.

### LC-008
- Severity: High
- Blocker: Yes
- File path: `/Users/abdilahiqayre/project/app/sources/page.tsx`, `/Users/abdilahiqayre/project/app/a-propos/page.tsx`, `/Users/abdilahiqayre/project/app/methodologie/page.tsx`
- Route: `/sources`, `/a-propos`, `/methodologie`
- Issue: Trust pages did not make the site's limits sufficiently explicit.
- Risk: Users could infer institutional affiliation, guaranteed office certainty, or official status from otherwise serious-looking content.
- Fix direction: Add short, persistent wording about private/non-official status, public/official-source compilation, and the need to verify before travel or payment.

### LC-009
- Severity: High
- Blocker: Yes
- File path: Repo-wide legal identity facts
- Route: All legal pages
- Issue: The repo does not contain verified legal publisher/operator identity, postal address, privacy contact, hosting identity details, or CNDP references.
- Risk: Publishing legal pages without explicit placeholders would force fabrication or hide critical missing facts.
- Fix direction: Render operator-facing TODO placeholders directly on legal pages and list them clearly in the implementation handoff.

### LC-010
- Severity: Low
- Blocker: No
- File path: `/Users/abdilahiqayre/project/app/api/forms/error-report/route.ts`, `/Users/abdilahiqayre/project/app/api/forms/sponsor-inquiry/route.ts`, `/Users/abdilahiqayre/project/lib/supabase.ts`
- Route: Form submission endpoints
- Issue: Form submissions may be stored in Supabase when environment variables are configured, but that depends on operator deployment setup.
- Risk: Legal text can only describe this conservatively because the active processor configuration is partly environment-dependent.
- Fix direction: Document Supabase as a potential configured processor and leave room for operator completion if additional processors are added.

### LC-011
- Severity: Low
- Blocker: No
- File path: `/Users/abdilahiqayre/project/app/actions/set-lang.ts`, `/Users/abdilahiqayre/project/app/api/set-lang/route.ts`
- Route: All routes
- Issue: A language cookie is set for site functionality, but the site previously lacked a dedicated cookie explanation page.
- Risk: Necessary cookie usage was not clearly explained.
- Fix direction: Document the language cookie under necessary storage/cookies.

### LC-012
- Severity: Low
- Blocker: No
- File path: `/Users/abdilahiqayre/project/content/site-copy.ts`, legacy browser storage keys
- Route: All routes
- Issue: Some technical identifiers still use the older `qriba_*` naming in cookies or storage keys while the public brand shown in the product is Houma.
- Risk: Minor naming mismatch in technical/legal descriptions and browser tooling.
- Fix direction: Keep documentation accurate for now, and treat any key-rename work as a later non-legal cleanup.

## Summary

Primary blockers before legally clearer publication were:
- missing legal pages
- missing permanent non-official disclaimers on key surfaces
- missing footer legal links
- missing explicit placeholders for unknown operator/legal facts
- undocumented analytics/storage/geolocation behavior

Primary operator/legal decisions still required after implementation:
- confirm legal publisher/operator identity
- confirm publication director / privacy contact / postal address
- confirm hosting identity and transfer posture
- confirm CNDP formalities if applicable
- decide whether current analytics setup requires a dedicated consent surface before launch
