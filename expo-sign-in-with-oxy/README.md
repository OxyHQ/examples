# Sign in with Oxy — Expo starter

This Expo 56 starter uses one `OxyProvider` from `@oxy.so/services`, the shared
`OxySignInButton` and `useAuth`. Bloom provides the theme. Native OAuth completion
is handled by the SDK (`nativeOAuthCompletion="sdk"`); the app does not exchange
codes, store bearer tokens, or implement a callback handler.

## Configure and run

Register a public client in Oxy Console with the exact redirect URI for your
platform. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_OXY_CLIENT_ID`,
`EXPO_PUBLIC_OXY_REDIRECT_URI`, and `EXPO_PUBLIC_OXY_API_URL`. These are public
configuration values; never put a client secret in an Expo environment variable.
The starter refuses to mount without its registered client and redirect.

For a native development build, register `oxyexample://oauth/callback`, matching
the `oxyexample` scheme in `app.json`. Web needs its own exact registered HTTP(S)
redirect URI. The application registration determines the sign-in lane; the
starter does not grant itself first-party trust.

```sh
bun install --frozen-lockfile --minimum-release-age=0
bunx expo run:android  # or bunx expo run:ios
bun run web
```

Use a development build for native testing. Expo Go cannot supply the SDK's
custom native modules. Native-module dependencies are declared directly; aligned
versions are listed in `expo.install.exclude` where required. Changing them
requires rebuilding the native app, not only reloading JavaScript.

A third-party client opens the explicit OAuth flow, then keeps the resulting
app session in memory. Process restart requires signing in again. Sign-out is
awaited, and failure remains visible. There is no silent top-level redirect,
app-local restore or shared-device credential plumbing.

## Checks

```sh
bunx --no-install tsc --noEmit
bun run build
```

The TypeScript config checks published declaration files (`customConditions: []`)
rather than applying the starter's compiler flags to dependency source. Metro
still selects the native runtime exports on native platforms.

`app/_layout.tsx` mounts the providers, `oxy-config.ts` validates public config,
and `app/index.tsx` renders shared sign-in/auth state. The display name falls back
to the canonical normalized handle. The web build does not establish Android/iOS
runtime acceptance; test the registered callback in the native development build.

Current compatibility evidence and the distinction between candidate and final
registry dependencies are recorded under `../docs/audits/`.
