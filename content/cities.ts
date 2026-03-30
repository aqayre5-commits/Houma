import { cities as legacyCities } from '@/lib/data'
import type { ContentCity } from '@/types/models'

export const cities: Record<string, ContentCity> = {
  casablanca: {
    slug: 'casablanca',
    nameFr: legacyCities.casablanca.name,
    nameAr: legacyCities.casablanca.nameAr,
    isSupported: true,
    districts: ['centre', 'hay-hassani', 'ain-sebaa'],
    introFr: legacyCities.casablanca.hero,
    introAr: legacyCities.casablanca.heroAr,
    mapCenter: { lat: 33.5731, lng: -7.5898 },
    seo: {
      titleFr: 'Démarches administratives à Casablanca | Qriba',
      titleAr: 'الإجراءات الإدارية في الدار البيضاء | Qriba',
      descriptionFr: legacyCities.casablanca.hero,
      descriptionAr: legacyCities.casablanca.heroAr,
    },
  },
  rabat: {
    slug: 'rabat',
    nameFr: legacyCities.rabat.name,
    nameAr: legacyCities.rabat.nameAr,
    isSupported: true,
    districts: ['centre', 'yacoub-el-mansour', 'agdal-riyad'],
    introFr: legacyCities.rabat.hero,
    introAr: legacyCities.rabat.heroAr,
    mapCenter: { lat: 34.0209, lng: -6.8416 },
    seo: {
      titleFr: 'Démarches administratives à Rabat | Qriba',
      titleAr: 'الإجراءات الإدارية في الرباط | Qriba',
      descriptionFr: legacyCities.rabat.hero,
      descriptionAr: legacyCities.rabat.heroAr,
    },
  },
  tanger: {
    slug: 'tanger',
    nameFr: legacyCities.tanger.name,
    nameAr: legacyCities.tanger.nameAr,
    isSupported: true,
    districts: ['centre', 'beni-makada', 'malabata'],
    introFr: legacyCities.tanger.hero,
    introAr: legacyCities.tanger.heroAr,
    mapCenter: { lat: 35.7595, lng: -5.834 },
    seo: {
      titleFr: 'Démarches administratives à Tanger | Qriba',
      titleAr: 'الإجراءات الإدارية في طنجة | Qriba',
      descriptionFr: legacyCities.tanger.hero,
      descriptionAr: legacyCities.tanger.heroAr,
    },
  },
}

export const cityOrder = ['casablanca', 'rabat', 'tanger'] as const
