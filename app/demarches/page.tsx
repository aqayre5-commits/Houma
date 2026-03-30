import { PageViewTracker } from '@/components/page-view-tracker'
import { ServiceCard } from '@/components/service-card'
import { getLang } from '@/lib/lang'
import { listPublishedServices } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export const metadata = buildMetadata({
  title: 'Démarches couvertes — Houma',
  description: 'Parcourez les démarches administratives incluses dans le périmètre v1.',
  path: '/demarches',
})

export default async function ServiceIndexPage() {
  const lang = await getLang()
  const services = listPublishedServices()
  const isAr = lang === 'ar'

  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: '/demarches', templateType: 'service_index', lang }} />
      <h1 className="text-3xl font-semibold">{isAr ? 'الإجراءات المتاحة' : 'Démarches couvertes'}</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        {isAr
          ? 'اختر الإجراء أولاً. سنحاول تحديد المدينة والمنطقة مباشرة، ولن نعرض الاختيار الاحتياطي إلا إذا لزم الأمر.'
          : "Choisissez d'abord la démarche. Nous essayons ensuite de résoudre immédiatement la ville et la zone, avec un fallback compact seulement si nécessaire."}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.length ? services.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            lang={lang}
            feeBadge={isAr ? service.feeLabelAr : service.feeLabelFr}
            delayBadge={isAr ? service.delayNoteAr.split(/[.،]/)[0] : service.delayNoteFr.split('.')[0]}
          />
        )) : (
          <div className="card p-5 text-sm text-slate-700">
            {isAr ? 'لا توجد إجراءات منشورة حالياً.' : 'Aucune demarche publiee pour le moment.'}
          </div>
        )}
      </div>
    </div>
  )
}
