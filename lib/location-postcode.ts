import { postcodeHintsByKey } from '@/content/postcodes'
import { getLocalArea } from '@/lib/content'
import type { LocalAreaRecord } from '@/types/models'

export function getPostcodeHint(citySlug: string | null, postalCode: string | null) {
  if (!citySlug || !postalCode) return null
  return postcodeHintsByKey[`${citySlug}:${postalCode}`] ?? null
}

export function getPostcodeLocalAreaCandidates(
  citySlug: string | null,
  postalCode: string | null,
): LocalAreaRecord[] {
  const hint = getPostcodeHint(citySlug, postalCode)
  if (!hint) return []
  return hint.candidateLocalAreaSlugs
    .map((slug) => getLocalArea(citySlug!, slug))
    .filter(Boolean) as LocalAreaRecord[]
}
