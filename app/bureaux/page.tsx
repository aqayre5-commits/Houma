import { OfficeCard } from '@/components/office-card'
import { PageViewTracker } from '@/components/page-view-tracker'
import { listOffices } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { buildMetadata, buildRobots } from '@/lib/seo'

export const revalidate = 21600

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'المكاتب والملاحق الإدارية' : 'Bureaux et annexes administratives',
    description: isAr
      ? 'تصفح المكاتب ونقاط الانطلاق المتابعة في الدار البيضاء والرباط وطنجة.'
      : 'Parcourez les bureaux suivis dans Casablanca, Rabat et Tanger.',
    path: '/bureaux',
    lang,
    robots: buildRobots({ index: false }),
  })
}

export default async function OfficesIndexPage() {
  const lang = await getLang()
  const offices = listOffices()
  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: '/bureaux', templateType: 'office_index', lang }} />
      <h1 className="text-3xl font-semibold">{lang === 'ar' ? 'المكاتب' : 'Bureaux'}</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        {lang === 'ar'
          ? 'دليل المكاتب المحلية ونقاط الانطلاق حسب المدينة.'
          : 'Annexes administratives et points de départ locaux suivis dans le périmètre v1.'}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {offices.length ? offices.map((office) => (
          <OfficeCard key={office.slug} office={office} lang={lang} />
        )) : (
          <div className="card p-5 text-sm text-slate-700">
            {lang === 'ar' ? 'لا توجد مكاتب منشورة حالياً.' : 'Aucun bureau publie pour le moment.'}
          </div>
        )}
      </div>
    </div>
  )
}
