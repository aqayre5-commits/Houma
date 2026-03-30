import { cities as cityRegistry } from '@/content/cities'
import { offices as legacyOffices } from '@/lib/data'
import { buildAdminPath, buildDisambiguatedDisplayName, canonicalizeContentLabel, groupByCanonicalName } from '@/lib/content-normalization'
import type { OfficeRecord, OfficeType } from '@/types/models'

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function mapOfficeType(type: string): OfficeType {
  if (type.includes('annexe') || type === 'etat_civil') return 'annexe'
  if (type === 'tribunal' || type === 'tribunal-commerce') return 'prefecture_province'
  return 'service_centre'
}

const districtArabic: Record<string, string> = {
  centre: 'الوسط',
  'hay-hassani': 'الحي الحسني',
  'ain-sebaa': 'عين السبع',
  'yacoub-el-mansour': 'يعقوب المنصور',
  'agdal-riyad': 'أكدال الرياض',
  'beni-makada': 'بني مكادة',
  malabata: 'مالاباطا',
}

const officeSourceByCity: Record<string, string> = {
  casablanca: 'https://www.casablancacity.ma',
  rabat: 'https://www.mairie.rabat.ma',
  tanger: 'https://www.tanger.ma',
}

const normalizedOfficeRecords = Object.values(legacyOffices).map((office) => {
  const districtSlug = slugify(office.district)
  const city = cityRegistry[office.city]
  const officeType = mapOfficeType(office.type)
  const rawName = office.name
  const canonicalLabel = canonicalizeContentLabel({
    rawName,
    entityType: 'office',
    citySlug: office.city,
    adminPath: buildAdminPath([office.city, office.district, office.type]),
    aliases: [office.district],
  })

  return {
    slug: office.slug,
    citySlug: office.city,
    districtSlug,
    rawName: canonicalLabel.rawName,
    canonicalName: canonicalLabel.canonicalName,
    adminPath: canonicalLabel.adminPath,
    aliases: canonicalLabel.aliases,
    canonicalSlug: canonicalLabel.canonicalSlug,
    nameFr: canonicalLabel.displayName,
    nameAr: `${districtArabic[districtSlug] ?? office.district} - ${city?.nameAr ?? office.city}`,
    officeType,
    neighborhoodsServed: [districtSlug],
    supportedServices: office.services,
    officialSourceUrl: officeSourceByCity[office.city] ?? '',
    status: 'active' as const,
    mapsUrl: office.mapsUrl,
    notesFr: `${office.name} couvre principalement le secteur ${office.district}.`,
    notesAr: `يخدم هذا المكتب أساساً قطاع ${districtArabic[districtSlug] ?? office.district}.`,
  }
})

const officeDuplicateGroups = new Map(
  Array.from(groupByCanonicalName(normalizedOfficeRecords).entries()).filter(([, items]) => items.length > 1),
)

export const offices: Record<string, OfficeRecord> = Object.fromEntries(
  normalizedOfficeRecords.map((record) => {
    const duplicateKey = `${record.citySlug}||${record.canonicalName}`
    const hasDuplicateCanonicalName = officeDuplicateGroups.has(duplicateKey)
    const displayNameFr = hasDuplicateCanonicalName
      ? buildDisambiguatedDisplayName({
          baseName: record.rawName,
          citySlug: record.citySlug,
          district: record.districtSlug,
          officeType: record.officeType,
        })
      : record.rawName

    return [
      record.slug,
      {
        ...record,
        nameFr: displayNameFr,
      } satisfies OfficeRecord,
    ] as const
  }),
)

export const officeOrderByCity = {
  casablanca: Object.values(offices).filter((office) => office.citySlug === 'casablanca').map((office) => office.slug),
  rabat: Object.values(offices).filter((office) => office.citySlug === 'rabat').map((office) => office.slug),
  tanger: Object.values(offices).filter((office) => office.citySlug === 'tanger').map((office) => office.slug),
} as const
