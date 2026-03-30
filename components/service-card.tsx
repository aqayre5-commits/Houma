'use client'

import { useRouter } from 'next/navigation'
import type { Lang } from '@/lib/lang'
import { TrackedLink } from '@/components/tracked-link'
import { routes } from '@/lib/routes'
import { resolveServiceEntryHref } from '@/lib/service-entry-client'
import type { MasterService, Service } from '@/types/models'

function getServiceText(service: Service | MasterService, lang: Lang) {
  if ('titleFr' in service) {
    return {
      name: lang === 'ar' ? service.titleAr : service.titleFr,
      summary: lang === 'ar' ? service.summaryAr : service.summaryFr,
      category: lang === 'ar' ? service.categoryAr : service.categoryFr,
      hasOnlineStep: service.deliveryMode === 'online_first' || service.onlineLinks.length > 0,
    }
  }

  return {
    name: lang === 'ar' ? service.nameAr : service.name,
    summary: lang === 'ar' ? service.summaryAr : service.summary,
    category: lang === 'ar' ? service.categoryAr : service.category,
    hasOnlineStep: service.online.length > 0,
  }
}

export function ServiceCard({
  service,
  citySlug,
  href,
  feeBadge,
  delayBadge,
  lang = 'fr',
}: {
  service: Service | MasterService
  citySlug?: string
  href?: string
  feeBadge?: string
  delayBadge?: string
  lang?: Lang
}) {
  const router = useRouter()
  const resolvedHref = href ?? (citySlug ? routes.cityService(citySlug, service.slug) : routes.service(service.slug))
  const { name, summary, category, hasOnlineStep } = getServiceText(service, lang)
  const onlineBadge = lang === 'ar' ? 'إنترنت' : 'En ligne'
  const seeLabel = lang === 'ar' ? '← عرض' : 'Voir →'
  const shouldResolveBeforeNavigate = !citySlug && !href

  return (
    <TrackedLink
      href={resolvedHref}
      eventName="service_card_click"
      eventPayload={{
        service_slug: service.slug,
        city_slug: citySlug,
        destination: resolvedHref,
      }}
      onClick={async (event) => {
        if (!shouldResolveBeforeNavigate) return
        event.preventDefault()
        const destination = await resolveServiceEntryHref(service.slug)
        router.push(destination)
      }}
      className="card group flex flex-col justify-between p-5 transition hover:border-teal-300 hover:shadow-md"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{category}</p>
          {hasOnlineStep ? <span className="badge badge-teal shrink-0">{onlineBadge}</span> : null}
        </div>
        <p className="mt-2 text-base font-semibold text-slate-900">{name}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{summary}</p>
      </div>

      {(feeBadge || delayBadge) ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {feeBadge ? (
              <span className={`badge ${feeBadge === 'Gratuit' || feeBadge === 'مجاناً' ? 'badge-green' : 'badge-amber'}`}>
                {feeBadge}
              </span>
            ) : null}
            {delayBadge ? <span className="badge badge-slate">{delayBadge}</span> : null}
          </div>
          <span className="text-xs font-semibold text-teal-700 group-hover:underline">{seeLabel}</span>
        </div>
      ) : (
        <p className="mt-4 text-sm font-semibold text-teal-700 group-hover:underline">{seeLabel}</p>
      )}
    </TrackedLink>
  )
}
