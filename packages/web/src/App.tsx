import { useCallback, useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import RepertoirePage from './pages/RepertoirePage';
import InterviewPage from './pages/InterviewPage';
import PhilosophyPage from './pages/PhilosophyPage';

export type Route = '/' | '/app/repertoire' | '/app/interview' | '/app/philosophy';

const APP_TABS: { route: Route; label: string }[] = [
  { route: '/app/repertoire', label: 'Repertoire' },
  { route: '/app/interview', label: 'Interview' },
  { route: '/app/philosophy', label: 'Philosophy' },
];

function normalise(path: string): Route {
  if (path.startsWith('/app/interview')) return '/app/interview';
  if (path.startsWith('/app/philosophy')) return '/app/philosophy';
  if (path.startsWith('/app')) return '/app/repertoire';
  return '/';
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => normalise(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(normalise(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: Route) => {
    window.history.pushState(null, '', to);
    setRoute(to);
    window.scrollTo(0, 0);
  }, []);

  if (route === '/') return <LandingPage onNavigate={navigate} />;

  return (
    <div className="app-shell">
      <header className="app-header">
        <button className="brand" onClick={() => navigate('/')}>
          <span className="brand-mark" aria-hidden>
            ◠
          </span>
          Ethos Mirror
        </button>
        <nav className="app-tabs" aria-label="App sections">
          {APP_TABS.map((t) => (
            <button
              key={t.route}
              className={`app-tab${route === t.route ? ' active' : ''}`}
              onClick={() => navigate(t.route)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="app-main">
        {route === '/app/repertoire' && <RepertoirePage />}
        {route === '/app/interview' && <InterviewPage />}
        {route === '/app/philosophy' && <PhilosophyPage />}
      </main>
      <footer className="app-footer">
        Your reflection data lives only in this browser (localStorage). Nothing is stored on the
        server.
      </footer>
    </div>
  );
}
