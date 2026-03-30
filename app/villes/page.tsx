import { CityCard } from '@/components/city-card'
import { PageViewTracker } from '@/components/page-view-tracker'
import { listSupportedCities, listPublishedServices } from '@/lib/content'
import { getLang } from '@/lib/lang'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return buildMetadata({
    title: isAr ? 'المدن المغطاة' : 'Villes couvertes',
    description: isAr
      ? 'الوصول إلى الصفحات المحلية للدار البيضاء والرباط وطنجة.'
      : 'Accédez aux pages locales pour Casablanca, Rabat et Tanger.',
    path: '/villes',
    lang,
  })
}

export default async function CitiesIndexPage() {
  const lang = await getLang()
  const cityList = listSupportedCities()
  const count = listPublishedServices().length

  return (
    <div className="container-shell py-10">
      <PageViewTracker context={{ route: '/villes', templateType: 'cities_index', lang }} />
      <h1 className="text-3xl font-semibold">{lang === 'ar' ? 'المدن المغطاة' : 'Villes couvertes'}</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        {lang === 'ar'
          ? `ثلاث مدن مدعومة حالياً مع ${count} إجراءً منشوراً.`
          : `Trois villes sont actuellement prises en charge avec ${count} démarches publiées.`}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cityList.length ? cityList.map((city) => (
          <CityCard key={city.slug} city={city} lang={lang} />
        )) : (
          <div className="card p-5 text-sm text-slate-700">
            {lang === 'ar' ? 'لا توجد مدن منشورة حالياً.' : 'Aucune ville publiee pour le moment.'}
          </div>
        )}
      </div>
    </div>
  )
}
