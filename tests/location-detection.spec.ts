import type { Browser, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'
import { localAreaOrderByCity, localAreas } from '@/content/local-areas'

const casablancaLocalAreaSlug = localAreaOrderByCity.casablanca[0]
const casablancaLocalAreaLabel = localAreas[casablancaLocalAreaSlug].displayLabelFr

async function openHomeWithHeaders(browser: Browser, headers: Record<string, string>) {
  const context = await browser.newContext({
    extraHTTPHeaders: headers,
  })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:3000/')
  return { context, page }
}

async function openServiceWithHeaders(browser: Browser, headers: Record<string, string>, path = '/demarches/attestation-residence') {
  const context = await browser.newContext({
    extraHTTPHeaders: headers,
  })
  const page = await context.newPage()
  await page.goto(`http://127.0.0.1:3000${path}`)
  return { context, page }
}

test('homepage no longer renders the legacy area cards', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Détecter votre zone puis la confirmer')).toHaveCount(0)
  await expect(page.getByText('Choisir la zone manuellement')).toHaveCount(0)
})

test('supported IP city detection routes directly after service choice', async ({ browser }) => {
  const { context, page } = await openServiceWithHeaders(browser, {
    'x-vercel-ip-country': 'MA',
    'x-vercel-ip-city': 'Rabat',
    'x-vercel-ip-postal-code': '10080',
  })

  await expect(page).toHaveURL(/\/villes\/rabat\/demarches\/attestation-residence\?source=ip&confidence=medium/)
  await context.close()
})

test('unsupported IP city falls back to compact service resolver', async ({ browser }) => {
  const { context, page } = await openServiceWithHeaders(browser, {
    'x-vercel-ip-country': 'MA',
    'x-vercel-ip-city': 'Marrakech',
    'x-vercel-ip-postal-code': '40000',
  })

  await expect(page.getByText('Nous n’avons pas encore confirmé la ville')).toBeVisible()
  await expect(page.getByText('Localisation détectée : Marrakech')).toBeVisible()
  await expect(page.getByText('Choisissez Casablanca, Rabat ou Tanger pour continuer.')).toBeVisible()
  await expect(page.getByLabel('Ville')).toHaveValue('')
  await expect(page.getByLabel('Zone sélectionnée')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Confirmer la zone' })).toHaveCount(0)
  await context.close()
})

test('area picker never renders ambiguous duplicate local-area labels', async ({ page }) => {
  await page.goto('/villes/casablanca/demarches/attestation-residence')
  await page.getByRole('button', { name: 'Ajouter une zone' }).click()
  await page.getByLabel('Ville').selectOption('casablanca')

  const labels = await page.locator('#service-area-local-selector option').evaluateAll((items) =>
    items
      .map((item) => (item.textContent || '').trim())
      .filter((label) => label && label !== 'Continuer au niveau ville'),
  )

  expect(new Set(labels).size).toBe(labels.length)
})

test('GPS success suggests a supported neighborhood and high-confidence Watiqa preselection', async ({ browser }) => {
  const context = await browser.newContext({
    permissions: ['geolocation'],
    geolocation: { latitude: 33.58, longitude: -7.63 },
  })
  const page = await context.newPage()
  await page.route('**/api/reverse-geocode**', async (route) => {
    await route.fulfill({
      json: {
        ok: true,
        detail: {
          road: null,
          neighbourhood: 'AIN CHOCK  (CENTRAL)',
          suburb: 'AIN CHOCK',
          district: 'AIN CHOCK',
          city: 'Casablanca',
          region: 'Casablanca-Settat',
          postcode: '20470',
        },
      },
    })
  })
  await page.goto('http://127.0.0.1:3000/villes/casablanca/demarches/attestation-residence')
  await page.getByRole('button', { name: 'Ajouter une zone' }).click()
  await page.getByRole('button', { name: /Utiliser la position précise|Utiliser la position precise/ }).click()
  await expect(page.getByLabel('Ville')).toHaveValue('casablanca')
  await expect(page.getByLabel('Zone sélectionnée')).toHaveValue(casablancaLocalAreaSlug)
  await expect(page.getByText(`Suggestion locale : ${casablancaLocalAreaLabel}`)).toBeVisible()
  await context.close()
})

test('GPS denied path renders cleanly', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: (_success: unknown, error: (value: { code: number; PERMISSION_DENIED: number }) => void) =>
          error({ code: 1, PERMISSION_DENIED: 1 }),
      },
      configurable: true,
    })
  })
  await page.goto('http://127.0.0.1:3000/villes/casablanca/demarches/attestation-residence')
  await page.getByRole('button', { name: 'Ajouter une zone' }).click()
  await page.getByRole('button', { name: /Utiliser la position précise|Utiliser la position precise/ }).click()
  await expect(page.getByText(/autorisation de localisation/i)).toBeVisible()
  await context.close()
})

