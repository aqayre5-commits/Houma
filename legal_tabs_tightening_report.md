# Legal Tabs Tightening Report

Brand note: the provided legal wording model referenced `Qriba`. It was adapted to `Houma` to preserve the brand currently visible in the repository and public UI.

## Files changed

From `git status --short`:

```text
 M app/a-propos/page.tsx
 M app/confidentialite/page.tsx
 M app/cookies/page.tsx
 M app/layout.tsx
 M app/mentions-legales/page.tsx
 M app/methodologie/page.tsx
 M app/page.tsx
 M app/sources/page.tsx
 M components/footer.tsx
 M components/where-to-go-card.tsx
 M content/legal-copy.ts
 M content/site-copy.ts
 M lib/i18n.ts
?? components/site-wide-disclaimer.tsx
```

## Legal surfaces updated

- Site-wide disclaimer added in the shared layout via `components/site-wide-disclaimer.tsx`.
- Footer microcopy tightened and footer legal navigation expanded to include `Méthodologie`.
- Service-page legal clarity line tightened in `components/where-to-go-card.tsx` and kept visible near the authority/source area.
- `Mentions légales` rewritten with explicit bracket placeholders instead of raw TODO language.
- `Confidentialité` rewritten into concise operator/data/finality/destinataire/conservation/droits/hébergement/CNDP sections.
- `Cookies` rewritten into concise usage/categories/choices/implementation-alignment sections.
- `Méthodologie` clarity text tightened in both the page shell and `content/site-copy.ts`.
- Existing legal-adjacent callouts on `À propos` and `Sources` were aligned to the new non-official/disclaimer wording.
- Homepage local disclaimer duplication was removed in favor of the new shared site-wide disclaimer surface.

## Remaining placeholders requiring operator completion

- `[À compléter : nom légal de l’éditeur / exploitant]`
- `[À compléter]`
- `[À compléter : email de contact]`
- `[À compléter : modalité de contact pour vos droits]`
- `[À compléter : hébergeur]`
- `[À compléter]` for hosting address
- `[À compléter]` for hosting contact
- `[À compléter : position CNDP applicable le cas échéant]`
- `[À compléter : lieu d’hébergement et transferts éventuels]`
- `[À compléter : autres destinataires ou sous-traitants, si applicables]`
- `[À compléter : durées de conservation par catégorie de données]`
- `[À compléter : confirmer les cookies et stockages réellement utilisés en production]`

## Raw TODO cleanup

Raw public `TODO`, `Qriba`, and `Qribe` strings were removed from the audited app/component/content/lib surfaces.

Command:

```text
rg -n "TODO|Qriba|Qribe" app components content lib
```

Result:

```text
(no output; exit 1)
```

## Exact command results

### `npm run build`

```text
> houma@0.1.0 build
> next build

▲ Next.js 16.2.1 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 2.2s
  Running TypeScript ...
  Finished TypeScript in 3.2s ...
  Collecting page data using 9 workers ...
  Generating static pages using 9 workers (0/24) ...
  Generating static pages using 9 workers (6/24)
  Generating static pages using 9 workers (12/24)
  Generating static pages using 9 workers (18/24)
✓ Generating static pages using 9 workers (24/24) in 149ms
  Finalizing page optimization ...

Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /a-propos
├ ƒ /annonceurs
├ ƒ /api/detect-location
├ ƒ /api/forms/error-report
├ ƒ /api/forms/sponsor-inquiry
├ ƒ /api/health
├ ƒ /api/reverse-geocode
├ ƒ /api/set-lang
├ ƒ /bureaux
├ ƒ /bureaux/[office]
├ ƒ /comment-ca-marche
├ ƒ /confidentialite
├ ƒ /cookies
├ ƒ /demarches
├ ƒ /demarches/[service]
├ ƒ /faq
├ ƒ /guides
├ ƒ /guides/[slug]
├ ƒ /mentions-legales
├ ƒ /methodologie
├ ƒ /recherche
├ ○ /robots.txt
├ ƒ /signaler-une-erreur
├ ○ /sitemap.xml
├ ƒ /sources
├ ƒ /villes
├ ƒ /villes/[city]
├ ƒ /villes/[city]/demarches/[service]
├ ƒ /villes/[city]/quartiers/[neighborhood]
└ ƒ /villes/[city]/quartiers/[neighborhood]/demarches/[service]


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

### `npm run lint`

```text
> houma@0.1.0 lint
> eslint .
```

### `npm run test:e2e`

```text
> houma@0.1.0 test:e2e
> playwright test

