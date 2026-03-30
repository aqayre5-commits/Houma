export type PageState = 'loading' | 'empty' | 'partial' | 'success' | 'offline' | 'error'

export type Locale = 'fr' | 'ar'
export type ServiceScope = 'national' | 'city_contextual' | 'local_jurisdiction'
export type DeliveryMode = 'online_first' | 'annexe_first' | 'hybrid' | 'citywide_non_localized'
export type JurisdictionBasis = 'residence' | 'stay' | 'city_only' | 'none'
export type OfficeType =
  | 'annexe'
  | 'caidat'
  | 'arrondissement'
  | 'prefecture_arrondissement'
  | 'prefecture_province'
  | 'bureau_etat_civil'
  | 'service_centre'
  | 'local_admin_unknown'
  | 'none'
export type DetectionConfidence = 'high' | 'medium' | 'low' | 'unsupported'
export type LocationDetectionSource = 'none' | 'ip' | 'gps' | 'ip_gps' | 'manual'
export type LocationDetectionConfidence = 'high' | 'medium' | 'low' | 'conflict' | 'unsupported'
export type ResolutionStatus =
  | 'resolved'
  | 'fallback_city'
  | 'needs_confirmation'
  | 'unsupported_city'
  | 'not_applicable'
  | 'not_found'
export type FeeModel = 'free' | 'paid' | 'mixed' | 'unknown'
export type SourceType = 'official_portal' | 'ministry' | 'city_portal' | 'tax_authority' | 'other_public_body'
export type CanonicalEntityType = 'local_area' | 'neighborhood' | 'office'
export type GuideCategory =
  | 'identite'
  | 'attestations'
  | 'etat-civil'
  | 'justice'
  | 'vehicule'
  | 'fiscalite'
  | 'etrangers'
  | 'entreprise'
  | 'urbanisme'
  | 'citoyennete'
export type FaqTopic =
  | 'general'
  | 'passeport'
  | 'cnie'
  | 'attestation'
  | 'etat-civil'
  | 'legalisation'
  | 'justice'
  | 'vehicule'
  | 'fiscalite'
  | 'etrangers'
  | 'urbanisme'
  | 'entreprise'
  | 'citoyennete'
  | 'product'

// Legacy app-facing models retained during migration.
export type City = {
  slug: string
  name: string
  nameAr: string
  region: string
  regionAr: string
  hero: string
  heroAr: string
  seo: string
  offices: string[]
}

export type Service = {
  slug: string
  name: string
  nameAr: string
  category: string
  categoryAr: string
  summary: string
  summaryAr: string
  needsCity: boolean
  primaryOfficeType: string
  online: string[]
  docsSourceUrl: string
  docsSourceLabel: string
  docsSourceLabelAr: string
}

export type Office = {
  slug: string
  city: string
  name: string
  district: string
  type: string
  address: string
  mapsUrl: string
  services: string[]
}

export type CityService = {
  citySlug: string
  serviceSlug: string
  requiredDocs: string[]
  requiredDocsAr: string[]
  feesNote: string
  feesNoteAr: string
  delayNote: string
  delayNoteAr: string
  onlineLinks: { label: string; url: string }[]
  fallbackNote: string
  fallbackNoteAr: string
  verificationDate: string
}

export type SearchResult = {
  type: 'city' | 'service' | 'city_service' | 'office'
  href: string
  title: string
  subtitle: string
}

// Normalized content models.
export interface SeoContent {
  titleFr: string
  titleAr: string
  descriptionFr: string
  descriptionAr: string
}

export interface ContentCity {
  slug: string
  nameFr: string
  nameAr: string
  isSupported: boolean
  districts: string[]
  introFr?: string
  introAr?: string
  mapCenter?: { lat: number; lng: number }
  seo: SeoContent
}

export interface Neighborhood {
  slug: string
  citySlug: string
  districtSlug: string
  nameFr: string
  nameAr: string
  rawName: string
  canonicalName: string
  adminPath: string
  canonicalSlug: string
  officeSlugs: string[]
  indexable: boolean
  aliases?: string[]
  landmarks?: string[]
  geoBounds?: { north: number; south: number; east: number; west: number }
  seo: SeoContent
}

export interface LocalAreaRecord {
  citySlug: string
  cityNameFr: string
  cityNameAr: string | null
  localAreaSlug: string
  rawName: string
  canonicalName: string
  displayLabelFr: string
  displayLabelAr: string | null
  adminPath: string
  aliases: string[]
  canonicalSlug: string
  provinceOrPrefecture: string
  commune: string
  prefectureArrondissement: string
  arrondissement: string
  bureauEtatCivil: string
  officeType: Extract<OfficeType, 'bureau_etat_civil' | 'arrondissement' | 'prefecture_arrondissement' | 'local_admin_unknown'>
  source: 'watiqa'
  sourceUrl: string
  confidence: Exclude<DetectionConfidence, 'unsupported'>
  extractionMethod?: string
  notes?: string
}

export interface DetectedLocationContext {
  source: LocationDetectionSource
  citySlug: string | null
  neighborhoodSlug: string | null
  localAreaSlug: string | null
  postalCode: string | null
  latitude: number | null
  longitude: number | null
  accuracyMeters: number | null
  confidence: LocationDetectionConfidence
  confirmedByUser: boolean
  conflictReason: string | null
}

