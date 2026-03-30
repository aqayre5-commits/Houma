# Watiqa Extraction Report

| city | region path used | province/prefecture path used | commune path used | exposes prefecture d'arrondissement | exposes arrondissement | exposes bureau d'état civil directly | blocked branches |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Casablanca | Casablanca-Settat | CASABLANCA | CASABLANCA | yes | yes | no | none |
| Rabat | Rabat-Salé-Kénitra | RABAT | RABAT | no | yes | no | none |
| Tanger | Tanger-Tetouan-Al Hoceima | TANGER-ASSILAH | TANGER | no | yes | no | none |

| city | blocked branch level | branch label | reason |
| --- | --- | --- | --- |
| none | none | none | none |

| field | duplicate label | occurrences |
| --- | --- | --- |
| prefecture_arrondissement | AIN CHOCK | 13 |
| prefecture_arrondissement | AIN SEBAA HAY MOHAMMADI | 18 |
| prefecture_arrondissement | AL FIDA MERS SULTAN | 12 |
| prefecture_arrondissement | BEN M'SICK | 13 |
| prefecture_arrondissement | CASABLANCA ANFA | 18 |
| prefecture_arrondissement | HAY HASSANI | 12 |
| prefecture_arrondissement | MOULAY RACHID | 17 |
| prefecture_arrondissement | SIDI BERNOUSSI | 22 |
| arrondissement | AIN CHOCK | 13 |
| arrondissement | AIN SEBAA | 7 |
| arrondissement | ASSOUKHOUR ASSAWDA | 6 |
| arrondissement | HAY MOHAMMADI | 5 |
| arrondissement | AL FIDA | 7 |
| arrondissement | MERS SULTAN | 5 |
| arrondissement | BEN M'SICK | 7 |
| arrondissement | SBATA | 6 |
| arrondissement | ANFA | 5 |
| arrondissement | EL MAARIF | 6 |
| arrondissement | SIDI BELYOUT | 7 |
| arrondissement | HAY HASSANI | 12 |
| arrondissement | MOULAY RACHID | 9 |
| arrondissement | SIDI OTHMANE | 8 |
| arrondissement | SIDI BERNOUSSI | 7 |
| arrondissement | SIDI MOUMEN | 15 |
| arrondissement | AGDAL RIYAD | 4 |
| arrondissement | EL YOUSSOUFIA | 5 |
| arrondissement | HASSAN | 5 |
| arrondissement | SOUISSI | 3 |
| arrondissement | YACOUB EL MANSOUR | 5 |
| arrondissement | Arrondissement Béni Makada | 11 |
| arrondissement | Arrondissement Charaf essouani | 4 |
| arrondissement | Arrondissement Charaf méghougha | 5 |
| arrondissement | Arrondissement Tanger médina | 8 |
| bureau_etat_civil | CENTRAL | 16 |
| bureau_etat_civil | AL AZHAR | 2 |

| topic | observation |
| --- | --- |
| terminology ambiguity | Watiqa labels the final dropdown as `Bureau d'état civil`, but several final-option labels themselves include terms such as `ANNEXE`, `ARRONDISSEMENT`, and `CENTRAL`; downstream consumers should preserve the exact Watiqa label rather than collapsing these into a different office taxonomy. |
| arrondissement structure | Some cities expose both `Préfecture d'arrondissement` and `Arrondissement`, so the two levels should not be collapsed in downstream modeling. |
| deduplication | Exact duplicate rows were removed only when the full normalized row matched exactly. Final row count: 175. |
