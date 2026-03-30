# api_contracts.md

## Internal API Contracts
| Endpoint | Method | Purpose | Request | Response | Acceptance Criteria |
|---|---|---|---|---|---|
| `/api/forms/error-report` | POST | store issue report | `{ pageUrl, issueType, details, email? }` | `{ ok, id }` | rejects missing `pageUrl`, `issueType`, `details` |
| `/api/forms/sponsor-inquiry` | POST | store sponsor lead | `{ company, contactName, email, cityScope, serviceScope, message }` | `{ ok, id }` | rejects invalid email or missing message |
| `/api/search` | GET | optional lightweight search endpoint | `q`, `city`, `service`, `type` | `{ results[] }` | returns ordered routes with type labels |
| `/api/health` | GET | release readiness check | none | `{ ok, version }` | returns 200 in production |

## Data Access Contracts
| Function | Input | Output | Notes |
|---|---|---|---|
| `getCities()` | none | `City[]` | cacheable |
| `getServices()` | none | `Service[]` | cacheable |
| `getCity(citySlug)` | `string` | `City | null` | notFound on null |
| `getService(serviceSlug)` | `string` | `Service | null` | notFound on null |
| `getCityService(citySlug, serviceSlug)` | `string, string` | `CityServicePage | null` | partial state allowed |
| `getOffice(officeSlug)` | `string` | `OfficeDetail | null` | partial state allowed |
| `submitIssue(payload)` | object | `{ ok, id }` | server-side validation |
| `submitSponsor(payload)` | object | `{ ok, id }` | server-side validation |
