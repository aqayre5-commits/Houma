import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { PageViewTracker } from '@/components/page-view-tracker'
import { ServiceIntentResolver } from '@/components/service-intent-resolver'
import { getMasterService } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { getDetectedLocationContextFromHeaders, getDetectedLocationLabelFromHeaders } from '@/lib/location-ip'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

type Props = {
  params: Promise<{ service: string }>
  searchParams: Promise<{ detectedLabel?: string; source?: string; confidence?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { service } = await params
  const record = getMasterService(service)
  if (!record) return {}
  const lang = await getLang()
  const isAr = lang === 'ar'
  return buildMetadata({
    title: isAr ? `${record.titleAr} — تحديد المدينة بسرعة` : `${record.titleFr} — résolution rapide de la ville`,
    description: isAr ? record.summaryAr : record.summaryFr,
    path: routes.service(record.slug),
    lang,
  })
}

export default async function ServicePage({ params, searchParams }: Props) {
  const { service } = await params
  const { detectedLabel } = await searchParams
  const record = getMasterService(service)
  if (!record) notFound()

  const lang = await getLang()
  const isAr = lang === 'ar'
  const headerStore = await headers()
  const initialDetectedContext = getDetectedLocationContextFromHeaders(headerStore)
  const unsupportedDetectedLabel = detectedLabel ?? getDetectedLocationLabelFromHeaders(headerStore)

  if (initialDetectedContext.citySlug) {
    redirect(
      routes.cityService(initialDetectedContext.citySlug, record.slug, {
        localAreaSlug: initialDetectedContext.confidence === 'high' ? initialDetectedContext.localAreaSlug : null,
        source: initialDetectedContext.source,
        confidence: initialDetectedContext.confidence,
      }),
    )
  }

  return (
    <div className="container-shell mobile-safe-spacing py-8 md:py-12">
      <PageViewTracker context={{ route: routes.service(record.slug), templateType: 'service', lang, serviceSlug: record.slug }} />

      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
        <Link href={routes.services()} className="hover:text-slate-600">{isAr ? 'الإجراءات' : 'Démarches'}</Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{isAr ? record.titleAr : record.titleFr}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{isAr ? record.categoryAr : record.categoryFr}</p>
            <h1 className="mt-1.5 text-3xl font-bold text-slate-900 md:text-4xl">{isAr ? record.titleAr : record.titleFr}</h1>
            <p className="mt-3 max-w-2xl text-slate-500">
              {isAr
                ? 'سنحاول فتح صفحة الجواب النهائية مباشرة. إذا كانت المدينة غير معروفة، سنطلب فقط الحد الأدنى اللازم.'
                : 'Nous essayons d’ouvrir directement la page réponse finale. Si la ville reste inconnue, nous ne demandons que le minimum nécessaire.'}
            </p>
          </div>

          <ServiceIntentResolver
            service={record}
            lang={lang}
            initialDetectedContext={initialDetectedContext}
            detectedLocationLabel={unsupportedDetectedLabel}
          />
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'الجواب النهائي' : 'Page finale'}</p>
            <p className="mt-2 text-sm text-slate-700">
              {isAr
                ? 'ستنتقل إلى صفحة الخدمة داخل المدينة، حيث يظهر الجواب النهائي عن الجهة المختصة.'
                : 'Vous arriverez sur la page service dans la ville, où apparaît la réponse finale.'}
            </p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'إذا كانت المدينة غير معروفة' : 'If the city is still unknown'}</p>
            <p className="mt-2 text-sm text-slate-700">
              {isAr
                ? 'سنطلب المدينة فقط، ويمكنك إضافة منطقة لاحقاً من داخل صفحة الخدمة.'
                : 'Nous demandons ici seulement la ville. Vous pourrez ajouter une zone plus tard depuis la page service.'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
