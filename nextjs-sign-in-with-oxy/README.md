# Sign in with Oxy — Next.js Starter

A minimal Next.js 15 (App Router) starter that demonstrates **Sign in with Oxy**
using the [`@oxyhq/auth`](https://www.npmjs.com/package/@oxyhq/auth) web SDK.

## What this shows

- Wrapping a Next.js app with `WebOxyProvider` (the Oxy auth context).
- Reading the live auth state via `useAuth()` (user, loading, error, helpers).
- Triggering sign-in (`signIn()`) — auto-picks FedCM, popup, or redirect.
- Signing out (`signOut()`).
- A client-side protected route (`/protected`) that redirects to `/` when
  signed out.

It does **not** include: Tailwind, shadcn, Husky, ESLint configs beyond the
defaults — by design. Copy what you need, drop what you don't.

## Stack

| Layer    | Choice                                  |
| -------- | --------------------------------------- |
| Framework | Next.js 15, App Router, React 19       |
| Language  | TypeScript (strict)                    |
| Auth      | `@oxyhq/auth` + `@oxyhq/core`          |
| Styling   | Hand-rolled CSS in `app/globals.css`   |

## Install

```bash
bun install
# or: npm install / pnpm install
```

## Configure

Copy the env template and point it at your Oxy API.

```bash
cp .env.example .env.local
```

Open `.env.local` and adjust:

```env
NEXT_PUBLIC_OXY_API_URL=https://api.oxy.so
# NEXT_PUBLIC_OXY_AUTH_WEB_URL=https://auth.oxy.so  # only if self-hosting
```

> The defaults point at Oxy's public production API. To run against a local
> Oxy API, set `NEXT_PUBLIC_OXY_API_URL=http://localhost:3001`.

## Run

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Click **Sign in with Oxy**
— you'll be sent to Oxy Accounts, authenticate, and bounce back signed in.

## Build

```bash
bun run build
bun run start
```

## How the integration is wired

```
app/
  layout.tsx                  ← Wraps the tree in <OxyAuthProvider />
  page.tsx                    ← Renders <AuthPanel /> + protected link
  protected/page.tsx          ← Client-side guarded page (uses useAuth)
components/
  oxy-provider.tsx            ← 'use client' wrapper around <WebOxyProvider>
  auth-panel.tsx              ← Sign-in / sign-out + user display
  protected-link.tsx          ← Shows the protected link when signed in
```

Two important details:

1. **`'use client'` on the provider.** `WebOxyProvider` uses `localStorage`,
   `window`, and FedCM, so it cannot run during SSR. We isolate it in
   `components/oxy-provider.tsx` and import that wrapper from
   `app/layout.tsx`.
2. **Client-side route protection.** The `/protected` page reads
   `isAuthenticated` from `useAuth()` after hydration. For server-side
   protection (e.g. blocking the HTML response before it ships), call your
   Oxy API from a Route Handler / Server Component with the user's session
   token — that pattern is outside the scope of this minimal starter.

## Deploy

Works on any Node.js host that runs Next.js 15 — Vercel, Netlify, AWS,
Cloudflare Pages, self-hosted Node. Make sure your `NEXT_PUBLIC_OXY_API_URL`
env var is configured in the deploy target.

If your deploy origin (e.g. `https://app.example.com`) is **different** from
the Oxy auth web app (`https://auth.oxy.so`), the SDK will automatically use
the popup or redirect flow. FedCM only fires when the browser supports it and
the user has linked their Oxy account to the relying party.

## Learn more

- `@oxyhq/auth` source: https://github.com/oxyhq/sdk/tree/main/packages/auth-sdk
- `@oxyhq/core` source: https://github.com/oxyhq/sdk/tree/main/packages/core
- Oxy platform docs: https://oxy.so
