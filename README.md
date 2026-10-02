# Oxy Examples

Standalone Next.js, Vite, and Expo reference applications. Each directory has its own manifest and Bun lockfile and can be copied independently.

| Starter | Integration | Status |
|---|---|---|
| [Next.js](nextjs-sign-in-with-oxy) | Published `@oxy.so/services` `OxyProvider` + `OxySignInButton` | Device-less OAuth display verified locally; published sign-out defect blocks complete adoption |
| [Vite](vite-react-oxy) | Same public provider and button | Same lifecycle gate; web/native dependency bundling configured explicitly |
| [Expo](expo-sign-in-with-oxy) | Legacy `@oxyhq/services` | Migration pending a published shared native OAuth finalizer |

The web starters pin registry-published services 11.0.0, core 4.1.0, contracts 4.8.0, and Bloom 6.4.0, which satisfies the services Bloom peer range. They use React Native Web and the published Expo peers required by the SDK. No local package tarball substitutes for a published release.

Each `.env.example` documents the API URL, registered public client ID, and exact registered return URI. Fill the client ID before building. The examples are external `third_party` apps: ordinary OAuth + PKCE and consent apply regardless of their Oxy name. No new registry records or real credentials are created by this repository.

The SDK owns sign-in, the callback, and session state. Starters do not contain local token plumbing or sign-in screens. Local fixture/browser checks are maintained separately from the starters; there is no added test framework. These checks do not prove live SSO, production deployment, or provider grants.

See each starter's README and the verification record for the exact published lifecycle limitations. The Expo starter stays explicitly pending rather than implementing a local callback or casting an OAuth response into a device-session DTO.

[Platform repository](https://github.com/OxyHQ/oxy) · [Third-party integration contracts](https://github.com/OxyHQ/oxy/blob/main/docs/auth/integration-guide.md)
