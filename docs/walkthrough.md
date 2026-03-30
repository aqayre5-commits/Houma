# walkthrough.md

## Manual Walkthrough
1. Open `/`.
2. Use the search hero or click a city card.
3. On the city page, click a featured service.
4. Confirm the city-service page shows summary, required documents, office card, and trust block above sponsor density threshold.
5. Click “Open directions” and verify outbound map behavior.
6. Return and open “Report an issue.”
7. Submit a valid correction request.
8. Open `/methodologie` and `/sources`.
9. Open one guide page and verify internal links back to service and city pages.
10. Open mobile viewport and repeat step 4.

## Demo Acceptance
| Step | Acceptance Criteria |
|---|---|
| 1 | homepage renders with no broken modules |
| 3 | click path remains under 4 clicks |
| 4 | final answer visible without accordion expansion |
| 5 | outbound map event fires |
| 7 | success state shown and submission stored |
| 10 | mobile sponsor does not obstruct CTA |
