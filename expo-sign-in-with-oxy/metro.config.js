const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Register web font formats as static assets so Metro can resolve the font
// files bundled by `@oxyhq/bloom`'s web variant. Metro's default `assetExts`
// includes `ttf` and `otf` but not the web-only formats; without these the
// `expo export --platform web` build fails with
// `Unable to resolve module ./assets/X.woff2`.
config.resolver.assetExts = [
  ...config.resolver.assetExts,
  'woff2',
  'woff',
];

module.exports = config;
