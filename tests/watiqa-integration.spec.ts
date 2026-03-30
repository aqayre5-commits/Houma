import { expect, test } from '@playwright/test'
import { cities } from '@/content/cities'
import { localAreas, localAreaOrderByCity, watiqaNormalizationSummary } from '@/content/local-areas'
import { validateContent, validateLocalAreasDataset } from '@/lib/content-validation'
import { resolveJurisdiction } from '@/lib/resolver'

test('watiqa normalization preserves supported-city coverage and row accounting', () => {
  const records = Object.values(localAreas)
  expect(records).toHaveLength(175)
  expect(watiqaNormalizationSummary.importedRowCount).toBe(175)
  expect(watiqaNormalizationSummary.importedRowCount).toBe(
    watiqaNormalizationSummary.normalizedRecordCount + watiqaNormalizationSummary.semanticMergeCount,
  )

  const citySlugs = new Set(records.map((record) => record.citySlug))
  expect(Array.from(citySlugs).sort()).toEqual(['casablanca', 'rabat', 'tanger'])
  expect(localAreaOrderByCity.casablanca.length).toBeGreaterThan(0)
  expect(localAreaOrderByCity.rabat.length).toBeGreaterThan(0)
  expect(localAreaOrderByCity.tanger.length).toBeGreaterThan(0)
})

test('every Watiqa local area is resolvable from city-scoped UI input', () => {
  for (const [citySlug, localAreaSlugs] of Object.entries(localAreaOrderByCity)) {
    expect(cities[citySlug]).toBeDefined()
    for (const slug of localAreaSlugs) {
      const record = localAreas[slug]
      expect(record).toBeDefined()
      expect(record.citySlug).toBe(citySlug)
      expect(record.localAreaSlug).toBe(slug)
    }
  }
})

test('duplicated Watiqa labels are disambiguated before reaching the UI', () => {
  const duplicatedCentralRecords = Object.values(localAreas).filter(
    (record) => record.citySlug === 'casablanca' && record.canonicalName === 'central',
  )

  expect(duplicatedCentralRecords.length).toBeGreaterThan(1)
  expect(new Set(duplicatedCentralRecords.map((record) => record.displayLabelFr)).size).toBe(duplicatedCentralRecords.length)
})

test('validation fails on duplicate local-area slugs', () => {
  const records = Object.values(localAreas)
  const duplicate = { ...records[0] }
  const issues = validateLocalAreasDataset([...records, duplicate])
  expect(issues.some((issue) => issue.includes(`Local area slug ${duplicate.localAreaSlug} is duplicated.`))).toBe(true)
})

test('validation fails on unsupported city values and unresolvable records', () => {
  const records = Object.values(localAreas)
  const unsupportedCityRecord = { ...records[0], localAreaSlug: `${records[0].localAreaSlug}-unsupported`, citySlug: 'marrakech' }
  const missingSlugRecord = { ...records[1], localAreaSlug: '' }
  const missingPathRecord = {
    ...records[2],
    localAreaSlug: `${records[2].localAreaSlug}-empty`,
    bureauEtatCivil: '',
    arrondissement: '',
    prefectureArrondissement: '',
    commune: '',
  }
  const issues = validateLocalAreasDataset([...records, unsupportedCityRecord, missingSlugRecord, missingPathRecord])
  expect(issues.some((issue) => issue.includes('unsupported city marrakech'))).toBe(true)
  expect(issues.some((issue) => issue.includes('missing a deterministic slug'))).toBe(true)
  expect(issues.some((issue) => issue.includes('missing bureau, arrondissement, prefecture, and commune labels'))).toBe(true)
})

test('validation fails on duplicate canonical local-area slugs', () => {
  const records = Object.values(localAreas)
  const duplicateCanonical = {
    ...records[0],
    localAreaSlug: `${records[0].localAreaSlug}-copy`,
  }

  const issues = validateLocalAreasDataset([...records, duplicateCanonical])
  expect(issues.some((issue) => issue.includes(`Canonical slug ${records[0].canonicalSlug} is duplicated.`))).toBe(true)
})

test('manual local-area selection overrides office fallback context in resolver', () => {
  const selectedLocalAreaSlug = localAreaOrderByCity.casablanca[0]
  const resolution = resolveJurisdiction({
    citySlug: 'casablanca',
    serviceSlug: 'passeport-marocain',
    mode: 'manual',
    locale: 'fr',
    localAreaSlug: selectedLocalAreaSlug,
    officeSlug: 'annexe-casablanca-centre',
    coordinates: { lat: 33.5731, lng: -7.5898 },
  })

  expect(resolution.selectedLocalAreaSlug).toBe(selectedLocalAreaSlug)
  expect(resolution.primaryOfficeSlug).toBeUndefined()
  expect(resolution.messageFr).toContain('Zone sélectionnée')
  expect(resolution.messageFr.toLowerCase()).not.toContain('bureau passeport')
})

test('content validation accepts supported postcode hints for known Watiqa local areas', () => {
  const issues = validateContent()
  expect(issues.filter((issue) => issue.includes('Postcode hint'))).toEqual([])
})
