<h1 align="center">Oxy Examples</h1>

<p align="center">
  Runnable starter projects that add Oxy identity to a Next.js, Vite, or Expo app.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@oxyhq/services"><img alt="@oxyhq/services" src="https://img.shields.io/npm/v/@oxyhq/services?style=flat-square&label=%40oxyhq%2Fservices&labelColor=440151&color=D26AE7"></a>
  <a href="https://www.npmjs.com/package/@oxyhq/core"><img alt="@oxyhq/core" src="https://img.shields.io/npm/v/@oxyhq/core?style=flat-square&label=%40oxyhq%2Fcore&labelColor=440151&color=D26AE7"></a>
  <img alt="Bun" src="https://img.shields.io/badge/bun-lockfile-440151?style=flat-square&logo=bun&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-440151?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Node" src="https://img.shields.io/badge/node-%E2%89%A518.18-440151?style=flat-square&logo=nodedotjs&logoColor=white">
</p>

<p align="center">
  <b>There is no monorepo here.</b><br>
  Every starter carries its own <code>package.json</code>, <code>tsconfig.json</code> and <code>bun.lock</code>,<br>
  so you can copy a single directory out and treat it as a standalone repository.
</p>

---

## Starters

<table>
<tr>
<td valign="top" width="50%">

### [`nextjs-sign-in-with-oxy/`](nextjs-sign-in-with-oxy)

Next.js 15 with the App Router, React 19.

A client provider in `components/oxy-provider.tsx`, a sign in panel, and a protected route under `app/protected/` that reads auth state from a hook.

```bash
cd nextjs-sign-in-with-oxy
cp .env.example .env.local
bun install
bun run dev
```

`bun run build`, `bun run start`, `bun run lint` and `bun run typecheck` are also defined.

</td>
<td valign="top" width="50%">

### [`vite-react-oxy/`](vite-react-oxy)

Vite 7 with React 19.

The smallest integration in the repo: one provider in `src/main.tsx`, one hook in `src/App.tsx`, and two buttons. Four source files in total.

```bash
cd vite-react-oxy
cp .env.example .env
bun install
bun run dev
```

`bun run build`, `bun run preview` and `bun run typecheck` are also defined.

</td>
</tr>
<tr>
<td valign="top" width="50%">

### [`expo-sign-in-with-oxy/`](expo-sign-in-with-oxy)

Expo SDK 56 with Expo Router, React Native 0.85, iOS and Android and web from one codebase.

Wraps the app in `OxyProvider` and renders `OxySignInButton`, both from [`@oxyhq/services`](https://www.npmjs.com/package/@oxyhq/services).

```bash
cd expo-sign-in-with-oxy
cp .env.example .env
bun install
bun run start
```

`bun run ios`, `bun run android`, `bun run web` and `bun run build` (a web export) are also defined.

</td>
<td valign="top" width="50%">

### What each one needs

Only one environment variable is required, the Oxy API base URL. It is named per framework because each bundler has its own public prefix:

| Starter | Variable |
|---|---|
| Next.js | `NEXT_PUBLIC_OXY_API_URL` |
| Vite | `VITE_OXY_API_URL` |
| Expo | `EXPO_PUBLIC_OXY_API_URL` |

Every starter ships a `.env.example` with the production value already filled in. Point it at your own Oxy API instead if you self host.

All three declare `engines.node >= 18.18.0` and use [Bun](https://bun.sh) for install and scripts.

</td>
</tr>
</table>

## Packages

| Package | Used by | What it gives you |
|---|---|---|
| [`@oxyhq/core`](https://www.npmjs.com/package/@oxyhq/core) | all three | The platform client, types and crypto. No React, no React Native. |
| [`@oxyhq/services`](https://www.npmjs.com/package/@oxyhq/services) | Expo starter | `OxyProvider`, `OxySignInButton`, `useOxy()`. Expo and React Native, and web through React Native Web. |
| [`@oxyhq/bloom`](https://www.npmjs.com/package/@oxyhq/bloom) | Expo starter | The cross platform UI primitives and design tokens. |
| [`@oxyhq/auth`](https://www.npmjs.com/package/@oxyhq/auth) | Next.js, Vite | `WebOxyProvider`, `useAuth()`. Read the note below before copying this into new code. |

> [!IMPORTANT]
> `@oxyhq/auth` was retired on npm in July 2026 and merged into `@oxyhq/services`, which now covers Expo, React Native and web through React Native Web behind a single `OxyProvider`. The two web starters here still pin `@oxyhq/auth` and have not been migrated yet. For a new web app, follow the Expo starter's provider setup and read the [platform repository](https://github.com/OxyHQ/oxy).

<details>
<summary><b>The shape of an integration</b></summary>

<br>

Expo, React Native, and web through React Native Web:

```tsx
import { OxyProvider, OxySignInButton, useOxy } from '@oxyhq/services';

function App() {
  return (
    <OxyProvider baseURL={process.env.EXPO_PUBLIC_OXY_API_URL}>
      <Screen />
    </OxyProvider>
  );
}

function Screen() {
  const { isAuthenticated, user, logout } = useOxy();
  if (!isAuthenticated) return <OxySignInButton />;
  return <Text>Welcome, {user?.username}</Text>;
}
```

Session restore is the SDK's job, not yours. There is no callback route to add and no token for the app to store.

</details>

<details>
<summary><b>House rules for this repo</b></summary>

<br>

- Each starter stays self contained and buildable in isolation by someone who cloned only that directory.
- One flow per starter. No test harness, no Storybook, no kitchen sink.
- TypeScript strict everywhere. No `any`, no `@ts-ignore`.
- Environment variables are documented in `.env.example` and nowhere else.
- When an SDK ships a breaking version, every affected starter is updated in the same pull request.

These are public reference implementations, so clarity beats cleverness.

</details>

## More

- The platform: [github.com/OxyHQ/oxy](https://github.com/OxyHQ/oxy)
- Oxy: [oxy.so](https://oxy.so)
- Issues and pull requests are welcome here, especially ones that fix a starter that has drifted.
