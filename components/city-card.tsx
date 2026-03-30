import Link from 'next/link'
import type { City, ContentCity } from '@/types/models'
import type { Lang } from '@/lib/lang'
import { routes } from '@/lib/routes'

function getNames(city: City | ContentCity, lang: Lang) {
  if ('nameFr' in city) {
    return {
      name: lang === 'ar' ? city.nameAr : city.nameFr,
      region: lang === 'ar' ? city.nameAr : city.nameFr,
    }
  }

  return {
    name: lang === 'ar' ? city.nameAr : city.name,
    region: lang === 'ar' ? city.regionAr : city.region,
  }
}

export function CityCard({
  city,
  variant = 'default',
  lang = 'fr',
}: {
  city: City | ContentCity
  variant?: 'default' | 'compact'
  lang?: Lang
}) {
  const { name, region } = getNames(city, lang)
  const seeLabel = lang === 'ar' ? '← عرض الإجراءات' : 'Voir les démarches'

  if (variant === 'compact') {
    return (
      <Link
        href={routes.city(city.slug)}
        className="card flex items-center justify-between p-4 transition hover:border-teal-300"
      >
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="mt-0.5 text-sm text-slate-500">{region}</p>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-teal-600 rtl:rotate-180" aria-hidden="true">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    )
  }

  return (
    <Link
      href={routes.city(city.slug)}
      className="card group flex flex-col justify-between p-6 transition hover:border-teal-300 hover:shadow-md"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{region}</p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{name}</p>
      </div>
      <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-all group-hover:gap-2.5">
        {seeLabel}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="rtl:rotate-180">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  )
}
