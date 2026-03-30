import type { Metadata } from 'next'
import { Cairo, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { getCurrentLocale, getDir } from '@/lib/lang'
import { getMetadataBase } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'Houma',
    template: '%s',
  },
  description: 'Guide local des démarches administratives à Casablanca, Rabat et Tanger.',
  applicationName: 'Houma',
  openGraph: {
    siteName: 'Houma',
  },
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await getCurrentLocale()
  const isAr = lang === 'ar'
  const enableVercelRuntimeScripts = process.env.NODE_ENV === 'production'

  return (
    <html
      lang={lang}
      dir={getDir(lang)}
      className={`${inter.variable} ${cairo.variable}`}
    >
      <body className={isAr ? 'font-arabic' : ''}>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
        {enableVercelRuntimeScripts ? <Analytics /> : null}
        {enableVercelRuntimeScripts ? <SpeedInsights /> : null}
      </body>
    </html>
  )
}
