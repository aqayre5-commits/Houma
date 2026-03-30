'use client'

import Link from 'next/link'
import { formatLocationStateLine } from '@/lib/location-ui'
import type { Lang } from '@/lib/lang'

export function SelectedAreaSummary({
  lang = 'fr',
  cityLabel,
  selectedAreaLabel,
  source,
  confidence,
  changeHref,
  clearHref,
  onChange,
  onClear,
  compact = false,
}: {
  lang?: Lang
  cityLabel: string
  selectedAreaLabel?: string | null
  source?: string | null
  confidence?: string | null
  changeHref?: string
  clearHref?: string
  onChange?: () => void
  onClear?: () => void
  compact?: boolean
}) {
  const isAr = lang === 'ar'

  return (
    <div className={`rounded-2xl border border-teal-200 bg-teal-50 ${compact ? 'px-4 py-3' : 'px-5 py-4'}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            {isAr ? 'المدينة والمنطقة المختارة' : 'Ville et zone sélectionnée'}
          </p>
          <p className="mt-1.5 text-base font-semibold text-teal-950">
            {selectedAreaLabel
              ? (isAr ? `${cityLabel} · ${selectedAreaLabel}` : `${cityLabel} · ${selectedAreaLabel}`)
              : cityLabel}
          </p>
          <p className="mt-1 text-sm text-teal-900">
            {selectedAreaLabel
              ? (isAr ? 'المنطقة المختارة تُستخدم كسياق فقط قبل عرض الجهة المختصة في صفحة الإجراء.' : "La zone sélectionnée reste un contexte avant la réponse finale sur la page démarche.")
              : (isAr ? 'يمكنك مواصلة اختيار الإجراء الآن، أو إضافة منطقة محلية إذا احتجت إلى توجيه أدق.' : "Vous pouvez choisir une démarche maintenant, ou ajouter une zone locale si vous avez besoin d'un guidage plus précis.")}
          </p>
          {(source || confidence) ? (
            <p className="mt-2 text-xs text-teal-800">
              {formatLocationStateLine({ source, confidence, lang })}
            </p>
          ) : null}
        </div>

        {(changeHref || clearHref || onChange || onClear) ? (
          <div className="flex flex-wrap gap-2">
            {changeHref ? (
              <Link href={changeHref} className="rounded-xl border border-teal-300 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-100">
                {isAr ? 'تغيير المنطقة' : 'Changer de zone'}
              </Link>
            ) : onChange ? (
              <button type="button" onClick={onChange} className="rounded-xl border border-teal-300 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-100">
                {isAr ? 'تغيير المنطقة' : 'Changer de zone'}
              </button>
            ) : null}

            {clearHref ? (
              <Link href={clearHref} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-800">
                {isAr ? 'مسح المنطقة' : 'Effacer la zone'}
              </Link>
            ) : onClear ? (
              <button type="button" onClick={onClear} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-800">
                {isAr ? 'مسح المنطقة' : 'Effacer la zone'}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
