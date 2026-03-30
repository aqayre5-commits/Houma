const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const FORM_URL =
  "https://www.watiqa.ma/index.php?page=citoyen.FormulaireCommande";

const OUTPUT_CSV =
  "watiqa_local_administrations_casablanca_rabat_tanger.csv";
const OUTPUT_JSON =
  "watiqa_local_administrations_casablanca_rabat_tanger.json";
const OUTPUT_REPORT = "watiqa_extraction_report.md";

const IDS = {
  region: "#ctl0_CONTENU_PAGE_etatCivil_ListeRegion",
  province: "#ctl0_CONTENU_PAGE_etatCivil_ListeProvince",
  commune: "#ctl0_CONTENU_PAGE_etatCivil_ListeCommune",
  pref: "#ctl0_CONTENU_PAGE_etatCivil_ListePrefectureArondissement",
  arr: "#ctl0_CONTENU_PAGE_etatCivil_ListeArondissement",
  bureau: "#ctl0_CONTENU_PAGE_etatCivil_ListeBec",
};

const CITY_CONFIGS = [
  {
    city: "Casablanca",
    region: "Casablanca-Settat",
    province: "CASABLANCA",
    commune: "CASABLANCA",
  },
  {
    city: "Rabat",
    region: "Rabat-Salé-Kénitra",
    province: "RABAT",
    commune: "RABAT",
  },
  {
    city: "Tanger",
    region: "Tanger-Tetouan-Al Hoceima",
    province: "TANGER-ASSILAH",
    commune: "TANGER",
  },
];

function normalizeText(text) {
  return (text || "").trim();
}

function isRealOption(option) {
  return (
    option &&
    option.value !== "0" &&
    normalizeText(option.text) !== "" &&
    normalizeText(option.text).toLowerCase() !== "sélectionner..."
  );
}

function realOptions(options) {
  return options.filter(isRealOption);
}

function csvEscape(value) {
  const stringValue = value == null ? "" : String(value);
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function uniqueRows(rows) {
  const seen = new Set();
  const output = [];
  for (const row of rows) {
    const key = JSON.stringify(row);
    if (!seen.has(key)) {
      seen.add(key);
      output.push(row);
    }
  }
  return output;
}

function countLabels(rows, field) {
  const counts = new Map();
  for (const row of rows) {
    const label = row[field];
    if (!label) continue;
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([label, count]) => ({ label, count }));
}

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
  await page.goto(FORM_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2000);
}

async function optionByText(page, selector, text) {
  const options = await getOptions(page, selector);
  return options.find((option) => option.text === text) || null;
}

async function selectPath(page, config, prefOption, arrOption) {
  await reset(page);

  const region = await optionByText(page, IDS.region, config.region);
  if (!region) {
    throw new Error(`Region not found: ${config.region}`);
  }
  await selectAndWait(page, IDS.region, region.value, IDS.province);

  const province = await optionByText(page, IDS.province, config.province);
  if (!province) {
    throw new Error(`Province not found: ${config.province}`);
  }
  await selectAndWait(page, IDS.province, province.value, IDS.commune);

  const commune = await optionByText(page, IDS.commune, config.commune);
  if (!commune) {
    throw new Error(`Commune not found: ${config.commune}`);
  }
  await selectAndWait(page, IDS.commune, commune.value, IDS.pref);

  if (prefOption) {
    await selectAndWait(page, IDS.pref, prefOption.value, IDS.arr);
  }

  if (arrOption) {
    await selectAndWait(page, IDS.arr, arrOption.value, IDS.bureau);
  }
}

function buildRow(config, pref, arr, bureau, confidence, notes) {
  return {
    city: config.city,
    region: config.region,
    province_or_prefecture: config.province,
    commune: config.commune,
    prefecture_arrondissement: pref ? pref.text : "",
    arrondissement: arr ? arr.text : "",
    bureau_etat_civil: bureau ? bureau.text : "",
    source_url: FORM_URL,
    extraction_method:
      "Playwright dependent dropdown traversal of Watiqa inside-Morocco form",
    confidence,
    notes,
  };
}

