# Consent Alignment Audit

Date: 2026-03-30

## Conclusion

The current implementation does **not** appear to use only strictly necessary storage.

Based on visible code, the site also uses:
- Vercel Analytics in production
- Vercel Speed Insights in production

These runtime services are not gated behind any in-product consent or preferences mechanism in the current codebase.

## Recommendation level

- Necessary storage only: No
- Simple notice only: Not enough to fully resolve analytics ambiguity
- Real consent mechanism before non-essential storage: Potentially required depending on operator/legal position
- Stronger mismatch warning in report: Yes

## Item-level analysis

### `qriba_lang`
- Why it may require consent or clearer notice: It does not appear to require consent; it is needed to remember the chosen UI language.
- Does current UX match that need: Yes.
- Recommended minimal fix: None.

### `qriba_confirmed_location_v2`
- Why it may require consent or clearer notice: It is a legacy cleanup key, not an active storage preference anymore.
- Does current UX match that need: Yes after policy alignment.
- Recommended minimal fix: None, aside from eventual technical cleanup if the legacy code is removed entirely.

### Precise browser geolocation
- Why it may require consent or clearer notice: It involves sensitive location handling, but the browser already requires an explicit permission prompt.
- Does current UX match that need: Mostly yes. The site also explains why location is requested.
- Recommended minimal fix: Keep the explanation copy and policy text precise. No extra banner added.

### Vercel Analytics
- Why it may require consent or clearer notice: It is non-essential audience measurement in production.
- Does current UX match that need: No dedicated in-site consent/preferences surface exists.
- Recommended minimal fix: Operator must decide between:
  - adding analytics consent gating before runtime loading, or
  - disabling analytics until legal review confirms the intended posture.

### Vercel Speed Insights
- Why it may require consent or clearer notice: It is non-essential performance measurement in production.
- Does current UX match that need: Same mismatch as Vercel Analytics.
- Recommended minimal fix: Treat together with analytics consent decision.

## Why no banner was added automatically in this pass

- Code alone proves that non-essential analytics tooling is mounted in production.
- Code alone does **not** prove the exact legal posture, cookie behavior, or CNDP obligations in the operator’s deployment context.
- The policy now states the implementation accurately and flags the missing consent layer explicitly.
- Adding a banner without a confirmed operator/legal decision would risk inventing a compliance posture rather than aligning implementation and text.
