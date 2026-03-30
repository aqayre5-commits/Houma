'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cities, cityOrder } from '@/content/cities'
import { localAreas, localAreaOrderByCity } from '@/content/local-areas'
import { track } from '@/lib/analytics'
import type { Lang } from '@/lib/lang'
import { formatGpsError, getDetectedLocalAreaLabel } from '@/lib/location-ui'
import { saveConfirmedLocationContext } from '@/lib/location-storage'
import { createEmptyDetectedLocationContext, resolveDetectedLocationContext } from '@/lib/resolver'
import { routes } from '@/lib/routes'
import { useLocationDetection } from '@/hooks/use-location-detection'
import type { DetectedLocationContext, LocalAreaRecord } from '@/types/models'

function getCityLabel(citySlug: string, lang: Lang) {
  return lang === 'ar' ? cities[citySlug].nameAr : cities[citySlug].nameFr
}

function getLocalAreaLabel(record: LocalAreaRecord, lang: Lang) {
  return lang === 'ar' ? record.displayLabelAr ?? record.displayLabelFr : record.displayLabelFr
}

function canUseDetectedContext(context: DetectedLocationContext) {
  return Boolean(context.citySlug)
}

function buildInitialContext(input: {
  citySlug: string
  localAreaSlug?: string | null
  sourceType?: string | null
  confidence?: string | null
}) {
  return {
    ...createEmptyDetectedLocationContext(),
    source: (input.sourceType ?? 'manual') as DetectedLocationContext['source'],
    citySlug: input.citySlug,
    neighborhoodSlug: input.localAreaSlug ?? null,
    localAreaSlug: input.localAreaSlug ?? null,
    confidence: (input.confidence ?? (input.localAreaSlug ? 'high' : 'medium')) as DetectedLocationContext['confidence'],
    confirmedByUser: Boolean(input.localAreaSlug),
  }
}