async function extractCity(page, config) {
  const rows = [];
  const blocked = [];
  const directFlags = {
    hasPrefectureArrondissement: false,
    hasArrondissement: false,
    hasDirectBureauAtCommune: false,
  };

  await selectPath(page, config);

  const communeLevelPrefs = realOptions(await getOptions(page, IDS.pref));
  const communeLevelArrs = realOptions(await getOptions(page, IDS.arr));
  const communeLevelBureaux = realOptions(await getOptions(page, IDS.bureau));

  directFlags.hasPrefectureArrondissement = communeLevelPrefs.length > 0;
  directFlags.hasArrondissement = communeLevelArrs.length > 0;
  directFlags.hasDirectBureauAtCommune = communeLevelBureaux.length > 0;

  if (communeLevelPrefs.length > 0) {
    for (const pref of communeLevelPrefs) {
      try {
        await selectPath(page, config, pref);
        const arrs = realOptions(await getOptions(page, IDS.arr));
        const bureauxAtPrefLevel = realOptions(await getOptions(page, IDS.bureau));

        if (arrs.length > 0) {
          directFlags.hasArrondissement = true;
          for (const arr of arrs) {
            try {
              await selectPath(page, config, pref, arr);
              const bureaux = realOptions(await getOptions(page, IDS.bureau));
              if (bureaux.length > 0) {
                for (const bureau of bureaux) {
                  rows.push(
                    buildRow(config, pref, arr, bureau, "High", ""),
                  );
                }
              } else {
                rows.push(
                  buildRow(
                    config,
                    pref,
                    arr,
                    null,
                    "High",
                    "No bureau d'état civil options exposed after arrondissement selection.",
                  ),
                );
              }
            } catch (error) {
              blocked.push({
                level: "arrondissement",
                pref: pref.text,
                arr: arr.text,
                reason: error.message,
              });
              rows.push(
                buildRow(
                  config,
                  pref,
                  arr,
                  null,
                  "Low",
                  `Blocked during arrondissement traversal: ${error.message}`,
                ),
              );
            }
          }
        } else if (bureauxAtPrefLevel.length > 0) {
          for (const bureau of bureauxAtPrefLevel) {
            rows.push(buildRow(config, pref, null, bureau, "High", ""));
          }
        } else {
          rows.push(
            buildRow(
              config,
              pref,
              null,
              null,
              "High",
              "No arrondissement or bureau d'état civil options exposed after prefecture d'arrondissement selection.",
            ),
          );
        }
      } catch (error) {
        blocked.push({
          level: "prefecture_arrondissement",
          pref: pref.text,
          reason: error.message,
        });
        rows.push(
          buildRow(
            config,
            pref,
            null,
            null,
            "Low",
            `Blocked during prefecture d'arrondissement traversal: ${error.message}`,
          ),
        );
      }
    }
  } else if (communeLevelArrs.length > 0) {
    directFlags.hasArrondissement = true;
    for (const arr of communeLevelArrs) {
      try {
        await selectPath(page, config, null, arr);
        const bureaux = realOptions(await getOptions(page, IDS.bureau));
        if (bureaux.length > 0) {
          for (const bureau of bureaux) {
            rows.push(buildRow(config, null, arr, bureau, "High", ""));
          }
        } else {
          rows.push(
            buildRow(
              config,
              null,
              arr,
              null,
              "High",
              "No bureau d'état civil options exposed after arrondissement selection.",
            ),
          );
        }
      } catch (error) {
        blocked.push({
          level: "arrondissement",
          arr: arr.text,
          reason: error.message,
        });
        rows.push(
          buildRow(
            config,
            null,
            arr,
            null,
            "Low",
            `Blocked during arrondissement traversal: ${error.message}`,
          ),
        );
      }
    }
  } else if (communeLevelBureaux.length > 0) {
    for (const bureau of communeLevelBureaux) {
      rows.push(buildRow(config, null, null, bureau, "High", ""));
    }
  } else {
    rows.push(
      buildRow(
        config,
        null,
        null,
        null,
        "Low",
        "No prefecture d'arrondissement, arrondissement, or bureau d'état civil options were exposed after commune selection.",
      ),
    );
    blocked.push({
      level: "commune",
      reason:
        "No prefecture d'arrondissement, arrondissement, or bureau d'état civil options were exposed after commune selection.",
    });
  }

  return {
    city: config.city,
    path: {
      region: config.region,
      province_or_prefecture: config.province,
      commune: config.commune,
    },
    directFlags,
    blocked,
    rows,
  };
}

