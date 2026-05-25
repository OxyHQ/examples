import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { OxyAuthProvider } from '@/components/oxy-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sign in with Oxy — Next.js Starter',
  description:
    'A minimal Next.js 15 App Router starter showing Sign in with Oxy via @oxyhq/auth.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OxyAuthProvider>{children}</OxyAuthProvider>
      </body>
    </html>
  );
}
