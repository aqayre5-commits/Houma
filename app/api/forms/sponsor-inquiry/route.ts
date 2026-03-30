import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.company || !body?.contactName || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const email = String(body.email)
  if (!email.includes('@')) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
  }

  const id = crypto.randomUUID()

  const supabase = getSupabaseServerClient()
  if (supabase) {
    await supabase.from('form_submissions').insert({
      id,
      form_type: 'sponsor_inquiry',
      payload_json: {
        company: String(body.company).slice(0, 200),
        contactName: String(body.contactName).slice(0, 200),
        email: email.slice(0, 200),
        message: String(body.message).slice(0, 2000),
      },
      status: 'new',
    })
  }

  return NextResponse.json({ ok: true, id })
}
