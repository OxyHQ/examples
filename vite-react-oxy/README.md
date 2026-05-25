# Vite + React + Oxy — Minimal Starter

The smallest possible **Sign in with Oxy** integration. Plain Vite, React 19,
TypeScript, hand-rolled CSS — nothing else. Useful as a reference if you're
integrating Oxy into a custom stack.

## What this shows

- A single `WebOxyProvider` at the root of the app.
- A single `useAuth()` hook reading `user`, `isAuthenticated`, `signIn`,
  `signOut`.
- Two buttons: sign in / sign out.

That's it. No router, no state management library, no UI kit. Total app code:
roughly 90 lines across `src/`.

## Stack

| Layer    | Choice                              |
| -------- | ----------------------------------- |
| Bundler  | Vite 7                              |
| Runtime  | React 19                            |
| Language | TypeScript (strict)                 |
| Auth     | `@oxyhq/auth` + `@oxyhq/core`       |
| Styling  | One `styles.css` file               |

## Install

```bash
bun install
```

## Configure

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_OXY_API_URL=https://api.oxy.so
# VITE_OXY_AUTH_WEB_URL=https://auth.oxy.so  # only if self-hosting
```

## Run

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
bun run build
bun run preview   # serves the built bundle on :4173 for a quick smoke test
```

## File map

```
src/
  main.tsx       ← <WebOxyProvider> + ReactDOM.createRoot
  App.tsx        ← const { user, signIn, signOut } = useAuth()
  styles.css     ← Plain CSS, no Tailwind / CSS-in-JS
```

## Deploy

The built `dist/` folder is a static site — drop it on Netlify, Vercel,
Cloudflare Pages, S3 + CloudFront, your own nginx, anywhere.

Just remember to set `VITE_OXY_API_URL` at build time in your deploy target
(env vars are baked into the bundle by Vite — they're not read at runtime).

## Learn more

- `@oxyhq/auth` source: https://github.com/oxyhq/sdk/tree/main/packages/auth-sdk
- Oxy platform docs: https://oxy.so
