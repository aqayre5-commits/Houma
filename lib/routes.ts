type RouteLocationOptions = {
  localAreaSlug?: string | null
  neighborhoodSlug?: string | null
  source?: string | null
  confidence?: string | null
  serviceSlug?: string | null
  detectedLabel?: string | null
}

function withLocationParams(path: string, options?: RouteLocationOptions) {
  const params = new URLSearchParams()
  if (options?.localAreaSlug) params.set('localArea', options.localAreaSlug)
  if (options?.neighborhoodSlug) params.set('neighborhood', options.neighborhoodSlug)
  if (options?.source) params.set('source', options.source)
  if (options?.confidence) params.set('confidence', options.confidence)
  if (options?.serviceSlug) params.set('service', options.serviceSlug)
  if (options?.detectedLabel) params.set('detectedLabel', options.detectedLabel)
  const query = params.toString()
  return query ? `${path}?${query}` : path
}

export const routes = {
  home: () => '/',
  search: (params?: string) => (params ? `/recherche?${params}` : '/recherche'),
  cities: () => '/villes',
  city: (citySlug: string, options?: RouteLocationOptions) => withLocationParams(`/villes/${citySlug}`, options),
  services: () => '/demarches',
  service: (serviceSlug: string, options?: RouteLocationOptions) => withLocationParams(`/demarches/${serviceSlug}`, options),
  guides: () => '/guides',
  guide: (slug: string) => `/guides/${slug}`,
  faq: () => '/faq',
  howItWorks: () => '/comment-ca-marche',
  legalNotice: () => '/mentions-legales',
  privacy: () => '/confidentialite',
  cookies: () => '/cookies',
  cityService: (citySlug: string, serviceSlug: string, options?: RouteLocationOptions) =>
    withLocationParams(`/villes/${citySlug}/demarches/${serviceSlug}`, options),
  neighborhood: (citySlug: string, neighborhoodSlug: string, options?: RouteLocationOptions) =>
    withLocationParams(`/villes/${citySlug}/quartiers/${neighborhoodSlug}`, options),
  neighborhoodService: (citySlug: string, neighborhoodSlug: string, serviceSlug: string, options?: RouteLocationOptions) =>
    withLocationParams(`/villes/${citySlug}/quartiers/${neighborhoodSlug}/demarches/${serviceSlug}`, options),
  offices: () => '/bureaux',
  office: (officeSlug: string) => `/bureaux/${officeSlug}`,
  methodology: () => '/methodologie',
  sources: () => '/sources',
  about: () => '/a-propos',
  issue: () => '/signaler-une-erreur',
  sponsors: () => '/annonceurs',
}
