'use client'

import { useEffect } from 'react'
import { buildAnalyticsContext, track, trackPageViewTemplateType } from '@/lib/analytics'
import type { AnalyticsContext } from '@/types/models'

export function PageViewTracker({
  event,
  payload,
  context,
}: {
  event?: string
  payload?: Record<string, string | number | boolean | undefined>
  context?: AnalyticsContext
}) {
  useEffect(() => {
    if (context) {
      trackPageViewTemplateType(context)
      return
    }
    if (event) track(event, { route: window.location.pathname, ...payload })
  }, [context, event, payload])

  return null
}