[WebServer] (node:28577) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] (node:28722) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)

Running 55 tests using 5 workers

(node:28729) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:28732) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:28730) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:28731) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:28733) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:28732) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:28731) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:28729) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:28730) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:28733) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✓   1 tests/content-dedupe.spec.ts:8:5 › canonical normalization removes spacing, punctuation, and accent drift for matching (14ms)
  ✓   4 tests/watiqa-integration.spec.ts:7:5 › watiqa normalization preserves supported-city coverage and row accounting (41ms)
  ✓   5 tests/content-dedupe.spec.ts:20:5 › same-name local areas in one city stay separate with unique display labels (4ms)
  ✓   7 tests/content-dedupe.spec.ts:30:5 › same-name different entity types are not merged together (5ms)
  ✓   8 tests/content-dedupe.spec.ts:42:5 › office names stay uniquely renderable per city (2ms)
  ✓  10 tests/content-dedupe.spec.ts:47:5 › validation fails when duplicate canonical groups are left visually ambiguous (2ms)
  ✓  11 tests/content-dedupe.spec.ts:64:5 › full content validation accepts canonicalized datasets (5ms)
  ✓   6 tests/watiqa-integration.spec.ts:22:5 › every Watiqa local area is resolvable from city-scoped UI input (276ms)
  ✓  12 tests/watiqa-integration.spec.ts:34:5 › duplicated Watiqa labels are disambiguated before reaching the UI (1ms)
  ✓  13 tests/watiqa-integration.spec.ts:43:5 › validation fails on duplicate local-area slugs (3ms)
  ✓  14 tests/watiqa-integration.spec.ts:50:5 › validation fails on unsupported city values and unresolvable records (2ms)
  ✓  15 tests/watiqa-integration.spec.ts:68:5 › validation fails on duplicate canonical local-area slugs (0ms)
  ✓  16 tests/watiqa-integration.spec.ts:79:5 › manual local-area selection overrides office fallback context in resolver (1ms)
  ✓  17 tests/watiqa-integration.spec.ts:97:5 › content validation accepts supported postcode hints for known Watiqa local areas (2ms)
  ✓   2 tests/location-detection.spec.ts:26:5 › homepage no longer renders the legacy area cards (1.0s)
  ✓   3 tests/ia-correction.spec.ts:7:5 › homepage keeps service discovery ahead of area tools (1.0s)
  ✓   9 tests/smoke.spec.ts:11:5 › homepage renders (1.0s)
[WebServer] (node:28788) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  20 tests/smoke.spec.ts:20:5 › language toggle switches to arabic on the same route (1.1s)
[WebServer] (node:28789) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  19 tests/ia-correction.spec.ts:16:5 › homepage service search can open a city service page without local-area selection first (1.6s)
  ✓  18 tests/location-detection.spec.ts:32:5 › direct service entry no longer auto-routes from IP city headers alone (1.8s)
  ✓  21 tests/smoke.spec.ts:29:5 › villes index renders (626ms)
[WebServer] (node:28799) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  22 tests/ia-correction.spec.ts:23:5 › homepage service choice can route directly to the service page with precise detected city context (813ms)
[WebServer] (node:28800) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  23 tests/location-detection.spec.ts:44:5 › unsupported precise GPS location is shown when outside supported cities (1.2s)
[WebServer] (node:28801) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] [browser] Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth scrolling during route transitions, add `data-scroll-behavior="smooth"` to your <html> element. Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior
[WebServer] (node:28804) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  24 tests/smoke.spec.ts:35:5 › city page renders service hub hierarchy (2.6s)
  ✓  25 tests/ia-correction.spec.ts:52:5 › city page prioritizes service content over local-area refinement (2.1s)
  ✓  26 tests/location-detection.spec.ts:75:5 › area picker never renders ambiguous duplicate local-area labels (1.6s)
