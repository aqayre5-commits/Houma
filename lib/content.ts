import { cities as legacyCities, cityServices as legacyCityServices, getCity as getLegacyCity, getCityService as getLegacyCityService, getOffice as getLegacyOffice, getService as getLegacyService, listCities as listLegacyCities, listOffices as listLegacyOffices, listServices as listLegacyServices, offices as legacyOffices } from '@/lib/data'
import { cities, cityOrder } from '@/content/cities'
import { cityServices } from '@/content/city-services'
import { faqs, faqOrder } from '@/content/faqs'
import { featuredGuideSlugs, guideOrder, guides } from '@/content/guides'
import { localAreas, localAreaOrderByCity } from '@/content/local-areas'
import { masterServices, featuredServiceSlugs } from '@/content/master-services'
import { neighborhoods } from '@/content/neighborhoods'
import { offices } from '@/content/offices'
import { aboutPageCopy, homePageCopy, methodologyPageCopy, sourcePageCopy } from '@/content/site-copy'
import { sourceGroups, sources } from '@/content/sources'
import type {
  City,
  CityService,
  CityServiceRecord,
  ContentCity,
  FaqRecord,
  GuideRecord,
  LocalAreaRecord,
  MasterService,
  Neighborhood,
  Office,
  OfficeRecord,
  SearchIndexEntry,
  Service,
  SourceRecord,
} from '@/types/models'

export function getCity(slug: string): ContentCity | null {
  return cities[slug] ?? null
}

export function listSupportedCities(): ContentCity[] {
  return cityOrder.map((slug) => cities[slug]).filter(Boolean)
}

export function getNeighborhood(citySlug: string, neighborhoodSlug: string): Neighborhood | null {
  return neighborhoods[`${citySlug}-${neighborhoodSlug}`] ?? null
}

export function listNeighborhoodsByCity(citySlug: string): Neighborhood[] {
  return (localAreaOrderByCity[citySlug as keyof typeof localAreaOrderByCity] ?? [])
    .map((slug) => neighborhoods[`${citySlug}-${slug}`])
    .filter(Boolean)
}

export function getLocalArea(citySlug: string, localAreaSlug: string): LocalAreaRecord | null {
  const record = localAreas[localAreaSlug] ?? null
  return record?.citySlug === citySlug ? record : null
}

export function listLocalAreasByCity(citySlug: string): LocalAreaRecord[] {
  return (localAreaOrderByCity[citySlug as keyof typeof localAreaOrderByCity] ?? [])
    .map((slug) => localAreas[slug])
    .filter(Boolean)
}

export function getOffice(slug: string): OfficeRecord | null {
  return offices[slug] ?? null
}

export function listOfficesByCity(citySlug: string): OfficeRecord[] {
  return Object.values(offices).filter((office) => office.citySlug === citySlug)
}

export function listOfficesByCityAndService(citySlug: string, serviceSlug: string): OfficeRecord[] {
  return Object.values(offices).filter(
    (office) => office.citySlug === citySlug && office.supportedServices.includes(serviceSlug),
  )
}

export function listOffices(): OfficeRecord[] {
  return Object.values(offices)
}

export function getSource(slug: string): SourceRecord | null {
  return sources[slug] ?? null
}

export function listSources(): SourceRecord[] {
  return Object.values(sources)
}

export function listSourcesForService(serviceSlug: string): SourceRecord[] {
  return Object.values(sources).filter((source) => source.serviceSlugs.includes(serviceSlug))
}

export function getMasterService(slug: string): MasterService | null {
  return masterServices[slug] ?? null
}

export function listPublishedServices(): MasterService[] {
  return Object.values(masterServices)
}

export function getCityServiceRecord(citySlug: string, serviceSlug: string): CityServiceRecord | null {
  return cityServices[`${citySlug}-${serviceSlug}`] ?? null
}

export function listPublishedCityServices(citySlug: string): CityServiceRecord[] {
  return Object.values(cityServices).filter((entry) => entry.citySlug === citySlug && entry.isPublished)
}

export function getHomepageData() {
  return {
    cities: listSupportedCities(),
    featuredServices: featuredServiceSlugs.map((slug) => masterServices[slug]).filter(Boolean),
    publishedServiceCount: listPublishedServices().length,
    sourcePreview: ['passeport', 'idarati', 'tax'].map((slug) => sources[slug]).filter(Boolean),
    copy: homePageCopy,
  }
}

export function getAboutData() {
  return {
    copy: aboutPageCopy,
    cityCount: listSupportedCities().length,
    serviceCount: listPublishedServices().length,
  }
}

export function getMethodologyData() {
  return {
    copy: methodologyPageCopy,
    cityCount: listSupportedCities().length,
    serviceCount: listPublishedServices().length,
    sourceCount: listSources().length,
  }
}

export function getSourcePageData() {
  return {
    copy: sourcePageCopy,
    groups: Object.entries(sourceGroups).map(([group, slugs]) => ({
      group,
      sources: slugs.map((slug) => sources[slug]).filter(Boolean),
    })),
  }
}

export function listGuides(): GuideRecord[] {
  return guideOrder.map((slug) => guides[slug]).filter(Boolean)
}

