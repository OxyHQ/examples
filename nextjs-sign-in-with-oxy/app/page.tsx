import { AuthPanel } from '@/components/auth-panel';
import { ProtectedLink } from '@/components/protected-link';

export default function HomePage() {
  return (
    <main className="page">
      <header className="hero">
        <h1>Sign in with Oxy</h1>
        <p className="muted">
          Next.js 15 + App Router + <code>@oxyhq/auth</code>.
        </p>
      </header>
      <AuthPanel />
      <ProtectedLink />
      <footer className="muted">
        Replace <code>NEXT_PUBLIC_OXY_API_URL</code> in <code>.env</code> to
        point at your own Oxy API.
      </footer>
    </main>
  );
}
