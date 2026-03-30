import { expect, test } from '@playwright/test'
import { localAreaOrderByCity, localAreas } from '@/content/local-areas'

const casablancaLocalAreaSlug = localAreaOrderByCity.casablanca[0]
const rabatLocalAreaSlug = localAreaOrderByCity.rabat[0]
const tangerLocalAreaSlug = localAreaOrderByCity.tanger[0]
const casablancaLocalAreaLabel = localAreas[casablancaLocalAreaSlug].displayLabelFr
const rabatLocalAreaLabel = localAreas[rabatLocalAreaSlug].displayLabelFr
const tangerLocalAreaLabel = localAreas[tangerLocalAreaSlug].displayLabelFr

test('homepage renders', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Préparez vos démarches avant de vous déplacer.' })).toBeVisible()
  await expect(page.getByText('Chercher une démarche en premier')).toBeVisible()
  await expect(page.getByText('Toutes les démarches')).toBeVisible()
  await expect(page.getByText('Détecter votre zone puis la confirmer')).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Passeport marocain/ }).first()).toBeVisible()
})

test('language toggle switches to arabic on the same route', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'العربية' }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  await expect(page.getByRole('button', { name: 'Français' })).toBeVisible()
  await expect(page.getByText('ابحث عن الإجراء أولاً')).toBeVisible()
  await expect(page.getByText('اكتشف منطقتك ثم أكدها')).toHaveCount(0)
})

test('villes index renders', async ({ page }) => {
  await page.goto('/villes')
  await expect(page.getByRole('heading', { name: 'Villes couvertes' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Casablanca/ }).first()).toBeVisible()
})

test('city page renders service hub hierarchy', async ({ page }) => {
  await page.goto('/villes/casablanca')
  await expect(page.getByRole('heading', { name: 'Casablanca', exact: true })).toBeVisible()
  await expect(page.getByText('Chercher une démarche à Casablanca')).toBeVisible()
  await expect(page.getByText('Catégories de services')).toBeVisible()
  await expect(page.getByText('Affiner la zone si nécessaire')).toBeVisible()
})

