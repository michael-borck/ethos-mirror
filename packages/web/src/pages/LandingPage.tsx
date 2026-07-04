import { useEffect, useState } from 'react';
import ScreenshotSlider, { type Slide } from '../components/ScreenshotSlider';
import type { Route } from '../App';

const REPO = 'michael-borck/ethos-mirror';
const RELEASES_API = `https://api.github.com/repos/${REPO}/releases/latest`;
const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;

type Platform = 'mac' | 'windows' | 'linux';
const PLATFORM_LABEL: Record<Platform, string> = {
  mac: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
};

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface Release {
  tag_name: string;
  assets: ReleaseAsset[];
}

function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || '').toLowerCase();
  if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os')) return 'mac';
  if (platform.includes('win') || ua.includes('windows')) return 'windows';
  if (ua.includes('linux') || platform.includes('linux')) return 'linux';
  return 'mac';
}

// Tauri release asset conventions: .dmg (mac), -setup.exe / .msi (windows),
// .AppImage (linux).
function assetFor(release: Release | null, platform: Platform): ReleaseAsset | null {
  if (!release) return null;
  const byName = (test: (n: string) => boolean) =>
    release.assets.find((a) => test(a.name.toLowerCase())) ?? null;
  if (platform === 'mac') return byName((n) => n.endsWith('.dmg'));
  if (platform === 'windows')
    return byName((n) => n.endsWith('.exe')) ?? byName((n) => n.endsWith('.msi'));
  return byName((n) => n.endsWith('.appimage')) ?? byName((n) => n.endsWith('.deb'));
}

const SLIDES: Slide[] = [
  {
    src: `${import.meta.env.BASE_URL}screens/repertoire.png`,
    alt: 'Repertoire heat map showing coverage across delivery modes, assessment and feedback practices',
    caption: 'Map your repertoire — coverage, not labels',
  },
  {
    src: `${import.meta.env.BASE_URL}screens/interview.png`,
    alt: 'Scenario interview with free-text prompts about real teaching situations',
    caption: 'Scenario prompts that reveal reasoning, not personality',
  },
  {
    src: `${import.meta.env.BASE_URL}screens/philosophy.png`,
    alt: 'Philosophy statement builder with claims linked to evidence',
    caption: 'A first draft where every claim traces to evidence',
  },
];

