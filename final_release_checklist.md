# Final Release Checklist

| Area | Check | Status | Validation |
| --- | --- | --- | --- |
| SEO | Placeholder host removed from metadata and crawl surfaces | done | [lib/seo.ts](/Users/abdilahiqayre/project/lib/seo.ts), [app/layout.tsx](/Users/abdilahiqayre/project/app/layout.tsx) |
| SEO | Canonicals generated from one site URL helper | done | [lib/seo.ts](/Users/abdilahiqayre/project/lib/seo.ts) |
| SEO | Required public routes use route-specific metadata | done | key page files updated in this pass |
| SEO | Neighborhood-service duplicate-content risk reduced | done | canonical fallback in [app/villes/[city]/quartiers/[neighborhood]/demarches/[service]/page.tsx](/Users/abdilahiqayre/project/app/villes/[city]/quartiers/[neighborhood]/demarches/[service]/page.tsx) |
| SEO | Robots route is valid and points to sitemap | done | [app/robots.ts](/Users/abdilahiqayre/project/app/robots.ts) |
| SEO | Sitemap includes intended indexable routes only | done | [app/sitemap.ts](/Users/abdilahiqayre/project/app/sitemap.ts) |
| Analytics | Page views tracked on key route templates | done | existing [components/page-view-tracker.tsx](/Users/abdilahiqayre/project/components/page-view-tracker.tsx) plus route coverage |
| Analytics | Service-card clicks tracked | done | [components/service-card.tsx](/Users/abdilahiqayre/project/components/service-card.tsx) |
| Analytics | Source outbound clicks tracked | done | [components/tracked-external-link.tsx](/Users/abdilahiqayre/project/components/tracked-external-link.tsx) plus service/source pages |
| Analytics | Search submit tracked explicitly | done | [components/search-form.tsx](/Users/abdilahiqayre/project/components/search-form.tsx) |
| Analytics | Search result clicks tracked explicitly | done | [components/search-form.tsx](/Users/abdilahiqayre/project/components/search-form.tsx), [app/recherche/page.tsx](/Users/abdilahiqayre/project/app/recherche/page.tsx) |
| Analytics | Location confirm detected/manual tracked | done | existing location events in [components/search-form.tsx](/Users/abdilahiqayre/project/components/search-form.tsx) |
| States | App-wide loading state exists | done | [app/loading.tsx](/Users/abdilahiqayre/project/app/loading.tsx) |
| States | App-wide error state exists | done | [app/error.tsx](/Users/abdilahiqayre/project/app/error.tsx) |
| States | Invalid local-area query degrades gracefully | done | [app/villes/[city]/page.tsx](/Users/abdilahiqayre/project/app/villes/[city]/page.tsx), [app/villes/[city]/demarches/[service]/page.tsx](/Users/abdilahiqayre/project/app/villes/[city]/demarches/[service]/page.tsx) |
| States | No-office and no-source states render explicit fallbacks | done | city/neighborhood service pages and source surfaces |
| Responsive | Long Watiqa labels wrap cleanly | done | city/service/neighborhood/office/source surfaces |
| Responsive | Mobile source links and cards remain readable | done | [app/sources/page.tsx](/Users/abdilahiqayre/project/app/sources/page.tsx), [components/office-card.tsx](/Users/abdilahiqayre/project/components/office-card.tsx) |
| Bilingual | New release-scope UI avoids mixed-language fragments in core flows | done | location and trust surfaces reviewed and corrected |
| Verification | `npm run build` | passed | `✓ Compiled successfully in 2.1s` |
| Verification | `npm run lint` | passed | exit code `0` |
| Verification | `npm run test:e2e` | passed | `33 passed (14.8s)` |
