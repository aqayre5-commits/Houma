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
      ? 'البيانات القانونية الأساسية والمعلومات التي يجب على مشغّل الموقع استكمالها قبل النشر القانوني النهائي.'
      : 'Informations légales de base et éléments que l’exploitant du site doit compléter avant publication légale définitive.',
    path: routes.legalNotice(),
    lang,
  })
}

export default async function LegalNoticePage() {
  const lang = await getLang()
  const isAr = lang === 'ar'

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
      title: isAr ? 'عنوان أو جهة الاستضافة' : 'Adresse ou point de contact de l’hébergeur',
      value: `${legalPlaceholders.hostingAddress} · ${legalPlaceholders.hostingContact}`,
    },
  ]

  return (
    <div className="container-shell mobile-safe-spacing py-8 md:py-12">
      <PageViewTracker context={{ route: routes.legalNotice(), templateType: 'legal_notice', lang }} />

      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{isAr ? 'قانوني' : 'Légal'}</p>
        <h1 className="mt-1.5 text-3xl font-bold text-slate-900 md:text-4xl">{isAr ? 'البيانات القانونية' : 'Mentions légales'}</h1>
        <p className="mt-3 text-slate-600">
          {isAr
            ? 'هذه الصفحة تجمع البيانات القانونية الأساسية الخاصة بالموقع. العناصر الموسومة بـ TODO يجب أن يستكملها المشغّل قبل اعتماد الصفحة نهائياً.'
            : 'Cette page regroupe les informations légales de base du site. Les éléments marqués TODO doivent être complétés par l’exploitant avant publication légale définitive.'}
        </p>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <p className="font-semibold">{isAr ? siteLegalDisclaimers.homeAr : siteLegalDisclaimers.homeFr}</p>
          <p className="mt-1">
            {isAr
              ? 'لا يعوّض الموقع الإدارة، ولا يقدّم خدمة إيداع الطلبات نيابة عن المستخدم.'
              : "Le site ne remplace pas l'administration et ne dépose pas les demandes pour le compte de l'utilisateur."}
          </p>
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
        <h2 className="text-lg font-semibold text-slate-900">{isAr ? 'ملاحظة قبل النشر' : 'Note avant publication'}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {isAr
            ? 'لا تحتوي هذه الصفحة على أرقام تسجيل قانونية أو بيانات شركة مفترضة. يجب إدخال هوية الناشر والمشغّل وبيانات الاستضافة الصحيحة قبل اعتبار هذه الصفحة مكتملة.'
            : "Aucun numéro d’enregistrement légal, aucune identité d’éditeur ni aucun détail d’hébergement n’ont été inventés ici. L’exploitant doit renseigner les informations exactes avant de considérer cette page comme complète."}
        </p>
      </section>
    </div>
  )
}
