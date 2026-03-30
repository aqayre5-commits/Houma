'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cities, cityOrder } from '@/content/cities'
import { localAreas, localAreaOrderByCity } from '@/content/local-areas'
import { SelectedAreaSummary } from '@/components/selected-area-summary'
import { track } from '@/lib/analytics'
import { getPostcodeHint, getPostcodeLocalAreaCandidates } from '@/lib/location-postcode'
import { clearConfirmedLocationContext, saveConfirmedLocationContext } from '@/lib/location-storage'
import { formatConflictReason, formatGpsError, formatLocationConfidence, getDetectedLocalAreaLabel } from '@/lib/location-ui'
import { createEmptyDetectedLocationContext, resolveDetectedLocationContext } from '@/lib/resolver'
import { routes } from '@/lib/routes'
import type { Lang } from '@/lib/lang'
import { useLocationDetection } from '@/hooks/use-location-detection'
import type { DetectedLocationContext, LocalAreaRecord } from '@/types/models'

function cityName(citySlug: string | null, lang: Lang) {
  if (!citySlug || !cities[citySlug]) return null
  return lang === 'ar' ? cities[citySlug].nameAr : cities[citySlug].nameFr
}

function reorderOptionsForCandidates(citySlug: string, candidates: LocalAreaRecord[]) {
  const candidateSlugs = new Set(candidates.map((candidate) => candidate.localAreaSlug))
  return (localAreaOrderByCity[citySlug as keyof typeof localAreaOrderByCity] ?? [])
    .map((slug) => localAreas[slug])
    .filter(Boolean)
    .sort((a, b) => {
      const aRank = candidateSlugs.has(a.localAreaSlug) ? 0 : 1
      const bRank = candidateSlugs.has(b.localAreaSlug) ? 0 : 1
      if (aRank !== bRank) return aRank - bRank
      return a.displayLabelFr.localeCompare(b.displayLabelFr)
    })
}

