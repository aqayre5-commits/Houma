import { PageViewTracker } from '@/components/page-view-tracker'
import { listFaqs } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'الأسئلة الشائعة' : 'Questions fréquentes',
    description: isAr
      ? 'أسئلة وأجوبة مختصرة حول الإجراءات المحلية والمنطقة المختارة والجهة المسؤولة والمصادر الرسمية.'
      : 'Des réponses courtes aux questions fréquentes sur les démarches locales, la zone sélectionnée, l’autorité responsable et les sources officielles.',
    path: routes.faq(),
    lang,
  })
}

export default async function FaqPage() {
  const lang = await getLang()
  const isAr = lang === 'ar'
  const items = listFaqs()

  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: routes.faq(), templateType: 'faq', lang }} />
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
        </p>
        <h1 className="mt-3 text-4xl font-semibold">
          {isAr ? 'الأسئلة الشائعة حول Houma والخدمات المحلية' : 'Questions fréquentes sur Houma et les démarches locales'}
        </h1>
      </div>

      <div className="mt-8 space-y-4">
        {items.map((faq) => (
          <section key={faq.id} className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {isAr ? faq.questionAr : faq.questionFr}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {isAr ? faq.answerAr : faq.answerFr}
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