function buildReport(cityResults, dedupedRows, duplicateSummary) {
  const lines = [];

  lines.push("# Watiqa Extraction Report");
  lines.push("");
  lines.push("| city | region path used | province/prefecture path used | commune path used | exposes prefecture d'arrondissement | exposes arrondissement | exposes bureau d'état civil directly | blocked branches |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const result of cityResults) {
    lines.push(
      `| ${result.city} | ${result.path.region} | ${result.path.province_or_prefecture} | ${result.path.commune} | ${result.directFlags.hasPrefectureArrondissement ? "yes" : "no"} | ${result.directFlags.hasArrondissement ? "yes" : "no"} | ${result.directFlags.hasDirectBureauAtCommune ? "yes" : "no"} | ${result.blocked.length > 0 ? result.blocked.length : "none"} |`,
    );
  }

  lines.push("");
  lines.push("| city | blocked branch level | branch label | reason |");
  lines.push("| --- | --- | --- | --- |");
  const blockedRows = cityResults.flatMap((result) =>
    result.blocked.map((blocked) => ({
      city: result.city,
      level: blocked.level,
      label: [blocked.pref, blocked.arr].filter(Boolean).join(" / ") || result.path.commune,
      reason: blocked.reason,
    })),
  );
  if (blockedRows.length === 0) {
    lines.push("| none | none | none | none |");
  } else {
    for (const blocked of blockedRows) {
      lines.push(
        `| ${blocked.city} | ${blocked.level} | ${blocked.label} | ${blocked.reason.replace(/\|/g, "/")} |`,
      );
    }
  }

  lines.push("");
  lines.push("| field | duplicate label | occurrences |");
  lines.push("| --- | --- | --- |");
  const duplicateEntries = Object.entries(duplicateSummary).flatMap(
    ([field, entries]) => entries.map((entry) => ({ field, ...entry })),
  );
  if (duplicateEntries.length === 0) {
    lines.push("| none | none | 0 |");
  } else {
    for (const entry of duplicateEntries) {
      lines.push(`| ${entry.field} | ${entry.label} | ${entry.count} |`);
    }
  }

  lines.push("");
  lines.push("| topic | observation |");
  lines.push("| --- | --- |");
  lines.push(
    "| terminology ambiguity | Watiqa labels the final dropdown as `Bureau d'état civil`, but several final-option labels themselves include terms such as `ANNEXE`, `ARRONDISSEMENT`, and `CENTRAL`; downstream consumers should preserve the exact Watiqa label rather than collapsing these into a different office taxonomy. |",
  );
  lines.push(
    "| arrondissement structure | Some cities expose both `Préfecture d'arrondissement` and `Arrondissement`, so the two levels should not be collapsed in downstream modeling. |",
  );
  lines.push(
    `| deduplication | Exact duplicate rows were removed only when the full normalized row matched exactly. Final row count: ${dedupedRows.length}. |`,
  );

  return `${lines.join("\n")}\n`;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const cityResults = [];
  for (const config of CITY_CONFIGS) {
    console.log(`EXTRACT_CITY ${config.city}`);
    cityResults.push(await extractCity(page, config));
  }

  await browser.close();

  const allRows = cityResults.flatMap((result) => result.rows);
  const dedupedRows = uniqueRows(allRows);

  const headers = [
    "city",
    "region",
    "province_or_prefecture",
    "commune",
    "prefecture_arrondissement",
    "arrondissement",
    "bureau_etat_civil",
    "source_url",
    "extraction_method",
    "confidence",
    "notes",
  ];

  const csvLines = [
    headers.join(","),
    ...dedupedRows.map((row) =>
      headers.map((header) => csvEscape(row[header])).join(","),
    ),
  ];

  const duplicateSummary = {
    prefecture_arrondissement: countLabels(
      dedupedRows,
      "prefecture_arrondissement",
    ),
    arrondissement: countLabels(dedupedRows, "arrondissement"),
    bureau_etat_civil: countLabels(dedupedRows, "bureau_etat_civil"),
  };

  fs.writeFileSync(
    path.join(process.cwd(), OUTPUT_CSV),
    `${csvLines.join("\n")}\n`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(process.cwd(), OUTPUT_JSON),
    JSON.stringify({ cityResults, rows: dedupedRows }, null, 2),
    "utf8",
  );
  fs.writeFileSync(
    path.join(process.cwd(), OUTPUT_REPORT),
    buildReport(cityResults, dedupedRows, duplicateSummary),
    "utf8",
  );

  console.log(`WROTE ${OUTPUT_CSV}`);
  console.log(`WROTE ${OUTPUT_JSON}`);
  console.log(`WROTE ${OUTPUT_REPORT}`);
  console.log(`ROW_COUNT ${dedupedRows.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
