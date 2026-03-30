'use client'

import { buildGpsDetectedContext, type ReverseGeocodeDetail } from '@/lib/location-gps'
import { routes } from '@/lib/routes'

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

async function getGpsDetectedContext() {
  const position = await getBrowserPosition()
  const reverse = await reverseGeocode(position.coords.latitude, position.coords.longitude)
  return {
    localAddress: reverse.localAddress,
    context: buildGpsDetectedContext({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracyMeters: position.coords.accuracy,
      detail: reverse.detail,
      ipContext: null,
    }).context,
  }
}

export async function resolveServiceEntryHref(serviceSlug: string) {
  try {
    const gpsResult = await getGpsDetectedContext()
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
    // Fall back to the compact resolver page when precise location is unavailable.
  }

  return routes.service(serviceSlug)
}
