/** Public application metadata only; never put a client secret in an Expo app. */
export const OXY_API_URL = process.env.EXPO_PUBLIC_OXY_API_URL ?? 'https://api.oxy.so';
export const OXY_CLIENT_ID = process.env.EXPO_PUBLIC_OXY_CLIENT_ID;
export const OXY_REDIRECT_URI = process.env.EXPO_PUBLIC_OXY_REDIRECT_URI;

if (!OXY_CLIENT_ID || !OXY_REDIRECT_URI) {
  throw new Error(
    'Configure EXPO_PUBLIC_OXY_CLIENT_ID and the exact registered EXPO_PUBLIC_OXY_REDIRECT_URI.',
  );
}
