'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { nearestCoveredCity } from '@/lib/geolocation'
import { track } from '@/lib/analytics'

type DetectionResult = {
  city: string           // slug
  cityName: string       // display name
  distanceKm: number
  withinCoverage: boolean
  method: 'gps' | 'ip'
  localAddress: string | null  // neighbourhood/suburb/district or IP region
}

type State =
  | { kind: 'idle' }
  | { kind: 'asking' }
  | { kind: 'detecting' }
  | { kind: 'detected'; result: DetectionResult }
  | { kind: 'out_of_coverage'; result: DetectionResult }
  | { kind: 'dismissed' }
  | { kind: 'failed'; reason: string }

const SESSION_KEY = 'qriba_location_v1'

function loadSession(): State | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as State
  } catch {
    return null
  }
}

function saveSession(state: State) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state))
  } catch { /* private-mode edge case */ }
}

// ── GPS + reverse geocode ─────────────────────────────────────────────────────

async function getGPSCoords(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('geolocation_unavailable'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(new Error(`gps_error_${err.code}`)),
      { timeout: 8000, maximumAge: 300_000 }
    )
  })
}

async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `/api/reverse-geocode?lat=${lat}&lon=${lon}`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) return null
    const data: Record<string, unknown> = await res.json()
    if (!data.ok || typeof data.localAddress !== 'string') return null
    return data.localAddress || null
  } catch {
    return null
  }
}

async function detectViaGPS(): Promise<DetectionResult> {
  const coords = await getGPSCoords()
  const { latitude, longitude } = coords
  const { city, distanceKm, withinCoverage } = nearestCoveredCity(latitude, longitude)

  // Reverse geocode runs in parallel — we don't block the result on it
  const localAddress = await reverseGeocode(latitude, longitude)

  return {
    city: city.slug,
    cityName: city.name,
    distanceKm,
    withinCoverage,
    method: 'gps',
    localAddress,
  }
}

// ── IP geolocation ────────────────────────────────────────────────────────────

