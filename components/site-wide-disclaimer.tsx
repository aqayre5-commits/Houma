import { siteLegalDisclaimers } from '@/content/legal-copy'
import type { Lang } from '@/lib/lang'

export function SiteWideDisclaimer({ lang }: { lang: Lang }) {
  const lines = lang === 'ar' ? siteLegalDisclaimers.siteWideAr : siteLegalDisclaimers.siteWideFr
  const isAr = lang === 'ar'

  return (
    <section className="container-shell pb-8">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          {isAr ? 'تنبيه قانوني' : 'Avertissement'}
        </p>
        <div className="mt-2 space-y-1.5">
          {lines.map((line, index) => (
            <p key={line} className={index === 0 ? 'font-semibold' : ''}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
