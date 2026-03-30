'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import type { Lang } from '@/lib/lang'

export async function setLang(lang: Lang) {
  const store = await cookies()
  store.set('qriba_lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
  const h = await headers()
  const referer = h.get('referer') ?? '/'
  redirect(referer)
}
