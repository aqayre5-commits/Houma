import rawWatiqaDataset from '@/watiqa_local_administrations_casablanca_rabat_tanger.json'
import { cities } from '@/content/cities'
import { buildAdminPath, buildDisambiguatedDisplayName, canonicalizeContentLabel, groupByCanonicalName } from '@/lib/content-normalization'
import type { LocalAreaRecord } from '@/types/models'

type RawWatiqaRow = {
  city: string
  region: string
  province_or_prefecture: string
  commune: string
  prefecture_arrondissement: string
  arrondissement: string
  bureau_etat_civil: string
  source_url: string
  extraction_method: string
  confidence: string
  notes: string
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toCitySlug(cityName: string) {
  const normalized = cityName.trim().toLowerCase()
  if (normalized === 'casablanca') return 'casablanca'
  if (normalized === 'rabat') return 'rabat'
  if (normalized === 'tanger') return 'tanger'
  return null
}

function toConfidence(value: string): LocalAreaRecord['confidence'] {
  const normalized = value.trim().toLowerCase()
  if (normalized === 'high') return 'high'
  if (normalized === 'medium') return 'medium'
  return 'low'
}

function getOfficeType(row: RawWatiqaRow): LocalAreaRecord['officeType'] {
  if (row.bureau_etat_civil.trim()) return 'bureau_etat_civil'
  if (row.arrondissement.trim()) return 'arrondissement'
  if (row.prefecture_arrondissement.trim()) return 'prefecture_arrondissement'
  return 'local_admin_unknown'
}

function getDisplayLabelFr(row: RawWatiqaRow) {
  return (
    row.bureau_etat_civil.trim() ||
    row.arrondissement.trim() ||
    row.prefecture_arrondissement.trim() ||
    row.commune.trim()
  )
}

function getSemanticKey(row: RawWatiqaRow) {
  return [
    row.city.trim(),
    row.province_or_prefecture.trim(),
    row.commune.trim(),
    row.prefecture_arrondissement.trim(),
    row.arrondissement.trim(),
    row.bureau_etat_civil.trim(),
  ].join('||')
}

function buildLocalAreaSlug(citySlug: string, row: RawWatiqaRow) {
  return [
    citySlug,
    row.province_or_prefecture,
    row.commune,
    row.prefecture_arrondissement,
    row.arrondissement,
    row.bureau_etat_civil || getDisplayLabelFr(row),
  ]
    .filter((segment) => segment && segment.trim())
    .map((segment) => slugify(segment))
    .join('-')
}

const rawRows = (rawWatiqaDataset.rows ?? []) as RawWatiqaRow[]
const semanticMerges: { semanticKey: string; keptSlug: string; mergedCount: number }[] = []
const seenSemanticRows = new Map<string, LocalAreaRecord>()

for (const row of rawRows) {
  const citySlug = toCitySlug(row.city)
  if (!citySlug) continue
  const city = cities[citySlug]
  if (!city) continue
  const rawName = getDisplayLabelFr(row)
  const adminPath = buildAdminPath([
    row.province_or_prefecture,
    row.commune,
    row.prefecture_arrondissement,
    row.arrondissement,
    row.bureau_etat_civil,
  ])
  const canonicalLabel = canonicalizeContentLabel({
    rawName,
    entityType: 'local_area',
    citySlug,
    adminPath,
    aliases: [
      row.province_or_prefecture,
      row.commune,
      row.prefecture_arrondissement,
      row.arrondissement,
      row.bureau_etat_civil,
    ],
  })

  const record: LocalAreaRecord = {
    citySlug,
    cityNameFr: city.nameFr,
    cityNameAr: city.nameAr ?? null,
    localAreaSlug: buildLocalAreaSlug(citySlug, row),
    rawName: canonicalLabel.rawName,
    canonicalName: canonicalLabel.canonicalName,
    displayLabelFr: canonicalLabel.displayName,
    displayLabelAr: null,
    adminPath: canonicalLabel.adminPath,
    aliases: canonicalLabel.aliases,
    canonicalSlug: canonicalLabel.canonicalSlug,
    provinceOrPrefecture: row.province_or_prefecture.trim(),
    commune: row.commune.trim(),
    prefectureArrondissement: row.prefecture_arrondissement.trim(),
    arrondissement: row.arrondissement.trim(),
    bureauEtatCivil: row.bureau_etat_civil.trim(),
    officeType: getOfficeType(row),
    source: 'watiqa',
    sourceUrl: row.source_url.trim(),
    confidence: toConfidence(row.confidence),
    extractionMethod: row.extraction_method.trim(),
    notes: row.notes.trim() || undefined,
  }

  const semanticKey = getSemanticKey(row)
  const existing = seenSemanticRows.get(semanticKey)
  if (existing) {
    const merge = semanticMerges.find((entry) => entry.semanticKey === semanticKey)
    if (merge) {
      merge.mergedCount += 1
    } else {
      semanticMerges.push({
        semanticKey,
        keptSlug: existing.localAreaSlug,
        mergedCount: 1,
      })
    }
    continue
  }

  seenSemanticRows.set(semanticKey, record)
}

const normalizedLocalAreaRecords = Array.from(seenSemanticRows.values())
const duplicateCanonicalGroups = Array.from(groupByCanonicalName(normalizedLocalAreaRecords).entries())
  .filter(([, items]) => items.length > 1)
  .map(([groupKey, items]) => ({
    groupKey,
    citySlug: items[0]?.citySlug ?? '',
    canonicalName: items[0]?.canonicalName ?? '',
    slugs: items.map((item) => item.localAreaSlug),
  }))

const disambiguatedLocalAreas = normalizedLocalAreaRecords.map((record) => {
  const hasDuplicateCanonicalName = duplicateCanonicalGroups.some((group) => group.slugs.includes(record.localAreaSlug))
  const displayLabelFr = hasDuplicateCanonicalName
    ? buildDisambiguatedDisplayName({
        baseName: record.rawName,
        citySlug: record.citySlug,
        commune: record.commune,
        prefectureArrondissement: record.prefectureArrondissement,
        arrondissement: record.arrondissement,
      })
    : record.rawName

  return {
    ...record,
    displayLabelFr,
  } satisfies LocalAreaRecord
})

export const localAreas = Object.fromEntries(
  disambiguatedLocalAreas.map((record) => [record.localAreaSlug, record] as const),
)

export const localAreaOrderByCity = {
  casablanca: Object.values(localAreas)
    .filter((record) => record.citySlug === 'casablanca')
    .map((record) => record.localAreaSlug),
  rabat: Object.values(localAreas)
    .filter((record) => record.citySlug === 'rabat')
    .map((record) => record.localAreaSlug),
  tanger: Object.values(localAreas)
    .filter((record) => record.citySlug === 'tanger')
    .map((record) => record.localAreaSlug),
} as const

export const watiqaNormalizationSummary = {
  importedRowCount: rawRows.length,
  normalizedRecordCount: Object.keys(localAreas).length,
  semanticMergeCount: semanticMerges.length,
  semanticMerges,
  duplicateCanonicalGroups,
} as const
