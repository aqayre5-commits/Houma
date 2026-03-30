import type { DetectedLocationContext } from '@/types/models'

type HeaderBag = {
  get(name: string): string | null
}

const supportedCityMap: Record<string, 'casablanca' | 'rabat' | 'tanger'> = {
  casablanca: 'casablanca',
  'dar البيضاء': 'casablanca',
  'دار البيضاء': 'casablanca',
  'casablanca-anfa': 'casablanca',
  rabat: 'rabat',
  الرباط: 'rabat',
  tanger: 'tanger',
  tangier: 'tanger',
  طنجة: 'tanger',
}

export function normalizeSupportedCity(input?: string | null): 'casablanca' | 'rabat' | 'tanger' | null {
  if (!input) return null
  const normalized = input
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
  return supportedCityMap[normalized] ?? null
}

export function normalizePostalCode(input?: string | null): string | null {
  if (!input) return null
  const value = input.replace(/[^0-9]/g, '').slice(0, 5)
  return value.length === 5 ? value : null
}

export function getDetectedLocationLabelFromHeaders(headerBag: HeaderBag): string | null {
  const rawCity =
    headerBag.get('x-vercel-ip-city') ??
    headerBag.get('x-vercel-id-city') ??
    headerBag.get('x-city')

  if (!rawCity) return null

  const trimmed = rawCity.trim()
  if (!trimmed) return null

  return normalizeSupportedCity(trimmed) ? null : trimmed
}

export function getDetectedLocationContextFromHeaders(headerBag: HeaderBag): DetectedLocationContext {
  const country = headerBag.get('x-vercel-ip-country')
  const citySlug =
    country && country !== 'MA'
      ? null
      : normalizeSupportedCity(
          headerBag.get('x-vercel-ip-city') ??
            headerBag.get('x-vercel-id-city') ??
            headerBag.get('x-city'),
        )
  const postalCode = normalizePostalCode(
    headerBag.get('x-vercel-ip-postal-code') ??
      headerBag.get('x-postal-code') ??
      headerBag.get('x-zip'),
  )

  if (!citySlug) {
    return {
      source: 'none',
      citySlug: null,
      neighborhoodSlug: null,
      localAreaSlug: null,
      postalCode,
      latitude: null,
      longitude: null,
      accuracyMeters: null,
      confidence: 'unsupported',
      confirmedByUser: false,
      conflictReason: null,
    }
  }

  return {
    source: 'ip',
    citySlug,
    neighborhoodSlug: null,
    localAreaSlug: null,
    postalCode,
    latitude: null,
    longitude: null,
    accuracyMeters: null,
    confidence: postalCode ? 'medium' : 'low',
    confirmedByUser: false,
    conflictReason: null,
  }
}
