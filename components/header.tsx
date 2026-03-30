'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Logo } from '@/components/logo'
import type { Lang } from '@/lib/lang'
import { routes } from '@/lib/routes'

export function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false)
  const [isSwitchingLang, setIsSwitchingLang] = useState(false)
  const isAr = lang === 'ar'
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const nextLang = isAr ? 'fr' : 'ar'
  const query = searchParams.toString()
  const redirectTo = query ? `${pathname}?${query}` : pathname
  const langHref = `/api/set-lang?lang=${nextLang}&redirect=${encodeURIComponent(redirectTo)}`

  async function handleLanguageSwitch() {
    if (isSwitchingLang) return
    setIsSwitchingLang(true)

    try {
      const response = await fetch('/api/set-lang', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ lang: nextLang }),
      })

      if (!response.ok) {
        window.location.assign(langHref)
        return
      }

      window.location.assign(redirectTo)
    } catch {
      window.location.assign(langHref)
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="container-shell flex h-14 items-center justify-between gap-4">
        <Link
          href={routes.home()}
          className="flex items-center gap-2.5 font-semibold"
          onClick={() => setOpen(false)}
        >
          <Logo lang={lang} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href={routes.services()} className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            {isAr ? 'الإجراءات' : 'Démarches'}
          </Link>
          <Link href={routes.cities()} className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            {isAr ? 'المدن' : 'Villes'}
          </Link>
          <Link href={routes.offices()} className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            {isAr ? 'المكاتب' : 'Bureaux'}
          </Link>
          <Link href={routes.search()} className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            {isAr ? 'بحث' : 'Recherche'}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
            onClick={handleLanguageSwitch}
            disabled={isSwitchingLang}
          >
            {isAr ? 'Français' : 'العربية'}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 md:hidden"
            aria-label={open ? (isAr ? 'إغلاق القائمة' : 'Fermer le menu') : (isAr ? 'فتح القائمة' : 'Ouvrir le menu')}
            aria-expanded={open}
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="container-shell flex flex-col py-3">
            <Link href={routes.services()} onClick={() => setOpen(false)} className="border-b border-slate-50 py-3 text-sm font-medium text-slate-700">
              {isAr ? 'الإجراءات' : 'Démarches'}
            </Link>
            <Link href={routes.cities()} onClick={() => setOpen(false)} className="border-b border-slate-50 py-3 text-sm font-medium text-slate-700">
              {isAr ? 'المدن' : 'Villes'}
            </Link>
            <Link href={routes.offices()} onClick={() => setOpen(false)} className="border-b border-slate-50 py-3 text-sm font-medium text-slate-700">
              {isAr ? 'المكاتب' : 'Bureaux'}
            </Link>
            <Link href={routes.search()} onClick={() => setOpen(false)} className="border-b border-slate-50 py-3 text-sm font-medium text-slate-700">
              {isAr ? 'بحث' : 'Recherche'}
            </Link>
            <Link href={routes.issue()} onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-slate-700">
              {isAr ? 'الإبلاغ عن خطأ' : 'Signaler une erreur'}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
