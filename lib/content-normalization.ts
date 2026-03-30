import { getAliasOverrides } from '@/content/aliases'
import type { CanonicalEntityType, CanonicalizedContentLabel, OfficeType } from '@/types/models'

function compactSegments(values: Array<string | null | undefined>) {
  return values.map((value) => normalizeWhitespace(value ?? '')).filter(Boolean)
}

export function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

export function normalizeForMatching(value: string) {
  return normalizeWhitespace(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’`´]/g, "'")
    .replace(/[\u2010-\u2015]/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

export function slugifyCanonical(value: string) {
  return normalizeForMatching(value).replace(/\s+/g, '-')
}

export function buildAdminPath(parts: Array<string | null | undefined>) {
  return compactSegments(parts).join(' > ')
}

export function buildCanonicalSlug(input: {
  entityType: CanonicalEntityType
  citySlug: string
  canonicalName: string
  adminPath: string
  postcode?: string | null
}) {
  return [
    input.entityType,
    input.citySlug,
    input.canonicalName,
    input.adminPath,
    input.postcode ?? '',
  ]
    .filter(Boolean)
    .map((segment) => slugifyCanonical(segment))
    .filter(Boolean)
    .join('-')
}

export function canonicalizeContentLabel(input: {
  rawName: string
  entityType: CanonicalEntityType
  citySlug: string
  adminPath: string
  postcode?: string | null
  aliases?: Array<string | null | undefined>
  displayName?: string
}): CanonicalizedContentLabel {
  const rawName = normalizeWhitespace(input.rawName)
  const canonicalName = normalizeForMatching(rawName)
  const aliases = Array.from(
    new Set(
      compactSegments([
        rawName,
        ...(input.aliases ?? []),
        ...getAliasOverrides(input.entityType, input.citySlug, canonicalName),
      ]),
    ),
  )

  return {
    rawName,
    canonicalName,
    displayName: normalizeWhitespace(input.displayName ?? rawName),
    entityType: input.entityType,
    citySlug: input.citySlug,
    adminPath: normalizeWhitespace(input.adminPath),
    postcode: input.postcode ?? null,
    aliases,
    canonicalSlug: buildCanonicalSlug({
      entityType: input.entityType,
      citySlug: input.citySlug,
      canonicalName,
      adminPath: input.adminPath,
      postcode: input.postcode,
    }),
  }
}

export function buildDisambiguatedDisplayName(input: {
  baseName: string
  commune?: string | null
  prefectureArrondissement?: string | null
  arrondissement?: string | null
  district?: string | null
  officeType?: OfficeType
  citySlug: string
}) {
  const baseName = normalizeWhitespace(input.baseName)
  const baseCanonical = normalizeForMatching(baseName)
  const qualifiers = compactSegments([
    input.arrondissement,
    input.prefectureArrondissement,
    input.district,
    input.commune,
  ]).filter((value) => normalizeForMatching(value) !== baseCanonical)

  if (qualifiers.length === 0) {
    return baseName
  }

  return `${baseName} — ${qualifiers.slice(0, 2).join(' · ')}`
}

export function groupByCanonicalName<T extends { citySlug: string; canonicalName: string }>(records: T[]) {
  const groups = new Map<string, T[]>()

  for (const record of records) {
    const key = `${record.citySlug}||${record.canonicalName}`
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key)!.push(record)
  }

  return groups
}

export function groupByDisplayName<T extends { citySlug: string; displayLabelFr?: string; nameFr?: string }>(records: T[]) {
  const groups = new Map<string, T[]>()

  for (const record of records) {
    const label = 'displayLabelFr' in record ? record.displayLabelFr : record.nameFr
    if (!label) continue
    const key = `${record.citySlug}||${normalizeWhitespace(label)}`
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key)!.push(record)
  }

  return groups
}

