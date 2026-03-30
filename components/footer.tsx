import Link from 'next/link'
import { Logo } from '@/components/logo'
import { routes } from '@/lib/routes'
import { useT } from '@/lib/i18n'
import type { Lang } from '@/lib/lang'

export function Footer({ lang = 'fr' }: { lang?: Lang }) {
  const t = useT(lang)

  return (
    <footer className="mt-16 border-t border-slate-100 bg-white">
      <div className="container-shell py-10">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="space-y-3 md:col-span-2">
            <Logo lang={lang} />
            <p className="text-sm leading-relaxed text-slate-500">{t.footerTagline}</p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {t.nonOfficialBadge}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.footerExplore}</p>
            <nav className="flex flex-col gap-2 text-sm text-slate-600">
              <Link href={routes.cities()} className="hover:text-teal-700">{t.footerCities}</Link>
              <Link href={routes.services()} className="hover:text-teal-700">{t.footerServices}</Link>
              <Link href={routes.offices()} className="hover:text-teal-700">{t.footerOffices}</Link>
              <Link href={routes.search()} className="hover:text-teal-700">{t.search}</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.footerGuides}</p>
            <nav className="flex flex-col gap-2 text-sm text-slate-600">
              <Link href={routes.guides()} className="hover:text-teal-700">{t.footerAllGuides}</Link>
              <Link href={routes.guide('passeport-et-cnie-dans-les-villes-couvertes')} className="hover:text-teal-700">Passeport et CNIE</Link>
              <Link href={routes.guide('attestation-residence-et-legalisation-ou-aller')} className="hover:text-teal-700">Attestations et actes</Link>
              <Link href={routes.guide('vignette-auto-paiement-et-exoneration')} className="hover:text-teal-700">Vignette auto</Link>
              <Link href={routes.faq()} className="hover:text-teal-700">{t.footerFaq}</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.footerInfo}</p>
            <nav className="flex flex-col gap-2 text-sm text-slate-600">
              <Link href={routes.howItWorks()} className="hover:text-teal-700">{t.footerHowItWorks}</Link>
              <Link href={routes.about()} className="hover:text-teal-700">{t.footerAbout}</Link>
              <Link href={routes.methodology()} className="hover:text-teal-700">{t.footerMethodology}</Link>
              <Link href={routes.sources()} className="hover:text-teal-700">{t.footerSources}</Link>
              <Link href={routes.issue()} className="hover:text-teal-700">{t.reportError}</Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          {t.footerNote}
        </div>
      </div>
    </footer>
  )
}