async function detectViaIP(): Promise<DetectionResult> {
  const res = await fetch('/api/detect-location', { signal: AbortSignal.timeout(6000) })
  if (!res.ok) throw new Error('ip_fetch_failed')
  const data: Record<string, unknown> = await res.json()
  if (!data.ok) throw new Error(String(data.reason ?? 'ip_failed'))
  return {
    city: String(data.city),
    cityName: String(data.cityName),
    distanceKm: Number(data.distanceKm),
    withinCoverage: Boolean(data.withinCoverage),
    method: 'ip',
    localAddress: typeof data.localAddress === 'string' ? data.localAddress : null,
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function LocationDetector() {
  const [state, setState] = useState<State>({ kind: 'idle' })

  useEffect(() => {
    const saved = loadSession()
    setState(saved ?? { kind: 'asking' })
  }, [])

  async function handleDetect() {
    setState({ kind: 'detecting' })
    track('location_detect_start', { route: '/' })

    // 1. Try GPS (most precise — neighbourhood level)
    try {
      const result = await detectViaGPS()
      const next: State = result.withinCoverage
        ? { kind: 'detected', result }
        : { kind: 'out_of_coverage', result }
      setState(next)
      saveSession(next)
      track('location_detect_success', { method: 'gps', city: result.city })
      return
    } catch { /* GPS denied or unavailable — fall through */ }

    // 2. IP fallback (city/region level)
    try {
      const result = await detectViaIP()
      const next: State = result.withinCoverage
        ? { kind: 'detected', result }
        : { kind: 'out_of_coverage', result }
      setState(next)
      saveSession(next)
      track('location_detect_success', { method: 'ip', city: result.city })
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown'
      const next: State = { kind: 'failed', reason }
      setState(next)
      saveSession(next)
      track('location_detect_failed', { reason })
    }
  }

  function handleDismiss() {
    const next: State = { kind: 'dismissed' }
    setState(next)
    saveSession(next)
    track('location_detect_dismissed', { route: '/' })
  }

  function handleReset() {
    try { sessionStorage.removeItem(SESSION_KEY) } catch { /* ok */ }
    setState({ kind: 'asking' })
  }

  if (state.kind === 'idle' || state.kind === 'dismissed') return null

  // ── Asking ───────────────────────────────────────────────────────────────────
  if (state.kind === 'asking') {
    return (
      <div className="card border-teal-200 bg-teal-50 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-teal-900">
              Voir les bureaux proches de chez vous
            </p>
            <p className="text-sm text-teal-800">
              Votre position (GPS ou adresse IP en secours) nous permet d'identifier votre ville et les bureaux compétents les plus proches. L'etat de ce module peut etre conserve temporairement pendant la session du navigateur.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              onClick={handleDetect}
              className="rounded-full bg-teal-700 px-4 py-2 text-sm font-medium text-white"
            >
              Détecter ma position
            </button>
            <button
              onClick={handleDismiss}
              className="rounded-full border border-teal-300 px-4 py-2 text-sm font-medium text-teal-700"
            >
              Continuer sans
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Detecting ─────────────────────────────────────────────────────────────────
  if (state.kind === 'detecting') {
    return (
      <div className="card border-teal-200 bg-teal-50 p-4">
        <div className="flex items-center gap-3">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
          <p className="text-sm text-teal-800">Localisation en cours — GPS, puis adresse IP si nécessaire…</p>
        </div>
      </div>
    )
  }

  // ── Detected (within coverage) ────────────────────────────────────────────────
  if (state.kind === 'detected') {
    const { result } = state
    return (
      <div className="card border-teal-300 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            {/* Pin icon */}
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1C5.79 1 4 2.79 4 5c0 3.25 4 10 4 10s4-6.75 4-10c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="8" cy="5" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-900">{result.cityName}</p>
              {result.localAddress && (
                <p className="mt-0.5 text-sm text-slate-600">{result.localAddress}</p>
              )}
              <p className="mt-1 text-xs text-slate-400">
                {result.method === 'gps'
                  ? `GPS · précision quartier${result.distanceKm > 0 ? ` · ${result.distanceKm} km du centre-ville` : ''}`
                  : `Adresse IP · précision ville${result.distanceKm > 0 ? ` · ${result.distanceKm} km du centre` : ''}`}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/villes/${result.city}`}
              className="rounded-full bg-teal-700 px-4 py-2 text-sm font-medium text-white"
              onClick={() => track('location_city_click', { city: result.city, method: result.method })}
            >
              Voir {result.cityName}
            </Link>
            <button
              onClick={handleReset}
              className="rounded-full border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600"
            >
              Changer
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Out of coverage ────────────────────────────────────────────────────────────
  if (state.kind === 'out_of_coverage') {
    const { result } = state
    return (
      <div className="card border-amber-200 bg-amber-50 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-900">Position détectée · hors périmètre</p>
            {result.localAddress && (
              <p className="mt-0.5 text-sm text-amber-800">{result.localAddress}</p>
            )}
            <p className="mt-1 text-sm text-amber-700">
              Ville couverte la plus proche : <strong>{result.cityName}</strong> ({result.distanceKm} km).
              Houma couvre Casablanca, Rabat et Tanger.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link
              href={`/villes/${result.city}`}
              className="rounded-full border border-amber-400 bg-white px-4 py-2 text-sm font-medium text-amber-900"
            >
              Voir {result.cityName}
            </Link>
            <button
              onClick={handleReset}
              className="rounded-full border border-amber-300 px-3 py-2 text-xs font-medium text-amber-700"
            >
              Changer
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Failed ─────────────────────────────────────────────────────────────────────
  if (state.kind === 'failed') {
    return (
      <div className="card border-slate-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Localisation impossible. Sélectionnez votre ville directement ci-dessous.
          </p>
          <button
            onClick={handleDismiss}
            className="shrink-0 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600"
          >
            Fermer
          </button>
        </div>
      </div>
    )
  }

  return null
}
