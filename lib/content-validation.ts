import { cityServices } from '@/content/city-services'
import { cities } from '@/content/cities'
import { localAreas, localAreaOrderByCity, watiqaNormalizationSummary } from '@/content/local-areas'
import { postcodeHints } from '@/content/postcodes'
import { masterServices } from '@/content/master-services'
import { neighborhoods } from '@/content/neighborhoods'
import { offices } from '@/content/offices'
import { sources } from '@/content/sources'
import type { CanonicalEntityType, LocalAreaRecord } from '@/types/models'

type CanonicalValidationRecord = {
  id: string
  citySlug: string
  entityType: CanonicalEntityType
  canonicalName: string
  canonicalSlug: string
  adminPath: string
  displayName: string
}

function validateCanonicalRecords(records: CanonicalValidationRecord[]) {
  const issues: string[] = []
  const seenCanonicalSlugs = new Set<string>()
  const canonicalGroups = new Map<string, CanonicalValidationRecord[]>()
  const displayGroups = new Map<string, CanonicalValidationRecord[]>()

  for (const record of records) {
    if (seenCanonicalSlugs.has(record.canonicalSlug)) {
      issues.push(`Canonical slug ${record.canonicalSlug} is duplicated.`)
    } else {
      seenCanonicalSlugs.add(record.canonicalSlug)
    }

    const canonicalKey = `${record.citySlug}||${record.entityType}||${record.canonicalName}`
    if (!canonicalGroups.has(canonicalKey)) {
      canonicalGroups.set(canonicalKey, [])
    }
    canonicalGroups.get(canonicalKey)!.push(record)

    const displayKey = `${record.citySlug}||${record.entityType}||${record.displayName}`
    if (!displayGroups.has(displayKey)) {
      displayGroups.set(displayKey, [])
    }
    displayGroups.get(displayKey)!.push(record)
  }

  for (const [groupKey, group] of canonicalGroups.entries()) {
    if (group.length < 2) continue
    const displayNames = new Set(group.map((record) => record.displayName))
    if (displayNames.size !== group.length) {
      issues.push(`Duplicate canonical group ${groupKey} is missing explicit disambiguation.`)
    }
  }

  for (const [displayKey, group] of displayGroups.entries()) {
    if (group.length < 2) continue
    issues.push(`Renderable label collision ${displayKey} would show identical selector/display labels for different records.`)
  }

  return issues
}

export function validateLocalAreasDataset(records: LocalAreaRecord[]): string[] {
  const issues: string[] = []
  const seenSlugs = new Set<string>()
  const supportedCities = new Set(Object.keys(cities))
  const cityCounts = new Map<string, number>()

  for (const record of records) {
    if (!supportedCities.has(record.citySlug)) {
      issues.push(`Local area ${record.localAreaSlug} references unsupported city ${record.citySlug}.`)
    }

    if (!record.localAreaSlug.trim()) {
      issues.push(`Local area for ${record.citySlug} is missing a deterministic slug.`)
    }

    if (!record.canonicalSlug.trim()) {
      issues.push(`Local area ${record.localAreaSlug} is missing a canonical slug.`)
    }

    if (seenSlugs.has(record.localAreaSlug)) {
      issues.push(`Local area slug ${record.localAreaSlug} is duplicated.`)
    } else {
      seenSlugs.add(record.localAreaSlug)
    }

    if (!record.bureauEtatCivil && !record.arrondissement && !record.prefectureArrondissement && !record.commune) {
      issues.push(`Local area ${record.localAreaSlug} is missing bureau, arrondissement, prefecture, and commune labels.`)
    }

    cityCounts.set(record.citySlug, (cityCounts.get(record.citySlug) ?? 0) + 1)
  }

  for (const citySlug of supportedCities) {
    if ((cityCounts.get(citySlug) ?? 0) === 0) {
      issues.push(`Supported city ${citySlug} has no local-area options.`)
    }
  }

  issues.push(
    ...validateCanonicalRecords(
      records.map((record) => ({
        id: record.localAreaSlug,
        citySlug: record.citySlug,
        entityType: 'local_area',
        canonicalName: record.canonicalName,
        canonicalSlug: record.canonicalSlug,
        adminPath: record.adminPath,
        displayName: record.displayLabelFr,
      })),
    ),
  )

  return issues
}

