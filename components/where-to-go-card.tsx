'use client'

import { ServiceAreaPicker } from '@/components/service-area-picker'
import { siteLegalDisclaimers } from '@/content/legal-copy'
import type { Lang } from '@/lib/lang'
import type { OfficeRecord } from '@/types/models'

type WhereToGoVariant = 'city_only' | 'area_confirmed' | 'detected' | 'manual' | 'online_first'
type WhereToGoState = 'loading' | 'partial' | 'success' | 'fallback' | 'unsupported'

export function WhereToGoCard({
  lang = 'fr',
  city,
  selectedArea,
  responsibleAuthority,
  whyText,
  confidence,
  sourceType,
  officialSourceUrl,
  officialSourceLabel,
  state,
  citySlug,
  serviceSlug,
  selectedAreaSlug,
  requiresLocalArea,
  supportingOffice,
}: {
  lang?: Lang
  citySlug: string
  serviceSlug: string
  city: string
  selectedArea?: string | null
  selectedAreaSlug?: string | null
  responsibleAuthority: string
  whyText: string
  confidence?: string | null
  sourceType?: string | null
  officialSourceUrl?: string
  officialSourceLabel?: string
  mode: 'auto' | 'manual'
  variant: WhereToGoVariant
  state: WhereToGoState
  requiresLocalArea: boolean
  supportingOffice?: OfficeRecord | null
}) {
  const isAr = lang === 'ar'
  const stateTone =
    state === 'success'
      ? 'border-teal-300 bg-[var(--surface)] shadow-sm'
      : state === 'partial' || state === 'fallback'
        ? 'border-amber-300 bg-[var(--surface)] shadow-sm'
        : 'border-slate-300 bg-[var(--surface-alt)] shadow-sm'

  const selectionSourceLabel =
    selectedArea && sourceType === 'manual'
      ? (isAr ? 'تمت إضافة المنطقة يدوياً.' : 'Zone ajoutée manuellement.')
      : selectedArea && (sourceType === 'gps' || sourceType === 'ip_gps')
        ? (isAr ? 'تم اقتراح المنطقة تلقائياً ثم تأكيدها.' : 'Zone suggérée automatiquement puis confirmée.')
        : !selectedArea && sourceType === 'ip'
          ? (isAr ? 'تم اقتراح المدينة تلقائياً.' : 'Ville suggérée automatiquement.')
          : confidence === 'low' || confidence === 'medium' || confidence === 'conflict'
            ? (isAr ? 'أضف منطقة للحصول على جواب محلي أدق.' : 'Ajoutez une zone pour une réponse locale plus précise.')
            : null

  return (
    <section className={`rounded-2xl border px-5 py-4 ${stateTone}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            {isAr ? 'إلى أين تتوجه؟' : 'Où aller ?'}
          </p>
          <h2 className="mt-1.5 text-lg font-semibold text-slate-900">
            {isAr ? 'الجهة المختصة' : 'Autorité responsable'}
          </h2>
          <p className="mt-1 break-words text-base font-semibold text-slate-950">{responsibleAuthority}</p>
          <p className="mt-2 text-sm text-slate-700">{whyText}</p>

          <dl className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-500">{isAr ? 'المدينة' : 'Ville'}</dt>
              <dd>{city}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{isAr ? 'المنطقة المختارة' : 'Zone sélectionnée'}</dt>
              <dd>{selectedArea ?? (isAr ? 'غير مضافة' : 'Non ajoutée')}</dd>
            </div>
          </dl>

          {selectionSourceLabel ? (
            <p className="mt-3 text-sm text-slate-600">{selectionSourceLabel}</p>
          ) : null}
        </div>

        <ServiceAreaPicker
          lang={lang}
          citySlug={citySlug}
          serviceSlug={serviceSlug}
          currentLocalAreaSlug={selectedAreaSlug}
          sourceType={sourceType}
          confidence={confidence}
          requiresLocalArea={requiresLocalArea}
        />
      </div>

      {supportingOffice ? (
        <div className="mt-4 rounded-xl border border-slate-300 bg-[var(--surface)] px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {isAr ? 'مرجع داعم على مستوى المدينة' : 'Repère secondaire au niveau ville'}
          </p>
          <p className="mt-1 font-medium text-slate-900">{isAr ? supportingOffice.nameAr : supportingOffice.nameFr}</p>
          <p className="mt-1 text-sm text-slate-600">
            {isAr
              ? 'يُعرض هذا المرجع للمساعدة فقط عندما لا تكون الجهة المحلية النهائية مؤكدة بالاسم.'
              : "Ce repère s'affiche uniquement comme aide quand l'autorité locale finale n'est pas confirmée par son nom."}
          </p>
        </div>
      ) : null}

      {officialSourceUrl ? (
        <div className="mt-4">
          <a
            href={officialSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-teal-700 hover:underline"
          >
            {isAr ? 'المصدر الرسمي' : 'Source officielle'}: {officialSourceLabel ?? officialSourceUrl} ↗
          </a>
          <p className="mt-2 text-sm text-slate-600">
            {isAr ? siteLegalDisclaimers.serviceAr : siteLegalDisclaimers.serviceFr}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {isAr ? siteLegalDisclaimers.verifyAr : siteLegalDisclaimers.verifyFr}
          </p>
        </div>
      ) : null}
    </section>
  )
}
