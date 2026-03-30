import { getCity, getLocalArea, getMasterService, getOffice, listOfficesByCityAndService } from '@/lib/content'
import type { DetectedLocationContext, ResolverInput, ResolverResult } from '@/types/models'

export function createEmptyDetectedLocationContext(): DetectedLocationContext {
  return {
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
  }
}

export function resolveDetectedLocationContext(input: {
  detectedContext?: DetectedLocationContext | null
  citySlug?: string | null
  localAreaSlug?: string | null
  postalCode?: string | null
}): DetectedLocationContext {
  const base = input.detectedContext ?? createEmptyDetectedLocationContext()

  if (!input.citySlug && !input.localAreaSlug) {
    return {
      ...base,
      postalCode: input.postalCode ?? base.postalCode,
    }
  }

  return {
    source: 'manual',
    citySlug: input.citySlug ?? base.citySlug,
    neighborhoodSlug: input.localAreaSlug ?? base.neighborhoodSlug,
    localAreaSlug: input.localAreaSlug ?? base.localAreaSlug,
    postalCode: input.postalCode ?? base.postalCode,
    latitude: null,
    longitude: null,
    accuracyMeters: null,
    confidence: input.localAreaSlug ? 'high' : 'medium',
    confirmedByUser: true,
    conflictReason: null,
  }
}

export function shouldUseNeighborhoodServiceRoute(input: {
  citySlug: string
  serviceSlug: string
  localAreaSlug?: string | null
}) {
  const service = getMasterService(input.serviceSlug)
  if (!service) return false
  if (service.deliveryMode === 'online_first') return false
  if (service.serviceScope !== 'local_jurisdiction') return false
  return Boolean(input.localAreaSlug)
}

