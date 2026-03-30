import { cityServices as legacyCityServices, services as legacyServices, shortDelay, shortDelayAr, shortFee, shortFeeAr } from '@/lib/data'
import type {
  DeliveryMode,
  FeeModel,
  JurisdictionBasis,
  MasterService,
  OfficeType,
  OnlineLink,
  ServiceScope,
} from '@/types/models'

function mapSourceSlug(url: string): string[] {
  const normalized = url.toLowerCase()
  if (normalized.includes('passeport.ma')) return ['passeport']
  if (normalized.includes('dgsn.ma')) return ['dgsn']
  if (normalized.includes('idarati.ma')) return ['idarati']
  if (normalized.includes('portail.ma')) return ['portail']
  if (normalized.includes('watiqa.ma')) return ['watiqa']
  if (normalized.includes('justice.gov.ma')) return ['justice-casier']
  if (normalized.includes('tax.gov.ma')) return ['tax']
  return []
}

function mapOnlineLinks(links: { label: string; url: string }[]): OnlineLink[] {
  return links.map((link) => {
    const lower = link.url.toLowerCase()
    let labelAr = link.label
    let linkType: OnlineLink['linkType'] = 'source'
    if (lower.includes('etimfisc')) {
      labelAr = 'شراء الطابع الإلكتروني'
      linkType = 'apply'
    } else if (lower.includes('passeport.ma')) {
      labelAr = 'الاستمارة الرسمية'
      linkType = 'download'
    } else if (lower.includes('watiqa.ma')) {
      labelAr = 'الطلب عبر الإنترنت'
      linkType = 'apply'
    } else if (lower.includes('mavignette.ma')) {
      labelAr = 'الأداء عبر mavignette.ma'
      linkType = 'apply'
    } else if (lower.includes('vignette.ma')) {
      labelAr = 'تحميل شهادة الأداء'
      linkType = 'download'
    }
    return {
      labelFr: link.label,
      labelAr,
      url: link.url,
      linkType,
      isOfficial: true,
    }
  })
}

function mapOfficeType(primaryOfficeType: string, slug: string): OfficeType {
  if (slug === 'vignette-auto') return 'none'
  if (primaryOfficeType.includes('annexe') || primaryOfficeType === 'etat_civil') return 'annexe'
  if (primaryOfficeType === 'tribunal' || primaryOfficeType === 'tribunal-commerce') return 'prefecture_province'
  return 'service_centre'
}

function getFirstCityService(serviceSlug: string) {
  return Object.values(legacyCityServices).find((entry) => entry.serviceSlug === serviceSlug) ?? null
}

function getFeeModel(note: string): FeeModel {
  const lower = note.toLowerCase()
  if (lower.includes('gratuit') || lower.includes('مجان')) return 'free'
  if (lower.includes(' ou ') || lower.includes('selon') || lower.includes('variable')) return 'mixed'
  if (lower.includes('mad') || lower.includes('درهم') || lower.includes('mavignette') || lower.includes('timbre')) return 'paid'
  return 'unknown'
}

function getServiceScope(slug: string): ServiceScope {
  if (slug === 'vignette-auto') return 'national'
  if (['attestation-residence', 'legalisation-signature', 'livret-famille', 'acte-deces', 'duplicata-cin', 'permis-construire', 'inscription-liste-electorale'].includes(slug)) {
    return 'local_jurisdiction'
  }
  return 'city_contextual'
}

function getJurisdictionBasis(slug: string): JurisdictionBasis {
  if (slug === 'vignette-auto') return 'none'
  if (slug === 'carte-sejour-etranger') return 'stay'
  if (['attestation-residence', 'legalisation-signature', 'livret-famille', 'acte-deces', 'duplicata-cin', 'permis-construire', 'inscription-liste-electorale', 'passeport-marocain', 'renouvellement-cnie'].includes(slug)) {
    return 'residence'
  }
  return 'city_only'
}

function getDeliveryMode(slug: string, hasOnlineLinks: boolean): DeliveryMode {
  if (slug === 'vignette-auto') return 'online_first'
  if (hasOnlineLinks) return 'hybrid'
  if (['casier-judiciaire', 'carte-grise', 'permis-conduire', 'auto-entrepreneur', 'registre-commerce'].includes(slug)) {
    return 'citywide_non_localized'
  }
  return 'annexe_first'
}

export const masterServices: Record<string, MasterService> = Object.fromEntries(
  Object.values(legacyServices).map((service) => {
    const firstCityService = getFirstCityService(service.slug)
    const onlineLinks = mapOnlineLinks(firstCityService?.onlineLinks ?? [])
    const officialSourceSlugs = Array.from(
      new Set([
        ...mapSourceSlug(service.docsSourceUrl),
        ...onlineLinks.flatMap((link) => mapSourceSlug(link.url)),
        ...(service.slug === 'vignette-auto' ? ['tax', 'mavignette', 'vignette'] : []),
      ]),
    )
    const requirementsFr = firstCityService?.requiredDocs ?? []
    const requirementsAr = firstCityService?.requiredDocsAr ?? []
    const feesNoteFr = firstCityService?.feesNote ?? ''
    const feesNoteAr = firstCityService?.feesNoteAr ?? ''
    const delayNoteFr = firstCityService?.delayNote ?? ''
    const delayNoteAr = firstCityService?.delayNoteAr ?? ''
    const fallbackNoteFr = firstCityService?.fallbackNote ?? ''
    const fallbackNoteAr = firstCityService?.fallbackNoteAr ?? ''
    const officeType = mapOfficeType(service.primaryOfficeType, service.slug)
    const deliveryMode = getDeliveryMode(service.slug, onlineLinks.length > 0)
    const serviceScope = getServiceScope(service.slug)
    const jurisdictionBasis = getJurisdictionBasis(service.slug)
    const feeModel = getFeeModel(feesNoteFr || feesNoteAr)

    return [
      service.slug,
      {
        slug: service.slug,
        masterServiceSlug: service.slug,
        categoryFr: service.category,
        categoryAr: service.categoryAr,
        titleFr: service.name,
        titleAr: service.nameAr,
        summaryFr: service.summary,
        summaryAr: service.summaryAr,
        requirementsFr,
        requirementsAr,
        feeModel,
        feeLabelFr: feesNoteFr ? shortFee(feesNoteFr) : '',
        feeLabelAr: feesNoteAr ? shortFeeAr(feesNoteAr) : '',
        feesNoteFr,
        feesNoteAr,
        delayNoteFr,
        delayNoteAr,
        deliveryMode,
        serviceScope,
        jurisdictionBasis,
        requiresOfficeMatch: officeType !== 'none' && deliveryMode !== 'online_first',
        officeType,
        needsCity: service.needsCity,
        officialSourceSlugs,
        onlineLinks,
        fallbackNoteFr,
        fallbackNoteAr,
        canonicalNeighborhoodEligible: serviceScope === 'local_jurisdiction',
        exemptionsFr: service.slug === 'vignette-auto' ? ['Véhicules électriques et hybrides exonérés.'] : undefined,
        exemptionsAr: service.slug === 'vignette-auto' ? ['المركبات الكهربائية والهجينة معفاة.'] : undefined,
        sponsorSlotEligible: service.slug !== 'vignette-auto',
      } satisfies MasterService,
    ]
  }),
)

export const masterServiceOrder = Object.keys(legacyServices)
export const featuredServiceSlugs = ['passeport-marocain', 'renouvellement-cnie', 'attestation-residence', 'vignette-auto'] as const
