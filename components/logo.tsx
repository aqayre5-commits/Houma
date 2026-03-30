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
            d="M10 17.5L20 10L30 17.5"
            stroke="#FFF8E8"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 17V29H27.5V17"
            stroke="#FFF8E8"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 20.5C18.067 20.5 16.5 22.067 16.5 24V29H23.5V24C23.5 22.067 21.933 20.5 20 20.5Z"
            fill="#C89B3C"
          />
          <path
            d="M20 29V33.5"
            stroke="#C89B3C"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M14.75 22.5H14.8"
            stroke="#FFF8E8"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M25.2 22.5H25.25"
            stroke="#FFF8E8"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {showWordmark ? (
        <span className={`font-semibold tracking-tight text-slate-900 ${isAr ? 'font-arabic' : ''}`}>
          {label}
        </span>
      ) : null}
    </span>
  )
}
