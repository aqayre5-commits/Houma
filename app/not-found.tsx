import Link from 'next/link'
import { getLang } from '@/lib/lang'
import { routes } from '@/lib/routes'

export default async function NotFound() {
  const lang = await getLang()
  const isAr = lang === 'ar'

  return (
    <div className="container-shell py-20">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-5xl font-semibold text-slate-200">404</p>
        <h1 className="mt-3 text-3xl font-semibold">{isAr ? 'الصفحة غير موجودة' : 'Page introuvable'}</h1>
        <p className="mt-3 text-slate-600">
          {isAr ? 'هذه الصفحة غير موجودة أو تم نقلها.' : "Cette page n'existe pas ou a été déplacée."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={routes.home()} className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-medium text-white">
            {isAr ? 'الرئيسية' : 'Accueil'}
          </Link>
          <Link href={routes.cities()} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium">
            {isAr ? 'المدن' : 'Villes'}
          </Link>
          <Link href={routes.services()} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium">
            {isAr ? 'الإجراءات' : 'Démarches'}
          </Link>
          <Link href={routes.search()} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium">
            {isAr ? 'البحث' : 'Recherche'}
          </Link>
        </div>
      </div>
    </div>
  )
}