export function SearchForm({
  lang = 'fr',
  initialDetectedContext = createEmptyDetectedLocationContext(),
}: {
  lang?: Lang
  initialDetectedContext?: DetectedLocationContext
}) {
  const router = useRouter()
  const isAr = lang === 'ar'
  const [manualMode, setManualMode] = useState(false)
  const [manualPanelOpen, setManualPanelOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLocalArea, setSelectedLocalArea] = useState('')
  const ipPrefillTracked = useRef(false)
  const postcodeHintTracked = useRef<string | null>(null)
  const preselectedTracked = useRef<string | null>(null)
  const {
    detectedContext,
    setDetectedContext,
    gpsState,
    rankedCandidates,
    setRankedCandidates,
    requestPreciseLocation,
  } = useLocationDetection(initialDetectedContext)

  const postcodeCandidates = useMemo(
    () => getPostcodeLocalAreaCandidates(detectedContext.citySlug, detectedContext.postalCode),
    [detectedContext.citySlug, detectedContext.postalCode],
  )

  const effectiveCandidates = useMemo(() => {
    if (rankedCandidates.length > 0) return rankedCandidates
    return postcodeCandidates
  }, [postcodeCandidates, rankedCandidates])

  const localAreaOptions = useMemo(() => {
    if (!selectedCity) return []
    return reorderOptionsForCandidates(selectedCity, effectiveCandidates)
  }, [effectiveCandidates, selectedCity])

  const postcodeHint = useMemo(
    () => getPostcodeHint(detectedContext.citySlug, detectedContext.postalCode),
    [detectedContext.citySlug, detectedContext.postalCode],
  )
  const detectedLocalAreaLabel = useMemo(
    () => getDetectedLocalAreaLabel(effectiveCandidates, lang),
    [effectiveCandidates, lang],
  )

  useEffect(() => {
    if (initialDetectedContext.citySlug) {
      setSelectedCity(initialDetectedContext.citySlug)
    }
  }, [initialDetectedContext, setDetectedContext])

  useEffect(() => {
    if (detectedContext.source === 'ip' && detectedContext.citySlug && !ipPrefillTracked.current) {
      ipPrefillTracked.current = true
      track('location_ip_prefill', {
        route: '/',
        city_slug: detectedContext.citySlug,
        postal_code: detectedContext.postalCode ?? undefined,
      })
    }
  }, [detectedContext.citySlug, detectedContext.postalCode, detectedContext.source])

  useEffect(() => {
    if (!detectedContext.citySlug) return

    if (!selectedCity && detectedContext.citySlug) {
      setSelectedCity(detectedContext.citySlug)
    }

    if (postcodeHint && postcodeHintTracked.current !== `${postcodeHint.citySlug}:${postcodeHint.postalCode}`) {
      postcodeHintTracked.current = `${postcodeHint.citySlug}:${postcodeHint.postalCode}`
      track('location_postcode_hint', {
        route: '/',
        city_slug: postcodeHint.citySlug,
        postal_code: postcodeHint.postalCode,
        candidate_count: postcodeHint.candidateLocalAreaSlugs.length,
      })
    }

    if (!manualMode && detectedContext.confidence === 'high' && detectedContext.localAreaSlug) {
      setSelectedCity(detectedContext.citySlug)
      setSelectedLocalArea(detectedContext.localAreaSlug)
      if (preselectedTracked.current !== detectedContext.localAreaSlug) {
        preselectedTracked.current = detectedContext.localAreaSlug
        track('location_local_area_preselected', {
          route: '/',
          city_slug: detectedContext.citySlug,
          local_area_slug: detectedContext.localAreaSlug,
          source: detectedContext.source,
        })
      }
    } else if (!manualMode && detectedContext.localAreaSlug == null && rankedCandidates.length > 1) {
      setSelectedLocalArea('')
    }

    if (detectedContext.confidence === 'conflict') {
      track('location_conflict', {
        route: '/',
        city_slug: detectedContext.citySlug ?? undefined,
      })
    }
  }, [detectedContext, manualMode, postcodeHint, rankedCandidates.length, selectedCity])

  const selectedLocalAreaRecord = selectedLocalArea ? localAreas[selectedLocalArea] : null
  const detectedCityName = cityName(detectedContext.citySlug, lang)
  const showDetectedPanel = true

  async function handlePreciseLocation() {
    track('location_gps_request', { route: '/' })
    const result = await requestPreciseLocation()
    if (!result.ok) {
      track('location_gps_error', { route: '/', reason: result.message })
      return
    }

    const { context } = result
    track('location_gps_success', {
      route: '/',
      city_slug: context.citySlug ?? undefined,
      confidence: context.confidence,
      candidate_count: result.candidates.length,
    })
    if (context.citySlug) {
      setSelectedCity(context.citySlug)
    }
    if (context.localAreaSlug && context.confidence === 'high') {
      setSelectedLocalArea(context.localAreaSlug)
    } else {
      setSelectedLocalArea('')
    }
  }

  function handleCityChange(citySlug: string) {
    setManualMode(true)
    setManualPanelOpen(true)
    setSelectedCity(citySlug)
    setSelectedLocalArea('')
    clearConfirmedLocationContext()
    track('location_change', {
      route: '/',
      city_slug: citySlug || undefined,
    })
  }

  function handleLocalAreaChange(localAreaSlug: string) {
    setManualMode(true)
    setManualPanelOpen(true)
    setSelectedLocalArea(localAreaSlug)
    clearConfirmedLocationContext()
  }

  function handleChooseManually() {
    setManualMode(true)
    setManualPanelOpen(true)
    if (!selectedCity && detectedContext.citySlug) {
      setSelectedCity(detectedContext.citySlug)
    }
    if (detectedContext.confidence !== 'high') {
      setSelectedLocalArea('')
    }
    track('click_secondary_cta', {
      cta_name: 'choose_manually',
      route: '/',
    })
  }

  function handleResetArea() {
    setManualMode(false)
    setManualPanelOpen(false)
    setDetectedContext(initialDetectedContext)
    setRankedCandidates([])
    setSelectedCity(initialDetectedContext.citySlug ?? '')
    setSelectedLocalArea(initialDetectedContext.localAreaSlug ?? '')
    clearConfirmedLocationContext()
    track('location_change', { route: '/' })
  }

  function handleClearSelectedArea() {
    setManualMode(true)
    setManualPanelOpen(true)
    setSelectedLocalArea('')
    clearConfirmedLocationContext()
  }

  function handleConfirmArea() {
    if (!selectedCity) return

    const finalContext =
      manualMode || detectedContext.source === 'none'
        ? resolveDetectedLocationContext({
            detectedContext,
            citySlug: selectedCity,
            localAreaSlug: selectedLocalArea || null,
            postalCode: detectedContext.postalCode,
          })
        : {
            ...detectedContext,
            citySlug: selectedCity,
            neighborhoodSlug: selectedLocalArea || detectedContext.neighborhoodSlug,
            localAreaSlug: selectedLocalArea || detectedContext.localAreaSlug,
            confirmedByUser: true,
          }

    saveConfirmedLocationContext(finalContext)

    track(
      manualMode || detectedContext.source === 'none'
        ? 'location_confirm_manual'
        : 'location_confirm_detected',
      {
        route: '/',
        city_slug: finalContext.citySlug ?? undefined,
        local_area_slug: finalContext.localAreaSlug ?? undefined,
        source: finalContext.source,
        confidence: finalContext.confidence,
      },
    )

    router.push(
      routes.city(selectedCity, {
        localAreaSlug: finalContext.localAreaSlug,
        neighborhoodSlug: finalContext.neighborhoodSlug,
        source: finalContext.source,
        confidence: finalContext.confidence,
      }),
    )
  }

  return (
    <div className="space-y-4">
      <section className="card space-y-4 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isAr ? 'اكتشف منطقتك ثم أكدها' : 'Détecter votre zone puis la confirmer'}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {isAr
                ? 'هذا الاختيار يبقى سياقاً مساعداً فقط. اختر الإجراء أولاً، ثم أكد المدينة والمنطقة إذا احتجت إلى جواب محلي أدق.'
                : "Ce choix reste un contexte d'aide. Choisissez d'abord la démarche, puis confirmez la ville et la zone si vous avez besoin d'une réponse locale plus précise."}
            </p>
          </div>

          {(selectedCity || selectedLocalArea || detectedContext.citySlug) ? (
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-700"
              onClick={handleResetArea}
            >
              {isAr ? 'تغيير المنطقة' : 'Changer de zone'}
            </button>
          ) : null}
        </div>

        {selectedCity ? (
          <SelectedAreaSummary
            lang={lang}
            cityLabel={cityName(selectedCity, lang) ?? selectedCity}
            selectedAreaLabel={selectedLocalAreaRecord?.displayLabelFr ?? null}
            source={detectedContext.source}
            confidence={detectedContext.confidence}
            onChange={handleResetArea}
            onClear={selectedLocalArea ? handleClearSelectedArea : undefined}
            compact
          />
        ) : null}

        {showDetectedPanel ? (
          <div className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              {isAr ? 'اقتراح المنطقة' : 'Suggestion de zone'}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {detectedCityName ? (
                <span className="badge badge-teal">
                  {isAr ? `مدينة مقترحة: ${detectedCityName}` : `Ville suggérée: ${detectedCityName}`}
                </span>
              ) : null}
              {detectedContext.neighborhoodSlug && detectedLocalAreaLabel ? (
                <span className="badge badge-slate">
                  {isAr ? `منطقة مقترحة: ${detectedLocalAreaLabel}` : `Zone suggérée: ${detectedLocalAreaLabel}`}
                </span>
              ) : null}
              {detectedContext.postalCode ? (
                <span className="badge badge-slate">
                  {isAr ? `رمز بريدي: ${detectedContext.postalCode}` : `Code postal: ${detectedContext.postalCode}`}
                </span>
              ) : null}
              {detectedContext.confidence !== 'unsupported' ? (
                <span className="badge badge-slate">
                  {isAr ? `الثقة: ${formatLocationConfidence(detectedContext.confidence, lang)}` : `Confiance: ${formatLocationConfidence(detectedContext.confidence, lang)}`}
                </span>
              ) : null}
            </div>

            {postcodeHint ? (
              <p className="mt-2 text-sm text-teal-900">
                {isAr
                  ? `الرمز البريدي ${postcodeHint.postalCode} يضيّق الاحتمال نحو ${postcodeHint.labelFr} من دون حسم الجهة المختصة النهائية.`
                  : `Le code postal ${postcodeHint.postalCode} resserre l'hypothèse vers ${postcodeHint.labelFr}, sans fixer l'autorité finale.`}
              </p>
            ) : null}

            {detectedContext.confidence === 'conflict' ? (
              <p className="mt-2 text-sm text-amber-900">{formatConflictReason(detectedContext, lang)}</p>
            ) : null}

            {gpsState.status === 'error' ? (
              <p className="mt-2 text-sm text-amber-900">
                {isAr ? `تعذر استخدام الموقع الدقيق: ${formatGpsError(gpsState.message, lang)}` : `Localisation précise indisponible: ${formatGpsError(gpsState.message, lang)}`}
              </p>
            ) : null}

            {!manualMode && detectedContext.localAreaSlug && detectedContext.confidence === 'high' && !detectedContext.confirmedByUser ? (
              <p className="mt-2 text-sm text-teal-900">
                {isAr
                  ? 'تمت تهيئة المنطقة المختارة تلقائياً. يمكنك تأكيدها أو فتح الاختيار اليدوي.'
                  : 'La zone sélectionnée a été préremplie. Vous pouvez la confirmer ou ouvrir le choix manuel.'}
              </p>
            ) : null}

            {effectiveCandidates.length > 1 && detectedContext.confidence === 'medium' ? (
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                  {isAr ? 'مناطق مرجحة' : 'Zones probables'}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {effectiveCandidates.slice(0, 5).map((candidate) => (
                    <button
                      key={candidate.localAreaSlug}
                      type="button"
                      className="rounded-full border border-teal-300 px-3 py-1.5 text-xs font-medium text-teal-800 hover:bg-teal-100"
                      onClick={() => {
                        setManualMode(true)
                        setManualPanelOpen(true)
                        setSelectedCity(candidate.citySlug)
                        setSelectedLocalArea(candidate.localAreaSlug)
                      }}
                    >
                      {candidate.displayLabelFr}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-2xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-cyan-50 disabled:cursor-not-allowed disabled:bg-slate-300"
                onClick={handleConfirmArea}
                disabled={!selectedCity}
              >
                {isAr ? 'تأكيد المنطقة' : 'Confirmer la zone'}
              </button>
              <button
                type="button"
                className="rounded-2xl border border-teal-300 px-4 py-2.5 text-sm font-medium text-teal-800 hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handlePreciseLocation}
                disabled={gpsState.status === 'requesting'}
              >
                {gpsState.status === 'requesting'
                  ? (isAr ? 'جاري تحديد الموقع...' : 'Localisation précise...')
                  : (isAr ? 'استخدم الموقع الدقيق' : 'Utiliser ma position précise')}
              </button>
              <button
                type="button"
                className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-teal-300 hover:text-teal-700"
                onClick={handleChooseManually}
              >
                {isAr ? 'اختيار المنطقة يدوياً' : 'Choisir une zone manuellement'}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {isAr
              ? 'يمكنك استخدام الموقع الدقيق أو الاكتفاء باختيار المدينة والمنطقة يدوياً بعد اختيار الإجراء.'
              : "Vous pouvez utiliser la position précise, ou simplement choisir la ville et la zone manuellement après avoir choisi votre démarche."}
          </div>
        )}
      </section>

      <section className="card p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isAr ? 'اختيار المنطقة يدوياً' : 'Choisir la zone manuellement'}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {isAr
                ? 'يفتح هذا الخيار صفحة المدينة مع السياق المختار. لا تحتاج إليه قبل اكتشاف الإجراء.'
                : "Cette étape ouvre la page ville avec votre contexte choisi. Vous n'en avez pas besoin avant la découverte d'une démarche."}
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-700"
            onClick={() => setManualPanelOpen((current) => !current)}
          >
            {manualPanelOpen
              ? (isAr ? 'إخفاء الاختيار اليدوي' : 'Masquer le choix manuel')
              : (isAr ? 'فتح الاختيار اليدوي' : 'Ouvrir le choix manuel')}
          </button>
        </div>

        {manualPanelOpen ? (
          <div className="mt-4 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700" htmlFor="manual-city-selector">
                {isAr ? 'اختيار المدينة' : 'Choisir la ville'}
                <select
                  id="manual-city-selector"
                  aria-label={isAr ? 'اختيار المدينة' : 'Choisir la ville'}
                  className="mt-1.5 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                  value={selectedCity}
                  onChange={(event) => handleCityChange(event.target.value)}
                >
                  <option value="">{isAr ? 'اختر مدينة' : 'Sélectionner une ville'}</option>
                  {cityOrder.map((citySlug) => (
                    <option key={citySlug} value={citySlug}>
                      {isAr ? cities[citySlug].nameAr : cities[citySlug].nameFr}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-700" htmlFor="manual-local-area-selector">
                {isAr ? 'اختيار المنطقة' : 'Choisir la zone'}
                <select
                  id="manual-local-area-selector"
                  aria-label={isAr ? 'اختيار المنطقة' : 'Choisir la zone'}
                  className="mt-1.5 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
                  value={selectedLocalArea}
                  onChange={(event) => handleLocalAreaChange(event.target.value)}
                  disabled={!selectedCity}
                >
                  <option value="">
                    {selectedCity
                      ? (isAr ? 'تابع بدون تحديد منطقة نهائية' : 'Continuer sans zone finale')
                      : (isAr ? 'اختر المدينة أولاً' : "Choisissez d'abord une ville")}
                  </option>
                  {localAreaOptions.map((localArea) => (
                    <option key={localArea.localAreaSlug} value={localArea.localAreaSlug}>
                      {localArea.displayLabelFr}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedLocalAreaRecord ? (
              <div className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
                <p className="font-semibold">{isAr ? 'المنطقة المختارة' : 'Zone sélectionnée'}</p>
                <p className="mt-1">{selectedLocalAreaRecord.displayLabelFr}</p>
                <p className="mt-1 text-xs text-teal-800">
                  {[selectedLocalAreaRecord.prefectureArrondissement, selectedLocalAreaRecord.arrondissement]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
            ) : null}

            <button
              type="button"
              className="w-full rounded-2xl bg-teal-700 px-5 py-3 text-center text-sm font-medium text-cyan-50 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={!selectedCity}
              onClick={handleConfirmArea}
            >
              {isAr ? 'تأكيد المنطقة' : 'Confirmer la zone'}
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">
            {isAr
              ? 'عند فتح الاختيار اليدوي يمكنك تحديد المدينة أولاً ثم المنطقة، قبل الانتقال إلى صفحة المدينة.'
              : "En ouvrant le choix manuel, vous pouvez choisir d'abord la ville puis la zone, avant d'ouvrir la page ville."}
          </p>
        )}
      </section>
    </div>
  )
}
