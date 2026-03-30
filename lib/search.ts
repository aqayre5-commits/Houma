import { buildSearchIndex } from '@/lib/content'
import type { SearchIndexEntry } from '@/types/models'

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function searchContent(query: string): SearchIndexEntry[] {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return []

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean)

  return buildSearchIndex()
    .map((entry) => {
      const haystack = [
        entry.titleFr,
        entry.titleAr,
        entry.citySlug,
        entry.serviceSlug,
        entry.officeSlug,
        entry.neighborhoodSlug,
        ...(entry.keywords ?? []),
      ]
        .filter(Boolean)
        .map((value) => normalize(String(value)))
        .join(' ')

      const matchedTokens = tokens.filter((token) => haystack.includes(token)).length
      const exactPhrase = haystack.includes(normalizedQuery)
      return { entry, score: matchedTokens + (exactPhrase ? 2 : 0) }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.entry)
}
