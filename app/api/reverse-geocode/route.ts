import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type NominatimAddress = {
  road?: string
  neighbourhood?: string
  suburb?: string
  city_district?: string
  city?: string
  town?: string
  village?: string
  state?: string
  postcode?: string
  country_code?: string
}

type NominatimResponse = {
  address?: NominatimAddress
  error?: string
}

/** Build a short, human-readable local address from Nominatim address components. */
function buildLocalAddress(addr: NominatimAddress): string {
  // Local area: neighbourhood → suburb → city_district (in order of specificity)
  const area = addr.neighbourhood ?? addr.suburb ?? addr.city_district ?? null
  // City-level name
  const cityName = addr.city ?? addr.town ?? addr.village ?? null

  const parts: string[] = []
  if (area) parts.push(area)
  if (cityName && cityName !== area) parts.push(cityName)

  // Fallback: include road if no area is resolvable and road exists
  if (parts.length === 0 && addr.road) {
    parts.push(addr.road)
    if (cityName) parts.push(cityName)
  }

  return parts.join(', ')
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ ok: false, reason: 'missing_params' }, { status: 400 })
  }

  const latNum = parseFloat(lat)
  const lonNum = parseFloat(lon)

  if (isNaN(latNum) || isNaN(lonNum)) {
    return NextResponse.json({ ok: false, reason: 'invalid_params' }, { status: 400 })
  }

  // Rough bounding box for Morocco — reject clearly out-of-range coords
  if (latNum < 20 || latNum > 36 || lonNum < -18 || lonNum > 0) {
    return NextResponse.json({ ok: false, reason: 'outside_morocco' })
  }

  try {
    const url =
      `https://nominatim.openstreetmap.org/reverse` +
      `?lat=${latNum}&lon=${lonNum}&format=json&accept-language=fr&zoom=14`

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Houma/1.0 (reverse-geocoding)',
        'Accept-Language': 'fr',
      },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) {
      return NextResponse.json({ ok: false, reason: 'upstream_error' })
    }

    const data: NominatimResponse = await res.json()

    if (data.error || !data.address) {
      return NextResponse.json({ ok: false, reason: 'no_address' })
    }

    const localAddress = buildLocalAddress(data.address)

    return NextResponse.json({
      ok: true,
      localAddress: localAddress || null,
      detail: {
        road: data.address.road ?? null,
        neighbourhood: data.address.neighbourhood ?? null,
        suburb: data.address.suburb ?? null,
        district: data.address.city_district ?? null,
        city: data.address.city ?? data.address.town ?? data.address.village ?? null,
        region: data.address.state ?? null,
        postcode: data.address.postcode ?? null,
      },
    })
  } catch {
    return NextResponse.json({ ok: false, reason: 'fetch_failed' })
  }
}
