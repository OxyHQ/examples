# Oxy Examples

Runnable starter projects demonstrating Oxy identity platform integration. Each example is a self-contained project with its own `package.json` and `bun.lock` — no shared monorepo workspace.

## Starters

| Directory | Stack | SDK used |
|-----------|-------|----------|
| `nextjs-sign-in-with-oxy/` | Next.js 15 + App Router | `@oxy.so/services` (`OxyProvider`) |
| `vite-react-oxy/` | Vite 7 + React 19 | `@oxy.so/services` (`OxyProvider`) |
| `expo-sign-in-with-oxy/` | Expo SDK 56 + expo-router | `@oxy.so/services` (shared native OAuth completion; final registry install pending) |

## Commands (per example — run inside the example directory)

```bash
bun install --frozen-lockfile --minimum-release-age=0
bun run dev    # Next.js / Vite
bun run start  # Expo
```

## Rules for this repo

- Each example must remain self-contained and buildable in isolation by a third-party developer.
- Keep scope minimal: one integration flow per starter, no test setup, no Storybook.
- Env vars are documented in each `.env.example`; web starters require an existing registered public client ID and its exact redirect URI as well as the API URL. Never create internal trust by branding or embed a client secret.
- When Oxy SDK APIs change (breaking versions), update all affected examples in the same PR.
- These are public-facing reference implementations — code quality and clarity matter more than brevity.