[WebServer] (node:28813) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  27 tests/smoke.spec.ts:43:5 › city-service page renders requirements and sources (880ms)
  ✓  28 tests/ia-correction.spec.ts:66:5 › all services page routes through the same final city service page when precise city detection is available (922ms)
  ✓  29 tests/location-detection.spec.ts:89:5 › GPS success suggests a supported neighborhood and high-confidence Watiqa preselection (908ms)
[WebServer] (node:28817) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  30 tests/smoke.spec.ts:51:5 › vignette renders as online-first flow (795ms)
  ✓  31 tests/ia-correction.spec.ts:95:5 › service resolver shows compact fallback only when direct routing is not possible (655ms)
[WebServer] (node:28820) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  32 tests/location-detection.spec.ts:120:5 › GPS denied path renders cleanly (746ms)
[WebServer] (node:28825) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  33 tests/smoke.spec.ts:57:5 › service resolver page shows compact fallback when city is still needed (707ms)
  ✓  34 tests/ia-correction.spec.ts:104:5 › service page renders one single where-to-go block without competing locality sections (674ms)
  ✓  35 tests/location-detection.spec.ts:139:5 › multiple GPS/postcode candidates remain unconfirmed when confidence is medium (703ms)
[WebServer] (node:28836) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] (node:28837) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  37 tests/ia-correction.spec.ts:113:5 › change area flow preserves the current service from the service page (796ms)
[WebServer] [browser] Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth scrolling during route transitions, add `data-scroll-behavior="smooth"` to your <html> element. Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior
  ✓  36 tests/smoke.spec.ts:67:5 › office page renders covered services (1.6s)
  ✓  38 tests/location-detection.spec.ts:174:5 › manual selection overrides detected selection (1.6s)
[WebServer] (node:28841) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  39 tests/ia-correction.spec.ts:121:5 › known precise location routes directly to the final service page (1.0s)
[WebServer] (node:28844) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  41 tests/location-detection.spec.ts:191:5 › homepage ignores stale saved manual area on fresh entry (549ms)
  ✓  42 tests/ia-correction.spec.ts:150:5 › fresh service entry ignores stale saved manual area (451ms)
[WebServer] (node:28849) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  43 tests/location-detection.spec.ts:208:5 › fresh service entry ignores stale saved manual area and stays city-only (832ms)
[WebServer] (node:28854) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] (node:28855) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  44 tests/location-detection.spec.ts:226:5 › online-first services do not imply local annexe handling under detected local context (681ms)
  ✓  40 tests/smoke.spec.ts:73:5 › local administration pages render (3.1s)
[WebServer] (node:28857) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  45 tests/location-detection.spec.ts:232:5 › local-jurisdiction services preserve local context in downstream routing (953ms)
  ✓  46 tests/smoke.spec.ts:82:5 › search returns city-service result (962ms)
  ✓  47 tests/smoke.spec.ts:87:5 › sources/about/methodology pages render (1.3s)
  ✓  48 tests/smoke.spec.ts:96:5 › cookie and privacy pages reflect active storage and analytics behavior (438ms)
[WebServer] (node:28871) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] [browser] Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth scrolling during route transitions, add `data-scroll-behavior="smooth"` to your <html> element. Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior
  ✓  49 tests/smoke.spec.ts:110:5 › critical path: homepage to city-service (1.2s)
[WebServer] (node:28873) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  50 tests/smoke.spec.ts:119:5 › service page keeps area editing hidden until requested (334ms)
  ✓  51 tests/smoke.spec.ts:126:5 › service page without explicit area does not invent a selected area (903ms)
[WebServer] (node:28878) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  52 tests/smoke.spec.ts:132:5 › manual selector scopes local administrations by city (549ms)
[WebServer] (node:28884) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] [browser] Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth scrolling during route transitions, add `data-scroll-behavior="smooth"` to your <html> element. Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior
  ✓  53 tests/smoke.spec.ts:152:5 › manual selector opens city page with selected local administration visible (520ms)
[WebServer] (node:28886) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)
  ✓  54 tests/smoke.spec.ts:163:5 › selected local administration flows into service guidance without passport-office mislabeling (697ms)
  ✓  55 tests/smoke.spec.ts:171:5 › api health returns ok (74ms)

  55 passed (24.3s)
```
