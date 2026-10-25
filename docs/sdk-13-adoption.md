# Published SDK 13 adoption

The three independent starters now consume services 13.0.0, core 7.1.0,
contracts 6.0.0, protocol 1.5.1 and Bloom 15.11.0 from the public registry. They use
BloomThemeProvider and the services `ui/client` entry, preserving one OxyProvider.
The native keyboard peer is aligned to 1.22.7 and remains excluded from Expo's
version replacement in the native starter.

All three frozen installations, TypeScript checks and production web builds
passed. A separate Playwright smoke rendered each actual built application with
only a public third-party registry metadata fixture; all showed their signed-out
surface without browser errors or a fabricated bearer. These checks do not claim
live OAuth authorization or consent: those require the developer's own registered
public client and exact return URI. Native device testing additionally needs a
development build.

These are external applications. OAuth scopes, PKCE, consent and live grant
revocation remain in force. A package upgrade or the example's name cannot make
its application trusted first party. The starters carry no client secret, custom
session restoration, bearer injection or app-local authorization implementation.
