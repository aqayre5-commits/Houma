import Link from 'next/link'
import type { Lang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import type { SourceRecord } from '@/types/models'

export function TrustStrip({
  lang = 'fr',
  sourcesPreview,
}: {
  lang?: Lang
  sourcesPreview?: SourceRecord[]
}) {
  const isAr = lang === 'ar'
  const preview = sourcesPreview?.slice(0, 3) ?? []

  return (
    <section className="card grid gap-5 p-5 md:grid-cols-3">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M7.5 1L9.5 5.5H14L10.5 8.5L12 13L7.5 10.5L3 13L4.5 8.5L1 5.5H5.5L7.5 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/></svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{isAr ? 'دليل غير رسمي' : 'Guide non officiel'}</p>
          <p className="text-sm text-slate-500">
            {isAr
              ? 'الموقع مستقل وغير تابع لإدارة عمومية. المحتوى موجّه للإرشاد قبل التنقل.'
              : "Le site est indépendant et non affilié à une administration. Le contenu guide l'orientation avant déplacement."}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M7.5 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{isAr ? 'مصادر مرئية' : 'Sources visibles'}</p>
          <p className="text-sm text-slate-500">
            {preview.length > 0
              ? preview.map((source) => source.label).join(' · ')
              : isAr
                ? 'كل صفحة نهائية تعرض مرجعاً رسمياً وتاريخ مراجعة.'
                : 'Chaque page finale expose au moins une source officielle et une date de revue.'}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M2 7.5h11M8 3l4.5 4.5L8 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{isAr ? 'التصحيحات مرحب بها' : 'Corrections bienvenues'}</p>
          <p className="text-sm text-slate-500">
            <Link href={routes.issue()} className="font-medium text-teal-700 hover:underline">
              {isAr ? 'الإبلاغ عن خطأ' : 'Signaler une erreur'}
            </Link>
            {isAr ? ' إذا وجدت معلومة غير دقيقة.' : " si vous repérez une information imprécise."}
          </p>
        </div>
      </div>
    </section>
  )
}
