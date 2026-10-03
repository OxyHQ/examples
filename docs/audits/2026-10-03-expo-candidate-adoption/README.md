# Expo starter source compatibility

Source `f82dddee7179602988eff7b2cc663e1bca25ca80` replaces retired imports and app-local redirect inference with one registered OxyProvider, canonical useAuth/signOut, and SDK native OAuth completion. The public configuration requires the actual registered client and exact redirect; no secret or session plumbing is added.

The starter uses published Bloom 6.2.1 and reviewed local Oxy packs at dca175d22. Its candidate dependency inputs, including Expo 56 secure-store and native keyboard controller, are preserved in candidate-install. They are not final registry locks. The committed source is a compatibility checkpoint awaiting the coordinated package release.

Final strict TypeScript and Expo web export pass. Historical failed checks are retained individually: old namespace imports; dependency source resolution; missing secure-store; truncated Metro MessagePack cache. The successful export used its own TMPDIR cache, leaving frozen native Metros untouched. No dependency source was patched, no ambient shim was introduced, and no test framework was added.

Commands in expo-sign-in-with-oxy: bun install --minimum-release-age=0 --ignore-scripts; bunx --no-install tsc --noEmit; bun run build. The build used EXPO_NO_DOTENV=1, a build-only nonregistered public client ID and http://localhost:8081/ redirect. That checks compilation only; real registered OAuth and native development-build execution remain separate acceptance gates.
