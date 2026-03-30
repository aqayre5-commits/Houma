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
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Logo lang={lang} />
            <p className="text-sm leading-relaxed text-slate-500">{t.footerTagline}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.footerResources}</p>
            <nav className="flex flex-col gap-2 text-sm text-slate-600">
              <Link href={routes.guides()} className="hover:text-teal-700">{t.footerAllGuides}</Link>
              <Link href={routes.faq()} className="hover:text-teal-700">{t.footerFaq}</Link>
              <Link href={routes.sources()} className="hover:text-teal-700">{t.footerSources}</Link>
              <Link href={routes.issue()} className="hover:text-teal-700">{t.reportError}</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.footerLegal}</p>
            <nav className="flex flex-col gap-2 text-sm text-slate-600">
              <Link href={routes.legalNotice()} className="hover:text-teal-700">{t.footerLegalNotice}</Link>
              <Link href={routes.privacy()} className="hover:text-teal-700">{t.footerPrivacy}</Link>
              <Link href={routes.cookies()} className="hover:text-teal-700">{t.footerCookies}</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
