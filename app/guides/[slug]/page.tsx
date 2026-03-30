import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageViewTracker } from '@/components/page-view-tracker'
import { getGuide, getMasterService, getFaq } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? guide.seoTitleAr : guide.seoTitleFr,
    description: isAr ? guide.seoDescriptionAr : guide.seoDescriptionFr,
    path: routes.guide(slug),
    lang,
  })
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()
  const lang = await getLang()
  const isAr = lang === 'ar'
  const relatedServices = guide.relatedServiceSlugs
    .map((serviceSlug) => getMasterService(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
  const relatedFaqs = guide.faqIds
    .map((faqId) => getFaq(faqId))
    .filter((faq): faq is NonNullable<typeof faq> => Boolean(faq))

  return (
    <article className="container-shell py-10">
      <PageViewTracker context={{ route: routes.guide(slug), templateType: 'guide', lang }} />
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">{isAr ? 'دليل عملي' : 'Guide pratique'}</p>
        <h1 className="text-4xl font-semibold">{isAr ? guide.titleAr : guide.titleFr}</h1>
        <p className="text-lg text-slate-600">{isAr ? guide.introAr : guide.introFr}</p>

        {guide.sections.map((section) => (
          <section key={section.headingFr} className="card p-6">
            <h2 className="text-xl font-semibold">{isAr ? section.headingAr : section.headingFr}</h2>
            <p className="mt-3 text-slate-700">{isAr ? section.bodyAr : section.bodyFr}</p>
            {(isAr ? section.bulletsAr : section.bulletsFr)?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {(isAr ? section.bulletsAr : section.bulletsFr)?.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {isAr
            ? 'هذا دليل خاص وغير رسمي. تحقق دائما من المعلومة لدى الإدارة أو المصدر الرسمي المعني.'
            : "Guide privé et non officiel. Vérifiez toujours l'information auprès de l'administration ou de la source officielle concernée."}
        </div>

        {relatedServices.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {relatedServices.map((service) => (
              <Link key={service.slug} href={routes.service(service.slug)} className="card block p-5 transition hover:-translate-y-0.5">
                <p className="font-semibold">{isAr ? service.titleAr : service.titleFr}</p>
                <p className="mt-1 text-sm text-teal-700">{isAr ? 'فتح صفحة الخدمة' : 'Ouvrir la démarche'}</p>
              </Link>
            ))}
          </div>
        ) : null}

        {relatedFaqs.length ? (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{isAr ? 'أسئلة مرتبطة' : 'Questions liées'}</h2>
            <div className="space-y-3">
              {relatedFaqs.map((faq) => (
                <div key={faq.id} className="card p-5">
                  <p className="font-semibold">{isAr ? faq.questionAr : faq.questionFr}</p>
                  <p className="mt-2 text-sm text-slate-600">{isAr ? faq.answerAr : faq.answerFr}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2 text-sm">
          <Link href={routes.guides()} className="link-quiet">{isAr ? 'جميع الأدلة' : 'Tous les guides'}</Link>
          <span className="text-slate-300">·</span>
          <Link href={routes.faq()} className="link-quiet">{isAr ? 'الأسئلة الشائعة' : 'Questions fréquentes'}</Link>
          <span className="text-slate-300">·</span>
          <Link href={routes.services()} className="link-quiet">{isAr ? 'جميع الإجراءات' : 'Toutes les démarches'}</Link>
        </div>
      </div>
    </article>
  )
}
