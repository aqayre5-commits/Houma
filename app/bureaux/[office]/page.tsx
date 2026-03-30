import Link from 'next/link'
import { notFound } from 'next/navigation'
import { OfficeCard } from '@/components/office-card'
import { PageViewTracker } from '@/components/page-view-tracker'
import { TrackedLink } from '@/components/tracked-link'
import { getCity, getMasterService, getOffice } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 21600

type Props = {
  params: Promise<{ office: string }>
}

export async function generateMetadata({ params }: Props) {
  const { office } = await params
  const record = getOffice(office)
  if (!record) return {}
  const city = getCity(record.citySlug)
  const lang = await getLang()
  const isAr = lang === 'ar'
  return buildMetadata({
    title: isAr ? `${record.nameAr} — ${city?.nameAr ?? ''}` : `${record.nameFr} — services couverts à ${city?.nameFr ?? ''}`,
    description: isAr
      ? `${record.nameAr} في ${city?.nameAr ?? ''}: الإجراءات المغطاة ونطاق الخدمة المحلي.`
      : `${record.nameFr} à ${city?.nameFr ?? ''}: démarches couvertes et zone desservie.`,
    path: routes.office(record.slug),
    lang,
  })
}

export default async function OfficePage({ params }: Props) {
  const { office } = await params
  const record = getOffice(office)
  if (!record) notFound()
  const city = getCity(record.citySlug)
  if (!city) notFound()
  const lang = await getLang()
  const isAr = lang === 'ar'

  return (
    <div className="container-shell mobile-safe-spacing py-8 md:py-12">
      <PageViewTracker context={{ route: routes.office(record.slug), templateType: 'office_detail', lang, citySlug: record.citySlug, officeSlug: record.slug }} />

      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
        <Link href={routes.offices()} className="hover:text-slate-600">{isAr ? 'المكاتب' : 'Bureaux'}</Link>
        <span>/</span>
        <Link href={routes.city(city.slug)} className="hover:text-slate-600">{isAr ? city.nameAr : city.nameFr}</Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{isAr ? record.nameAr : record.nameFr}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          <OfficeCard office={record} emphasis="primary" lang={lang} />
          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">{isAr ? 'الإجراءات المغطاة' : 'Démarches couvertes'}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {record.supportedServices.length ? record.supportedServices.map((serviceSlug) => {
                const service = getMasterService(serviceSlug)
                if (!service) return null
                return (
                  <TrackedLink
                    key={service.slug}
                    href={routes.cityService(city.slug, service.slug)}
                    className="card group flex flex-col p-4 transition hover:border-teal-300 hover:shadow-sm"
                    eventName="service_card_click"
                    eventPayload={{ service_slug: service.slug, city_slug: city.slug, destination: routes.cityService(city.slug, service.slug) }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? service.categoryAr : service.categoryFr}</p>
                    <p className="mt-1.5 font-semibold text-slate-900">{isAr ? service.titleAr : service.titleFr}</p>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">{isAr ? service.summaryAr : service.summaryFr}</p>
                    <p className="mt-3 text-xs font-semibold text-teal-700 group-hover:underline">{isAr ? '← عرض الدليل' : 'Voir le guide →'}</p>
                  </TrackedLink>
                )
              }) : (
                <div className="card p-5 text-sm text-slate-700">
                  {isAr ? 'لا توجد إجراءات منشورة لهذا المكتب حالياً.' : 'Aucune demarche publiee pour ce bureau pour le moment.'}
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'نطاق المسؤولية المحلي' : 'Zone de responsabilité locale'}</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {record.neighborhoodsServed.length ? record.neighborhoodsServed.map((sector) => (
                <li key={sector}>{sector}</li>
              )) : (
                <li>{isAr ? 'نطاق الخدمة المحلي غير موثق بعد.' : "Le perimetre local n'est pas encore documente."}</li>
              )}
            </ul>
          </div>
          <Link
            href={routes.city(city.slug)}
            className="flex w-full items-center justify-between rounded-2xl border border-teal-200 bg-teal-50 px-5 py-4 text-sm font-semibold text-teal-800 hover:bg-teal-100"
          >
            {isAr ? `كل الإجراءات في ${city.nameAr}` : `Toutes les démarches à ${city.nameFr}`}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </aside>
      </div>
    </div>
  )
}
