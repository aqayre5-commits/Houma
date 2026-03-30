'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true'

export function AdSlot({
  placement,
  minHeight = 140,
}: {
  placement: string
  minHeight?: number
}) {
  useEffect(() => {
    if (!adsEnabled) return
    track('ad_impression', { placement, route: window.location.pathname, viewport: window.innerWidth })
  }, [placement])

  if (!adsEnabled) return null

  return (
    <div
      className="card ad-slot flex items-center justify-center text-sm text-slate-500"
      style={{ minHeight }}
      aria-label="Advertisement"
    >
      Publicité · {placement}
    </div>
  )
}
