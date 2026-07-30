# Final Lesson — QA Automation TypeScript Course Project

Playwright + TypeScript test framework covering [automationexercise.com](https://automationexercise.com) — a public product/e-commerce site built specifically for test automation practice.

## Tech Stack

- Playwright Test (TypeScript)
- Chai (`expect`) layered on top of Playwright's own `expect` for richer assertions
- Pact (`@pact-foundation/pact`) for consumer-side contract testing
- ESLint (flat config, `typescript-eslint`, `@stylistic`, `unicorn`) + Prettier
- GitHub Actions for CI

## Why this site

Two other targets were evaluated and rejected before this one:

- **rozetka.com.ua** — has a real internal API, but is protected by Cloudflare bot-detection that blocks **headless** browsers (the mode CI runners use). Headed mode works locally but is not reliable enough for CI.
- A private work project — has a real, well-documented API, but was intentionally not used here to avoid mixing an employer's internal system with a public course submission.

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
  models/
    api/                      # DTOs (Product, ProductsResponse, ProductCategory)
  pages/
    home.page.ts / products.page.ts / cart.page.ts   # Page Object Model
  fixtures/
    services.fixture.ts -> apis.fixture.ts -> pages.fixture.ts -> index.ts
tests/
  api/products.spec.ts             # API tests (status codes, response shape)
  e2e/search-and-add-to-cart.spec.ts
  e2e/catalog-filter.spec.ts
  contract/products.pact.spec.ts   # Consumer-side Pact contract test
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

Only the **consumer side** of Pact is implemented: `tests/contract/products.pact.spec.ts` spins up a Pact mock provider, defines the expected request/response contract for `GET /productsList`, and runs the real `ProductsApi` client against it. Running this generates a pact file under `pacts/`.

**Provider-side verification is intentionally not implemented.** `automationexercise.com` is a third-party public service we don't control; repeatedly running `Verifier().verifyProvider()` against a live, uncontrolled external API in CI would be fragile and is not good practice. The consumer test still demonstrates the intended interaction contract and is a real, useful regression check on our own client code.

## CI

`.github/workflows/ci.yml` runs on every push/PR to `main`: installs dependencies, installs the Chromium browser, lints/type-checks, runs the full test suite, and uploads the Playwright HTML report and generated Pact contract files as build artifacts.

## Notes

- Search and catalog-filter E2E flows require no authentication (the site's cart/browse flow is anonymous).
- API tests only exercise safe, idempotent endpoints (`GET`/`POST` search) — no destructive operations against the public API.
