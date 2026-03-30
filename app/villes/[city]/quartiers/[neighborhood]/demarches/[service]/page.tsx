import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageViewTracker } from '@/components/page-view-tracker'
import { ServiceCard } from '@/components/service-card'
import { TrackedExternalLink } from '@/components/tracked-external-link'
import { WhereToGoCard } from '@/components/where-to-go-card'
import {
  getCity,
  getLocalArea,
  getMasterService,
  getOffice,
  getSource,
  listPublishedServices,
  listSourcesForService,
} from '@/lib/content'
import { getLang } from '@/lib/lang'
import { resolveJurisdiction } from '@/lib/resolver'
import { routes } from '@/lib/routes'
import { buildMetadata, buildRobots } from '@/lib/seo'
import type { Lang } from '@/lib/lang'
import type { MasterService, OfficeRecord, ResolverResult, SourceRecord } from '@/types/models'

type Props = {
  params: Promise<{ city: string; neighborhood: string; service: string }>
  searchParams: Promise<{ source?: string; confidence?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { city, neighborhood, service } = await params
  const cityRecord = getCity(city)
  const localAreaRecord = getLocalArea(city, neighborhood)
  const serviceRecord = getMasterService(service)
  if (!cityRecord || !localAreaRecord || !serviceRecord) return {}
  const lang = await getLang()
  const isAr = lang === 'ar'
  return buildMetadata({
    title: isAr
      ? `${serviceRecord.titleAr} — ${localAreaRecord.displayLabelAr ?? localAreaRecord.displayLabelFr}, ${cityRecord.nameAr}`
      : `${serviceRecord.titleFr} — ${localAreaRecord.displayLabelFr}, ${cityRecord.nameFr}`,
    description: isAr ? serviceRecord.summaryAr : serviceRecord.summaryFr,
    path: routes.neighborhoodService(city, neighborhood, service),
    canonicalPath: serviceRecord.canonicalNeighborhoodEligible === true ? undefined : routes.cityService(city, service),
    lang,
    robots: buildRobots({ index: serviceRecord.canonicalNeighborhoodEligible === true }),
  })
}

function getOfficeTypeLabel(service: MasterService, lang: Lang) {
  const map = {
    annexe: { fr: 'Annexe responsable', ar: 'الملحقة المختصة' },
    arrondissement: { fr: 'Arrondissement responsable', ar: 'المقاطعة المختصة' },
    prefecture_arrondissement: { fr: "Préfecture d'arrondissement compétente", ar: 'عمالة المقاطعات المختصة' },
    prefecture_province: { fr: 'Préfecture ou province compétente', ar: 'العمالة أو الإقليم المختص' },
    bureau_etat_civil: { fr: "Bureau d'état civil compétent", ar: 'مكتب الحالة المدنية المختص' },
    caidat: { fr: 'Caïdat compétent', ar: 'القيادة المختصة' },
    service_centre: { fr: 'Repère ville', ar: 'مرجع المدينة' },
    local_admin_unknown: { fr: 'Autorité locale compétente', ar: 'الجهة المحلية المختصة' },
    none: { fr: 'Service en ligne officiel', ar: 'الخدمة الرسمية عبر الإنترنت' },
  } as const

  return lang === 'ar' ? map[service.officeType].ar : map[service.officeType].fr
}

function buildWhereToGoContent(input: {
  lang: Lang
  cityName: string
  service: MasterService
  selectedAreaLabel: string
  resolution: ResolverResult
  primaryOffice: OfficeRecord | null
  fallbackOffice: OfficeRecord | null
}) {
  const { lang, cityName, service, selectedAreaLabel, resolution, primaryOffice, fallbackOffice } = input
  const isAr = lang === 'ar'

  if (resolution.resolutionStatus === 'not_applicable') {
    return {
      responsibleAuthority: isAr ? 'الخدمة الرسمية عبر الإنترنت' : 'Service officiel en ligne',
      whyText: isAr
        ? `${resolution.messageAr} تبقى المنطقة المختارة مجرد سياق محلي.`
        : `${resolution.messageFr} La zone sélectionnée reste un contexte local uniquement.`,
      variant: 'online_first' as const,
      state: 'success' as const,
      supportingOffice: null,
    }
  }

  if (primaryOffice) {
    return {
      responsibleAuthority: isAr ? primaryOffice.nameAr : primaryOffice.nameFr,
      whyText: isAr
        ? `تنطبق هذه الإجابة على المنطقة المختارة: ${selectedAreaLabel}.`
        : `Cette réponse s’applique à la zone sélectionnée : ${selectedAreaLabel}.`,
      variant: 'area_confirmed' as const,
      state: 'success' as const,
      supportingOffice: null,
    }
  }

  return {
    responsibleAuthority: `${getOfficeTypeLabel(service, lang)}${isAr ? ` في ${cityName}` : ` à ${cityName}`}`,
    whyText: isAr
      ? `المنطقة المختارة هي ${selectedAreaLabel}. نستخدمها لتقديم جواب محلي أدق داخل ${cityName}.`
      : `La zone sélectionnée est ${selectedAreaLabel}. Nous l’utilisons pour donner une réponse locale plus précise à ${cityName}.`,
    variant: 'area_confirmed' as const,
    state: fallbackOffice ? 'partial' as const : 'fallback' as const,
    supportingOffice: fallbackOffice,
  }
}

function buildProcedureSteps(input: {
  lang: Lang
  serviceRecord: MasterService
  selectedAreaLabel: string
  responsibleAuthority: string
}) {
  const { lang, serviceRecord, selectedAreaLabel, responsibleAuthority } = input
  const isAr = lang === 'ar'

  return [
    isAr ? 'حضّر الوثائق المطلوبة كما هي مذكورة أدناه.' : 'Préparez les pièces demandées ci-dessous.',
    isAr
      ? `استخدم الجواب النهائي أعلاه لهذا السياق المحلي: ${responsibleAuthority}.`
      : `Utilisez la réponse finale ci-dessus pour ce contexte local : ${responsibleAuthority}.`,
    serviceRecord.deliveryMode === 'online_first'
      ? (isAr ? 'ابدأ من الرابط الرسمي عبر الإنترنت قبل أي تنقل.' : 'Commencez par le lien officiel en ligne avant tout déplacement.')
      : (isAr ? 'تحقق من الجهة المختصة أو الرابط الرسمي المناسب قبل التنقل.' : "Vérifiez l'autorité compétente ou le lien officiel utile avant de vous déplacer."),
    isAr
      ? `تبقى المنطقة المختارة (${selectedAreaLabel}) مجرد سياق محلي مساعد وليست تسمية لجهة جواز أو بطاقة تعريف.`
      : `La zone sélectionnée (${selectedAreaLabel}) reste un contexte local utile et non une désignation de guichet passeport ou CNIE.`,
  ]
}

export default async function NeighborhoodServicePage({ params, searchParams }: Props) {
  const { city, neighborhood, service } = await params
  const { source, confidence } = await searchParams
  const cityRecord = getCity(city)
  const localAreaRecord = getLocalArea(city, neighborhood)
  const serviceRecord = getMasterService(service)
  if (!cityRecord || !localAreaRecord || !serviceRecord) notFound()
  const lang = await getLang()
  const isAr = lang === 'ar'
  const resolution = resolveJurisdiction({
    citySlug: city,
    serviceSlug: service,
    localAreaSlug: neighborhood,
    mode: 'manual',
    locale: lang,
  })
  const primaryOffice = resolution.primaryOfficeSlug
    ? getOffice(resolution.primaryOfficeSlug)
    : null
  const fallbackOffice = resolution.fallbackOfficeSlug
    ? getOffice(resolution.fallbackOfficeSlug)
    : null
  const sourceList = listSourcesForService(serviceRecord.slug)
  const primarySource = resolution.officialRuleSourceSlug ? getSource(resolution.officialRuleSourceSlug) : sourceList[0] ?? null
  const cityName = isAr ? cityRecord.nameAr : cityRecord.nameFr
  const selectedAreaLabel = isAr ? localAreaRecord.displayLabelAr ?? localAreaRecord.displayLabelFr : localAreaRecord.displayLabelFr
  const whereToGo = buildWhereToGoContent({
    lang,
    cityName,
    service: serviceRecord,
    selectedAreaLabel,
    resolution,
    primaryOffice,
    fallbackOffice,
  })
  const procedureSteps = buildProcedureSteps({
    lang,
    serviceRecord,
    selectedAreaLabel,
    responsibleAuthority: whereToGo.responsibleAuthority,
  })
  const relatedServices = listPublishedServices()
    .filter((entry) => entry.slug !== serviceRecord.slug && entry.categoryFr === serviceRecord.categoryFr)
    .slice(0, 3)

  return (
    <div className="container-shell py-8 md:py-12">
      <PageViewTracker context={{ route: routes.neighborhoodService(city, neighborhood, service), templateType: 'neighborhood_service', lang, citySlug: city, neighborhoodSlug: neighborhood, serviceSlug: service, mode: 'manual', confidence: resolution.detectionConfidence }} />
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-slate-400">
        <Link
          href={routes.city(city, { localAreaSlug: localAreaRecord.localAreaSlug, source, confidence })}
          className="hover:text-slate-600"
        >
          {cityName}
        </Link>
        <span>/</span>
        <Link
          href={routes.neighborhood(city, neighborhood, { localAreaSlug: localAreaRecord.localAreaSlug, source, confidence })}
          className="hover:text-slate-600"
        >
          {selectedAreaLabel}
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{isAr ? serviceRecord.titleAr : serviceRecord.titleFr}</span>
      </nav>

      <section className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{cityName}</p>
        <h1 className="mt-1.5 text-3xl font-bold text-slate-900">{isAr ? serviceRecord.titleAr : serviceRecord.titleFr}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{isAr ? serviceRecord.summaryAr : serviceRecord.summaryFr}</p>
      </section>

      <section className="mb-8 flex flex-wrap gap-2">
        <span className={`badge ${serviceRecord.feeLabelFr === 'Gratuit' || serviceRecord.feeLabelAr === 'مجاناً' ? 'badge-green' : 'badge-amber'}`}>
          {isAr ? serviceRecord.feeLabelAr : serviceRecord.feeLabelFr}
        </span>
        <span className="badge badge-slate">{isAr ? serviceRecord.delayNoteAr.split(/[.،]/)[0] : serviceRecord.delayNoteFr.split('.')[0]}</span>
        <span className="badge badge-teal">{isAr ? `المنطقة المختارة: ${selectedAreaLabel}` : `Zone sélectionnée : ${selectedAreaLabel}`}</span>
        {serviceRecord.deliveryMode === 'online_first' ? <span className="badge badge-teal">{isAr ? 'إجراء رقمي أولاً' : 'Démarche numérique prioritaire'}</span> : null}
      </section>

      <section className="mb-8">
        <WhereToGoCard
          lang={lang}
          citySlug={cityRecord.slug}
          serviceSlug={serviceRecord.slug}
          city={cityName}
          selectedArea={selectedAreaLabel}
          selectedAreaSlug={localAreaRecord.localAreaSlug}
          responsibleAuthority={whereToGo.responsibleAuthority}
          whyText={whereToGo.whyText}
          confidence={confidence ?? resolution.detectionConfidence}
          sourceType={source}
          officialSourceUrl={primarySource?.url}
          officialSourceLabel={primarySource?.label}
          mode={source === 'manual' ? 'manual' : 'auto'}
          variant={whereToGo.variant}
          state={whereToGo.state}
          requiresLocalArea={serviceRecord.serviceScope === 'local_jurisdiction' && serviceRecord.deliveryMode !== 'online_first'}
          supportingOffice={whereToGo.supportingOffice}
        />
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">{isAr ? 'الوثائق المطلوبة' : 'Pièces à préparer'}</h2>
        <div className="card p-5">
          <ul className="checklist">
            {(isAr ? serviceRecord.requirementsAr : serviceRecord.requirementsFr).map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">{isAr ? 'الرسوم' : 'Frais'}</h2>
        <div className="card p-5 text-sm text-slate-700">{isAr ? serviceRecord.feesNoteAr : serviceRecord.feesNoteFr}</div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">{isAr ? 'الآجال والمواعيد' : 'Délai et échéance'}</h2>
        <div className="card p-5 text-sm text-slate-700">{isAr ? serviceRecord.delayNoteAr : serviceRecord.delayNoteFr}</div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">{isAr ? 'خطوات الإجراء' : 'Étapes de la démarche'}</h2>
        <div className="card p-5">
          <ol className="space-y-3 text-sm text-slate-700">
            {procedureSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-teal-700">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">{isAr ? 'المصادر الرسمية' : 'Sources officielles'}</h2>
        <div className="card p-5">
          {(serviceRecord.onlineLinks.length || sourceList.length) ? (
            <ul className="space-y-3 text-sm text-slate-700">
              {serviceRecord.onlineLinks.map((link) => (
                <li key={link.url}>
                  <TrackedExternalLink
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-words font-medium text-teal-700 hover:underline"
                    eventPayload={{ service_slug: serviceRecord.slug, link_type: link.linkType }}
                  >
                    {isAr ? link.labelAr : link.labelFr}
                  </TrackedExternalLink>
                </li>
              ))}
              {sourceList.map((sourceEntry: SourceRecord) => (
                <li key={sourceEntry.slug}>
                  <TrackedExternalLink
                    href={sourceEntry.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-words font-medium text-teal-700 hover:underline"
                    eventPayload={{ source_slug: sourceEntry.slug, service_slug: serviceRecord.slug }}
                  >
                    {sourceEntry.label}
                  </TrackedExternalLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-700">
              {isAr ? 'لا يوجد مصدر رسمي منشور لهذه الصفحة حالياً.' : 'Aucune source officielle publiée pour cette page pour le moment.'}
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-slate-900">{isAr ? 'خدمات مرتبطة' : 'Démarches liées'}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {relatedServices.length ? relatedServices.map((relatedService) => {
            const href = routes.cityService(cityRecord.slug, relatedService.slug, {
              localAreaSlug: localAreaRecord.localAreaSlug,
              source,
              confidence,
            })

            return (
              <ServiceCard
                key={relatedService.slug}
                service={relatedService}
                citySlug={cityRecord.slug}
                href={href}
                feeBadge={isAr ? relatedService.feeLabelAr : relatedService.feeLabelFr}
                delayBadge={isAr ? relatedService.delayNoteAr.split(/[.،]/)[0] : relatedService.delayNoteFr.split('.')[0]}
                lang={lang}
              />
            )
          }) : (
            <div className="card p-5 text-sm text-slate-700">
              {isAr ? 'لا توجد خدمات مرتبطة منشورة حالياً.' : 'Aucun service lié publié pour le moment.'}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
