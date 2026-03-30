import { PageViewTracker } from '@/components/page-view-tracker'
import { getMethodologyData } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'المنهجية' : 'Méthodologie',
    description: isAr
      ? 'قواعد جمع المصادر والتحقق والتحديث التحريري في Houma.'
      : 'Règles de sourcing, vérification et mise à jour éditoriale de Houma.',
    path: '/methodologie',
    lang,
  })
}

export default async function MethodologyPage() {
  const lang = await getLang()
  const isAr = lang === 'ar'
  const data = getMethodologyData()

  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: '/methodologie', templateType: 'methodology', lang }} />
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">{isAr ? 'المنهجية' : 'Méthodologie'}</h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">{isAr ? data.copy.introAr : data.copy.introFr}</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'المدن' : 'Villes'}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{data.cityCount}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'الإجراءات' : 'Démarches'}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{data.serviceCount}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'المصادر' : 'Sources'}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{data.sourceCount}</p>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {(isAr ? data.copy.sectionsAr : data.copy.sectionsFr).map((section) => (
          <section key={section.title} className="card p-6">
            <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
