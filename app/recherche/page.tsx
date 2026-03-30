import { PageViewTracker } from '@/components/page-view-tracker'
import { ServiceSearchBlock } from '@/components/service-search-block'
import { TrackedLink } from '@/components/tracked-link'
import { getLang } from '@/lib/lang'
import { searchContent } from '@/lib/search'
import { buildMetadata, buildRobots } from '@/lib/seo'

type Props = {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'البحث' : 'Recherche',
    description: isAr ? 'نتائج البحث الداخلية داخل Houma.' : 'Résultats de recherche internes.',
    path: '/recherche',
    lang,
    robots: buildRobots({ index: false }),
  })
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const lang = await getLang()
  const results = searchContent(q)
  const isAr = lang === 'ar'

  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: '/recherche', templateType: 'search', lang }} />
      <h1 className="text-3xl font-semibold">{isAr ? 'البحث' : 'Recherche'}</h1>
      <p className="mt-3 text-slate-600">{isAr ? 'نتائج البحث المباشرة داخل Houma.' : 'Résultats directs pour votre requête.'}</p>
      <div className="mt-6">
        <ServiceSearchBlock lang={lang} />
      </div>
      <div className="mt-6 grid gap-3">
        {results.length ? (
          results.map((result) => (
            <TrackedLink
              key={`${result.type}-${result.href}`}
              href={result.href}
              className="card p-5"
              eventName="search_result_click"
              eventPayload={{ result_type: result.type, destination: result.href, query: q }}
            >
              <p className="font-semibold">{isAr ? result.titleAr : result.titleFr}</p>
              <p className="mt-1 text-sm text-slate-600">{result.href}</p>
            </TrackedLink>
          ))
        ) : (
          <div className="card p-5 text-sm text-slate-700">
            {isAr ? 'لا توجد نتيجة مباشرة. جرّب مدينة أو إجراء أقصر.' : 'Aucun résultat direct. Essayez une ville ou une démarche plus courte.'}
          </div>
        )}
      </div>
    </div>
  )
}