export default function LandingPage({ onNavigate }: { onNavigate: (to: Route) => void }) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(() => detectPlatform());
  const [release, setRelease] = useState<Release | null>(null);
  const [releaseChecked, setReleaseChecked] = useState(false);

  useEffect(() => {
    fetch(RELEASES_API)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: Release) => setRelease({ tag_name: data.tag_name, assets: data.assets ?? [] }))
      .catch(() => setRelease(null)) // rate-limited or no release yet
      .finally(() => setReleaseChecked(true));
  }, []);

  const asset = assetFor(release, selectedPlatform);
  const downloadUrl = asset ? asset.browser_download_url : RELEASES_URL;
  const downloadLabel = asset
    ? `Download for ${PLATFORM_LABEL[selectedPlatform]}`
    : releaseChecked && !release
      ? 'Desktop app — coming soon'
      : `Download for ${PLATFORM_LABEL[selectedPlatform]}`;
  const otherPlatforms = (Object.keys(PLATFORM_LABEL) as Platform[]).filter(
    (p) => p !== selectedPlatform,
  );

  return (
    <div className="landing">
      <header className="nav container">
        <div className="logo">🪞 Ethos Mirror</div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#privacy">Privacy</a>
          <a href="#run">Ways to run</a>
          <a
            className="nav-cta"
            href="/app/repertoire"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/app/repertoire');
            }}
          >
            Open the web app
          </a>
        </nav>
      </header>

      <section className="hero container">
        <div className="hero-text">
          <p className="hero-pill">
            <span className="dot" /> A reflection instrument, not a horoscope
          </p>
          <h1>
            Reflect on your practice. Build your <em>philosophy</em>.
          </h1>
          <p className="hero-sub">
            Map your real teaching repertoire, surface tensions between what you value and what you
            do, and turn the evidence into a teaching philosophy statement — for promotion, awards
            and fellowship applications, without the blank page.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => onNavigate('/app/repertoire')}>
              Use in your browser
            </button>
            <a className="btn btn-ghost" href={downloadUrl}>
              {downloadLabel}
            </a>
          </div>
          <div className="download-meta">
            <div className="platform-toggle" role="group" aria-label="Choose platform">
              {(Object.keys(PLATFORM_LABEL) as Platform[]).map((p) => (
                <button
                  key={p}
                  className={`platform-btn${selectedPlatform === p ? ' active' : ''}`}
                  onClick={() => setSelectedPlatform(p)}
                >
                  {PLATFORM_LABEL[p]}
                </button>
              ))}
            </div>
            <span className="hero-note">
              {release ? (
                `Latest release: ${release.tag_name}`
              ) : (
                <a href={RELEASES_URL}>See all releases →</a>
              )}
            </span>
          </div>
          <p className="hero-note">
            Your reflections stay in your browser or on your device — the server stores nothing.
          </p>
        </div>
        <div className="hero-shot">
          <ScreenshotSlider slides={SLIDES} />
        </div>
      </section>

      <section className="steps container">
        <h2>How it works</h2>
        <div className="steps-grid">
          <div className="step">
            <span className="step-n">1</span>
            <h3>Map your repertoire</h3>
            <p>
              A structured self-audit across delivery modes, assessment, feedback, AI stances and
              inclusion. Output is a heat map, not a label — and every cell doubles as a short PD
              explainer.
            </p>
          </div>
          <div className="step">
            <span className="step-n">2</span>
            <h3>Answer scenario prompts</h3>
            <p>
              Seven situations, free-text answers. “A student challenges you mid-lecture — what do
              you do?” reveals more than any Likert scale, and generates quotable raw material.
            </p>
          </div>
          <div className="step">
            <span className="step-n">3</span>
            <h3>Build your philosophy</h3>
            <p>
              A structured first draft — beliefs, enactment, evidence, growth — with every claim
              linked back to its source. Export Markdown for promotion, award or fellowship
              applications.
            </p>
          </div>
        </div>
      </section>

      <section className="features container" id="features">
        <h2>A mirror plus a question, never a verdict</h2>
        <div className="features-grid">
          <div className="card">
            <h3>🗺️ Heat map, not a label</h3>
            <p>
              Frequently used, occasionally used, never tried, tried and set aside — framed
              “recently” and “so far”, never “you are”. No types, archetypes or personas anywhere.
            </p>
          </div>
          <div className="card">
            <h3>📚 Every cell teaches</h3>
            <p>
              Each practice comes with what it is, what it’s genuinely good for, and a low-risk way
              to trial it once — the repertoire map doubles as a PD browser.
            </p>
          </div>
          <div className="card">
            <h3>🗣️ Scenarios, not scales</h3>
            <p>
              Situational prompts reveal reasoning patterns far better than Likert items, and your
              answers become the quotable raw material of the statement.
            </p>
          </div>
          <div className="card">
            <h3>🔗 Claims trace to evidence</h3>
            <p>
              Every claim in the draft links back to a repertoire entry or an interview answer —
              nothing hollow, and AI-invented evidence is rejected automatically.
            </p>
          </div>
          <div className="card">
            <h3>✍️ Works without AI</h3>
            <p>
              No LLM configured? Scaffold mode organises your own words into the four-section
              structure. The app is fully usable offline from any AI service.
            </p>
          </div>
          <div className="card">
            <h3>🧩 Your AI, your choice</h3>
            <p>
              A local Ollama, OpenRouter, OpenAI, or any OpenAI-compatible endpoint — configured
              with three environment variables, or fully local on the desktop app.
            </p>
          </div>
        </div>
      </section>

      <section className="privacy container" id="privacy">
        <h2>Your reflections never touch our servers</h2>
        <p className="privacy-sub">
          Honest reflection needs privacy. Ethos Mirror produces nothing that could be used as a
          performance metric by a third party — and stores nothing anywhere you can’t see.
        </p>
        <div className="privacy-grid">
          <div className="privacy-item">
            <h3>🔒 Lives in your browser</h3>
            <p>
              All reflection data sits in localStorage on your machine. The server is stateless —
              it holds no accounts, no database, no copies.
            </p>
          </div>
          <div className="privacy-item">
            <h3>🏠 Fully local AI option</h3>
            <p>
              Point it at Ollama on your own machine and your material never leaves your computer —
              or self-host for your whole department.
            </p>
          </div>
          <div className="privacy-item">
            <h3>📤 Export under your control</h3>
            <p>
              Download your philosophy draft as Markdown with a full evidence appendix, whenever
              and wherever you choose. Your artefact, your file.
            </p>
          </div>
        </div>
      </section>

      <section className="run container" id="run">
        <h2>Three ways to run it</h2>
        <div className="run-grid">
          <div className="run-card">
            <h3>🌐 In your browser</h3>
            <p>Nothing to install. Your reflections stay in this browser.</p>
            <button className="btn btn-primary" onClick={() => onNavigate('/app/repertoire')}>
              Open the web app
            </button>
          </div>
          <div className="run-card">
            <h3>🖥️ On your desktop</h3>
            <p>A native app for full data governance — bring your own AI key or run local Ollama.</p>
            <a className="btn btn-primary" href={downloadUrl}>
              {asset ? 'Download' : 'Coming soon'}
            </a>
            {release && (
              <p className="run-note">
                Also for{' '}
                {otherPlatforms.map((p, i) => {
                  const a = assetFor(release, p);
                  return (
                    <span key={p}>
                      {i > 0 && ' · '}
                      <a href={a ? a.browser_download_url : RELEASES_URL}>{PLATFORM_LABEL[p]}</a>
                    </span>
                  );
                })}
              </p>
            )}
          </div>
          <div className="run-card">
            <h3>🏢 Self-hosted for your team</h3>
            <p>
              One Docker container, one LLM endpoint in a <code>.env</code> — educators never
              handle keys.
            </p>
            <pre>
              <code>{`git clone https://github.com/${REPO}
cd ethos-mirror && cp .env.example .env
docker compose up -d`}</code>
            </pre>
          </div>
        </div>
      </section>

      <footer className="foot container">
        <p>
          Open source · <a href={`https://github.com/${REPO}`}>GitHub</a> ·{' '}
          <a href={`https://github.com/${REPO}/releases`}>All releases</a> · Grounded in
          Brookfield, Schön and Kolb — not typologies
        </p>
      </footer>
    </div>
  );
}
