import { localAreas } from '@/content/local-areas'
import { buildAdminPath, canonicalizeContentLabel, normalizeForMatching } from '@/lib/content-normalization'

export type PostcodeHintRecord = {
  citySlug: 'casablanca' | 'rabat' | 'tanger'
  postalCode: string
  candidateLocalAreaSlugs: string[]
  labelFr: string
  rawName: string
  canonicalName: string
  adminPath: string
  aliases: string[]
  canonicalSlug: string
  sourceLabel: string
  sourceUrl: string
}

function byArrondissement(citySlug: PostcodeHintRecord['citySlug'], arrondissement: string) {
  return Object.values(localAreas)
    .filter(
      (record) =>
        record.citySlug === citySlug &&
        normalizeForMatching(record.arrondissement) === normalizeForMatching(arrondissement),
    )
    .map((record) => record.localAreaSlug)
}

function createPostcodeHint(input: Omit<PostcodeHintRecord, 'rawName' | 'canonicalName' | 'adminPath' | 'aliases' | 'canonicalSlug'>): PostcodeHintRecord {
  const canonicalLabel = canonicalizeContentLabel({
    rawName: input.labelFr,
    entityType: 'neighborhood',
    citySlug: input.citySlug,
    adminPath: buildAdminPath([input.citySlug, input.postalCode, input.labelFr]),
    postcode: input.postalCode,
    aliases: [input.labelFr, input.sourceLabel],
  })

  return {
    ...input,
    rawName: canonicalLabel.rawName,
    canonicalName: canonicalLabel.canonicalName,
    adminPath: canonicalLabel.adminPath,
    aliases: canonicalLabel.aliases,
    canonicalSlug: canonicalLabel.canonicalSlug,
  }
}

export const postcodeHints: PostcodeHintRecord[] = [
  createPostcodeHint({
    citySlug: 'casablanca',
    postalCode: '20000',
    candidateLocalAreaSlugs: byArrondissement('casablanca', 'SIDI BELYOUT'),
    labelFr: 'Sidi Belyout',
    sourceLabel: 'Casablanca postal district references',
    sourceUrl: 'https://www.worldpostalcodes.org/en/morocco/grand-casablanca/casablanca',
  }),
  createPostcodeHint({
    citySlug: 'casablanca',
    postalCode: '20100',
    candidateLocalAreaSlugs: byArrondissement('casablanca', 'ANFA'),
    labelFr: 'Anfa',
    sourceLabel: 'Casablanca postal district references',
    sourceUrl: 'https://codes-postaux.cybo.com/maroc/20100_casablanca/',
  }),
  createPostcodeHint({
    citySlug: 'casablanca',
    postalCode: '20230',
    candidateLocalAreaSlugs: byArrondissement('casablanca', 'HAY HASSANI'),
    labelFr: 'Hay Hassani',
    sourceLabel: 'Casablanca postal district references',
    sourceUrl: 'https://www.worldpostalcodes.org/en/morocco/grand-casablanca/casablanca',
  }),
  createPostcodeHint({
    citySlug: 'casablanca',
    postalCode: '20470',
    candidateLocalAreaSlugs: byArrondissement('casablanca', 'AIN CHOCK'),
    labelFr: 'Ain Chock',
    sourceLabel: 'Casablanca postal district references',
    sourceUrl: 'https://www.worldpostalcodes.org/en/morocco/grand-casablanca/casablanca',
  }),
  createPostcodeHint({
    citySlug: 'casablanca',
    postalCode: '20600',
    candidateLocalAreaSlugs: byArrondissement('casablanca', 'SIDI BERNOUSSI'),
    labelFr: 'Sidi Bernoussi',
    sourceLabel: 'Casablanca postal district references',
    sourceUrl: 'https://www.worldpostalcodes.org/en/morocco/grand-casablanca/casablanca',
  }),
  createPostcodeHint({
    citySlug: 'rabat',
    postalCode: '10000',
    candidateLocalAreaSlugs: byArrondissement('rabat', 'HASSAN'),
    labelFr: 'Hassan',
    sourceLabel: 'Rabat postal district references',
    sourceUrl: 'https://www.toutrabat.com/code-postal/code-postal-rabat.php',
  }),
  createPostcodeHint({
    citySlug: 'rabat',
    postalCode: '10080',
    candidateLocalAreaSlugs: byArrondissement('rabat', 'AGDAL RIYAD'),
    labelFr: 'Agdal Riyad',
    sourceLabel: 'Rabat postal district references',
    sourceUrl: 'https://www.toutrabat.com/code-postal/code-postal-rabat.php',
  }),
  createPostcodeHint({
    citySlug: 'rabat',
    postalCode: '10120',
    candidateLocalAreaSlugs: byArrondissement('rabat', 'YACOUB EL MANSOUR'),
    labelFr: 'Yacoub El Mansour',
    sourceLabel: 'Rabat postal district references',
    sourceUrl: 'https://www.toutrabat.com/code-postal/code-postal-rabat.php',
  }),
  createPostcodeHint({
    citySlug: 'rabat',
    postalCode: '10170',
    candidateLocalAreaSlugs: byArrondissement('rabat', 'SOUISSI'),
    labelFr: 'Souissi',
    sourceLabel: 'Rabat postal district references',
    sourceUrl: 'https://www.toutrabat.com/code-postal/code-postal-rabat.php',
  }),
  createPostcodeHint({
    citySlug: 'rabat',
    postalCode: '10210',
    candidateLocalAreaSlugs: byArrondissement('rabat', 'EL YOUSSOUFIA'),
    labelFr: 'El Youssoufia',
    sourceLabel: 'Rabat postal district references',
    sourceUrl: 'https://www.toutrabat.com/code-postal/code-postal-rabat.php',
  }),
  createPostcodeHint({
    citySlug: 'tanger',
    postalCode: '90020',
    candidateLocalAreaSlugs: byArrondissement('tanger', 'Arrondissement Tanger médina'),
    labelFr: 'Tanger médina',
    sourceLabel: 'Tangier postal district references',
    sourceUrl: 'https://www.worldpostalcodes.org/en/morocco/tanger-tetouan/tangier',
  }),
  createPostcodeHint({
    citySlug: 'tanger',
    postalCode: '90060',
    candidateLocalAreaSlugs: byArrondissement('tanger', 'Arrondissement Charaf essouani'),
    labelFr: 'Charaf essouani',
    sourceLabel: 'Tangier postal district references',
    sourceUrl: 'https://www.worldpostalcodes.org/en/morocco/tanger-tetouan/tangier',
  }),
  createPostcodeHint({
    citySlug: 'tanger',
    postalCode: '90070',
    candidateLocalAreaSlugs: byArrondissement('tanger', 'Arrondissement Charaf méghougha'),
    labelFr: 'Charaf méghougha',
    sourceLabel: 'Tangier postal district references',
    sourceUrl: 'https://www.worldpostalcodes.org/en/morocco/tanger-tetouan/tangier',
  }),
  createPostcodeHint({
    citySlug: 'tanger',
    postalCode: '90080',
    candidateLocalAreaSlugs: byArrondissement('tanger', 'Arrondissement Béni Makada'),
    labelFr: 'Béni Makada',
    sourceLabel: 'Tangier postal district references',
    sourceUrl: 'https://www.worldpostalcodes.org/en/morocco/tanger-tetouan/tangier',
  }),
]

export const postcodeHintsByKey = Object.fromEntries(
  postcodeHints.map((entry) => [`${entry.citySlug}:${entry.postalCode}`, entry] as const),
)
