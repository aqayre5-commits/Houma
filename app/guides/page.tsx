import Link from 'next/link'
import { PageViewTracker } from '@/components/page-view-tracker'
import { listGuides } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'الأدلة العملية' : 'Guides pratiques',
    description: isAr
      ? 'أدلة عملية تساعدك على فهم الإجراءات المحلية والوثائق والرسوم والمصادر الرسمية.'
      : 'Des guides pratiques pour comprendre les démarches locales, les pièces, les frais et les sources officielles.',
    path: routes.guides(),
    lang,
  })
}

export default async function GuidesIndexPage() {
  const lang = await getLang()
  const isAr = lang === 'ar'
  const items = listGuides()

  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: routes.guides(), templateType: 'guides', lang }} />
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          {isAr ? 'الأدلة' : 'Guides'}
        </p>
        <h1 className="mt-3 text-4xl font-semibold">
          {isAr ? 'أدلة عملية لفهم المساطر المحلية' : 'Des guides utiles pour comprendre les démarches locales'}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {isAr
            ? 'هذه الصفحات التحريرية تساعدك على فهم المنطق الإداري قبل فتح صفحة الخدمة أو قبل التنقل.'
            : 'Ces pages éditoriales vous aident à comprendre la logique administrative avant d’ouvrir une page de service ou de vous déplacer.'}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((guide) => (
          <Link key={guide.slug} href={routes.guide(guide.slug)} className="card block p-6 transition hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {guide.category.replace(/-/g, ' ')}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              {isAr ? guide.titleAr : guide.titleFr}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {isAr ? guide.descriptionAr : guide.descriptionFr}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
