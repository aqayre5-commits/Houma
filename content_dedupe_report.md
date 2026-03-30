**Duplicate Groups Found**

| Group | Entity type | City | Count | Outcome |
| --- | --- | --- | --- | --- |
| `central` | `local_area` / derived `neighborhood` | Casablanca | 15 | Kept separate and disambiguated by arrondissement / prefecture context in the visible label. |
| `al azhar` | `local_area` / derived `neighborhood` | Casablanca | 2 | Kept separate and disambiguated by arrondissement context in the visible label. |
| All neighborhood records backed by Watiqa local areas | `local_area` + `neighborhood` cross-type projection | Casablanca, Rabat, Tanger | 175 pairings | Intentionally kept separate because the entity type differs even when the canonical name and admin path match. |

**Automatic Merges Applied**

| Source set | Merge rule | Result |
| --- | --- | --- |
| Watiqa local areas | Exact semantic-path duplicate merge on city + province/prefecture + commune + prefecture d'arrondissement + arrondissement + bureau | `0` merges applied in this pass because the imported 175 rows were already unique by full administrative path. |
| Local areas / neighborhoods / offices | Same entity type + same city + same canonical name + compatible admin path + no semantic conflict | No cross-record merges were needed after canonicalization; collisions were resolved through disambiguated display labels instead. |

**Records Kept Separate**

| Record family | Why kept separate |
| --- | --- |
| Casablanca `CENTRAL` local areas | Same visible name, but different arrondissement/prefecture branches, so merging would erase jurisdiction context. |
| Casablanca `AL AZHAR` local areas | Same visible name, but different local administrative paths, so merging would create false certainty. |
| Watiqa local areas vs derived neighborhoods | Same source-backed area, but different entity types in the app model; they remain separate records so routing and labeling stay explicit. |
| Office records | No unresolved office-name collisions were found, so offices remain separate one-to-one normalized records. |

**Aliases Created**

| Alias key | Entity type | Purpose |
| --- | --- | --- |
| `casablanca||ain chock central` | `local_area` | Normalize spacing/punctuation variants such as `AIN CHOCK  (CENTRAL)` for canonical matching without changing the preserved source labels. |
| `casablanca||ain chock central` | `neighborhood` | Keep neighborhood matching aligned with the same Watiqa-backed canonical form. |

**Unresolved Manual-Review Items**

| Status | Item |
| --- | --- |
| none | No unresolved duplicate groups remain after canonicalization, disambiguation, and validation. |

**Files Changed**

| File |
| --- |
| [types/models.ts](/Users/abdilahiqayre/project/types/models.ts) |
| [content/aliases.ts](/Users/abdilahiqayre/project/content/aliases.ts) |
| [lib/content-normalization.ts](/Users/abdilahiqayre/project/lib/content-normalization.ts) |
| [content/local-areas.ts](/Users/abdilahiqayre/project/content/local-areas.ts) |
| [content/neighborhoods.ts](/Users/abdilahiqayre/project/content/neighborhoods.ts) |
| [content/postcodes.ts](/Users/abdilahiqayre/project/content/postcodes.ts) |
| [content/offices.ts](/Users/abdilahiqayre/project/content/offices.ts) |
| [lib/content-validation.ts](/Users/abdilahiqayre/project/lib/content-validation.ts) |
| [tests/content-dedupe.spec.ts](/Users/abdilahiqayre/project/tests/content-dedupe.spec.ts) |
| [tests/watiqa-integration.spec.ts](/Users/abdilahiqayre/project/tests/watiqa-integration.spec.ts) |
| [tests/location-detection.spec.ts](/Users/abdilahiqayre/project/tests/location-detection.spec.ts) |

**Test Results**

| Command | Result |
| --- | --- |
| `npm run lint` | passed |
| `npm run build` | passed |
| `npm run test:e2e` | passed, `42 passed (14.3s)` |
