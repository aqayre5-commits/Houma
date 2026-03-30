'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cities, cityOrder } from '@/content/cities'
import { track } from '@/lib/analytics'
import type { Lang } from '@/lib/lang'
import { createEmptyDetectedLocationContext } from '@/lib/resolver'
import { routes } from '@/lib/routes'
import { useLocationDetection } from '@/hooks/use-location-detection'
import type { DetectedLocationContext, MasterService } from '@/types/models'

function getCityLabel(citySlug: string, lang: Lang) {
  return lang === 'ar' ? cities[citySlug].nameAr : cities[citySlug].nameFr
}

function canDirectRoute(context: DetectedLocationContext) {
  return Boolean(context.citySlug)
}

export function ServiceIntentResolver({
  service,
  lang = 'fr',
  initialDetectedContext = createEmptyDetectedLocationContext(),
  detectedLocationLabel = null,
  detectedLocationSource = null,
}: {
  service: MasterService
  lang?: Lang
  initialDetectedContext?: DetectedLocationContext
  detectedLocationLabel?: string | null
  detectedLocationSource?: DetectedLocationContext['source'] | null
}) {
  const router = useRouter()
  const isAr = lang === 'ar'
  const autoRouted = useRef(false)
  const [selectedCity, setSelectedCity] = useState(initialDetectedContext.citySlug ?? '')
  const {
    detectedContext,
    gpsState,
    rankedCandidates,
    requestPreciseLocation,
  } = useLocationDetection(initialDetectedContext)
  const effectiveDetectedContext = useMemo(() => detectedContext, [detectedContext])
  const rankedDetectedAreaLabel = useMemo(() => {
    const firstCandidate = rankedCandidates[0]
    if (!firstCandidate) return null
    return lang === 'ar' ? firstCandidate.displayLabelAr ?? firstCandidate.displayLabelFr : firstCandidate.displayLabelFr
  }, [lang, rankedCandidates])
  const canAutoRoute = canDirectRoute(effectiveDetectedContext)
  const hasApproximateNetworkHint = detectedLocationSource === 'ip'
  const hasPreciseUnsupportedLocation =
    detectedLocationSource === 'gps' || detectedLocationSource === 'ip_gps'

  useEffect(() => {
    if (autoRouted.current) return

    if (effectiveDetectedContext.citySlug && !selectedCity) {
      setSelectedCity(effectiveDetectedContext.citySlug)
    }

    if (!canAutoRoute) return

    autoRouted.current = true
    router.replace(
      routes.cityService(effectiveDetectedContext.citySlug!, service.slug, {
        localAreaSlug: effectiveDetectedContext.confidence === 'high' ? effectiveDetectedContext.localAreaSlug : null,
        source: effectiveDetectedContext.source,
        confidence: effectiveDetectedContext.confidence,
      }),
    )
  }, [canAutoRoute, effectiveDetectedContext, router, selectedCity, service.slug])

  async function handlePreciseLocation() {
    const result = await requestPreciseLocation()
    if (!result.ok) return

    setSelectedCity(result.context.citySlug ?? '')

    if (canDirectRoute(result.context)) {
      track('location_confirm_detected', {
        route: routes.service(service.slug),
        city_slug: result.context.citySlug ?? undefined,
        local_area_slug: result.context.localAreaSlug ?? undefined,
        source: result.context.source,
        confidence: result.context.confidence,
      })
      router.replace(
        routes.cityService(result.context.citySlug!, service.slug, {
          localAreaSlug: result.context.confidence === 'high' ? result.context.localAreaSlug : null,
          source: result.context.source,
          confidence: result.context.confidence,
        }),
      )
    }
  }

  function handleContinue() {
    if (!selectedCity) return

    const finalConfidence =
      effectiveDetectedContext.citySlug === selectedCity && effectiveDetectedContext.confidence !== 'unsupported'
        ? effectiveDetectedContext.confidence
        : 'medium'

    track('location_confirm_manual', {
      route: routes.service(service.slug),
      city_slug: selectedCity,
      source: 'manual',
      confidence: finalConfidence,
    })
    router.push(
      routes.cityService(selectedCity, service.slug, {
        source: 'manual',
        confidence: finalConfidence,
      }),
    )
  }

  if (canAutoRoute) {
    return (
      <section className="card p-5">
        <p className="text-sm font-semibold text-slate-900">
          {isAr ? 'فتح صفحة الخدمة...' : 'Ouverture de la page service...'}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          {effectiveDetectedContext.citySlug
            ? (isAr
              ? `تم تحديد المدينة: ${getCityLabel(effectiveDetectedContext.citySlug, lang)}`
              : `Ville détectée : ${getCityLabel(effectiveDetectedContext.citySlug, lang)}`)
            : (isAr ? 'يتم تجهيز صفحة الخدمة.' : 'Préparation de la page service.')}
        </p>
      </section>
    )
  }

  return (
    <section className="card p-5">
      <p className="text-sm font-semibold text-slate-900">
        {isAr ? 'لم نؤكد المدينة بعد' : 'Nous n’avons pas encore confirmé la ville'}
      </p>
      <p className="mt-1 text-sm text-slate-600">
        {isAr
          ? 'اختر المدينة فقط لفتح صفحة الخدمة. يمكنك إضافة منطقة لاحقاً إذا احتجت إلى جواب محلي أدق.'
          : 'Choisissez seulement la ville pour ouvrir la page service. Vous pourrez ajouter une zone plus tard si vous avez besoin d’une réponse locale plus précise.'}
      </p>

      <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <p className="font-semibold">
          {isAr ? 'لماذا نطلب الموقع الدقيق؟' : 'Pourquoi demander la position précise ?'}
        </p>
        <p className="mt-1">
          {isAr
            ? 'نستعمل الموقع الدقيق فقط لتحديد المدينة أو المنطقة المناسبة لهذه الخدمة عندما يكون ذلك مفيداً. إذا لم ترغب في مشاركته، يمكنك اختيار المدينة يدوياً.'
            : 'Nous utilisons la position précise seulement pour identifier la bonne ville ou la bonne zone quand cela améliore la réponse pour cette démarche. Si vous préférez, vous pouvez choisir la ville manuellement.'}
        </p>
      </div>

      {detectedLocationLabel ? (
        <div className="mt-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold">
            {hasApproximateNetworkHint
              ? (isAr
                ? `مؤشر تقريبي من الشبكة: ${detectedLocationLabel}`
                : `Repère réseau approximatif : ${detectedLocationLabel}`)
              : (isAr
                ? `تم رصد الموقع التالي: ${detectedLocationLabel}`
                : `Position détectée : ${detectedLocationLabel}`)}
          </p>
          <p className="mt-1">
            {hasApproximateNetworkHint
              ? (isAr
                ? 'هذا مجرد مؤشر شبكي تقريبي وقد لا يكون دقيقاً. اختر الدار البيضاء أو الرباط أو طنجة للمتابعة، أو استخدم الموقع الدقيق للتحقق.'
                : 'Cette indication réseau est approximative et peut être inexacte. Choisissez Casablanca, Rabat ou Tanger pour continuer, ou utilisez la position précise pour vérifier.')
              : hasPreciseUnsupportedLocation
                ? (isAr
                  ? 'هذه المنطقة غير مدعومة حالياً. اختر الدار البيضاء أو الرباط أو طنجة للمتابعة.'
                  : 'Cette zone n’est pas encore couverte. Choisissez Casablanca, Rabat ou Tanger pour continuer.')
                : (isAr
                  ? 'هذه المنطقة ليست ضمن المدن المدعومة حالياً. اختر الدار البيضاء أو الرباط أو طنجة للمتابعة.'
                  : 'Cette zone n’est pas encore couverte. Choisissez Casablanca, Rabat ou Tanger pour continuer.')}
          </p>
        </div>
      ) : null}

      {gpsState.status === 'error' ? (
        <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {isAr ? 'تعذر استخدام الموقع الدقيق. يمكنك المتابعة يدوياً.' : 'La position précise n’a pas pu être utilisée. Vous pouvez continuer manuellement.'}
        </p>
      ) : null}

      {(rankedDetectedAreaLabel || effectiveDetectedContext.confidence === 'conflict' || effectiveDetectedContext.postalCode) ? (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {rankedDetectedAreaLabel ? (
            <p>{isAr ? `اقتراح محلي: ${rankedDetectedAreaLabel}` : `Suggestion locale : ${rankedDetectedAreaLabel}`}</p>
          ) : null}
          {effectiveDetectedContext.postalCode ? (
            <p className={rankedDetectedAreaLabel ? 'mt-1' : ''}>
              {isAr
                ? `تم التقاط الرمز البريدي ${effectiveDetectedContext.postalCode} كمؤشر فقط.`
                : `Le code postal ${effectiveDetectedContext.postalCode} est utilisé comme simple indice.`}
            </p>
          ) : null}
          {effectiveDetectedContext.confidence === 'conflict' ? (
            <p className={rankedDetectedAreaLabel ? 'mt-1' : ''}>
              {isAr ? 'يوجد تعارض في الاقتراحات. افتح صفحة الخدمة ثم عدّل المنطقة عند الحاجة.' : 'Les signaux de localisation sont contradictoires. Ouvrez d’abord la page service, puis changez la zone si nécessaire.'}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor={`service-intent-city-${service.slug}`}>
          {isAr ? 'المدينة' : 'Ville'}
          <select
            id={`service-intent-city-${service.slug}`}
            aria-label={isAr ? 'المدينة' : 'Ville'}
            className="mt-1.5 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
            value={selectedCity}
            onChange={(event) => {
              setSelectedCity(event.target.value)
            }}
          >
            <option value="">{isAr ? 'اختر مدينة' : 'Choose a city'}</option>
            {cityOrder.map((citySlug) => (
              <option key={citySlug} value={citySlug}>
                {getCityLabel(citySlug, lang)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handlePreciseLocation}
          className="rounded-2xl bg-teal-700 px-5 py-3 text-sm font-medium text-cyan-50 hover:bg-teal-800"
        >
          {isAr ? 'استخدم موقعي الدقيق' : 'Utiliser ma position précise'}
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedCity}
          className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAr ? 'المتابعة يدوياً' : 'Continuer manuellement'}
        </button>
      </div>
    </section>
  )
}
