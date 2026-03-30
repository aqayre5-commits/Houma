import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageViewTracker } from '@/components/page-view-tracker'
import { SelectedAreaSummary } from '@/components/selected-area-summary'
import { ServiceCard } from '@/components/service-card'
import { ServiceSearchBlock } from '@/components/service-search-block'
import { TrustStrip } from '@/components/trust-strip'
import {
  getCity,
  getLocalArea,
  getMasterService,
  getSourcePageData,
  listLocalAreasByCity,
  listPublishedCityServices,
} from '@/lib/content'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

type Props = {
  params: Promise<{ city: string }>
  searchParams: Promise<{ localArea?: string; neighborhood?: string; source?: string; confidence?: string; service?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { city } = await params
  const record = getCity(city)
  if (!record) return {}
  const lang = await getLang()
  const isAr = lang === 'ar'
  return buildMetadata({
    title: isAr ? `الإجراءات الإدارية في ${record.nameAr}` : `Démarches administratives à ${record.nameFr} — hub de services`,
    description: isAr ? record.introAr ?? record.seo.descriptionAr : record.introFr ?? record.seo.descriptionFr,
    path: routes.city(record.slug),
    lang,
  })
}

function getLocalAreaLabel(
  selectedLocalArea: ReturnType<typeof getLocalArea>,
  lang: 'fr' | 'ar',
) {
  if (!selectedLocalArea) return null
  return lang === 'ar'
    ? selectedLocalArea.displayLabelAr ?? selectedLocalArea.displayLabelFr
    : selectedLocalArea.displayLabelFr
}

export default async function CityPage({ params, searchParams }: Props) {
  const { city } = await params
  const { localArea, neighborhood, source, confidence, service } = await searchParams
  const record = getCity(city)
  if (!record) notFound()

  const lang = await getLang()
  const isAr = lang === 'ar'
  const services = listPublishedCityServices(city)
  const localAreas = listLocalAreasByCity(city)
  const selectedLocalArea = getLocalArea(city, localArea ?? neighborhood ?? '')
  const selectedLocalAreaLabel = getLocalAreaLabel(selectedLocalArea, lang)
  const hasInvalidLocalArea = Boolean((localArea || neighborhood) && !selectedLocalArea)
  const sourcePreview = getSourcePageData().groups.flatMap((group) => group.sources).slice(0, 3)
  const returnService = service ? getMasterService(service) : null
  const groupedCategories = Array.from(
    new Map(
      services
        .map((entry) => getMasterService(entry.serviceSlug))
        .filter(Boolean)
        .map((serviceRecord) => [
          isAr ? serviceRecord!.categoryAr : serviceRecord!.categoryFr,
          serviceRecord!,
        ]),
    ).entries(),
  )

  return (
    <div className="container-shell py-8 md:py-12">
      <PageViewTracker context={{ route: routes.city(record.slug), templateType: 'city_hub', lang, citySlug: record.slug }} />

      <nav className="mb-6 flex items-center gap-1.5 text-sm text-slate-400">
        <Link href={routes.cities()} className="hover:text-slate-600">{isAr ? 'المدن' : 'Villes'}</Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{isAr ? record.nameAr : record.nameFr}</span>
      </nav>

      <section className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{isAr ? 'مدينة' : 'Ville'}</p>
        <h1 className="mt-1.5 text-4xl font-bold text-slate-900">{isAr ? record.nameAr : record.nameFr}</h1>
        <p className="mt-3 max-w-2xl text-slate-500">{isAr ? record.introAr : record.introFr}</p>
      </section>

      {selectedLocalAreaLabel ? (
        <section className="mb-6">
          <SelectedAreaSummary
            lang={lang}
            cityLabel={isAr ? record.nameAr : record.nameFr}
            selectedAreaLabel={selectedLocalAreaLabel}
            source={source}
            confidence={confidence}
            changeHref={routes.city(record.slug, {
              source,
              confidence,
              serviceSlug: returnService?.slug,
            })}
            clearHref={routes.city(record.slug, {
              source,
              confidence,
              serviceSlug: returnService?.slug,
            })}
            compact
          />
        </section>
      ) : null}

      {hasInvalidLocalArea ? (
        <section className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {isAr
            ? 'تعذر تأكيد المنطقة المطلوبة. نعرض محور الخدمات على مستوى المدينة فقط حتى تختار منطقة صالحة.'
            : "La zone demandée n'a pas pu être confirmée. Nous affichons donc le hub de services au niveau ville jusqu'à nouvelle sélection valide."}
        </section>
      ) : null}

      {returnService ? (
        <section className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {isAr ? 'الإجراء الجاري' : 'Démarche en cours'}
          </p>
          <p className="mt-1.5 text-base font-semibold text-slate-900">
            {isAr ? returnService.titleAr : returnService.titleFr}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {isAr
              ? 'إذا غيّرت المنطقة هنا، سنحافظ على هذا الإجراء قدر الإمكان.'
              : 'Si vous changez de zone ici, nous conserverons cette démarche quand cela est possible.'}
          </p>
        </section>
      ) : null}

      <section className="mb-8">
        <ServiceSearchBlock
          lang={lang}
          citySlug={record.slug}
          localAreaSlug={selectedLocalArea?.localAreaSlug}
          source={source}
          confidence={confidence}
          title={isAr ? `ابحث عن الإجراء داخل ${record.nameAr}` : `Chercher une démarche à ${record.nameFr}`}
          description={isAr
            ? 'ابدأ باسم الإجراء. إذا كانت المنطقة المختارة لازمة، سنحافظ عليها داخل رابط الخدمة.'
            : "Commencez par le nom de la démarche. Si une zone sélectionnée existe, nous la conservons dans le lien de service."}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          {isAr ? 'فئات الخدمات' : 'Catégories de services'}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {groupedCategories.map(([categoryLabel, categoryService]) => (
            <a
              key={categoryLabel}
              href={`#service-${categoryService.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-teal-300 hover:text-teal-700"
            >
              {categoryLabel}
            </a>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {isAr ? `الإجراءات الأساسية في ${record.nameAr}` : `Démarches principales à ${record.nameFr}`}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isAr
                ? 'اختر الإجراء أولاً. سنحافظ على سياق المدينة والمنطقة المختارة داخل صفحة الجواب.'
                : 'Choisissez d’abord la démarche. Nous conserverons le contexte ville et zone sélectionnée dans la page réponse.'}
            </p>
          </div>
          <p className="text-xs font-medium text-slate-500">
            {isAr ? `${services.length} إجراءات منشورة` : `${services.length} démarches publiées`}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {services.length ? services.map((entry) => {
            const serviceRecord = getMasterService(entry.serviceSlug)
            if (!serviceRecord) return null
            const href = routes.cityService(record.slug, serviceRecord.slug, {
              localAreaSlug: selectedLocalArea?.localAreaSlug,
              source,
              confidence,
            })

            return (
              <div key={entry.serviceSlug} id={`service-${serviceRecord.slug}`}>
                <ServiceCard
                  service={serviceRecord}
                  citySlug={record.slug}
                  href={href}
                  feeBadge={isAr ? serviceRecord.feeLabelAr : serviceRecord.feeLabelFr}
                  delayBadge={isAr ? serviceRecord.delayNoteAr.split(/[.،]/)[0] : serviceRecord.delayNoteFr.split('.')[0]}
                  lang={lang}
                />
              </div>
            )
          }) : (
            <div className="card p-5 text-sm text-slate-700">
              {isAr ? 'لا توجد إجراءات منشورة لهذه المدينة حالياً.' : 'Aucune démarche publiée pour cette ville pour le moment.'}
            </div>
          )}
        </div>
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-5">
          <h2 className="text-base font-semibold text-slate-900">
            {isAr ? 'تحسين المنطقة عند الحاجة' : 'Affiner la zone si nécessaire'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isAr
              ? 'استخدم هذا القسم فقط إذا كنت تحتاج جواباً محلياً أدق لبعض الإجراءات. لا يلزم اختيار منطقة قبل اكتشاف الخدمة.'
              : "Utilisez cette section seulement si vous avez besoin d'une réponse locale plus précise pour certaines démarches. La sélection d'une zone n'est pas obligatoire avant la découverte du service."}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {localAreas.slice(0, 6).map((item) => {
              const itemLabel = isAr ? item.displayLabelAr ?? item.displayLabelFr : item.displayLabelFr
              const destination = returnService
                ? routes.cityService(record.slug, returnService.slug, {
                    localAreaSlug: item.localAreaSlug,
                    source: source ?? 'manual',
                    confidence: confidence ?? 'high',
                  })
                : routes.city(record.slug, {
                    localAreaSlug: item.localAreaSlug,
                    source: source ?? 'manual',
                    confidence: confidence ?? 'high',
                  })

              return (
                <Link
                  key={item.localAreaSlug}
                  href={destination}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-teal-300"
                >
                  <p className="break-words font-semibold text-slate-900">{itemLabel}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {[item.prefectureArrondissement, item.arrondissement].filter(Boolean).join(' · ') || item.commune}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="text-base font-semibold text-slate-900">
              {isAr ? 'ملخص السياق المحلي' : 'Résumé du contexte local'}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {isAr
                ? 'تظل المنطقة المختارة مجرد سياق مضغوط داخل هذا المحور. يتحدد الجواب النهائي عن الجهة المختصة فقط داخل صفحة الإجراء.'
                : "La zone sélectionnée reste un contexte compact dans ce hub. La réponse finale sur l'autorité compétente apparaît seulement dans la page démarche."}
            </p>
            <Link
              href={routes.home()}
              className="mt-4 inline-flex rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-700"
            >
              {isAr ? 'فتح أداة تغيير المنطقة' : 'Ouvrir l’outil de changement de zone'}
            </Link>
          </div>

          <div className="card p-5">
            <h2 className="text-base font-semibold text-slate-900">
              {isAr ? 'دليل المكاتب' : 'Entrée vers le répertoire'}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {isAr
                ? 'تصفح دليل المكاتب فقط إذا كنت تحتاج مرجعاً ثانوياً، وليس قبل اختيار الإجراء.'
                : 'Parcourez le répertoire des bureaux seulement si vous avez besoin d’un repère secondaire, pas avant le choix de la démarche.'}
            </p>
            <Link href={routes.offices()} className="mt-4 inline-flex rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-700">
              {isAr ? 'فتح دليل المكاتب' : 'Ouvrir le répertoire'}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <TrustStrip lang={lang} sourcesPreview={sourcePreview} />
      </section>
    </div>
  )
}
