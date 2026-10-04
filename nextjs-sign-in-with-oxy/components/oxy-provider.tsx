'use client';

import { BloomProvider } from '@oxy.so/bloom/provider';
import { OxyProvider } from '@oxy.so/services';
import type { ReactNode } from 'react';
import { OXY_API_URL, OXY_CLIENT_ID } from '@/lib/oxy-config';

/** One registered application provider; the SDK owns session restore and OAuth. */
export function OxyAuthProvider({ children }: { children: ReactNode }) {
  return <BloomProvider><OxyProvider baseURL={OXY_API_URL} clientId={OXY_CLIENT_ID}>{children}</OxyProvider></BloomProvider>;
}
