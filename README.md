# Oxy Examples

Standalone Next.js, Vite, and Expo reference applications. Each directory has its own manifest and Bun lockfile and can be copied independently.

| Starter | Integration | Status |
|---|---|---|
| [Next.js](nextjs-sign-in-with-oxy) | Published `OxyProvider` + `OxySignInButton` | Frozen install, types and production build verified |
| [Vite](vite-react-oxy) | Same public provider and button | Frozen install, types and production build verified |
| [Expo](expo-sign-in-with-oxy) | Published provider and shared native OAuth completion | Frozen install, types and web export verified; native development build required for device testing |

All three starters pin registry-published services 11.1.0, core 4.2.0, contracts 4.9.0 and Bloom 6.2.1. Protocol 1.2.2 is resolved transitively. Each installed SDK and Bloom file is compared with the accepted public package archive. The starters use the published Expo/native peers required by the SDK.
Each `.env.example` documents the API URL, registered public client ID, and exact registered return URI. Fill the client ID before building. The examples are external `third_party` apps: ordinary OAuth + PKCE and consent apply regardless of their Oxy name. No new registry records or real credentials are created by this repository.

The SDK owns sign-in, the callback, and session state. Starters do not contain local token plumbing or sign-in screens. Local fixture/browser checks are maintained separately from the starters; there is no added test framework. These checks do not prove live SSO, production deployment, or provider grants.

See [final registry verification](docs/audits/2026-10-04-final-registry/README.md) for package hashes and build limits. The earlier `verification/` record preserves the old SDK's logout regression; it does not describe the currently pinned release.

## Formatting and linting

One root [Biome](https://biomejs.dev) config covers all three starters. Run it from the repository root (CI runs `bunx @biomejs/biome@2.5.15 ci .` on every pull request):

```bash
bunx @biomejs/biome@2.5.15 check .          # lint + format check
bunx @biomejs/biome@2.5.15 check --write .  # apply safe fixes and formatting
bunx @biomejs/biome@2.5.15 format --write . # format only
```

There is deliberately no root `package.json` or lockfile: a root `bun.lock` would make Next.js treat the repository root as its workspace root. In the Expo starter, a Biome plugin (`biome-plugins/expo-env-vars.grit`) rejects destructured or computed `process.env` reads, which Metro does not inline. When you copy a starter out of this repository, copy `biome.json` (and the plugin, for Expo) along with it if you want the same checks.

[Platform repository](https://github.com/OxyHQ/oxy) · [Third-party integration contracts](https://github.com/OxyHQ/oxy/blob/main/docs/auth/integration-guide.md)
