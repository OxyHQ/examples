export const OXY_API_URL = import.meta.env.VITE_OXY_API_URL ?? 'https://api.oxy.so';
export const OXY_CLIENT_ID = import.meta.env.VITE_OXY_CLIENT_ID;
export const OXY_REDIRECT_URI = import.meta.env.VITE_OXY_REDIRECT_URI;
if (!OXY_CLIENT_ID || !OXY_REDIRECT_URI) {
  throw new Error('Configure VITE_OXY_CLIENT_ID and VITE_OXY_REDIRECT_URI from your registered third-party application.');
}
