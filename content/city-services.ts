import { cities as cityRegistry } from '@/content/cities'
import { cityServices as legacyCityServices, services as legacyServices } from '@/lib/data'
import type { CityServiceRecord } from '@/types/models'

export const cityServices: Record<string, CityServiceRecord> = Object.fromEntries(
  Object.entries(legacyCityServices).map(([key, entry]) => {
    const service = legacyServices[entry.serviceSlug]
    const city = cityRegistry[entry.citySlug]
    const localSourceSlugs = service.docsSourceUrl.includes('tax.gov.ma')
      ? ['tax', 'mavignette', 'vignette']
      : undefined

    return [
      key,
      {
        citySlug: entry.citySlug,
        serviceSlug: entry.serviceSlug,
        masterServiceSlug: entry.serviceSlug,
        isPublished: true,
        localSummaryFr: `${service.summary} ${city ? `Repère de ville: ${city.nameFr}.` : ''}`.trim(),
        localSummaryAr: `${service.summaryAr} ${city ? `مرجع المدينة: ${city.nameAr}.` : ''}`.trim(),
        localOfficeNoteFr: entry.fallbackNote,
        localOfficeNoteAr: entry.fallbackNoteAr,
        heroTagFr: city?.nameFr ?? entry.citySlug,
        heroTagAr: city?.nameAr ?? entry.citySlug,
        localSourceSlugs,
      } satisfies CityServiceRecord,
    ]
  }),
)
