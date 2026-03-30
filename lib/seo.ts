import type { Metadata } from 'next'
import type { Lang } from '@/lib/lang'

const FALLBACK_SITE_URL = 'https://your-domain.tld'

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || FALLBACK_SITE_URL
  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/$/, '')
}

export function getMetadataBase() {
  return new URL(getSiteUrl())
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString()
}

export function buildCanonical(path: string) {
  return absoluteUrl(path)
}

export function buildRobots({ index, follow = true }: { index: boolean; follow?: boolean }) {
  return { index, follow }
}

export function buildMetadata({
  title,
  description,
  path,
  canonicalPath,
  lang = 'fr',
  robots,
}: {
  title: string
  description: string
  path: string
  canonicalPath?: string
  lang?: Lang
  robots?: { index: boolean; follow?: boolean }
}): Metadata {
  const fullTitle = title.includes('Houma') ? title : `${title} | Houma`
  const canonical = buildCanonical(canonicalPath ?? path)

  return {
    metadataBase: getMetadataBase(),
    title: fullTitle,
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: 'Houma',
      images: [{ url: absoluteUrl('/og/default.svg'), width: 1200, height: 630 }],
      locale: lang === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl('/og/default.svg')],
    },
  }
}
