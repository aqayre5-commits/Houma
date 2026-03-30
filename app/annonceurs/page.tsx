import { FormPanel } from '@/components/form-panel'
import { buildMetadata } from '@/lib/seo'

export const metadata = {
  ...buildMetadata({
    title: 'Annonceurs — Houma',
    description: 'Demande d’information pour les emplacements sponsorisés.',
    path: '/annonceurs',
  }),
  robots: { index: false, follow: true },
}

export default function SponsorsPage() {
  return (
    <div className="container-shell py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-4xl font-semibold">Annonceurs</h1>
        <p className="text-slate-600">
          Emplacements réservés à des services complémentaires clairement signalés comme sponsorisés.
        </p>
        <FormPanel kind="sponsor" action="/api/forms/sponsor-inquiry" />
      </div>
    </div>
  )
}
