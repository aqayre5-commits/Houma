'use client'

import { track } from '@/lib/analytics'

// Sponsor blocks are off by default. Set NEXT_PUBLIC_ENABLE_SPONSORS=true to show.
const enabled = process.env.NEXT_PUBLIC_ENABLE_SPONSORS === 'true'

export function SponsorBlock({
  placement,
  href = '/annonceurs',
  title = 'Préparer votre dossier avec un service local',
  body = 'Traducteurs, services de dossier, transport local ou accompagnement administratif.',
}: {
  placement: string
  href?: string
  title?: string
  body?: string
}) {
  if (!enabled) return null

  return (
    <aside className="card-flat border-violet-200 bg-violet-50/50 p-5">
      <div className="mb-3">
        <span className="badge badge-violet">Sponsorisé</span>
      </div>
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
      <a
        href={href}
        className="btn btn-ghost mt-4 border-violet-300 text-violet-800"
        onClick={() =>
          track('sponsor_block_click', {
            placement,
            sponsor_slug: 'placeholder',
            route: window.location.pathname,
          })
        }
      >
        Voir l'offre
      </a>
    </aside>
  )
}
