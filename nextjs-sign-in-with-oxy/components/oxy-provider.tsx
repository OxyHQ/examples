'use client';

import { WebOxyProvider } from '@oxyhq/auth';
import type { ReactNode } from 'react';

const OXY_API_URL =
  process.env.NEXT_PUBLIC_OXY_API_URL ?? 'https://api.oxy.so';

const OXY_AUTH_WEB_URL = process.env.NEXT_PUBLIC_OXY_AUTH_WEB_URL;

/**
 * Client-only wrapper around `WebOxyProvider`.
 *
 * `WebOxyProvider` uses browser-only APIs (localStorage, window, FedCM),
 * so it cannot run during Next.js server rendering. Mark this component
 * with `'use client'` and import it from the root layout.
 */
export function OxyAuthProvider({ children }: { children: ReactNode }) {
  return (
    <WebOxyProvider baseURL={OXY_API_URL} authWebUrl={OXY_AUTH_WEB_URL}>
      {children}
    </WebOxyProvider>
  );
}