export function listFeaturedGuides(): GuideRecord[] {
  return featuredGuideSlugs.map((slug) => guides[slug]).filter(Boolean)
}

export function getGuide(slug: string): GuideRecord | null {
  return guides[slug] ?? null
}

export function listGuidesForService(serviceSlug: string): GuideRecord[] {
  return Object.values(guides).filter((guide) => guide.relatedServiceSlugs.includes(serviceSlug))
}

export function listGuidesForCity(citySlug: string): GuideRecord[] {
  return Object.values(guides).filter((guide) => guide.relatedCitySlugs.length === 0 || guide.relatedCitySlugs.includes(citySlug))
}

export function listFaqs(): FaqRecord[] {
  return faqOrder.map((id) => faqs[id]).filter(Boolean)
}

export function getFaq(idOrSlug: string): FaqRecord | null {
  return faqs[idOrSlug] ?? Object.values(faqs).find((faq) => faq.slug === idOrSlug) ?? null
}

export function listFaqsForService(serviceSlug: string): FaqRecord[] {
  return Object.values(faqs).filter((faq) => faq.relatedServiceSlugs.includes(serviceSlug))
}

export function listFaqsForCity(citySlug: string): FaqRecord[] {
  return Object.values(faqs).filter((faq) => faq.relatedCitySlugs.length === 0 || faq.relatedCitySlugs.includes(citySlug))
}

export function buildSearchIndex(): SearchIndexEntry[] {
  const entries: SearchIndexEntry[] = []
  for (const city of listSupportedCities()) {
    entries.push({
      type: 'city',
      slug: city.slug,
      titleFr: city.nameFr,
      titleAr: city.nameAr,
      citySlug: city.slug,
      href: `/villes/${city.slug}`,
      keywords: [city.nameFr.toLowerCase(), city.nameAr, ...(city.districts ?? [])],
    })
  }

  for (const service of listPublishedServices()) {
    entries.push({
      type: 'service',
      slug: service.slug,
      titleFr: service.titleFr,
      titleAr: service.titleAr,
      serviceSlug: service.slug,
      href: `/demarches/${service.slug}`,
      keywords: [service.categoryFr.toLowerCase(), service.categoryAr],
    })
  }

  for (const record of Object.values(cityServices)) {
    const service = getMasterService(record.serviceSlug)
    if (!service) continue
    const city = getCity(record.citySlug)
    entries.push({
      type: 'city_service',
      slug: `${record.citySlug}-${record.serviceSlug}`,
      titleFr: `${service.titleFr} à ${city?.nameFr ?? record.citySlug}`,
      titleAr: `${service.titleAr} في ${city?.nameAr ?? record.citySlug}`,
      citySlug: record.citySlug,
      serviceSlug: record.serviceSlug,
      href: `/villes/${record.citySlug}/demarches/${record.serviceSlug}`,
      keywords: [service.titleFr.toLowerCase(), service.titleAr, city?.nameFr.toLowerCase() ?? record.citySlug, city?.nameAr ?? record.citySlug],
    })
  }

  for (const office of listOffices()) {
    entries.push({
      type: 'office',
      slug: office.slug,
      titleFr: office.nameFr,
      titleAr: office.nameAr,
      citySlug: office.citySlug,
      officeSlug: office.slug,
      href: `/bureaux/${office.slug}`,
      keywords: [office.districtSlug, ...office.supportedServices],
    })
  }

  for (const neighborhood of Object.values(neighborhoods)) {
    const localArea = getLocalArea(neighborhood.citySlug, neighborhood.slug)
    entries.push({
      type: 'neighborhood',
      slug: `${neighborhood.citySlug}-${neighborhood.slug}`,
      titleFr: neighborhood.nameFr,
      titleAr: neighborhood.nameAr,
      citySlug: neighborhood.citySlug,
      neighborhoodSlug: neighborhood.slug,
      href: `/villes/${neighborhood.citySlug}/quartiers/${neighborhood.slug}`,
      keywords: [
        neighborhood.nameFr.toLowerCase(),
        neighborhood.nameAr,
        ...(neighborhood.aliases ?? []),
        localArea?.provinceOrPrefecture,
        localArea?.commune,
        localArea?.prefectureArrondissement,
        localArea?.arrondissement,
        localArea?.bureauEtatCivil,
      ].filter(Boolean) as string[],
    })
  }

  return entries
}

// Temporary legacy exports for route migration.
export function listLegacyCityCards(): City[] {
  return listLegacyCities()
}

export function listLegacyServiceCards(): Service[] {
  return listLegacyServices()
}

export function listLegacyOfficeCards(): Office[] {
  return listLegacyOffices()
}

export function getLegacyCityCard(slug: string) {
  return getLegacyCity(slug)
}

export function getLegacyServiceCard(slug: string) {
  return getLegacyService(slug)
}

export function getLegacyOfficeCard(slug: string) {
  return getLegacyOffice(slug)
}

export function getLegacyCityServiceCard(citySlug: string, serviceSlug: string): CityService | null {
  return getLegacyCityService(citySlug, serviceSlug)
}

export { legacyCities, legacyOffices, legacyCityServices }
