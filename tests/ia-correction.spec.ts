import { expect, test } from '@playwright/test'
import { localAreaOrderByCity, localAreas } from '@/content/local-areas'

const casablancaLocalAreaSlug = localAreaOrderByCity.casablanca[0]
const casablancaLocalAreaLabel = localAreas[casablancaLocalAreaSlug].displayLabelFr

test('homepage keeps service discovery ahead of area tools', async ({ page }) => {
  await page.goto('/')

  const searchBlock = page.getByText('Chercher une démarche en premier')
  await expect(searchBlock).toBeVisible()
  await expect(page.getByText('Détecter votre zone puis la confirmer')).toHaveCount(0)
  await expect(page.getByText('Choisir la zone manuellement')).toHaveCount(0)
})

test('homepage service search can open a city service page without local-area selection first', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Chercher une démarche').fill('passeport casablanca')
  await page.getByRole('button', { name: 'Voir la réponse' }).click()
  await expect(page).toHaveURL('/villes/casablanca/demarches/passeport-marocain')
})

test('homepage service choice can route directly to the service page with precise detected city context', async ({ browser }) => {
  const context = await browser.newContext({
    permissions: ['geolocation'],
    geolocation: { latitude: 33.5731, longitude: -7.5898 },
  })
  const page = await context.newPage()
  await page.route('**/api/reverse-geocode**', async (route) => {
    await route.fulfill({
      json: {
        ok: true,
        localAddress: 'Centre, Casablanca',
        detail: {
          road: null,
          neighbourhood: 'Centre',
          suburb: 'Centre',
          district: 'Centre',
          city: 'Casablanca',
          region: 'Casablanca-Settat',
          postcode: '20470',
        },
      },
    })
  })
  await page.goto('http://127.0.0.1:3000/')
  await page.getByRole('link', { name: /Passeport marocain/ }).first().click()
  await expect(page).toHaveURL(/\/villes\/casablanca\/demarches\/passeport-marocain\?source=gps.*confidence=/)
  await context.close()
})

test('city page prioritizes service content over local-area refinement', async ({ page }) => {
  await page.goto('/villes/casablanca')
  const searchBlock = page.getByText('Chercher une démarche à Casablanca')
  const refineBlock = page.getByText('Affiner la zone si nécessaire')
  await expect(searchBlock).toBeVisible()
  await expect(refineBlock).toBeVisible()

  const searchBox = await searchBlock.boundingBox()
  const refineBox = await refineBlock.boundingBox()
  expect(searchBox).not.toBeNull()
  expect(refineBox).not.toBeNull()
  expect(searchBox!.y).toBeLessThan(refineBox!.y)
})

test('all services page routes through the same final city service page when precise city detection is available', async ({ browser }) => {
  const context = await browser.newContext({
    permissions: ['geolocation'],
    geolocation: { latitude: 33.5731, longitude: -7.5898 },
  })
  const page = await context.newPage()
  await page.route('**/api/reverse-geocode**', async (route) => {
    await route.fulfill({
      json: {
        ok: true,
        localAddress: 'Centre, Casablanca',
        detail: {
          road: null,
          neighbourhood: 'Centre',
          suburb: 'Centre',
          district: 'Centre',
          city: 'Casablanca',
          region: 'Casablanca-Settat',
          postcode: '20470',
        },
      },
    })
  })
  await page.goto('http://127.0.0.1:3000/demarches')
  await page.getByRole('link', { name: /Passeport marocain/ }).first().click()
  await expect(page).toHaveURL(/\/villes\/casablanca\/demarches\/passeport-marocain\?source=gps.*confidence=/)
  await context.close()
})

test('service resolver shows compact fallback only when direct routing is not possible', async ({ page }) => {
  await page.goto('/demarches/attestation-residence')
  await expect(page.getByText('Nous n’avons pas encore confirmé la ville')).toBeVisible()
  await expect(page.getByLabel('Ville')).toBeVisible()
  await expect(page.getByLabel('Zone sélectionnée')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Confirmer la zone' })).toHaveCount(0)
  await expect(page.getByText('Détection rapide de la ville et de la zone si nécessaire')).toHaveCount(0)
})

test('service page renders one single where-to-go block without competing locality sections', async ({ page }) => {
  await page.goto(`/villes/casablanca/demarches/passeport-marocain?localArea=${casablancaLocalAreaSlug}&source=manual&confidence=high`)
  await expect(page.getByText('Où aller ?')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Autorité responsable' })).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Autorité responsable' })).toBeVisible()
  await expect(page.getByText('Administration locale sélectionnée')).toHaveCount(0)
  await expect(page.getByText('Point de départ ville')).toHaveCount(0)
})

test('change area flow preserves the current service from the service page', async ({ page }) => {
  await page.goto(`/villes/casablanca/demarches/attestation-residence?localArea=${casablancaLocalAreaSlug}&source=manual&confidence=high`)
  await page.getByRole('button', { name: 'Changer la zone' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Confirmer' }).click()
  await expect(page).toHaveURL(/\/villes\/casablanca\/demarches\/attestation-residence/)
})

test('known precise location routes directly to the final service page', async ({ browser }) => {
  const context = await browser.newContext({
    permissions: ['geolocation'],
    geolocation: { latitude: 34.0209, longitude: -6.8416 },
  })
  const page = await context.newPage()
  await page.route('**/api/reverse-geocode**', async (route) => {
    await route.fulfill({
      json: {
        ok: true,
        localAddress: 'Centre, Rabat',
        detail: {
          road: null,
          neighbourhood: 'Centre',
          suburb: 'Centre',
          district: 'Centre',
          city: 'Rabat',
          region: 'Rabat-Salé-Kénitra',
          postcode: '10080',
        },
      },
    })
  })
  await page.goto('http://127.0.0.1:3000/')
  await page.getByRole('link', { name: /Passeport marocain/ }).first().click()
  await expect(page).toHaveURL(/\/villes\/rabat\/demarches\/passeport-marocain\?source=gps.*confidence=/)
  await context.close()
})

test('fresh service entry ignores stale saved manual area', async ({ page }) => {
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
  await page.goto('/demarches/attestation-residence')
  await expect(page.getByText('Nous n’avons pas encore confirmé la ville')).toBeVisible()
  await expect(page.getByText(casablancaLocalAreaLabel)).toHaveCount(0)
})
