import { localAreas } from '@/content/local-areas'
import { nearestCoveredCity } from '@/lib/geolocation'
import { normalizePostalCode, normalizeSupportedCity } from '@/lib/location-ip'
import { getPostcodeLocalAreaCandidates } from '@/lib/location-postcode'
import type { DetectedLocationContext, LocalAreaRecord } from '@/types/models'

export type ReverseGeocodeDetail = {
  road?: string | null
  neighbourhood?: string | null
  suburb?: string | null
  district?: string | null
  city?: string | null
  region?: string | null
  postcode?: string | null
}

function normalizeText(value?: string | null) {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function scoreLocalArea(record: LocalAreaRecord, detail: ReverseGeocodeDetail) {
  const haystack = [
    record.displayLabelFr,
    record.provinceOrPrefecture,
    record.commune,
    record.prefectureArrondissement,
    record.arrondissement,
    record.bureauEtatCivil,
  ]
    .filter(Boolean)
    .map((value) => normalizeText(value))
    .join(' | ')

  const terms = [
    detail.neighbourhood,
    detail.suburb,
    detail.district,
    detail.road,
  ]
    .filter(Boolean)
    .map((value) => normalizeText(value))
    .filter((value) => value.length >= 3)

  let score = 0
  for (const term of terms) {
    if (haystack.includes(term)) score += 4
    else if (haystack.includes(term.replace(/\barrondissement\b/g, '').trim())) score += 3
    else if (term.split(/\s+/).some((token) => token.length >= 4 && haystack.includes(token))) score += 1
  }
  return score
}

export function rankGpsLocalAreaCandidates(
  citySlug: string | null,
  detail: ReverseGeocodeDetail,
): LocalAreaRecord[] {
  if (!citySlug) return []
  const candidates = Object.values(localAreas)
    .filter((record) => record.citySlug === citySlug)
    .map((record) => ({ record, score: scoreLocalArea(record, detail) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  if (candidates.length === 0) return []
  const bestScore = candidates[0].score
  return candidates.filter((item) => item.score === bestScore).map((item) => item.record)
}

export function buildGpsDetectedContext(input: {
  latitude: number
  longitude: number
  accuracyMeters: number | null
  detail: ReverseGeocodeDetail
  ipContext?: DetectedLocationContext | null
}): {
  context: DetectedLocationContext
  rankedCandidates: LocalAreaRecord[]
} {
  const nearest = nearestCoveredCity(input.latitude, input.longitude)
  const reverseCitySlug = normalizeSupportedCity(input.detail.city ?? null)
  const derivedCitySlug = reverseCitySlug ?? (nearest.withinCoverage ? nearest.city.slug : null)
  const postalCode = normalizePostalCode(input.detail.postcode ?? input.ipContext?.postalCode ?? null)
  const postcodeCandidates = getPostcodeLocalAreaCandidates(derivedCitySlug, postalCode)
  const gpsCandidates = rankGpsLocalAreaCandidates(derivedCitySlug, input.detail)
  const mergedCandidateMap = new Map<string, LocalAreaRecord>()

  for (const candidate of [...gpsCandidates, ...postcodeCandidates]) {
    mergedCandidateMap.set(candidate.localAreaSlug, candidate)
  }

  const rankedCandidates = Array.from(mergedCandidateMap.values()).sort((a, b) => {
    const aGpsRank = gpsCandidates.some((candidate) => candidate.localAreaSlug === a.localAreaSlug) ? 0 : 1
    const bGpsRank = gpsCandidates.some((candidate) => candidate.localAreaSlug === b.localAreaSlug) ? 0 : 1
    if (aGpsRank !== bGpsRank) return aGpsRank - bGpsRank
    return a.displayLabelFr.localeCompare(b.displayLabelFr)
  })

  const ipCitySlug = input.ipContext?.citySlug ?? null
  const conflict =
    ipCitySlug &&
    derivedCitySlug &&
    ipCitySlug !== derivedCitySlug

  let confidence: DetectedLocationContext['confidence'] = 'low'
  if (!derivedCitySlug) confidence = 'unsupported'
  else if (conflict) confidence = 'conflict'
  else if (gpsCandidates.length === 1 && (input.accuracyMeters ?? Infinity) <= 250) confidence = 'high'
  else if (rankedCandidates.length > 0) confidence = 'medium'
  else if ((input.accuracyMeters ?? Infinity) <= 1500) confidence = 'low'
  else confidence = 'unsupported'

  const preferredLocalArea =
    confidence === 'high'
      ? gpsCandidates[0] ?? rankedCandidates[0] ?? null
      : null

  return {
    context: {
      source: input.ipContext?.citySlug ? 'ip_gps' : 'gps',
      citySlug: derivedCitySlug,
      neighborhoodSlug: rankedCandidates[0]?.localAreaSlug ?? null,
      localAreaSlug: preferredLocalArea?.localAreaSlug ?? null,
      postalCode,
      latitude: input.latitude,
      longitude: input.longitude,
      accuracyMeters: input.accuracyMeters,
      confidence,
      confirmedByUser: false,
      conflictReason: conflict
        ? `GPS suggests ${derivedCitySlug} while IP suggests ${ipCitySlug}.`
        : null,
    },
    rankedCandidates,
  }
}
