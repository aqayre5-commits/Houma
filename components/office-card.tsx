'use client'

import Link from 'next/link'
import { track } from '@/lib/analytics'
import type { Lang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import type { Office, OfficeRecord } from '@/types/models'

function formatOfficeType(officeType: OfficeRecord['officeType'], lang: Lang) {
  const labels = {
    annexe: { fr: 'Annexe responsable', ar: 'الملحقة المختصة' },
    arrondissement: { fr: 'Arrondissement responsable', ar: 'المقاطعة المختصة' },
    prefecture_arrondissement: { fr: "Préfecture d'arrondissement", ar: 'عمالة المقاطعات' },
    prefecture_province: { fr: 'Préfecture ou province', ar: 'العمالة أو الإقليم' },
    bureau_etat_civil: { fr: "Bureau d'état civil", ar: 'مكتب الحالة المدنية' },
    caidat: { fr: 'Caïdat', ar: 'القيادة' },
    service_centre: { fr: 'Repère ville', ar: 'مرجع المدينة' },
    local_admin_unknown: { fr: 'Administration locale', ar: 'إدارة محلية' },
    none: { fr: 'Repère ville', ar: 'مرجع المدينة' },
  } as const

  return lang === 'ar' ? labels[officeType].ar : labels[officeType].fr
}

function getOfficeText(office: Office | OfficeRecord, lang: Lang) {
  if ('nameFr' in office) {
    return {
      name: lang === 'ar' ? office.nameAr : office.nameFr,
      district: office.districtSlug,
      address: office.notesFr ?? office.notesAr ?? office.districtSlug,
      citySlug: office.citySlug,
      mapsUrl: office.mapsUrl,
      responsibility: formatOfficeType(office.officeType, lang),
    }
  }

  return {
    name: office.name,
    district: office.district,
    address: office.address,
    citySlug: office.city,
    mapsUrl: office.mapsUrl,
    responsibility: lang === 'ar' ? 'مرجع المدينة' : 'Repère ville',
  }
}

export function OfficeCard({
  office,
  relatedHref,
  emphasis = 'default',
  lang = 'fr',
}: {
  office: Office | OfficeRecord
  relatedHref?: string
  emphasis?: 'default' | 'primary'
  lang?: Lang
}) {
  const isAr = lang === 'ar'
  const { name, district, address, citySlug, mapsUrl, responsibility } = getOfficeText(office, lang)
  const itineraryLabel = isAr ? '↖ خريطة الطريق' : 'Itinéraire ↗'
  const sheetLabel = isAr ? 'بيانات المكتب' : 'Fiche bureau'
  const localServiceLabel = isAr ? 'عرض صفحة الإجراء' : 'Voir la démarche'

  return (
    <div className={`card p-5 ${emphasis === 'primary' ? 'border-teal-300 bg-teal-50/30' : ''}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{responsibility}</p>
      <h3 className="mt-1 break-words text-base font-semibold text-slate-900">{name}</h3>
      <p className="mt-1 break-words text-sm text-slate-500">{district}</p>
      <p className="mt-2 break-words text-sm text-slate-600">{address}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {mapsUrl ? (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary text-sm"
            onClick={() =>
              track('outbound_map_click', {
                office_slug: office.slug,
                city_slug: citySlug,
                route: relatedHref ?? routes.office(office.slug),
              })
            }
          >
            {itineraryLabel}
          </a>
        ) : null}
        <Link href={routes.office(office.slug)} className="btn btn-ghost border-slate-200 text-sm">
          {sheetLabel}
        </Link>
        {relatedHref ? (
          <Link href={relatedHref} className="btn btn-ghost border-slate-200 text-sm">
            {localServiceLabel}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
