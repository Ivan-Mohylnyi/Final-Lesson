# Final Lesson - QA Automation TypeScript Course Project

Playwright + TypeScript test framework covering [automationexercise.com](https://automationexercise.com) - a public product/e-commerce site built specifically for test automation practice.

## Tech Stack

- Playwright Test (TypeScript)
- Chai (`expect`) layered on top of Playwright's own `expect` for richer assertions
- Pact (`@pact-foundation/pact`) for consumer-side contract testing
- ESLint (flat config, `typescript-eslint`, `@stylistic`, `unicorn`) + Prettier
- GitHub Actions for CI

## Why this site

Two other targets were evaluated and rejected before this one:

- **rozetka.com.ua** - has a real internal API, but is protected by Cloudflare bot-detection that blocks **headless** browsers (the mode CI runners use). Headed mode works locally but is not reliable enough for CI.
- A private work project - has a real, well-documented API, but was intentionally not used here to avoid mixing an employer's internal system with a public course submission.

`automationexercise.com` is purpose-built for automation practice: no bot protection, a documented public JSON API (`/api_list`), and a full product/cart UI flow.

## Project Structure

```text
src/
  services/
    i-api.service.ts          # API service interface
    playwright-api.service.ts # Implementation using Playwright's APIRequestContext
    config.service.ts         # Base URLs
  apis/
    products.api.ts           # Typed client for the Products resource
    account.api.ts            # Typed client for the Account resource
  models/
    api/                      # DTOs (Product, ProductsResponse, Account, UserDetail, ErrorResponse)
  pages/
    home.page.ts / products.page.ts / cart.page.ts       # Catalog & cart POM
    login.page.ts / signup.page.ts / product-detail.page.ts
  fixtures/
    services.fixture.ts -> apis.fixture.ts -> pages.fixture.ts -> index.ts
tests/
  api/products.spec.ts             # Products API tests (status codes, shape, negative paths)
  api/account.spec.ts              # Account API tests (full CRUD lifecycle, negative paths)
  e2e/search-and-add-to-cart.spec.ts
  e2e/catalog-filter.spec.ts
  e2e/product-detail.spec.ts
  e2e/registration-and-login.spec.ts
  contract/products.pact.spec.ts   # Consumer-side Pact contract tests
playwright.config.ts
.github/workflows/ci.yml
```

## Installation

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
npm test                 # run all tests (api + e2e + contract)
npm run test:headed      # run with a visible browser
npm run test:debug       # step through with the Playwright inspector
npm run lint             # tsc --build && eslint
```

## Viewing the HTML Report

```bash
npm run test:report          # open the last HTML report
npm run test:report:open     # open and launch in the browser directly
```

## Contract Testing (Pact)

The **consumer side** of Pact is implemented: `tests/contract/products.pact.spec.ts` spins up a Pact mock provider, defines the expected request/response contracts for `GET /productsList`, `GET /brandsList` and `POST /searchProduct`, and runs the real `ProductsApi` client against each. Running this generates a pact file under `pacts/`.

**Provider-side verification (`Verifier().verifyProvider()`) was attempted but is not included, for a concrete technical reason, not skipped by default.** `automationexercise.com`'s JSON API endpoints are served with `Content-Type: text/html` instead of `application/json` (a real, reproducible bug in that site, verified with `curl -I`). Pact's verifier hard-requires the actual provider response to be recognized as JSON before it will compare the body at all - unrelated to anything declared in the contract - so verification fails purely on that header, regardless of how the interaction is written. Declaring the real header on the consumer/mock side to match reality also breaks Pact's own matcher resolution in the mock response (a separate, reproducible issue in this Pact-JS version). Since this is a defect in the third-party site colliding with a hard limitation of the verifier, not something fixable from the consumer side, provider verification was left out rather than shipped in a way that could flake or misreport a working provider as broken. The consumer test still fully demonstrates and enforces the intended interaction contract.

## CI

`.github/workflows/ci.yml` runs on every push/PR to `main`: installs dependencies, installs the Chromium browser, lints/type-checks, runs the full test suite, and uploads the Playwright HTML report and generated Pact contract files as build artifacts.

## Notes

- Search, catalog-filter and product-detail E2E flows require no authentication (the site's cart/browse flow is anonymous).
- The registration E2E test creates a real account through the UI (unique, timestamped email) and deletes it via the Account API in a `finally` block, so it cleans up after itself even if an assertion fails mid-test.
- The Account API test suite covers the full create -> read -> verify-login -> delete lifecycle (also cleaned up in a `finally` block), plus negative paths (missing parameters, non-existent user) - this is exactly what `automationexercise.com`'s account endpoints are designed for, so exercising write operations here (unlike against `rozetka.com.ua` or a real production/work system) is safe and intentional.
- Product API tests also cover a negative path (missing `search_product` parameter).
