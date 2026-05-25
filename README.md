# Oxy Examples

Runnable starter projects that integrate the **Oxy** identity platform.
Copy-paste, run, ship.

Each example is a complete, isolated project — its own `package.json`,
`tsconfig.json`, and lockfile. They share no monorepo plumbing, so you can
clone any single subdirectory and treat it as a standalone repo.

## Starters

| Path | Stack | What it shows |
| ---- | ----- | ------------- |
| [`nextjs-sign-in-with-oxy/`](./nextjs-sign-in-with-oxy) | Next.js 15 + App Router | Web auth via `@oxyhq/auth`, signed-in profile, sign-out, client-side protected route |
| [`vite-react-oxy/`](./vite-react-oxy) | Vite 7 + React 19 | Smallest possible web integration — one provider, one hook, two buttons |
| [`expo-sign-in-with-oxy/`](./expo-sign-in-with-oxy) | Expo SDK 56 + Expo Router | Native iOS + Android + Web via `@oxyhq/services` and `OxySignInButton` |

## Conventions

- **Package manager:** every example uses [Bun](https://bun.sh). `bun install`
  + `bun run dev` / `bun run start`. Drop-in replace with `npm` / `pnpm` /
  `yarn` if you prefer.
- **TypeScript strict** everywhere — no `any`, no `@ts-ignore`.
- **Minimal scope:** each starter shows exactly one flow well. No
  test setup, no Husky, no Storybook, no kitchen-sink demos.
- **Env vars:** documented in each `.env.example`. The Oxy API URL is the
  only required one.

## Anatomy of an Oxy integration

For **web** (Next.js, Vite, CRA, anywhere with React + DOM):

```tsx
import { WebOxyProvider, useAuth } from '@oxyhq/auth';

function App() {
  return (
    <WebOxyProvider baseURL="https://api.oxy.so">
      <YourApp />
    </WebOxyProvider>
  );
}

function YourApp() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  // ...
}
```

For **React Native / Expo**:

```tsx
import { OxyProvider, OxySignInButton, useOxy } from '@oxyhq/services';

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OxyProvider baseURL="https://api.oxy.so">
          <YourApp />
        </OxyProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function YourApp() {
  const { isAuthenticated, user, logout } = useOxy();
  if (!isAuthenticated) return <OxySignInButton />;
  // ...
}
```

## Packages used

| Package | Purpose |
| ------- | ------- |
| [`@oxyhq/core`](https://www.npmjs.com/package/@oxyhq/core) | Platform-agnostic Oxy client (`OxyServices`, types, crypto). Used by everything. |
| [`@oxyhq/auth`](https://www.npmjs.com/package/@oxyhq/auth) | Web auth SDK — `WebOxyProvider` + `useAuth()`. React hooks, zero RN dependency. |
| [`@oxyhq/services`](https://www.npmjs.com/package/@oxyhq/services) | React Native / Expo SDK — `OxyProvider`, `OxySignInButton`, bottom-sheet flows. |
| [`@oxyhq/bloom`](https://www.npmjs.com/package/@oxyhq/bloom) | Cross-platform UI primitives (used internally by `@oxyhq/services`). |

## Learn more

- Oxy platform: https://oxy.so
- SDK source: https://github.com/oxyhq/sdk
- Issues / questions: https://github.com/oxyhq/sdk/issues
