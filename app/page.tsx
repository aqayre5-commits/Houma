import { PageViewTracker } from '@/components/page-view-tracker'
import { ServiceSearchBlock } from '@/components/service-search-block'
import { ServiceCard } from '@/components/service-card'
import { TrustStrip } from '@/components/trust-strip'
import { getHomepageData, listPublishedServices } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { buildMetadata } from '@/lib/seo'
import { useT as getT } from '@/lib/i18n'

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'Houma: الوثائق والخطوات والسلطات المحلية للخدمات في الدار البيضاء والرباط وطنجة' : 'Houma — documents, étapes et autorités locales à Casablanca, Rabat et Tanger',
    description: isAr
      ? 'اعثر على الوثائق المطلوبة وخطوات الطلب والرسوم والسلطة المحلية المعنية والمصادر الرسمية.'
      : 'Trouvez les documents requis, les étapes de la demande, les frais, l’autorité locale concernée et les sources officielles.',
    path: '/',
    lang,
  })
}

export default async function HomePage() {
  const lang = await getLang()
  const t = getT(lang)
  const data = getHomepageData()
  const services = listPublishedServices()
  const isAr = lang === 'ar'

  return (
    <div className="mobile-safe-spacing">
      <PageViewTracker context={{ route: '/', templateType: 'home', lang }} />

      <section className="container-shell pb-6 pt-10 md:pt-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            {isAr ? data.copy.heroTagAr : data.copy.heroTagFr}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {t.heroTitle1}<br className="hidden sm:block" /> {t.heroTitle2}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">{t.heroSubtitle}</p>
        </div>
      </section>

      <section className="container-shell pb-8">
        <ServiceSearchBlock lang={lang} />
      </section>

      <section className="container-shell py-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            {isAr ? 'كل الخدمات' : 'Toutes les démarches'}
          </h2>
          <p className="text-xs font-medium text-slate-500">
            {isAr ? `${data.publishedServiceCount} إجراءات منشورة` : `${data.publishedServiceCount} démarches publiées`}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              lang={lang}
              feeBadge={isAr ? service.feeLabelAr : service.feeLabelFr}
              delayBadge={isAr ? service.delayNoteAr.split(/[.،]/)[0] : service.delayNoteFr.split('.')[0]}
            />
          ))}
        </div>
      </section>

      <section className="container-shell pb-14">
        <TrustStrip lang={lang} sourcesPreview={data.sourcePreview} />
      </section>
    </div>
  )
}
