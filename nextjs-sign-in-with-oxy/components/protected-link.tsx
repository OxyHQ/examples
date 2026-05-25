'use client';

import Link from 'next/link';
import { useAuth } from '@oxyhq/auth';

/**
 * Only renders the "Open protected page" link when the user is signed in.
 *
 * The actual `/protected` route itself enforces auth client-side too — this
 * is just so the UI doesn't tempt unauthenticated users.
 */
export function ProtectedLink() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <p>
      <Link href="/protected" className="link">
        Open protected page →
      </Link>
    </p>
  );
}
