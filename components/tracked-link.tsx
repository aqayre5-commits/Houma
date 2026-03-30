'use client'

import Link, { type LinkProps } from 'next/link'
import { track, type AnalyticsEventName, type AnalyticsPayload } from '@/lib/analytics'

type Props = LinkProps & {
  children: React.ReactNode
  className?: string
  eventName?: AnalyticsEventName
  eventPayload?: AnalyticsPayload
  prefetch?: boolean
}

export function TrackedLink({
  children,
  className,
  eventName,
  eventPayload,
  onClick,
  ...props
}: Props & { onClick?: React.MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Link
      {...props}
      className={className}
      onClick={(event) => {
        if (eventName) {
          track(eventName, {
            route: window.location.pathname,
            ...eventPayload,
          })
        }
        onClick?.(event)
      }}
    >
      {children}
    </Link>
  )
}
