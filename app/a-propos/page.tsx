import { PageViewTracker } from '@/components/page-view-tracker'
import { getAboutData } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'حول Houma' : 'À propos',
    description: isAr
      ? 'ما هو Houma وكيف يساعد على فهم الوثائق المطلوبة وخطوات الطلب والسلطات المحلية المعنية.'
      : 'Ce que fait Houma et comment le site aide à comprendre les documents requis, les étapes de demande et les autorités locales concernées.',
    path: '/a-propos',
    lang,
  })
}

export default async function AboutPage() {
  const lang = await getLang()
  const isAr = lang === 'ar'
  const data = getAboutData()

  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: '/a-propos', templateType: 'about', lang }} />
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">{isAr ? 'حول Houma' : 'À propos'}</h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">{isAr ? data.copy.introAr : data.copy.introFr}</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'التغطية' : 'Couverture'}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{data.cityCount} {isAr ? 'مدن' : 'villes'}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{isAr ? 'الإجراءات المنشورة' : 'Démarches publiées'}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{data.serviceCount}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
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
