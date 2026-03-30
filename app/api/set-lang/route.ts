import { NextRequest, NextResponse } from 'next/server'
import { resolveLocale } from '@/lib/lang'

function buildLanguageCookieResponse(response: NextResponse, lang: 'fr' | 'ar') {
  response.cookies.set({
    name: 'qriba_lang',
    value: lang,
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  response.headers.set('cache-control', 'no-store')
  return response
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lang = resolveLocale(searchParams.get('lang'))
  const redirectTo = searchParams.get('redirect') || '/'
  const safeRedirectTo = redirectTo.startsWith('/') ? redirectTo : '/'
  return buildLanguageCookieResponse(
    NextResponse.redirect(new URL(safeRedirectTo, request.url), {
      status: 307,
    }),
    lang,
  )
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { lang?: string } | null
  const lang = resolveLocale(body?.lang ?? null)
  return buildLanguageCookieResponse(NextResponse.json({ ok: true, lang }), lang)
}
