# Examples final public-registry adoption

The Next.js, Vite and Expo starters now install published contracts 4.9.0, core 4.2.0, services 11.1.0, transitive protocol 1.2.2 and Bloom 6.2.1. Each keeps its own manifest and frozen Bun lockfile. Source `6dfb89ed77e81a3636105f37796e4e4592475ce3` preserves the previously reviewed provider, button, error display and native shared-completion implementation.

All three frozen installs, typechecks and configured production builds pass. Fifteen importer/package comparisons cover 72,846 installed files, byte-identical to the accepted registry archives. `records/installed-bytecheck.json` names every package, source archive and resolved root; the verifier is preserved beside it. The initial Next and Expo builds without client configuration fail closed; those logs remain alongside the successful configured builds.

The builds use an already registered local fixture's public client ID, API origin and exact return URI. No server was started and no identity, grant, registry entry or production configuration was changed. This establishes starter source and packaging adoption. It does not claim a new browser login or native-device run of these starter apps. Shared SDK final web/native acceptance is recorded separately in [I04](https://github.com/OxyHQ/oxy/issues/1523).

## Reproduce

Inside each starter run `bun install --frozen-lockfile --minimum-release-age=0`, `bun run typecheck`, then `bun run build` with the documented public API/client/redirect configuration. Next and Expo require that configuration during prerender/export. Vite's initial build without configuration is not counted as a runtime sign-in check.

The old services 11.0 logout RED remains in `verification/`, and the Expo candidate records remain under the earlier audit directories. Those records are historical, not current-release failures. Next's optional-native dynamic import warnings and Vite's chunk-size/web Node-crypto warnings remain visible; thresholds and runtime source were not weakened to obtain a build.

`proof.json` hashes all source inputs and retained records. Registry package overrides are exact versions, with no `file:` dependency or candidate alias. Web-export success does not substitute for native development-build testing with the user's registered callback.