export function ServiceAreaPicker({
  lang = 'fr',
  citySlug,
  serviceSlug,
  currentLocalAreaSlug,
  sourceType,
  confidence,
  requiresLocalArea,
}: {
  lang?: Lang
  citySlug: string
  serviceSlug: string
  currentLocalAreaSlug?: string | null
  sourceType?: string | null
  confidence?: string | null
  requiresLocalArea: boolean
}) {
  const router = useRouter()
  const isAr = lang === 'ar'
  const initialContext = useMemo(
    () =>
      buildInitialContext({
        citySlug,
        localAreaSlug: currentLocalAreaSlug,
        sourceType,
        confidence,
      }),
    [citySlug, confidence, currentLocalAreaSlug, sourceType],
  )
  const [open, setOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState(initialContext.citySlug ?? citySlug)
  const [selectedLocalArea, setSelectedLocalArea] = useState(initialContext.localAreaSlug ?? '')
  const [manualTouched, setManualTouched] = useState(false)
  const { detectedContext, gpsState, rankedCandidates, requestPreciseLocation } = useLocationDetection(initialContext)

  const localAreaOptions = useMemo(
    () =>
      selectedCity
        ? (localAreaOrderByCity[selectedCity as keyof typeof localAreaOrderByCity] ?? [])
            .map((slug) => localAreas[slug])
            .filter(Boolean)
        : [],
    [selectedCity],
  )

  const candidateAreaLabel = useMemo(
    () => getDetectedLocalAreaLabel(rankedCandidates, lang),
    [lang, rankedCandidates],
  )

  async function handlePreciseLocation() {
    track('location_gps_request', {
      route: routes.cityService(citySlug, serviceSlug),
      service_slug: serviceSlug,
      city_slug: citySlug,
    })

    const result = await requestPreciseLocation()
    if (!result.ok) {
      track('location_gps_error', {
        route: routes.cityService(citySlug, serviceSlug),
        service_slug: serviceSlug,
        city_slug: citySlug,
        reason: result.message,
      })
      return
    }

    track('location_gps_success', {
      route: routes.cityService(citySlug, serviceSlug),
      service_slug: serviceSlug,
      city_slug: result.context.citySlug ?? citySlug,
      confidence: result.context.confidence,
      candidate_count: result.candidates.length,
    })

    setManualTouched(false)
    setSelectedCity(result.context.citySlug ?? citySlug)
    setSelectedLocalArea(result.context.confidence === 'high' ? result.context.localAreaSlug ?? '' : '')
  }

  function handleConfirm() {
    if (!selectedCity) return

    const canKeepDetectedSource =
      !manualTouched &&
      canUseDetectedContext(detectedContext) &&
      detectedContext.citySlug === selectedCity &&
      ((selectedLocalArea && detectedContext.localAreaSlug === selectedLocalArea) ||
        (!selectedLocalArea && !detectedContext.localAreaSlug))

    const finalContext = canKeepDetectedSource
      ? {
          ...detectedContext,
          citySlug: selectedCity,
          neighborhoodSlug: selectedLocalArea || null,
          localAreaSlug: selectedLocalArea || null,
          confirmedByUser: true,
          confidence: (selectedLocalArea ? detectedContext.confidence : detectedContext.confidence === 'unsupported' ? 'medium' : detectedContext.confidence),
        }
      : resolveDetectedLocationContext({
          detectedContext,
          citySlug: selectedCity,
          localAreaSlug: selectedLocalArea || null,
          postalCode: detectedContext.postalCode,
        })

    saveConfirmedLocationContext(finalContext)
    track(finalContext.source === 'manual' ? 'location_confirm_manual' : 'location_confirm_detected', {
      route: routes.cityService(citySlug, serviceSlug),
      service_slug: serviceSlug,
      city_slug: finalContext.citySlug ?? undefined,
      local_area_slug: finalContext.localAreaSlug ?? undefined,
      source: finalContext.source,
      confidence: finalContext.confidence,
    })

    router.push(
      routes.cityService(selectedCity, serviceSlug, {
        localAreaSlug: selectedLocalArea || null,
        source: finalContext.source,
        confidence: finalContext.confidence,
      }),
    )
  }

  const triggerLabel = currentLocalAreaSlug
    ? (isAr ? 'تغيير المنطقة' : 'Changer la zone')
    : (isAr ? 'أضف منطقة' : 'Ajouter une zone')

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-800"
      >
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 md:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-area-picker-title"
            className="w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {isAr ? 'تحديث المنطقة' : 'Mettre à jour la zone'}
                </p>
                <h3 id="service-area-picker-title" className="mt-1 text-lg font-semibold text-slate-900">
                  {isAr ? 'أضف أو غيّر المنطقة' : 'Ajouter ou changer la zone'}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {isAr
                    ? 'ستبقى في صفحة الخدمة نفسها وسنحدّث الجواب المحلي مباشرة.'
                    : 'Vous resterez sur la même page service et la réponse locale sera mise à jour immédiatement.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:border-slate-300"
              >
                {isAr ? 'إغلاق' : 'Fermer'}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-2xl border border-teal-300 px-4 py-2.5 text-sm font-medium text-teal-800 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handlePreciseLocation}
                disabled={gpsState.status === 'requesting'}
              >
                {gpsState.status === 'requesting'
                  ? (isAr ? 'جاري تحديد الموقع...' : 'Localisation précise...')
                  : (isAr ? 'استخدم الموقع الدقيق' : 'Utiliser la position précise')}
              </button>
            </div>

            {gpsState.status === 'error' ? (
              <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {formatGpsError(gpsState.message, lang)}
              </p>
            ) : null}

            {candidateAreaLabel ? (
              <p className="mt-3 text-sm text-slate-600">
                {isAr ? `اقتراح محلي: ${candidateAreaLabel}` : `Suggestion locale : ${candidateAreaLabel}`}
              </p>
            ) : null}

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700" htmlFor="service-area-city-selector">
                {isAr ? 'المدينة' : 'Ville'}
                <select
                  id="service-area-city-selector"
                  aria-label={isAr ? 'المدينة' : 'Ville'}
                  className="mt-1.5 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                  value={selectedCity}
                  onChange={(event) => {
                    setManualTouched(true)
                    setSelectedCity(event.target.value)
                    setSelectedLocalArea('')
                  }}
                >
                  {cityOrder.map((optionCitySlug) => (
                    <option key={optionCitySlug} value={optionCitySlug}>
                      {getCityLabel(optionCitySlug, lang)}
                    </option>
                  ))}
                </select>
              </label>

              {requiresLocalArea ? (
                <label className="block text-sm font-medium text-slate-700" htmlFor="service-area-local-selector">
                  {isAr ? 'المنطقة المختارة' : 'Zone sélectionnée'}
                  <select
                    id="service-area-local-selector"
                    aria-label={isAr ? 'المنطقة المختارة' : 'Zone sélectionnée'}
                    className="mt-1.5 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                    value={selectedLocalArea}
                    onChange={(event) => {
                      setManualTouched(true)
                      setSelectedLocalArea(event.target.value)
                    }}
                  >
                    <option value="">{isAr ? 'تابع على مستوى المدينة' : 'Continuer au niveau ville'}</option>
                    {localAreaOptions.map((localArea) => (
                      <option key={localArea.localAreaSlug} value={localArea.localAreaSlug}>
                        {getLocalAreaLabel(localArea, lang)}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400"
              >
                {isAr ? 'إلغاء' : 'Annuler'}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-2xl bg-teal-700 px-5 py-2.5 text-sm font-medium text-cyan-50"
              >
                {isAr ? 'تأكيد' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
