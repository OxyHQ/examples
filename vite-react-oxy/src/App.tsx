import { useAuth } from '@oxyhq/auth';

/**
 * Smallest possible Oxy integration: one provider at the root, one hook
 * here, two buttons.
 */
export function App() {
  const { user, isAuthenticated, isLoading, error, signIn, signOut } =
    useAuth();

  return (
    <main className="page">
      <header>
        <h1>Sign in with Oxy</h1>
        <p className="muted">
          Vite + React + <code>@oxyhq/auth</code>.
        </p>
      </header>

      {isLoading ? (
        <Card>
          <p className="muted">Checking your session…</p>
        </Card>
      ) : isAuthenticated && user ? (
        <Card>
          <h2>Signed in as @{user.username}</h2>
          {user.email ? <p className="muted">{user.email}</p> : null}
          <button
            type="button"
            className="secondary"
            onClick={() => {
              void signOut();
            }}
          >
            Sign out
          </button>
        </Card>
      ) : (
        <Card>
          <h2>You're signed out</h2>
          <p className="muted">
            Click below to authenticate via Oxy Accounts.
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
        </Card>
      )}
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <section className="card">{children}</section>;
}