test('multiple GPS/postcode candidates remain unconfirmed when confidence is medium', async ({ browser }) => {
  const context = await browser.newContext({
    permissions: ['geolocation'],
    geolocation: { latitude: 34.01, longitude: -6.84 },
    extraHTTPHeaders: {
      'x-vercel-ip-country': 'MA',
      'x-vercel-ip-city': 'Rabat',
      'x-vercel-ip-postal-code': '10080',
    },
  })
  const page = await context.newPage()
  await page.route('**/api/reverse-geocode**', async (route) => {
    await route.fulfill({
      json: {
        ok: true,
        detail: {
          road: null,
          neighbourhood: 'Agdal',
          suburb: 'Agdal Riyad',
          district: 'AGDAL RIYAD',
          city: 'Rabat',
          region: 'Rabat-Salé-Kénitra',
          postcode: '10080',
        },
      },
    })
  })
  await page.goto('http://127.0.0.1:3000/villes/rabat/demarches/attestation-residence?source=ip&confidence=medium')
  await page.getByRole('button', { name: 'Ajouter une zone' }).click()
  await page.getByRole('button', { name: /Utiliser la position précise|Utiliser la position precise/ }).click()
  await expect(page.getByLabel('Zone sélectionnée')).toHaveValue('')
  await expect(page.getByText(/Suggestion locale :/)).toBeVisible()
  await context.close()
})

test('manual selection overrides detected selection', async ({ browser }) => {
  const { context, page } = await openServiceWithHeaders(browser, {
    'x-vercel-ip-country': 'MA',
    'x-vercel-ip-city': 'Rabat',
    'x-vercel-ip-postal-code': '10080',
  }, '/villes/rabat/demarches/attestation-residence?source=ip&confidence=medium')

  await page.getByRole('button', { name: 'Ajouter une zone' }).click()
  await page.getByLabel('Ville').selectOption('casablanca')
  await expect(page.locator(`#service-area-local-selector option[value="${casablancaLocalAreaSlug}"]`)).toHaveCount(1)
  await page.getByLabel('Zone sélectionnée').selectOption(casablancaLocalAreaSlug)
  await page.getByRole('button', { name: 'Confirmer' }).click()
  await expect(page).toHaveURL(new RegExp(`/villes/casablanca/demarches/attestation-residence\\?localArea=${casablancaLocalAreaSlug}.*source=manual`))
  await expect(page.getByText(casablancaLocalAreaLabel).first()).toBeVisible()
  await context.close()
})

test('homepage ignores stale saved manual area on fresh entry', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('qriba_confirmed_location_v2', JSON.stringify({
      source: 'manual',
      citySlug: 'casablanca',
      neighborhoodSlug: 'ain-chock-central',
      localAreaSlug: 'ain-chock-central',
      postalCode: '20470',
      confidence: 'high',
      confirmedByUser: true,
    }))
  })
  await page.goto('/')
  await expect(page.getByText('Détecter votre zone puis la confirmer')).toHaveCount(0)
  await expect(page.getByText(casablancaLocalAreaLabel)).toHaveCount(0)
})

test('fresh service entry ignores stale saved manual area and stays city-only', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('qriba_confirmed_location_v2', JSON.stringify({
      source: 'manual',
      citySlug: 'casablanca',
      neighborhoodSlug: 'ain-chock-central',
      localAreaSlug: 'ain-chock-central',
      postalCode: '20470',
      confidence: 'high',
      confirmedByUser: true,
    }))
  })
  await page.goto('/demarches/passeport-marocain')
  await expect(page.getByText('Nous n’avons pas encore confirmé la ville')).toBeVisible()
  await expect(page.getByLabel('Zone sélectionnée')).toHaveCount(0)
  await expect(page.getByText(casablancaLocalAreaLabel)).toHaveCount(0)
})

test('online-first services do not imply local annexe handling under detected local context', async ({ page }) => {
  await page.goto(`/villes/casablanca/demarches/vignette-auto?localArea=${casablancaLocalAreaSlug}&source=ip_gps&confidence=high`)
  await expect(page.getByText("Cette démarche reste principalement en ligne et ne désigne pas d'annexe locale spécifique.")).toBeVisible()
  await expect(page.getByRole('button', { name: 'Changer la zone' })).toBeVisible()
})

test('local-jurisdiction services preserve local context in downstream routing', async ({ page }) => {
  await page.goto(`/villes/casablanca?localArea=${casablancaLocalAreaSlug}&source=manual&confidence=high`)
  const attestationLink = page.getByRole('link', { name: /Attestation de résidence/ }).first()
  await expect(attestationLink).toHaveAttribute(
    'href',
    new RegExp(`/villes/casablanca/demarches/attestation-residence\\?localArea=${casablancaLocalAreaSlug}`),
  )
  await expect(page.getByText(casablancaLocalAreaLabel).first()).toBeVisible()
})
