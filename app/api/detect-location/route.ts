import { NextRequest, NextResponse } from 'next/server'
import { getDetectedLocationContextFromHeaders, getDetectedLocationLabelFromHeaders } from '@/lib/location-ip'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const context = getDetectedLocationContextFromHeaders(request.headers)
  const detectedLabel = getDetectedLocationLabelFromHeaders(request.headers)

  if (!context.citySlug) {
    return NextResponse.json({ ok: false, reason: 'unsupported_or_missing', context, detectedLabel })
  }

  return NextResponse.json({
    ok: true,
    context,
    detectedLabel,
  })
}
