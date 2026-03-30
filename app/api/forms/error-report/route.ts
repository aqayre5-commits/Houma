import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.pageUrl || !body?.issueType || !body?.details) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const id = crypto.randomUUID()

  const supabase = getSupabaseServerClient()
  if (supabase) {
    await supabase.from('form_submissions').insert({
      id,
      form_type: 'error_report',
      payload_json: {
        pageUrl: String(body.pageUrl).slice(0, 500),
        issueType: String(body.issueType).slice(0, 100),
        details: String(body.details).slice(0, 2000),
      },
      status: 'new',
    })
  }

  return NextResponse.json({ ok: true, id })
}
