## Repo overview

This is a Next.js (App Router) project with built-in i18n. Key ideas:

- App layout and localized routes live under `src/app/[locale]` using route groups (e.g. `(main)`, `(auth)`).
- Internationalization is powered by `next-intl` (see `next.config.ts` and `src/middleware.ts`).
- A single API surface (`src/api/agent.ts`) centralizes HTTP calls using `axios` and a `CookieConfig` helper to read the `jwt` cookie.
- Domain types live in `src/model/*.ts`; UI components are under `src/component` and pages under `src/app`.

## Important files

- Project scripts: [package.json](package.json)
- Next Intl plugin: [next.config.ts](next.config.ts)
- Routing middleware: [src/middleware.ts](src/middleware.ts)
- Central HTTP client: [src/api/agent.ts](src/api/agent.ts)
- Cookie helper: [src/lib/cookieconfig.ts](src/lib/cookieconfig.ts)
- Translations: `messages/en.json`, `messages/hy.json`, `messages/ru.json`

## Big-picture architecture & conventions (how to reason about changes)

- App router + locale param: Most pages are located in `src/app/[locale]/(...)`. Preserve the `[locale]` param and route-group structure when moving pages.
- Central API agent: Use functions on `agent` (e.g. `agent.Account`, `agent.ChildApi.checkChildId`) rather than adding ad-hoc axios calls. The agent sets `axios.defaults.baseURL` (default points to the production API) and contains interceptors that log requests/responses.
- Cookie handling: `CookieConfig` reads `jwt` via `next/headers` (`cookies()`), so be careful—this uses Next.js server-side APIs. When adding auth behavior, ensure you respect server/client boundaries.
- Form data: `agent` distinguishes `post` vs `postForm`/`putForm`; when sending `FormData` the `Content-Type` header is removed intentionally so the browser can set the boundary.
- Error returns: Many `agent` helpers return either the data or `error.response?.data`. Callers expect this shape—do not change it without updating callers in `src/action`.

## Developer workflows

- Start dev server: `npm run dev` (uses `next dev --turbopack`)
- Build: `npm run build`; Start production server: `npm run start`
- Lint: `npm run lint`
- To point the app at a local backend while developing, edit the base URL in [src/api/agent.ts](src/api/agent.ts) (there's a commented local URL you can uncomment).

## I18n & translations

- Add or update strings in `messages/*.json` (each locale file must include the same keys). Files are under the repo root: `messages/en.json`, `messages/hy.json`, `messages/ru.json`.
- The `next-intl` plugin is enabled in `next.config.ts` and middleware is configured in `src/middleware.ts`; updates to routing or locale rules should be done in `src/i18n/routing.ts`.

## When writing code as an AI assistant

- Make minimal, incremental edits; prefer using existing helpers (`agent`, `actions`, `models`).
- Preserve TypeScript types in `src/model/*`. When adding API calls, add or update models first.
- Keep translations in sync: if you add a visible string, add keys to every `messages/*.json` file.
- Respect server/client APIs: `next/headers` and `cookies()` are server-only; components using them must be server components or run on server-side code paths.
- Avoid refactoring large route-group moves without explicit approval—these affect URLs and i18n handling.

## Debugging hints

- `src/api/agent.ts` logs outgoing requests, responses, and FormData contents to console. Use that for HTTP debugging.
- For local API testing, switch the `axios.defaults.baseURL` in `src/api/agent.ts` to the local endpoint.

## Quick links

- Central API layer: [src/api/agent.ts](src/api/agent.ts)
- Cookie helper: [src/lib/cookieconfig.ts](src/lib/cookieconfig.ts)
- Middleware/i18n: [src/middleware.ts](src/middleware.ts)
- Translations folder: [messages](messages)

---

If any of this is incomplete or you want different conventions, tell me which areas to expand (routing, API patterns, i18n, or auth flow).
