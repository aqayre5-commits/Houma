const { chromium } = require("playwright");

const FORM_URL =
  "https://www.watiqa.ma/index.php?page=citoyen.FormulaireCommande";

const IDS = {
  region: "#ctl0_CONTENU_PAGE_etatCivil_ListeRegion",
  province: "#ctl0_CONTENU_PAGE_etatCivil_ListeProvince",
  commune: "#ctl0_CONTENU_PAGE_etatCivil_ListeCommune",
  pref: "#ctl0_CONTENU_PAGE_etatCivil_ListePrefectureArondissement",
  arr: "#ctl0_CONTENU_PAGE_etatCivil_ListeArondissement",
  bureau: "#ctl0_CONTENU_PAGE_etatCivil_ListeBec",
};

async function getOptions(page, selector) {
  return page.locator(`${selector} option`).evaluateAll((options) =>
    options.map((option) => ({
      value: option.value,
      text: (option.textContent || "").trim(),
    })),
  );
}

async function waitForChildOptions(page, selector, previousTexts) {
  await page
    .waitForFunction(
      ({ selector, previousTexts }) => {
        const currentTexts = Array.from(
          document.querySelectorAll(`${selector} option`),
        ).map((option) => (option.textContent || "").trim());
        return JSON.stringify(currentTexts) !== JSON.stringify(previousTexts);
      },
      { selector, previousTexts },
      { timeout: 30000 },
    )
    .catch(() => {});

  await page.waitForTimeout(1200);
}

async function selectAndWait(page, selector, value, childSelector) {
  const previousTexts = childSelector
    ? (await getOptions(page, childSelector)).map((option) => option.text)
    : [];
  await page.locator(selector).selectOption(value, { force: true });
  if (childSelector) {
    await waitForChildOptions(page, childSelector, previousTexts);
  } else {
    await page.waitForTimeout(1200);
  }
}

async function reset(page) {
  console.log("RESET_START");
  await page.goto(FORM_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2000);
  console.log("RESET_DONE");
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await reset(page);
  console.log("PAGE_READY");
  const allRegions = await getOptions(page, IDS.region);
  console.log(`REGION_COUNT ${allRegions.length}`);
  console.log(
    `REGION_LABELS ${JSON.stringify(allRegions.map((option) => option.text))}`,
  );
  const cityConfigs = [
    {
      city: "Casablanca",
      region: "Casablanca-Settat",
      province: "CASABLANCA",
    },
    {
      city: "Rabat",
      region: "Rabat-Salé-Kénitra",
      province: "RABAT",
    },
    {
      city: "Tanger",
      region: "Tanger-Tetouan-Al Hoceima",
      province: "TANGER-ASSILAH",
    },
  ];

  for (const config of cityConfigs) {
    const regionLabel = config.region;
    const region = allRegions.find((option) => option.text === regionLabel);
    if (!region) {
      console.log(`REGION_NOT_FOUND ${regionLabel}`);
      continue;
    }

    console.log(`SELECT_REGION ${regionLabel}`);
    await selectAndWait(page, IDS.region, region.value, IDS.province);
    const provinces = await getOptions(page, IDS.province);
    console.log(`REGION ${regionLabel}`);
    console.log(JSON.stringify(provinces, null, 2));
    const province = provinces.find((option) => option.text === config.province);
    if (!province) {
      console.log(`PROVINCE_NOT_FOUND ${config.city} ${config.province}`);
      console.log("");
      await reset(page);
      continue;
    }
    console.log(`SELECT_PROVINCE ${config.city} ${config.province}`);
    await selectAndWait(page, IDS.province, province.value, IDS.commune);
    const communes = await getOptions(page, IDS.commune);
    console.log(`COMMUNES ${config.city}`);
    console.log(JSON.stringify(communes, null, 2));
    console.log("");
    await reset(page);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
