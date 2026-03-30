import { FormPanel } from '@/components/form-panel'
import { buildMetadata } from '@/lib/seo'

export const metadata = {
  ...buildMetadata({
    title: 'Signaler une erreur — Houma',
    description: 'Envoyez une correction pour une page du guide.',
    path: '/signaler-une-erreur',
  }),
  robots: { index: false, follow: true },
}

export default function IssuePage() {
  return (
    <div className="container-shell py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-4xl font-semibold">Signaler une erreur</h1>
        <p className="text-slate-600">Indiquez la page concernée et ce qui doit être corrigé.</p>
        <FormPanel kind="issue" action="/api/forms/error-report" />
      </div>
    </div>
  )
}
