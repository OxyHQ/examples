# Sign in with Oxy — Next.js 15 + App Router

A standalone external application using the published `@oxy.so/services` SDK: one `OxyProvider`, its `OxySignInButton`, and `useAuth()` for the signed-in state and sign-out action. `BloomProvider` supplies the SDK UI theme.

## Configure and run

Copy `.env.example` to `.env.local` and fill in the registered public client ID. The template documents every setting. The application must be registered as `third_party`, with its exact callback URI in `redirectUris`; an Oxy-branded example receives no internal-app exemption. No client secret belongs in browser code. Missing client ID or return URI fails closed.

```bash
cp .env.example .env.local
bun install --frozen-lockfile --minimum-release-age=0
bun run dev
bun run build
bun run typecheck
```

The SDK opens the consent-bearing OAuth window from the button press and owns PKCE, `state` validation, token exchange, and the return route. A blocked popup uses the registered URI. Keep the provider mounted there. The app has no callback handler, token storage, silent restore, or sign-in screen. There are no cookies, FedCM, hidden iframes, or authorization requests on page load.

Configuration is public and baked into the browser build. Register the deployed callback URI before building for that origin. A client-side protected view only controls presentation; a backend must use `OxyServer` from `@oxy.so/core/server` and its middleware to authorize requests.

## Published SDK verification limit

The pinned SDK supports device-less OAuth exchange and authenticated display. Local browser verification also reproduced a published SDK lifecycle defect: sign-out requires shared device membership, which an isolated third-party session lacks. This starter does not fabricate device credentials or add local token plumbing. Adoption remains pending the upstream lifecycle fix and a verified published release; see the repository verification record.

Native third-party completion has a separate shared-helper gap; the Expo starter remains pending that release.

[Oxy integration contracts](https://github.com/OxyHQ/oxy/blob/main/docs/auth/integration-guide.md)