test('city-service page renders requirements and sources', async ({ page }) => {
  await page.goto('/villes/casablanca/demarches/passeport-marocain')
  await expect(page.getByRole('heading', { name: 'Passeport marocain' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Autorité responsable' })).toBeVisible()
  await expect(page.getByText('Pièces à préparer')).toBeVisible()
  await expect(page.getByText('Sources officielles')).toBeVisible()
})

test('vignette renders as online-first flow', async ({ page }) => {
  await page.goto('/villes/casablanca/demarches/vignette-auto')
  await expect(page.getByText('Démarche numérique prioritaire')).toBeVisible()
  await expect(page.getByText('Payer sur mavignette.ma')).toBeVisible()
})

test('service resolver page shows compact fallback when city is still needed', async ({ page }) => {
  await page.goto('/demarches/passeport-marocain')
  await expect(page.getByRole('heading', { name: 'Passeport marocain' })).toBeVisible()
  await expect(page.getByText('Nous n’avons pas encore confirmé la ville')).toBeVisible()
  await expect(page.getByLabel('Ville')).toBeVisible()
  await expect(page.getByLabel('Zone sélectionnée')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Confirmer la zone' })).toHaveCount(0)
  await expect(page.getByText('Détection rapide de la ville et de la zone si nécessaire')).toHaveCount(0)
})

test('office page renders covered services', async ({ page }) => {
  await page.goto('/bureaux/annexe-casablanca-centre')
  await expect(page.getByRole('heading', { name: /Annexe Administrative Casablanca Centre/ }).first()).toBeVisible()
  await expect(page.getByText('Démarches couvertes')).toBeVisible()
})

test('local administration pages render', async ({ page }) => {
  await page.goto(`/villes/casablanca/quartiers/${casablancaLocalAreaSlug}`)
  await expect(page.getByRole('heading', { name: casablancaLocalAreaLabel, exact: true })).toBeVisible()
  await expect(page.getByText('Choisir une démarche avec ce contexte')).toBeVisible()
  await page.goto(`/villes/casablanca/quartiers/${casablancaLocalAreaSlug}/demarches/passeport-marocain`)
  await expect(page.getByRole('heading', { name: 'Passeport marocain' })).toBeVisible()
  await expect(page.getByText('Zone sélectionnée', { exact: true })).toBeVisible()
})

test('search returns city-service result', async ({ page }) => {
  await page.goto('/recherche?q=passeport%20casablanca')
  await expect(page.getByRole('link', { name: /Passeport marocain à Casablanca/ }).first()).toBeVisible()
})

test('sources/about/methodology pages render', async ({ page }) => {
  await page.goto('/sources')
  await expect(page.getByRole('heading', { name: 'Sources officielles' })).toBeVisible()
  await page.goto('/a-propos')
  await expect(page.getByRole('heading', { name: 'À propos' })).toBeVisible()
  await page.goto('/methodologie')
  await expect(page.getByRole('heading', { name: 'Méthodologie' })).toBeVisible()
})

test('cookie and privacy pages reflect active storage and analytics behavior', async ({ page }) => {
  await page.goto('/cookies')
  await expect(page.getByRole('heading', { name: 'Politique cookies' })).toBeVisible()
  await expect(page.getByText('qriba_lang')).toBeVisible()
  await expect(page.getByText('qriba_confirmed_location_v2')).toBeVisible()
  await expect(page.getByText('Vercel Analytics')).toBeVisible()
  await expect(page.getByText('qriba_location_v1')).toBeVisible()

  await page.goto('/confidentialite')
  await expect(page.getByRole('heading', { name: 'Politique de confidentialité' })).toBeVisible()
  await expect(page.getByText('sans être conservées comme coordonnées brutes')).toBeVisible()
  await expect(page.getByText('qriba_confirmed_location_v2')).toBeVisible()
})

test('critical path: homepage to city-service', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Passeport marocain/ }).first().click()
  await expect(page).toHaveURL('/demarches/passeport-marocain')
  await page.getByLabel('Ville').selectOption('casablanca')
  await page.getByRole('button', { name: 'Continuer manuellement' }).click()
  await expect(page).toHaveURL(/\/villes\/casablanca\/demarches\/passeport-marocain\?source=manual&confidence=medium/)
})

test('service page keeps area editing hidden until requested', async ({ page }) => {
  await page.goto('/villes/casablanca/demarches/passeport-marocain')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByText('Choisir la zone manuellement')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Ajouter une zone' })).toBeVisible()
})

test('service page without explicit area does not invent a selected area', async ({ page }) => {
  await page.goto('/villes/casablanca/demarches/attestation-residence')
  await expect(page.getByText('Zone sélectionnée')).toBeVisible()
  await expect(page.getByText('Non ajoutée')).toBeVisible()
})

test('manual selector scopes local administrations by city', async ({ page }) => {
  await page.goto('/villes/casablanca/demarches/attestation-residence')
  await page.getByRole('button', { name: 'Ajouter une zone' }).click()
  const citySelect = page.getByLabel('Ville')
  const localSelect = page.getByLabel('Zone sélectionnée')

  await citySelect.selectOption('casablanca')
  await expect(localSelect).toBeEnabled()
  await expect(localSelect).toContainText(casablancaLocalAreaLabel)
  await expect(localSelect).not.toContainText(rabatLocalAreaLabel)

  await citySelect.selectOption('rabat')
  await expect(localSelect).toContainText(rabatLocalAreaLabel)
  await expect(localSelect).not.toContainText(tangerLocalAreaLabel)

  await citySelect.selectOption('tanger')
  await expect(localSelect).toContainText(tangerLocalAreaLabel)
  await expect(localSelect).not.toContainText(casablancaLocalAreaLabel)
})

test('manual selector opens city page with selected local administration visible', async ({ page }) => {
  await page.goto('/villes/casablanca/demarches/attestation-residence')
  await page.getByRole('button', { name: 'Ajouter une zone' }).click()
  await page.getByLabel('Ville').selectOption('casablanca')
  await expect(page.getByLabel('Zone sélectionnée')).toBeEnabled()
  await page.getByLabel('Zone sélectionnée').selectOption(casablancaLocalAreaSlug)
  await page.getByRole('button', { name: 'Confirmer' }).click()
  await expect(page).toHaveURL(new RegExp(`/villes/casablanca/demarches/attestation-residence\\?localArea=${casablancaLocalAreaSlug}.*source=manual.*confidence=high`))
  await expect(page.getByText(casablancaLocalAreaLabel).first()).toBeVisible()
})

test('selected local administration flows into service guidance without passport-office mislabeling', async ({ page }) => {
  await page.goto(`/villes/casablanca/quartiers/${casablancaLocalAreaSlug}/demarches/passeport-marocain`)
  await expect(page.getByRole('heading', { name: 'Autorité responsable' })).toBeVisible()
  await expect(page.getByText(casablancaLocalAreaLabel).first()).toBeVisible()
  await expect(page.getByText("reste un contexte local utile")).toBeVisible()
  await expect(page.getByText(/bureau passeport/i)).toHaveCount(0)
})

test('api health returns ok', async ({ request }) => {
  const response = await request.get('/api/health')
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body.ok).toBe(true)
})
