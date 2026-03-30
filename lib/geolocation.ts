export type CoveredCity = {
  slug: string
  name: string
  lat: number
  lon: number
}

export const coveredCities: CoveredCity[] = [
  { slug: 'casablanca', name: 'Casablanca', lat: 33.5731, lon: -7.5898 },
  { slug: 'rabat',      name: 'Rabat',      lat: 34.0209, lon: -6.8416 },
  { slug: 'tanger',     name: 'Tanger',     lat: 35.7595, lon: -5.8340 },
]

/** Maximum distance (km) to consider a user "inside" a covered city area. */
export const MAX_COVERAGE_KM = 80

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function nearestCoveredCity(lat: number, lon: number): {
  city: CoveredCity
  distanceKm: number
  withinCoverage: boolean
} {
  let nearest = coveredCities[0]
  let minDist = haversineKm(lat, lon, nearest.lat, nearest.lon)

  for (const city of coveredCities.slice(1)) {
    const dist = haversineKm(lat, lon, city.lat, city.lon)
    if (dist < minDist) {
      minDist = dist
      nearest = city
    }
  }

  return {
    city: nearest,
    distanceKm: Math.round(minDist),
    withinCoverage: minDist <= MAX_COVERAGE_KM,
  }
}
