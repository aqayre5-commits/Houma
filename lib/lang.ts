import { cookies } from 'next/headers'
import type { Locale } from '@/types/models'

export type Lang = Locale

export const DEFAULT_LOCALE: Lang = 'fr'

export function resolveLocale(input?: string | null): Lang {
  return input === 'ar' ? 'ar' : 'fr'
}

export function getDir(lang: Lang) {
  return lang === 'ar' ? 'rtl' : 'ltr'
}

export async function getLang(): Promise<Lang> {
  const store = await cookies()
  return resolveLocale(store.get('qriba_lang')?.value)
}

export async function getCurrentLocale() {
  return getLang()
}
