'use client'

import Link from 'next/link'
import { useState } from 'react'
import { track } from '@/lib/analytics'
import { routes } from '@/lib/routes'

type Kind = 'issue' | 'sponsor'

export function FormPanel({ kind, action }: { kind: Kind; action: string }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    track('form_submit_start', { form_type: kind, route: window.location.pathname })

    try {
      const response = await fetch(action, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || 'Submission failed')
      }
      setStatus('success')
      setError('')
      form.reset()
      track('form_submit_success', { form_type: kind, route: window.location.pathname })
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : 'Submission failed'
      setStatus('error')
      setError(message)
      track('form_submit_error', { form_type: kind, route: window.location.pathname, error_type: message })
    }
  }

  return (
    <form className="card space-y-4 p-6" onSubmit={handleSubmit}>
      {kind === 'issue' ? (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="pageUrl">URL de la page</label>
            <input id="pageUrl" name="pageUrl" className="w-full rounded-2xl border border-slate-300 px-4 py-3" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="issueType">Type de problème</label>
            <select id="issueType" name="issueType" className="w-full rounded-2xl border border-slate-300 px-4 py-3" required>
              <option value="">Choisir</option>
              <option value="address">Adresse</option>
              <option value="documents">Pièces</option>
              <option value="fees">Frais</option>
              <option value="delay">Délai</option>
              <option value="office">Bureau</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="details">Détail</label>
            <textarea id="details" name="details" className="min-h-40 w-full rounded-2xl border border-slate-300 px-4 py-3" required />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="company">Société</label>
            <input id="company" name="company" className="w-full rounded-2xl border border-slate-300 px-4 py-3" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="contactName">Nom du contact</label>
            <input id="contactName" name="contactName" className="w-full rounded-2xl border border-slate-300 px-4 py-3" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="w-full rounded-2xl border border-slate-300 px-4 py-3" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="message">Message</label>
            <textarea id="message" name="message" className="min-h-40 w-full rounded-2xl border border-slate-300 px-4 py-3" required />
          </div>
        </>
      )}

      {status === 'success' ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">Envoi enregistré.</div>
      ) : null}
      {status === 'error' ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</div>
      ) : null}

      <p className="text-sm leading-relaxed text-slate-500">
        {kind === 'issue'
          ? (
            <>
              Les informations envoyées servent uniquement à examiner votre signalement et, si nécessaire, à améliorer le contenu du site. Consultez{' '}
              <Link href={routes.privacy()} className="font-medium text-teal-700 hover:underline">
                la page Confidentialité
              </Link>{' '}
              pour le détail du traitement.
            </>
          )
          : (
            <>
              Les informations envoyées servent uniquement à traiter votre demande de sponsoring et à vous recontacter si nécessaire. Consultez{' '}
              <Link href={routes.privacy()} className="font-medium text-teal-700 hover:underline">
                la page Confidentialité
              </Link>{' '}
              pour le détail du traitement.
            </>
          )}
      </p>

      <button className="rounded-full bg-teal-700 px-5 py-3 text-sm font-medium text-cyan-50" type="submit">
        Envoyer
      </button>
    </form>
  )
}
