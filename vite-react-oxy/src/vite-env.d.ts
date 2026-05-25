/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OXY_API_URL?: string;
  readonly VITE_OXY_AUTH_WEB_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
