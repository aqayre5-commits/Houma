import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageViewTracker } from '@/components/page-view-tracker'
import { ServiceCard } from '@/components/service-card'
import { getCity, getLocalArea, getMasterService, listPublishedCityServices } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { formatLocationStateLine } from '@/lib/location-ui'
import { routes } from '@/lib/routes'
import { buildMetadata, buildRobots } from '@/lib/seo'

type Props = {
  params: Promise<{ city: string; neighborhood: string }>
  searchParams: Promise<{ source?: string; confidence?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { city, neighborhood } = await params
  const cityRecord = getCity(city)
  const localAreaRecord = getLocalArea(city, neighborhood)
  if (!cityRecord || !localAreaRecord) return {}
  const lang = await getLang()
  const isAr = lang === 'ar'
  return buildMetadata({
    title: isAr ? `${localAreaRecord.displayLabelAr ?? localAreaRecord.displayLabelFr} — ${cityRecord.nameAr}` : `${localAreaRecord.displayLabelFr} — ${cityRecord.nameFr}`,
    description: isAr
      ? `مرجع إداري محلي في ${cityRecord.nameAr}: ${localAreaRecord.displayLabelAr ?? localAreaRecord.displayLabelFr}.`
      : `Repère administratif local à ${cityRecord.nameFr}: ${localAreaRecord.displayLabelFr}.`,
    path: routes.neighborhood(city, neighborhood),
    lang,
    robots: buildRobots({ index: true }),
  })
}

export default async function NeighborhoodPage({ params, searchParams }: Props) {
  const { city, neighborhood } = await params
  const { source, confidence } = await searchParams
  const cityRecord = getCity(city)
  const localAreaRecord = getLocalArea(city, neighborhood)
  if (!cityRecord || !localAreaRecord) notFound()
  const lang = await getLang()
  const isAr = lang === 'ar'
  const services = listPublishedCityServices(city).slice(0, 6)
  const localAreaLabel = isAr ? localAreaRecord.displayLabelAr ?? localAreaRecord.displayLabelFr : localAreaRecord.displayLabelFr

  return (
    <div className="container-shell py-8 md:py-12">
      <PageViewTracker context={{ route: routes.neighborhood(city, neighborhood), templateType: 'neighborhood_hub', lang, citySlug: city, neighborhoodSlug: neighborhood }} />
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-slate-400">
        <Link
          href={routes.city(city, { localAreaSlug: localAreaRecord.localAreaSlug, source, confidence })}
          className="hover:text-slate-600"
        >
          {isAr ? cityRecord.nameAr : cityRecord.nameFr}
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{localAreaRecord.displayLabelFr}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              {isAr ? 'المنطقة المختارة' : 'Zone sélectionnée'}
            </p>
            <h1 className="mt-2 break-words text-3xl font-bold text-slate-900">{localAreaLabel}</h1>
            <p className="mt-3 text-slate-600">
              {isAr
                ? 'هذا المرجع المحلي مأخوذ من واتيقة ويستخدم فقط كسياق داخل المدينة. اختر الإجراء بعد ذلك لرؤية الجهة المختصة.'
                : 'Ce repère local vient de Watiqa et sert seulement de contexte dans la ville. Choisissez ensuite la démarche pour voir l’autorité responsable.'}
            </p>
          </div>

          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'المسار الإداري' : 'Chemin administratif'}</p>
            <dl className="mt-4 grid gap-3 text-sm text-slate-700">
              <div>
                <dt className="font-medium text-slate-500">{isAr ? 'العمالة أو الإقليم' : 'Province ou préfecture'}</dt>
                <dd>{localAreaRecord.provinceOrPrefecture}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">{isAr ? 'الجماعة' : 'Commune'}</dt>
                <dd>{localAreaRecord.commune}</dd>
              </div>
              {localAreaRecord.prefectureArrondissement ? (
                <div>
                  <dt className="font-medium text-slate-500">{isAr ? 'عمالة المقاطعات' : "Préfecture d'arrondissement"}</dt>
                  <dd>{localAreaRecord.prefectureArrondissement}</dd>
                </div>
              ) : null}
              {localAreaRecord.arrondissement ? (
                <div>
                  <dt className="font-medium text-slate-500">{isAr ? 'المقاطعة' : 'Arrondissement'}</dt>
                  <dd>{localAreaRecord.arrondissement}</dd>
                </div>
              ) : null}
              {localAreaRecord.bureauEtatCivil ? (
                <div>
                  <dt className="font-medium text-slate-500">{isAr ? 'مكتب الحالة المدنية' : "Bureau d'état civil"}</dt>
                  <dd>{localAreaRecord.bureauEtatCivil}</dd>
                </div>
              ) : null}
              {(source || confidence) ? (
                <div>
                  <dt className="font-medium text-slate-500">{isAr ? 'سياق الاكتشاف' : 'Contexte détecté'}</dt>
                  <dd>{formatLocationStateLine({ source, confidence, lang })}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <section>
            <div className="mb-3">
              <h2 className="text-base font-semibold text-slate-900">
                {isAr ? 'اختر إجراءً بهذا السياق' : 'Choisir une démarche avec ce contexte'}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {isAr
                  ? 'تبقى هذه الصفحة مرجعاً للسياق فقط. الجواب النهائي عن الجهة المختصة يظهر داخل صفحة الإجراء.'
                  : "Cette page reste un repère de contexte. La réponse finale sur l'autorité compétente apparaît dans la page démarche."}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((entry) => {
                const serviceRecord = getMasterService(entry.serviceSlug)
                if (!serviceRecord) return null
                const href = routes.cityService(city, serviceRecord.slug, {
                  localAreaSlug: localAreaRecord.localAreaSlug,
                  source,
                  confidence,
                })

                return (
                  <ServiceCard
                    key={serviceRecord.slug}
                    service={serviceRecord}
                    citySlug={city}
                    href={href}
                    feeBadge={isAr ? serviceRecord.feeLabelAr : serviceRecord.feeLabelFr}
                    delayBadge={isAr ? serviceRecord.delayNoteAr.split(/[.،]/)[0] : serviceRecord.delayNoteFr.split('.')[0]}
                    lang={lang}
                  />
                )
              })}
            </div>
          </section>
        </div>
        <aside>
          <Link href={routes.city(city, { localAreaSlug: localAreaRecord.localAreaSlug, source, confidence })} className="btn btn-ghost border-slate-200">
            {isAr ? 'العودة إلى صفحة المدينة بهذا السياق' : 'Retour à la ville avec ce contexte'}
          </Link>
        </aside>
      </div>
    </div>
  )
}
