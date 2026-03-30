import type { Lang } from '@/lib/lang'

export function Logo({
  lang = 'fr',
  showWordmark = true,
  compact = false,
}: {
  lang?: Lang
  showWordmark?: boolean
  compact?: boolean
}) {
  const isAr = lang === 'ar'
  const label = 'Houma'
  const markSize = compact ? 'h-8 w-8' : 'h-10 w-10'

  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={`inline-flex items-center justify-center rounded-full bg-teal-700 text-white ${markSize}`}>
        <svg
          width={compact ? '18' : '20'}
          height={compact ? '18' : '20'}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 11.4L12 5l8 6.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 10.9V19h11v-8.1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.2 19v-4.8h3.6V19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {showWordmark ? (
        <span className={`font-semibold text-slate-900 ${isAr ? 'font-arabic' : ''}`}>
          {label}
        </span>
      ) : null}
    </span>
  )
}