export function resolveJurisdiction(input: ResolverInput): ResolverResult {
  const city = getCity(input.citySlug)
  const service = getMasterService(input.serviceSlug)

  if (!city || !service) {
    return {
      resolutionStatus: 'not_found',
      serviceSlug: input.serviceSlug,
      citySlug: input.citySlug,
      detectionConfidence: 'unsupported',
      reasonCode: 'no_mapping_found',
      messageFr: 'Ville ou démarche introuvable.',
      messageAr: 'المدينة أو الإجراء غير موجود.',
    }
  }

  if (!city.isSupported) {
    return {
      resolutionStatus: 'unsupported_city',
      serviceSlug: input.serviceSlug,
      citySlug: input.citySlug,
      detectionConfidence: 'unsupported',
      reasonCode: 'unsupported_city',
      messageFr: 'Ville non couverte pour le moment.',
      messageAr: 'المدينة غير مغطاة حالياً.',
    }
  }

  const selectedLocalAreaSlug = input.localAreaSlug ?? input.neighborhoodSlug
  const selectedLocalArea = selectedLocalAreaSlug ? getLocalArea(input.citySlug, selectedLocalAreaSlug) : null

  if (service.deliveryMode === 'online_first' || !service.requiresOfficeMatch) {
    return {
      resolutionStatus: 'not_applicable',
      serviceSlug: input.serviceSlug,
      citySlug: input.citySlug,
      detectionConfidence: 'high',
      selectedLocalAreaSlug: selectedLocalArea?.localAreaSlug,
      selectedLocalAreaLabelFr: selectedLocalArea?.displayLabelFr,
      selectedLocalAreaLabelAr: selectedLocalArea?.displayLabelAr ?? null,
      officialRuleSourceSlug: service.officialSourceSlugs[0],
      reasonCode: 'service_online_first',
      messageFr: selectedLocalArea
        ? `Zone sélectionnée : ${selectedLocalArea.displayLabelFr}. Cette démarche reste principalement en ligne et ne désigne pas d'annexe locale spécifique.`
        : "Cette démarche peut être finalisée sans affectation d'un bureau local.",
      messageAr: selectedLocalArea
        ? `تم تحديد الإدارة المحلية التالية: ${selectedLocalArea.displayLabelAr ?? selectedLocalArea.displayLabelFr}. يظل هذا الإجراء رقمياً في الأساس ولا يحدد ملحقة محلية بعينها.`
        : 'يمكن إتمام هذا الإجراء دون تعيين مكتب محلي.',
    }
  }

  if (selectedLocalArea) {
    const cityOffices = listOfficesByCityAndService(input.citySlug, input.serviceSlug)
    return {
      resolutionStatus: 'resolved',
      serviceSlug: input.serviceSlug,
      citySlug: input.citySlug,
      detectionConfidence: input.mode === 'manual' ? 'high' : 'medium',
      fallbackOfficeSlug: cityOffices[0]?.slug,
      resolvedNeighborhoodSlug: selectedLocalArea.localAreaSlug,
      selectedLocalAreaSlug: selectedLocalArea.localAreaSlug,
      selectedLocalAreaLabelFr: selectedLocalArea.displayLabelFr,
      selectedLocalAreaLabelAr: selectedLocalArea.displayLabelAr ?? null,
      officialRuleSourceSlug: service.officialSourceSlugs[0],
      reasonCode: 'resolved_by_neighborhood',
      messageFr: `Zone sélectionnée : ${selectedLocalArea.displayLabelFr}. Utilisez ce repère pour vérifier l'annexe ou l'arrondissement responsable à ${city.nameFr}.`,
      messageAr: `تم تحديد الإدارة المحلية التالية: ${selectedLocalArea.displayLabelAr ?? selectedLocalArea.displayLabelFr}. استعمل هذا المرجع لتأكيد الملحقة أو المقاطعة المختصة في ${city.nameAr}.`,
    }
  }

  if (input.officeSlug) {
    const office = getOffice(input.officeSlug)
    if (office && office.supportedServices.includes(input.serviceSlug)) {
      return {
        resolutionStatus: 'resolved',
        serviceSlug: input.serviceSlug,
        citySlug: input.citySlug,
        detectionConfidence: input.mode === 'manual' ? 'high' : 'medium',
        primaryOfficeSlug: office.slug,
        officialRuleSourceSlug: service.officialSourceSlugs[0],
        reasonCode: 'resolved_by_office_override',
        messageFr: 'Bureau confirmé à partir de votre sélection.',
        messageAr: 'تم تأكيد المكتب انطلاقاً من اختيارك.',
      }
    }
  }

  const cityOffices = listOfficesByCityAndService(input.citySlug, input.serviceSlug)
  if (cityOffices.length > 0) {
    return {
      resolutionStatus: input.mode === 'manual' ? 'fallback_city' : 'needs_confirmation',
      serviceSlug: input.serviceSlug,
      citySlug: input.citySlug,
      detectionConfidence: input.mode === 'manual' ? 'medium' : 'low',
      fallbackOfficeSlug: cityOffices[0]?.slug,
      officialRuleSourceSlug: service.officialSourceSlugs[0],
      reasonCode: input.mode === 'manual' ? 'fallback_city_level' : 'needs_manual_confirmation',
      messageFr: input.mode === 'manual'
        ? 'Réponse affichée au niveau ville.'
        : 'Ajoutez une zone pour préciser l’autorité locale.',
      messageAr: input.mode === 'manual'
        ? 'يتم عرض الجواب على مستوى المدينة.'
        : 'أضف منطقة لتحديد الجهة المحلية بدقة.',
    }
  }

  return {
    resolutionStatus: 'fallback_city',
    serviceSlug: input.serviceSlug,
    citySlug: input.citySlug,
    detectionConfidence: 'low',
    officialRuleSourceSlug: service.officialSourceSlugs[0],
    reasonCode: 'no_mapping_found',
    messageFr: 'Réponse affichée au niveau ville uniquement.',
    messageAr: 'يتم عرض الجواب على مستوى المدينة فقط.',
  }
}

export function isNeighborhoodIndexable(citySlug: string, neighborhoodSlug: string) {
  return Boolean(getLocalArea(citySlug, neighborhoodSlug))
}
