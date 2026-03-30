# Cookie / Policy Operator TODOs

These items cannot be proven from repo code alone and need operator confirmation.

- Confirm whether Vercel Analytics sets cookies, identifiers, or similar browser storage in the real production deployment.
- Confirm whether Vercel Speed Insights sets cookies, identifiers, or similar browser storage in the real production deployment.
- Confirm the exact retention and processor terms for Vercel Analytics and Vercel Speed Insights.
- Confirm whether hosting, CDN, reverse proxy, or platform logs retain IP addresses and request metadata, including geolocation-related API calls.
- Confirm whether Nominatim or any reverse-geocoding intermediary introduces retention or transfer implications that should be named on the privacy page.
- Confirm the exact Supabase project posture, hosting region, and retention policy if form submissions are stored there in production.
- Confirm whether any additional third-party scripts or platform-level cookies are injected only at deployment time.
- Confirm CNDP filing, notification, or authorization status if applicable.
- Decide whether production analytics should remain enabled without consent gating, be gated behind consent, or be disabled until legal review is complete.
