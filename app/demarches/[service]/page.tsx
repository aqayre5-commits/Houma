import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageViewTracker } from '@/components/page-view-tracker'
import { ServiceIntentResolver } from '@/components/service-intent-resolver'
import { getMasterService } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'
import { createEmptyDetectedLocationContext } from '@/lib/resolver'
import type { LocationDetectionSource } from '@/types/models'

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
  const { detectedLabel, source } = await searchParams
  const record = getMasterService(service)
  if (!record) notFound()

  const lang = await getLang()
  const isAr = lang === 'ar'
  const initialDetectedContext = createEmptyDetectedLocationContext()
  const unsupportedDetectedLabel = detectedLabel ?? null
  const searchParamSource: LocationDetectionSource | null =
    source === 'none' || source === 'ip' || source === 'gps' || source === 'ip_gps' || source === 'manual'
      ? source
      : null
  const detectedLocationSource =
    searchParamSource ?? (unsupportedDetectedLabel ? initialDetectedContext.source : null)

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
                ? 'تستعمل Houma الموقع الدقيق فقط لتحديد المدينة والسياق المحلي بشكل أدق لهذه الخدمة. وإذا لم توافق، يمكنك المتابعة يدوياً.'
                : 'Houma utilise la position précise uniquement pour identifier plus justement la ville et le contexte local de cette démarche. Si vous préférez, vous pouvez continuer manuellement.'}
            </p>
          </div>

          <ServiceIntentResolver
            service={record}
            lang={lang}
            initialDetectedContext={initialDetectedContext}
            detectedLocationLabel={unsupportedDetectedLabel}
            detectedLocationSource={detectedLocationSource}
          />
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'لماذا نطلب الموقع' : 'Pourquoi demander votre position'}</p>
            <p className="mt-2 text-sm text-slate-700">
              {isAr
                ? 'بعض الإجراءات تعتمد على المدينة أو على المنطقة السكنية. لذلك يساعد الموقع الدقيق على الوصول إلى الجهة المسؤولة الصحيحة بسرعة أكبر.'
                : 'Certaines démarches dépendent de la ville ou du contexte local de résidence. La position précise aide donc à atteindre plus vite la bonne autorité responsable.'}
            </p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'إذا لم تشارك موقعك' : 'Si vous ne partagez pas votre position'}</p>
            <p className="mt-2 text-sm text-slate-700">
              {isAr
                ? 'يمكنك اختيار المدينة يدوياً الآن، ثم إضافة منطقة لاحقاً من داخل صفحة الخدمة إذا احتجت إلى جواب محلي أدق.'
                : 'Vous pouvez choisir la ville manuellement maintenant, puis ajouter une zone plus tard depuis la page service si vous avez besoin d’une réponse plus précise.'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
