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
  const markSize = compact ? 32 : 40
  const iconSize = compact ? 32 : 40

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="inline-flex items-center justify-center"
        style={{ width: `${markSize}px`, height: `${markSize}px` }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <rect x="1.5" y="1.5" width="37" height="37" rx="12" fill="#1F6B4F" stroke="#D9C8A9" strokeWidth="1.5" />
          <path
            d="M12 28V18.75C12 14.1937 15.5596 10.5 20 10.5C24.4404 10.5 28 14.1937 28 18.75V28"
            stroke="#FFF8E8"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 28V20.25"
            stroke="#FFF8E8"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M25.5 28V20.25"
            stroke="#FFF8E8"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M20 19V28"
            stroke="#FFF8E8"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M17 28V23.5C17 21.8431 18.3431 20.5 20 20.5C21.6569 20.5 23 21.8431 23 23.5V28"
            fill="#C89B3C"
            stroke="#C89B3C"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M20 24.25V31.5"
            stroke="#C89B3C"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M10.75 31.5H29.25"
            stroke="#D9C8A9"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {showWordmark ? (
        <span className={`font-semibold tracking-[-0.02em] text-slate-900 ${isAr ? 'font-arabic' : ''}`}>
          {label}
        </span>
      ) : null}
    </span>
  )
}
