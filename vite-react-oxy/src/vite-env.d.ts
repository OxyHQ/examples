/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OXY_API_URL?: string;
  readonly VITE_OXY_CLIENT_ID?: string;
  readonly VITE_OXY_REDIRECT_URI?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
