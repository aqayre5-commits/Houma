import { cities as cityRegistry } from '@/content/cities'
import { localAreas, localAreaOrderByCity } from '@/content/local-areas'
import { canonicalizeContentLabel } from '@/lib/content-normalization'
import type { Neighborhood } from '@/types/models'

export const neighborhoods: Record<string, Neighborhood> = Object.fromEntries(
  Object.values(localAreas).map((localArea) => {
    const city = cityRegistry[localArea.citySlug]
    const canonicalLabel = canonicalizeContentLabel({
      rawName: localArea.rawName,
      entityType: 'neighborhood',
      citySlug: localArea.citySlug,
      adminPath: localArea.adminPath,
      aliases: localArea.aliases,
      displayName: localArea.displayLabelFr,
    })
    const localizedNameAr = localArea.displayLabelAr ?? localArea.displayLabelFr

    return [
      `${localArea.citySlug}-${localArea.localAreaSlug}`,
      {
        slug: localArea.localAreaSlug,
        citySlug: localArea.citySlug,
        districtSlug: localArea.localAreaSlug,
        nameFr: canonicalLabel.displayName,
        nameAr: localizedNameAr,
        rawName: canonicalLabel.rawName,
        canonicalName: canonicalLabel.canonicalName,
        adminPath: canonicalLabel.adminPath,
        canonicalSlug: canonicalLabel.canonicalSlug,
        officeSlugs: [],
        indexable: true,
        aliases: canonicalLabel.aliases,
        seo: {
          titleFr: `${canonicalLabel.displayName} à ${city?.nameFr ?? localArea.cityNameFr} | Qriba`,
          titleAr: `${localizedNameAr} في ${city?.nameAr ?? localArea.cityNameAr ?? localArea.cityNameFr} | Qriba`,
          descriptionFr: `Repère administratif local à ${city?.nameFr ?? localArea.cityNameFr}: ${canonicalLabel.displayName}.`,
          descriptionAr: `مرجع إداري محلي في ${city?.nameAr ?? localArea.cityNameAr ?? localArea.cityNameFr}: ${localizedNameAr}.`,
        },
      } satisfies Neighborhood,
    ]
  }),
)

export const neighborhoodOrderByCity = localAreaOrderByCity
