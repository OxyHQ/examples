# Sign in with Oxy — Vite 7 + React 19

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

## Verification

The current pins are services 11.1.0, core 4.2.0, contracts 4.9.0 and Bloom 6.2.1 from the public registry. Frozen installation, TypeScript and production build pass. Installed files match the accepted published archives. These starter checks establish packaging and source compatibility; they do not replace a runtime test with your registered client.

The old release's logout failure remains in the historical `verification/` record. Final shared SDK web/native acceptance is linked separately in the [registry proof](../docs/audits/2026-10-04-final-registry/README.md); no local auth workaround was added to this starter.

[Oxy integration contracts](https://github.com/OxyHQ/oxy/blob/main/docs/auth/integration-guide.md)
