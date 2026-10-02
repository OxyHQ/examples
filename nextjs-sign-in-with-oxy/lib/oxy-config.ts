export const OXY_API_URL = process.env.NEXT_PUBLIC_OXY_API_URL ?? 'https://api.oxy.so';
export const OXY_CLIENT_ID = process.env.NEXT_PUBLIC_OXY_CLIENT_ID;
export const OXY_REDIRECT_URI = process.env.NEXT_PUBLIC_OXY_REDIRECT_URI;
if (!OXY_CLIENT_ID || !OXY_REDIRECT_URI) {
  throw new Error('Configure NEXT_PUBLIC_OXY_CLIENT_ID and NEXT_PUBLIC_OXY_REDIRECT_URI from your registered third-party application.');
}
