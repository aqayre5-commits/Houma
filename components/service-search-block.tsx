'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { track } from '@/lib/analytics'
import type { Lang } from '@/lib/lang'
import { routes } from '@/lib/routes'
import { resolveServiceEntryHref } from '@/lib/service-entry-client'
import { searchContent } from '@/lib/search'

function normalizeQuery(value: string) {
  return value.trim()
}

export function ServiceSearchBlock({
  lang = 'fr',
  citySlug,
  localAreaSlug,
  source,
  confidence,
  title,
  description,
}: {
  lang?: Lang
  citySlug?: string
  localAreaSlug?: string | null
  source?: string | null
  confidence?: string | null
  title?: string
  description?: string
}) {
  const router = useRouter()
  const isAr = lang === 'ar'
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchContent(query), [query])

  function resolveResultHref(
    result: ReturnType<typeof searchContent>[number],
  ) {
    if (citySlug && result.serviceSlug) {
      return routes.cityService(citySlug, result.serviceSlug, {
        localAreaSlug,
        source,
        confidence,
      })
    }

    return result.href
  }

  function resolveSubmitHref() {
    const topResult = results[0]
    const trimmedQuery = normalizeQuery(query)

    if (!trimmedQuery) {
      return citySlug
        ? routes.search(`q=${encodeURIComponent(citySlug)}`)
        : routes.search()
    }

    if (topResult) {
      return resolveResultHref(topResult)
    }

    const searchQuery = citySlug ? `${trimmedQuery} ${citySlug}` : trimmedQuery
    return routes.search(`q=${encodeURIComponent(searchQuery)}`)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let href = resolveSubmitHref()
    const topResult = results[0]
    if (!citySlug && topResult?.type === 'service' && topResult.serviceSlug) {
      href = await resolveServiceEntryHref(topResult.serviceSlug)
    }
    track('search_submit', {
      query,
      route: citySlug ? routes.city(citySlug, { localAreaSlug, source, confidence }) : '/',
      city_slug: citySlug,
      destination: href,
    })
    router.push(href)
  }

  const searchLabel = title ?? (isAr ? 'ابحث عن الإجراء أولاً' : 'Chercher une démarche en premier')
  const searchDescription = description
    ?? (isAr
      ? 'ابدأ باسم الإجراء أو باسم الإجراء والمدينة. إذا كان المسار واضحاً، نفتح لك صفحة الإجابة مباشرة.'
      : "Commencez par le nom de la démarche, ou par la démarche et la ville. Si l'intention est claire, nous ouvrons directement la page réponse.")
  const placeholder = citySlug
    ? (isAr ? 'مثال: جواز السفر، شهادة السكنى، البطاقة الوطنية' : 'Ex. passeport, attestation de résidence, CNIE')
    : (isAr ? 'مثال: جواز السفر الدار البيضاء، الطابع الإلكتروني، شهادة السكنى' : 'Ex. passeport Casablanca, vignette, attestation de résidence')

  return (
    <section className="card p-5">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-slate-900">{searchLabel}</p>
        <p className="mt-1 text-sm text-slate-600">{searchDescription}</p>
      </div>

      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            id={citySlug ? 'city-service-search-input' : 'service-search-input'}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none ring-0"
            aria-label={isAr ? 'ابحث عن إجراء' : 'Chercher une démarche'}
          />
          <button
            type="submit"
            className="rounded-2xl bg-teal-700 px-5 py-3 text-center text-sm font-medium text-cyan-50"
          >
            {isAr ? 'عرض الجواب' : 'Voir la réponse'}
          </button>
        </div>

        {query ? (
          <div className="grid gap-3">
            {results.length ? (
              results.slice(0, 5).map((result) => {
                const href = resolveResultHref(result)
                return (
                  <Link
                    key={`${result.type}-${href}`}
                    href={href}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    onClick={async (event) => {
                      let destination = href
                      if (!citySlug && result.type === 'service' && result.serviceSlug) {
                        event.preventDefault()
                        destination = await resolveServiceEntryHref(result.serviceSlug)
                        router.push(destination)
                      }
                      track('search_result_click', {
                        query,
                        route: citySlug ? routes.city(citySlug, { localAreaSlug, source, confidence }) : '/',
                        result_type: result.type,
                        destination,
                      })
                    }}
                  >
                    <p className="font-medium">{isAr ? result.titleAr : result.titleFr}</p>
                    <p className="mt-1 text-sm text-slate-600">{href}</p>
                  </Link>
                )
              })
            ) : (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                {isAr ? 'لا توجد نتيجة مباشرة. جرّب اسماً أقصر أو أضف المدينة.' : 'Aucun résultat direct. Essayez un nom plus court ou ajoutez la ville.'}
              </div>
            )}
          </div>
        ) : null}
      </form>
    </section>
  )
}
