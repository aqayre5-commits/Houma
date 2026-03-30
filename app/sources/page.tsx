import Link from 'next/link'
import { PageViewTracker } from '@/components/page-view-tracker'
import { siteLegalDisclaimers } from '@/content/legal-copy'
import { getSourcePageData } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { buildMetadata } from '@/lib/seo'
import { TrackedExternalLink } from '@/components/tracked-external-link'

export const revalidate = 86400

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'المصادر الرسمية' : 'Sources officielles',
    description: isAr
      ? 'المصادر الرسمية المغربية المستخدمة للتحقق من الوثائق والرسوم والإجراءات.'
      : 'Sources officielles marocaines utilisées pour vérifier les documents, frais et procédures.',
    path: '/sources',
    lang,
  })
}

function formatSourceGroupLabel(group: string, isAr: boolean) {
  const labels: Record<string, { fr: string; ar: string }> = {
    official_portal: { fr: 'Portails officiels', ar: 'البوابات الرسمية' },
    ministry: { fr: 'Ministeres', ar: 'الوزارات' },
    city_portal: { fr: 'Portails de ville', ar: 'بوابات المدن' },
    tax_authority: { fr: 'Fiscalite', ar: 'الضرائب' },
    other_public_body: { fr: 'Autres organismes publics', ar: 'هيئات عمومية اخرى' },
  }
  return isAr ? (labels[group]?.ar ?? group) : (labels[group]?.fr ?? group)
}

export default async function SourcesPage() {
  const lang = await getLang()
  const data = getSourcePageData()
  const isAr = lang === 'ar'

  return (
    <div className="container-shell mobile-safe-spacing py-8 md:py-12">
      <PageViewTracker context={{ route: '/sources', templateType: 'sources', lang }} />

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{isAr ? 'الشفافية' : 'Transparence'}</p>
        <h1 className="mt-1.5 text-3xl font-bold text-slate-900 md:text-4xl">{isAr ? 'المصادر الرسمية' : 'Sources officielles'}</h1>
        <p className="mt-3 max-w-2xl text-slate-500">{isAr ? data.copy.introAr : data.copy.introFr}</p>
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <p className="font-semibold">{isAr ? siteLegalDisclaimers.homeAr : siteLegalDisclaimers.homeFr}</p>
          <p className="mt-1">
            {isAr
              ? 'تعرض Houma المصادر التي تُستعمل لشرح الوثائق والخطوات والسلطة المحلية المحتملة، لكنها لا تصبح بذلك بوابة حكومية رسمية أو خدمة إيداع للطلبات.'
              : "Houma affiche les sources utilisées pour expliquer les documents, les étapes et l'autorité locale la plus probable, sans devenir pour autant un portail gouvernemental officiel ni un service de dépôt de demande."}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {data.groups.length ? data.groups.map((group) => (
          <section key={group.group}>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">{formatSourceGroupLabel(group.group, isAr)}</h2>
            <div className="grid gap-4">
              {group.sources.length ? group.sources.map((source) => (
                <div key={source.slug} className="card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <TrackedExternalLink
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="break-words text-base font-bold text-teal-700 hover:underline"
                        eventPayload={{ source_slug: source.slug, source_label: source.label }}
                      >
                        {source.label} ↗
                      </TrackedExternalLink>
                      <p className="mt-1 text-xs text-slate-400">{source.domain}</p>
                    </div>
                    <p className="text-xs text-slate-500">{isAr ? 'آخر مراجعة' : 'Dernière revue'}: {source.lastReviewedAt}</p>
                  </div>
                  {(isAr ? source.notesAr : source.notesFr) ? (
                    <p className="mt-3 text-sm text-slate-600">{isAr ? source.notesAr : source.notesFr}</p>
                  ) : null}
                </div>
              )) : (
                <div className="card p-5 text-sm text-slate-700">
                  {isAr ? 'لا توجد مصادر موثقة في هذه الفئة حالياً.' : 'Aucune source documentee dans cette categorie pour le moment.'}
                </div>
              )}
            </div>
          </section>
        )) : (
          <div className="card p-5 text-sm text-slate-700">
            {isAr ? 'لا توجد مصادر منشورة حالياً.' : 'Aucune source publiee pour le moment.'}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{isAr ? 'تنبيه' : 'Avertissement'}</p>
        <p className="mt-1.5 text-sm text-amber-900">
          {isAr
            ? 'يبقى الموقع دليلاً خاصاً وغير رسمي. راجع المصدر الرسمي عند الشك، وقبل التنقل أو الأداء.'
            : 'Le site reste un guide privé et non officiel. Vérifiez la source officielle en cas de doute, avant déplacement ou paiement.'}{' '}
          <Link href="/signaler-une-erreur" className="font-medium underline">
            {isAr ? 'الإبلاغ عن خطأ' : 'Signalez une erreur'}
          </Link>
        </p>
      </div>
    </div>
  )
}
