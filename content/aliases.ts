import type { CanonicalEntityType } from '@/types/models'

type AliasOverrideMap = Partial<Record<CanonicalEntityType, Record<string, string[]>>>

export const contentAliasOverrides: AliasOverrideMap = {
  local_area: {
    'casablanca||ain chock central': ['AIN CHOCK  (CENTRAL)', 'AIN CHOCK (CENTRAL)'],
  },
  neighborhood: {
    'casablanca||ain chock central': ['AIN CHOCK  (CENTRAL)', 'AIN CHOCK (CENTRAL)'],
  },
  office: {},
}

export function getAliasOverrides(entityType: CanonicalEntityType, citySlug: string, canonicalName: string) {
  return contentAliasOverrides[entityType]?.[`${citySlug}||${canonicalName}`] ?? []
}
