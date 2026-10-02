'use client';

import { OxySignInButton, useAuth } from '@oxy.so/services';
import { getNormalizedUserHandle } from '@oxy.so/core';
import { OXY_REDIRECT_URI } from '@/lib/oxy-config';

/** External OAuth/PKCE sign-in starts only from the SDK button's user gesture. */
export function AuthPanel() {
  const { user, isAuthenticated, isLoading, error, signOut } =
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
          Oxy asks for your consent in its authorization window. A blocked popup
          uses the registered return URL instead.
        </p>
        {error ? <p className="error">{error}</p> : null}
        <OxySignInButton oauthRedirectUri={OXY_REDIRECT_URI} />
      </div>
    );
  }

  const displayName = user.name?.displayName || getNormalizedUserHandle(user);

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
