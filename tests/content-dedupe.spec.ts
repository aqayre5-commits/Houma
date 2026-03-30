import { expect, test } from '@playwright/test'
import { localAreas } from '@/content/local-areas'
import { neighborhoods } from '@/content/neighborhoods'
import { offices } from '@/content/offices'
import { validateContent, validateLocalAreasDataset } from '@/lib/content-validation'
import { canonicalizeContentLabel } from '@/lib/content-normalization'

test('canonical normalization removes spacing, punctuation, and accent drift for matching', () => {
  const canonical = canonicalizeContentLabel({
    rawName: "  Béni   Makada  ",
    entityType: 'neighborhood',
    citySlug: 'tanger',
    adminPath: 'Tanger > Béni Makada',
  })

  expect(canonical.rawName).toBe('Béni Makada')
  expect(canonical.canonicalName).toBe('beni makada')
})

test('same-name local areas in one city stay separate with unique display labels', () => {
  const centralCasablanca = Object.values(localAreas).filter(
    (record) => record.citySlug === 'casablanca' && record.canonicalName === 'central',
  )

  expect(centralCasablanca.length).toBeGreaterThan(1)
  expect(new Set(centralCasablanca.map((record) => record.displayLabelFr)).size).toBe(centralCasablanca.length)
  expect(new Set(centralCasablanca.map((record) => record.canonicalSlug)).size).toBe(centralCasablanca.length)
})

test('same-name different entity types are not merged together', () => {
  const localArea = Object.values(localAreas).find(
    (record) => record.citySlug === 'casablanca' && record.canonicalName === 'central',
  )

  expect(localArea).toBeDefined()
  const neighborhood = neighborhoods[`casablanca-${localArea!.localAreaSlug}`]
  expect(neighborhood).toBeDefined()
  expect(neighborhood.canonicalName).toBe(localArea!.canonicalName)
  expect(neighborhood.canonicalSlug).not.toBe(localArea!.canonicalSlug)
})

test('office names stay uniquely renderable per city', () => {
  const renderKeys = Object.values(offices).map((record) => `${record.citySlug}||${record.nameFr}`)
  expect(new Set(renderKeys).size).toBe(renderKeys.length)
})

test('validation fails when duplicate canonical groups are left visually ambiguous', () => {
  const records = Object.values(localAreas)
  const base = records.find((record) => record.citySlug === 'casablanca' && record.canonicalName === 'central')
  expect(base).toBeDefined()

  const ambiguousPeer = {
    ...base!,
    localAreaSlug: `${base!.localAreaSlug}-ambiguous`,
    canonicalSlug: `${base!.canonicalSlug}-ambiguous`,
    adminPath: `${base!.adminPath} > collision`,
    arrondissement: `${base!.arrondissement} collision`,
  }

  const issues = validateLocalAreasDataset([...records, ambiguousPeer])
  expect(issues.some((issue) => issue.includes('missing explicit disambiguation'))).toBe(true)
})

test('full content validation accepts canonicalized datasets', () => {
  expect(validateContent()).toEqual([])
})
