import { PageViewTracker } from '@/components/page-view-tracker'
import { legalPlaceholders, siteLegalDisclaimers } from '@/content/legal-copy'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'البيانات القانونية' : 'Mentions légales',
    description: isAr
      ? 'البيانات القانونية المنشورة لـ Houma مع الإشارة الصريحة إلى المعطيات التي ما زالت تحتاج إلى استكمال من المشغّل.'
      : 'Informations légales publiées pour Houma, avec indication explicite des données opérateur encore à compléter.',
    path: routes.legalNotice(),
    lang,
  })
}

export default async function LegalNoticePage() {
  const lang = await getLang()
  const isAr = lang === 'ar'
  const intro = isAr
    ? 'تجمع هذه الصفحة المعلومات القانونية المنشورة حالياً للموقع. كل معلومة بين معقوفين تبقى في انتظار استكمالها من طرف المشغّل.'
    : 'Cette page regroupe les informations légales actuellement publiées pour le site. Toute mention entre crochets reste à compléter par l’exploitant.'
  const legalNoticeLines = isAr ? siteLegalDisclaimers.legalNoticeAr : siteLegalDisclaimers.legalNoticeFr

  const items = [
    {
      title: isAr ? 'الناشر أو المشغّل' : 'Éditeur ou exploitant',
      value: legalPlaceholders.publisherName,
    },
    {
      title: isAr ? 'المسؤول عن النشر' : 'Responsable de publication',
      value: legalPlaceholders.publicationDirector,
    },
    {
      title: isAr ? 'العنوان' : 'Adresse',
      value: legalPlaceholders.registeredAddress,
    },
    {
      title: isAr ? 'وسيلة الاتصال' : 'Contact',
      value: legalPlaceholders.contactEmail,
    },
    {
      title: isAr ? 'الاستضافة' : 'Hébergement',
      value: legalPlaceholders.hostingProvider,
    },
    {
      title: isAr ? 'عنوان الاستضافة' : 'Adresse de l’hébergeur',
      value: legalPlaceholders.hostingAddress,
    },
    {
      title: isAr ? 'جهة اتصال الاستضافة' : 'Contact hébergeur',
      value: legalPlaceholders.hostingContact,
    },
  ]

  return (
    <div className="container-shell mobile-safe-spacing py-8 md:py-12">
      <PageViewTracker context={{ route: routes.legalNotice(), templateType: 'legal_notice', lang }} />

      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{isAr ? 'قانوني' : 'Légal'}</p>
        <h1 className="mt-1.5 text-3xl font-bold text-slate-900 md:text-4xl">{isAr ? 'البيانات القانونية' : 'Mentions légales'}</h1>
        <p className="mt-3 text-slate-600">{intro}</p>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {legalNoticeLines.map((line, index) => (
            <p key={line} className={index === 0 ? 'font-semibold' : 'mt-1'}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <section key={item.title} className="card p-5">
            <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.value}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 card p-6">
        <h2 className="text-lg font-semibold text-slate-900">{isAr ? 'حالة المعلومات' : 'État des informations'}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {isAr
            ? 'لم تتم إضافة أي بيانات شركة أو استضافة أو اتصال غير مؤكدة. تبقى الحقول بين معقوفين ظاهرة عمداً إلى حين تزويدها من طرف المشغّل.'
            : 'Aucune donnée d’éditeur, d’hébergement ou de contact n’a été inventée. Les champs entre crochets restent affichés volontairement jusqu’à confirmation par l’exploitant.'}
        </p>
      </section>
    </div>
  )
}
