'use client'

import { useState } from 'react'
import { buildGpsDetectedContext, type ReverseGeocodeDetail } from '@/lib/location-gps'
import type { DetectedLocationContext, LocalAreaRecord } from '@/types/models'

type GpsState =
  | { status: 'idle'; message: null }
  | { status: 'requesting'; message: null }
  | { status: 'error'; message: string }

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
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    )
  })
}

async function reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocodeDetail> {
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
  }

  if (!data.ok || !data.detail) {
    throw new Error(data.reason ?? 'Reverse geocoding failed')
  }

  return data.detail
}

export function useLocationDetection(initialContext: DetectedLocationContext) {
  const [detectedContext, setDetectedContext] = useState<DetectedLocationContext>(initialContext)
  const [gpsState, setGpsState] = useState<GpsState>({ status: 'idle', message: null })
  const [rankedCandidates, setRankedCandidates] = useState<LocalAreaRecord[]>([])

  async function requestPreciseLocation() {
    setGpsState({ status: 'requesting', message: null })

    try {
      const position = await getBrowserPosition()
      const detail = await reverseGeocode(position.coords.latitude, position.coords.longitude)
      const { context, rankedCandidates: candidates } = buildGpsDetectedContext({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracyMeters: position.coords.accuracy,
        detail,
        ipContext: detectedContext.source === 'ip' || detectedContext.source === 'ip_gps' ? detectedContext : null,
      })

      setDetectedContext(context)
      setRankedCandidates(candidates)
      setGpsState({ status: 'idle', message: null })
      return { ok: true as const, context, candidates }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to detect precise location'
      setGpsState({ status: 'error', message })
      return { ok: false as const, message }
    }
  }

  return {
    detectedContext,
    setDetectedContext,
    gpsState,
    rankedCandidates,
    setRankedCandidates,
    requestPreciseLocation,
  }
}
