# Sign in with Oxy — Expo Starter

An Expo SDK 56 starter (TypeScript + Expo Router) that demonstrates
[`OxySignInButton`](https://github.com/oxyhq/sdk/tree/main/packages/services)
from `@oxyhq/services`.

The same code runs on **iOS**, **Android**, and **Web** — Oxy's RN SDK
ships native flows for mobile (bottom sheet + native gestures) and a
full-screen modal on web.

## What this shows

- Wrapping a tree in `<OxyProvider>` (RN context + bottom-sheet router +
  React Query + Bloom theme).
- Dropping `<OxySignInButton />` to launch the sign-in flow.
- Reading the live auth state via `useOxy()` (`user`, `isAuthenticated`,
  `logout`).

## Stack

| Layer    | Choice                                            |
| -------- | ------------------------------------------------- |
| Framework | Expo SDK 56 + Expo Router                        |
| Language  | TypeScript (strict)                              |
| Auth      | `@oxyhq/services` + `@oxyhq/core` + `@oxyhq/bloom` |
| UI        | React Native primitives + Bloom theme            |

> The Bloom version is pinned to `0.4.0` to match `@oxyhq/services@6.9.46`'s
> expected subpath exports. Once `@oxyhq/services@6.10.0` ships you can
> bump to `@oxyhq/bloom@0.5.0`.

## Install

```bash
bun install
```

> The first install pulls down RN, Reanimated 4, and Gesture Handler — give
> it a minute.

## Configure

```bash
cp .env.example .env
```

Edit `.env`:

```env
EXPO_PUBLIC_OXY_API_URL=https://api.oxy.so
```

> Expo only exposes env vars whose name starts with `EXPO_PUBLIC_` to the
> client bundle. Anything else stays server-only.

## Run

### iOS simulator

```bash
bun run ios
```

### Android emulator

```bash
bun run android
```

### Web

```bash
bun run web
```

### On a real device

```bash
bun run start
```

Scan the QR with the **Expo Go** app on iOS or Android — it streams the
JS bundle from your laptop. Make sure your phone and laptop are on the same
Wi-Fi network.

### Deep-link redirect URI

The sign-in flow opens Oxy Accounts in an in-app browser and redirects back
via a deep link. We compute it at runtime in `app/_layout.tsx`:

```ts
const AUTH_REDIRECT_URI = Linking.createURL('/');
```

In Expo Go: `exp://<lan-ip>:8081/--/`.
In a standalone build: `oxyexample://` (matches the `scheme` in `app.json`).

If you change the scheme, also update it in your Oxy Developer App's
allowed redirect URIs.

## Native build (development build / EAS)

Expo Go ships a fixed set of native modules. This starter only uses modules
included with Expo Go (Reanimated, Gesture Handler, SecureStore via
@oxyhq/services, etc.) — it runs in Expo Go out of the box.

If you add a custom native module later, run a prebuild:

```bash
bunx expo prebuild
bun run ios   # or android
```

For TestFlight / Play Store builds use [EAS](https://expo.dev/eas):

```bash
bunx eas build --profile preview --platform ios
```

## File map

```
app/
  _layout.tsx     ← <SafeAreaProvider> → <GestureHandlerRootView> → <OxyProvider>
  index.tsx       ← <OxySignInButton /> + useOxy()
app.json          ← Expo config, scheme = "oxyexample"
babel.config.js   ← babel-preset-expo + reanimated plugin
metro.config.js   ← Registers .woff2/.woff as static assets (used by Bloom)
```

## Learn more

- `@oxyhq/services` source: https://github.com/oxyhq/sdk/tree/main/packages/services
- `OxySignInButton` source:
  https://github.com/oxyhq/sdk/blob/main/packages/services/src/ui/components/OxySignInButton.tsx
- Oxy platform docs: https://oxy.so
