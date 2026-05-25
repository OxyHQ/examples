'use client';

import { useAuth } from '@oxyhq/auth';

/**
 * Renders the Oxy sign-in button when signed out, or the current user's
 * profile + sign-out button when signed in.
 *
 * `useAuth` returns the live auth state from `WebOxyProvider`. Default
 * `signIn()` picks the best available method (FedCM → popup → redirect)
 * based on browser support.
 */
export function AuthPanel() {
  const { user, isAuthenticated, isLoading, error, signIn, signOut } =
    useAuth();

  if (isLoading) {
    return (
      <div className="card">
        <p className="muted">Checking your session…</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="card">
        <h2>Sign in with Oxy</h2>
        <p className="muted">
          You'll be redirected to Oxy Accounts to authenticate, then sent back
          here.
        </p>
        {error ? <p className="error">{error}</p> : null}
        <button
          type="button"
          className="primary"
          onClick={() => {
            void signIn();
          }}
        >
          Sign in with Oxy
        </button>
      </div>
    );
  }

  const displayName =
    user.name?.full ||
    [user.name?.first, user.name?.last].filter(Boolean).join(' ').trim() ||
    user.username ||
    user.email ||
    'Oxy user';

  return (
    <div className="card">
      <h2>Welcome, {displayName}</h2>
      <dl className="user-meta">
        {user.username ? (
          <>
            <dt>Username</dt>
            <dd>@{user.username}</dd>
          </>
        ) : null}
        {user.email ? (
          <>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </>
        ) : null}
        <dt>User ID</dt>
        <dd className="mono">{user.id}</dd>
      </dl>
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
  );
}
