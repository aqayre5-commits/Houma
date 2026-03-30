'use client'

import { track, type AnalyticsEventName, type AnalyticsPayload } from '@/lib/analytics'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  eventName?: AnalyticsEventName
  eventPayload?: AnalyticsPayload
}

export function TrackedExternalLink({
  children,
  className,
  eventName = 'source_click_outbound',
  eventPayload,
  onClick,
  ...props
}: Props) {
  return (
    <a
      {...props}
      className={className}
      onClick={(event) => {
        track(eventName, {
          route: window.location.pathname,
          href: props.href,
          ...eventPayload,
        })
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
