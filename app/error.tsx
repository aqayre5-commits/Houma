'use client'

import { useEffect, useState } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isAr, setIsAr] = useState(false)

  useEffect(() => {
    setIsAr(document.documentElement.lang === 'ar')
  }, [])

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{isAr ? 'خطأ' : 'Erreur'}</p>
        <h1 className="mt-2 text-3xl font-semibold text-amber-950">{isAr ? 'تعذر إكمال التحميل.' : 'Un chargement n&apos;a pas abouti.'}</h1>
        <p className="mt-3 text-sm text-amber-900">
          {error.message || (isAr ? 'حدث خطأ غير متوقع أثناء عرض هذه الصفحة.' : 'Une erreur inattendue a interrompu cette page.')}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-full bg-amber-700 px-5 py-2.5 text-sm font-medium text-white"
        >
          {isAr ? 'إعادة المحاولة' : 'Reessayer'}
        </button>
      </div>
    </div>
  )
}