export interface OfficeRecord {
  slug: string
  citySlug: string
  districtSlug: string
  nameFr: string
  nameAr: string
  rawName: string
  canonicalName: string
  adminPath: string
  aliases: string[]
  canonicalSlug: string
  officeType: OfficeType
  neighborhoodsServed: string[]
  supportedServices: string[]
  officialSourceUrl: string
  status: 'active' | 'partial' | 'unverified'
  mapsUrl?: string
  hoursFr?: string
  hoursAr?: string
  fallbackOfficeSlug?: string
  notesFr?: string
  notesAr?: string
}

export interface SourceRecord {
  slug: string
  label: string
  domain: string
  sourceType: SourceType
  url: string
  lastReviewedAt: string
  serviceSlugs: string[]
  notesFr?: string
  notesAr?: string
}

export interface OnlineLink {
  labelFr: string
  labelAr: string
  url: string
  linkType: 'apply' | 'download' | 'source' | 'help'
  isOfficial: boolean
  notesFr?: string
  notesAr?: string
}

export interface MasterService {
  slug: string
  masterServiceSlug: string
  categoryFr: string
  categoryAr: string
  titleFr: string
  titleAr: string
  summaryFr: string
  summaryAr: string
  requirementsFr: string[]
  requirementsAr: string[]
  feeModel: FeeModel
  feeLabelFr: string
  feeLabelAr: string
  feesNoteFr: string
  feesNoteAr: string
  delayNoteFr: string
  delayNoteAr: string
  deliveryMode: DeliveryMode
  serviceScope: ServiceScope
  jurisdictionBasis: JurisdictionBasis
  requiresOfficeMatch: boolean
  officeType: OfficeType
  needsCity: boolean
  officialSourceSlugs: string[]
  onlineLinks: OnlineLink[]
  fallbackNoteFr: string
  fallbackNoteAr: string
  canonicalNeighborhoodEligible?: boolean
  exemptionsFr?: string[]
  exemptionsAr?: string[]
  sponsorSlotEligible?: boolean
}

export interface CityServiceRecord {
  citySlug: string
  serviceSlug: string
  masterServiceSlug: string
  isPublished: boolean
  localSummaryFr: string
  localSummaryAr: string
  localOfficeNoteFr: string
  localOfficeNoteAr: string
  heroTagFr: string
  heroTagAr: string
  localSourceSlugs?: string[]
  overrides?: Partial<Pick<MasterService, 'fallbackNoteFr' | 'fallbackNoteAr'>>
}

export interface ResolverInput {
  citySlug: string
  serviceSlug: string
  mode: 'auto' | 'manual'
  locale: Locale
  districtSlug?: string
  neighborhoodSlug?: string
  localAreaSlug?: string
  coordinates?: { lat: number; lng: number }
  addressString?: string
  officeSlug?: string
  isResidenceConfirmed?: boolean
  isStayAddress?: boolean
}

export interface ResolverResult {
  resolutionStatus: ResolutionStatus
  serviceSlug: string
  citySlug: string
  detectionConfidence: DetectionConfidence
  primaryOfficeSlug?: string
  fallbackOfficeSlug?: string
  resolvedNeighborhoodSlug?: string
  selectedLocalAreaSlug?: string
  selectedLocalAreaLabelFr?: string
  selectedLocalAreaLabelAr?: string | null
  officialRuleSourceSlug?: string
  reasonCode:
    | 'service_online_first'
    | 'needs_manual_confirmation'
    | 'resolved_by_neighborhood'
    | 'resolved_by_office_override'
    | 'fallback_city_level'
    | 'unsupported_city'
    | 'no_mapping_found'
  messageFr: string
  messageAr: string
}

export interface SearchIndexEntry {
  type: 'city' | 'service' | 'city_service' | 'office' | 'neighborhood' | 'neighborhood_service'
  slug: string
  titleFr: string
  titleAr: string
  citySlug?: string
  href: string
  serviceSlug?: string
  officeSlug?: string
  neighborhoodSlug?: string
  keywords?: string[]
}

export interface AnalyticsContext {
  route: string
  templateType: string
  lang: Locale
  citySlug?: string
  serviceSlug?: string
  neighborhoodSlug?: string
  localAreaSlug?: string
  officeSlug?: string
  mode?: 'auto' | 'manual'
  confidence?: DetectionConfidence
}

export interface CanonicalizedContentLabel {
  rawName: string
  canonicalName: string
  displayName: string
  entityType: CanonicalEntityType
  citySlug: string
  adminPath: string
  postcode: string | null
  aliases: string[]
  canonicalSlug: string
}

export interface GuideSection {
  headingFr: string
  headingAr: string
  bodyFr: string
  bodyAr: string
  bulletsFr?: string[]
  bulletsAr?: string[]
}

export interface GuideRecord {
  slug: string
  category: GuideCategory
  titleFr: string
  titleAr: string
  descriptionFr: string
  descriptionAr: string
  introFr: string
  introAr: string
  sections: GuideSection[]
  relatedServiceSlugs: string[]
  relatedCitySlugs: string[]
  faqIds: string[]
  seoTitleFr: string
  seoTitleAr: string
  seoDescriptionFr: string
  seoDescriptionAr: string
  featured?: boolean
  isEvergreen: boolean
  futureCityReady: boolean
}

export interface FaqRecord {
  id: string
  slug: string
  topic: FaqTopic
  questionFr: string
  questionAr: string
  answerFr: string
  answerAr: string
  relatedServiceSlugs: string[]
  relatedCitySlugs: string[]
  keywords: string[]
  isGlobal: boolean
  priority: 1 | 2 | 3
}
