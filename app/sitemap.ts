import type { MetadataRoute } from 'next'
import { listGuides, listNeighborhoodsByCity, listOffices, listPublishedServices, listSupportedCities } from '@/lib/content'
import { routes } from '@/lib/routes'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const map = (path: string): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified: now,
  })

  const entries: MetadataRoute.Sitemap = [
    map(routes.home()),
    map(routes.cities()),
    map(routes.services()),
    map(routes.guides()),
    map(routes.faq()),
    map(routes.howItWorks()),
    map(routes.methodology()),
    map(routes.sources()),
    map(routes.about()),
  ]

  const cities = listSupportedCities()
  const services = listPublishedServices()
  const offices = listOffices()

  for (const city of cities) {
    entries.push(map(routes.city(city.slug)))
    for (const neighborhood of listNeighborhoodsByCity(city.slug)) {
      if (neighborhood.indexable) entries.push(map(routes.neighborhood(city.slug, neighborhood.slug)))
    }
  }

  for (const service of services) {
    entries.push(map(routes.service(service.slug)))
    for (const city of cities) {
      entries.push(map(routes.cityService(city.slug, service.slug)))
      for (const neighborhood of listNeighborhoodsByCity(city.slug)) {
        if (neighborhood.indexable && service.canonicalNeighborhoodEligible) {
          entries.push(map(routes.neighborhoodService(city.slug, neighborhood.slug, service.slug)))
        }
      }
    }
  }

  for (const office of offices) {
    if (office.status === 'active') entries.push(map(routes.office(office.slug)))
  }

  for (const guide of listGuides()) {
    entries.push(map(routes.guide(guide.slug)))
  }

  return entries
}
