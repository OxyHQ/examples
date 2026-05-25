import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // `@oxyhq/core` does a runtime-gated `await import('node:crypto')` for its
  // server-side (Node) crypto path. The branch is unreachable in the browser
  // (the runtime gate picks the Web Crypto path on `window`), but Webpack
  // still tries to resolve the literal during the client build and fails
  // with `UnhandledSchemeError: node:crypto`. We use Next's bundled webpack
  // (via the second argument) to register an `IgnorePlugin` for any `node:*`
  // request on the client bundle; the dead branch simply never executes.
  webpack(config, { isServer, webpack }) {
    if (!isServer) {
      config.plugins = config.plugins ?? [];
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^node:/,
        }),
      );
    }
    return config;
  },
};

export default nextConfig;
