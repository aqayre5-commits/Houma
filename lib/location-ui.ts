import type { Lang } from '@/lib/lang'
import type { DetectedLocationContext, LocationDetectionConfidence, LocationDetectionSource, LocalAreaRecord } from '@/types/models'

function sourceLabel(source: LocationDetectionSource, lang: Lang) {
  switch (source) {
    case 'ip':
      return lang === 'ar' ? 'عنوان IP' : 'adresse IP'
    case 'gps':
      return lang === 'ar' ? 'الموقع الدقيق' : 'position precise'
    case 'ip_gps':
      return lang === 'ar' ? 'عنوان IP + الموقع الدقيق' : 'adresse IP + position precise'
    case 'manual':
      return lang === 'ar' ? 'اختيار يدوي' : 'choix manuel'
    default:
      return lang === 'ar' ? 'غير محدد' : 'non detecte'
  }
}

function confidenceLabel(confidence: LocationDetectionConfidence, lang: Lang) {
  switch (confidence) {
    case 'high':
      return lang === 'ar' ? 'مرتفعة' : 'elevee'
    case 'medium':
      return lang === 'ar' ? 'متوسطة' : 'moyenne'
    case 'low':
      return lang === 'ar' ? 'منخفضة' : 'faible'
    case 'conflict':
      return lang === 'ar' ? 'متعارضة' : 'conflictuelle'
    default:
      return lang === 'ar' ? 'غير مدعومة' : 'non prise en charge'
  }
}

export function formatLocationSource(source: LocationDetectionSource | string | null | undefined, lang: Lang) {
  return sourceLabel((source ?? 'none') as LocationDetectionSource, lang)
}

export function formatLocationConfidence(confidence: LocationDetectionConfidence | string | null | undefined, lang: Lang) {
  return confidenceLabel((confidence ?? 'unsupported') as LocationDetectionConfidence, lang)
}

export function formatLocationStateLine(input: {
  source?: string | null
  confidence?: string | null
  lang: Lang
}) {
  const parts = [
    input.source
      ? (input.lang === 'ar' ? `المصدر: ${formatLocationSource(input.source, input.lang)}` : `Source: ${formatLocationSource(input.source, input.lang)}`)
      : null,
    input.confidence
      ? (input.lang === 'ar' ? `الثقة: ${formatLocationConfidence(input.confidence, input.lang)}` : `Confiance: ${formatLocationConfidence(input.confidence, input.lang)}`)
      : null,
  ].filter(Boolean)

  return parts.join(' · ')
}

export function formatGpsError(message: string | null, lang: Lang) {
  const value = (message ?? '').toLowerCase()
  let fr = 'Impossible de determiner la position precise.'
  let ar = 'تعذر تحديد الموقع الدقيق.'

  if (value.includes('permission denied')) {
    fr = "L'autorisation de localisation a ete refusee."
    ar = 'تم رفض إذن تحديد الموقع.'
  } else if (value.includes('timed out')) {
    fr = 'La demande de localisation a expire.'
    ar = 'انتهت مهلة طلب تحديد الموقع.'
  } else if (value.includes('geolocation unavailable')) {
    fr = 'La geolocalisation du navigateur est indisponible.'
    ar = 'خدمة تحديد الموقع في المتصفح غير متاحة.'
  } else if (value.includes('reverse geocoding failed') || value.includes('upstream_error') || value.includes('fetch_failed') || value.includes('no_address')) {
    fr = "La suggestion de quartier n'a pas pu etre confirmee."
    ar = 'تعذر تأكيد اقتراح الحي.'
  } else if (value.includes('outside_morocco')) {
    fr = 'La position detectee est en dehors de la zone couverte.'
    ar = 'الموقع المكتشف خارج النطاق المدعوم.'
  }

  return lang === 'ar' ? ar : fr
}

export function formatConflictReason(context: DetectedLocationContext, lang: Lang) {
  if (context.confidence !== 'conflict') return null
  const ipCity = context.source === 'ip_gps' ? context.citySlug : null
  if (lang === 'ar') {
    return ipCity
      ? 'هناك تعارض بين مدينة عنوان IP ومدينة الموقع الدقيق. يرجى التأكيد يدوياً.'
      : 'هناك تعارض في اقتراح الموقع. يرجى التأكيد يدوياً.'
  }
  return ipCity
    ? "La ville suggeree par l'adresse IP et celle du GPS ne concordent pas. Merci de confirmer manuellement."
    : 'Les indices de localisation sont contradictoires. Merci de confirmer manuellement.'
}

export function getDetectedLocalAreaLabel(candidates: LocalAreaRecord[], lang: Lang) {
  const candidate = candidates[0]
  if (!candidate) return null
  return lang === 'ar' ? candidate.displayLabelAr ?? candidate.displayLabelFr : candidate.displayLabelFr
}
