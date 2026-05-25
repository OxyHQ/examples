'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@oxyhq/auth';

/**
 * A client-side protected route.
 *
 * On the App Router the providers (and therefore `useAuth`) run in the
 * browser only, so this guard runs after hydration. For server-side
 * protection (e.g. blocking the HTML response before it ships), use
 * `getServerSession()`-style helpers against your own Oxy API in a
 * Route Handler or middleware — that pattern is outside the scope of
 * this minimal starter.
 */
export default function ProtectedPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <main className="page">
        <p className="muted">Loading…</p>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="hero">
        <h1>Protected page</h1>
        <p className="muted">Only signed-in Oxy users can see this.</p>
      </header>
      <div className="card">
        <p>
          Hello <strong>@{user.username}</strong> — you made it past the guard.
        </p>
        <p>
          <Link href="/" className="link">
            ← Back to home
          </Link>
        </p>
        <button
          type="button"
          className="secondary"
          onClick={() => {
            void signOut();
          }}
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
