'use client'

import { buildGpsDetectedContext, type ReverseGeocodeDetail } from '@/lib/location-gps'
import { routes } from '@/lib/routes'
import type { DetectedLocationContext } from '@/types/models'

async function getIpDetectedContext(): Promise<{
  context: DetectedLocationContext
  detectedLabel: string | null
}> {
  const response = await fetch('/api/detect-location', {
    cache: 'no-store',
    signal: AbortSignal.timeout(4000),
  })

  const data = (await response.json()) as {
    ok?: boolean
    context?: DetectedLocationContext
    detectedLabel?: string | null
  }

  return {
    context: data.context ?? {
      source: 'none',
      citySlug: null,
      neighborhoodSlug: null,
      localAreaSlug: null,
      postalCode: null,
      latitude: null,
      longitude: null,
      accuracyMeters: null,
      confidence: 'unsupported',
      confirmedByUser: false,
      conflictReason: null,
    },
    detectedLabel: data.detectedLabel ?? null,
  }
}

async function getBrowserPosition() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation unavailable'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => {
        if (error.code === error.PERMISSION_DENIED) reject(new Error('Permission denied'))
        else if (error.code === error.TIMEOUT) reject(new Error('Location request timed out'))
        else reject(new Error('Unable to detect precise location'))
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 300000 },
    )
  })
}

async function reverseGeocode(latitude: number, longitude: number): Promise<{
  detail: ReverseGeocodeDetail
  localAddress: string | null
}> {
  const response = await fetch(`/api/reverse-geocode?lat=${latitude}&lon=${longitude}`, {
    signal: AbortSignal.timeout(8000),
  })

  if (!response.ok) {
    throw new Error('Reverse geocoding failed')
  }

  const data = (await response.json()) as {
    ok?: boolean
    reason?: string
    detail?: ReverseGeocodeDetail
    localAddress?: string | null
  }

  if (!data.ok || !data.detail) {
    throw new Error(data.reason ?? 'Reverse geocoding failed')
  }

  return {
    detail: data.detail,
    localAddress: data.localAddress ?? null,
  }
}

async function getGpsDetectedContext(ipContext: DetectedLocationContext | null) {
  const position = await getBrowserPosition()
  const reverse = await reverseGeocode(position.coords.latitude, position.coords.longitude)
  return {
    localAddress: reverse.localAddress,
    context: buildGpsDetectedContext({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracyMeters: position.coords.accuracy,
      detail: reverse.detail,
      ipContext,
    }).context,
  }
}

export async function resolveServiceEntryHref(serviceSlug: string) {
  const { context: ipContext, detectedLabel: ipDetectedLabel } = await getIpDetectedContext()

  try {
    const gpsResult = await getGpsDetectedContext(ipContext.citySlug ? ipContext : null)
    const gpsContext = gpsResult.context
    if (gpsContext.citySlug) {
      return routes.cityService(gpsContext.citySlug, serviceSlug, {
        localAreaSlug: gpsContext.confidence === 'high' ? gpsContext.localAreaSlug : null,
        source: gpsContext.source,
        confidence: gpsContext.confidence,
      })
    }

    if (gpsResult.localAddress) {
      return routes.service(serviceSlug, {
        source: gpsContext.source,
        confidence: gpsContext.confidence,
        detectedLabel: gpsResult.localAddress,
      })
    }
  } catch {
    // Fall back to IP-based detection or the compact resolver page.
  }

  if (ipContext.citySlug) {
    return routes.cityService(ipContext.citySlug, serviceSlug, {
      localAreaSlug: ipContext.confidence === 'high' ? ipContext.localAreaSlug : null,
      source: ipContext.source,
        confidence: ipContext.confidence,
      })
  }

  return routes.service(serviceSlug, {
    source: ipContext.source !== 'none' ? ipContext.source : null,
    confidence: ipContext.confidence !== 'unsupported' ? ipContext.confidence : null,
    detectedLabel: ipDetectedLabel,
  })
}