export function validateContent(): string[] {
  const issues: string[] = []

  for (const city of Object.values(cities)) {
    if (!city.nameFr || !city.nameAr) issues.push(`City ${city.slug} is missing bilingual names.`)
  }

  issues.push(...validateLocalAreasDataset(Object.values(localAreas)))

  if (watiqaNormalizationSummary.importedRowCount !== Object.keys(localAreas).length + watiqaNormalizationSummary.semanticMergeCount) {
    issues.push(
      `Watiqa normalization count mismatch: imported ${watiqaNormalizationSummary.importedRowCount}, normalized ${Object.keys(localAreas).length}, merges ${watiqaNormalizationSummary.semanticMergeCount}.`,
    )
  }

  for (const service of Object.values(masterServices)) {
    if (!service.titleFr || !service.titleAr) issues.push(`Service ${service.slug} is missing bilingual titles.`)
    for (const sourceSlug of service.officialSourceSlugs) {
      if (!sources[sourceSlug]) issues.push(`Service ${service.slug} references missing source ${sourceSlug}.`)
    }
  }

  for (const cityService of Object.values(cityServices)) {
    if (!cities[cityService.citySlug]) issues.push(`City service ${cityService.citySlug}/${cityService.serviceSlug} references missing city.`)
    if (!masterServices[cityService.masterServiceSlug]) issues.push(`City service ${cityService.citySlug}/${cityService.serviceSlug} references missing master service.`)
  }

  for (const office of Object.values(offices)) {
    if (!cities[office.citySlug]) issues.push(`Office ${office.slug} references missing city ${office.citySlug}.`)
    for (const serviceSlug of office.supportedServices) {
      if (!masterServices[serviceSlug]) issues.push(`Office ${office.slug} references missing service ${serviceSlug}.`)
    }
  }

  for (const neighborhood of Object.values(neighborhoods)) {
    if (!cities[neighborhood.citySlug]) issues.push(`Neighborhood ${neighborhood.slug} references missing city ${neighborhood.citySlug}.`)
    for (const officeSlug of neighborhood.officeSlugs) {
      if (!offices[officeSlug]) issues.push(`Neighborhood ${neighborhood.slug} references missing office ${officeSlug}.`)
    }
    if (!localAreas[neighborhood.slug]) issues.push(`Neighborhood ${neighborhood.slug} is not backed by a local-area record.`)
  }

  for (const [citySlug, slugs] of Object.entries(localAreaOrderByCity)) {
    for (const localAreaSlug of slugs) {
      const record = localAreas[localAreaSlug]
      if (!record) {
        issues.push(`Local area order references missing record ${localAreaSlug}.`)
      } else if (record.citySlug !== citySlug) {
        issues.push(`Local area ${localAreaSlug} is listed under ${citySlug} but belongs to ${record.citySlug}.`)
      }
    }
  }

  issues.push(
    ...validateCanonicalRecords([
      ...Object.values(neighborhoods).map((record) => ({
        id: `${record.citySlug}-${record.slug}`,
        citySlug: record.citySlug,
        entityType: 'neighborhood' as const,
        canonicalName: record.canonicalName,
        canonicalSlug: record.canonicalSlug,
        adminPath: record.adminPath,
        displayName: record.nameFr,
      })),
      ...Object.values(offices).map((record) => ({
        id: record.slug,
        citySlug: record.citySlug,
        entityType: 'office' as const,
        canonicalName: record.canonicalName,
        canonicalSlug: record.canonicalSlug,
        adminPath: record.adminPath,
        displayName: record.nameFr,
      })),
    ]),
  )

  for (const hint of postcodeHints) {
    if (!cities[hint.citySlug]) {
      issues.push(`Postcode hint ${hint.citySlug}/${hint.postalCode} references unsupported city.`)
    }
    if (!hint.canonicalSlug.trim()) {
      issues.push(`Postcode hint ${hint.citySlug}/${hint.postalCode} is missing a canonical slug.`)
    }
    if (hint.candidateLocalAreaSlugs.length === 0) {
      issues.push(`Postcode hint ${hint.citySlug}/${hint.postalCode} has no local-area candidates.`)
    }
    for (const localAreaSlug of hint.candidateLocalAreaSlugs) {
      const localArea = localAreas[localAreaSlug]
      if (!localArea) {
        issues.push(`Postcode hint ${hint.citySlug}/${hint.postalCode} references missing local area ${localAreaSlug}.`)
      } else if (localArea.citySlug !== hint.citySlug) {
        issues.push(`Postcode hint ${hint.citySlug}/${hint.postalCode} points to cross-city local area ${localAreaSlug}.`)
      }
    }
  }

  return issues
}

export function assertValidContent() {
  const issues = validateContent()
  if (issues.length > 0) {
    throw new Error(`Content validation failed:\n${issues.join('\n')}`)
  }
}
