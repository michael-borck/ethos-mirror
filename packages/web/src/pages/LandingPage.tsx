import ScreenshotSlider, { type Slide } from '../components/ScreenshotSlider';
import type { Route } from '../App';

const SLIDES: Slide[] = [
  {
    src: '/screens/repertoire.png',
    alt: 'Repertoire heat map showing coverage across delivery modes, assessment and feedback practices',
    caption: 'Map your repertoire — coverage, not labels',
  },
  {
    src: '/screens/interview.png',
    alt: 'Scenario interview with free-text prompts about real teaching situations',
    caption: 'Scenario prompts that reveal reasoning, not personality',
  },
  {
    src: '/screens/philosophy.png',
    alt: 'Philosophy statement builder with claims linked to evidence',
    caption: 'A first draft where every claim traces to evidence',
  },
];

const STEPS = [
  {
    title: 'Map your repertoire',
    text: 'A structured self-audit across delivery modes, assessment, feedback, AI stances and inclusion. Output is a heat map, not a label — and every cell doubles as a short PD explainer.',
  },
  {
    title: 'Answer scenario prompts',
    text: 'Seven situations, free-text answers. “A student challenges you mid-lecture — what do you do?” reveals more than any Likert scale, and generates quotable raw material.',
  },
  {
    title: 'Build your philosophy',
    text: 'A structured first draft — beliefs, enactment, evidence, growth — with every claim linked back to its source. Export to Markdown for promotion, award or fellowship applications.',
  },
];

const PRINCIPLES = [
  {
    title: 'A mirror plus a question, never a verdict',
    text: '“Here is the pattern in your recent practice — does it match your intent?” The tool never says “you are X”.',
  },
  {
    title: 'No types, no archetypes, no personas',
    text: 'Teacher-style typologies are learning styles for teachers: weak evidence and permission slips to avoid unfamiliar methods. The vocabulary here is repertoire, coverage, pattern, tension, intent.',
  },
  {
    title: 'Gaps are prompts, not deficiencies',
    text: 'Every gap comes with what the practice is good for and a low-risk way to trial it — plus a first-class escape hatch, because constraints and deliberate choices are legitimate answers.',
  },
  {
    title: 'Private by default',
    text: 'Reflection data lives in your browser, never on the server. Bring your own LLM (Ollama, OpenRouter, anything OpenAI-compatible) — or use none and build from a scaffold of your own words.',
  },
];

export default function LandingPage({ onNavigate }: { onNavigate: (to: Route) => void }) {
  return (
    <div className="landing">
      <header className="landing-header">
        <span className="brand">
          <span className="brand-mark" aria-hidden>
            ◠
          </span>
          Ethos Mirror
        </span>
        <nav>
          <a href="#how">How it works</a>
          <a href="#principles">Principles</a>
          <a href="https://github.com/michael-borck/ethos-mirror">GitHub</a>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('/app/repertoire')}>
            Open the mirror
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="hero-pill">
              <span className="hero-pill-dot" /> A reflection instrument, not a horoscope
            </span>
            <h1 className="hero-heading">
              Reflect on your practice. Build your <em>philosophy</em>.
            </h1>
            <p className="hero-sub">
              Ethos Mirror maps your real teaching repertoire, surfaces tensions between what you
              value and what you do, and turns the evidence into a teaching philosophy statement —
              for promotion, awards and fellowship applications, without the blank page.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={() => onNavigate('/app/repertoire')}>
                Start reflecting
              </button>
              <a className="btn btn-secondary" href="#how">
                See how it works
              </a>
            </div>
            <p className="hero-note">
              Free &amp; open source · Data stays in your browser · Works with your own LLM, or none
            </p>
          </div>
          <ScreenshotSlider slides={SLIDES} />
        </div>
      </section>

      <section className="section" id="how">
        <h2>How it works</h2>
        <div className="steps">
          {STEPS.map((step, i) => (
            <div key={step.title} className="step-card">
              <span className="step-num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-alt" id="principles">
        <h2>Not another teaching-style quiz</h2>
        <p className="section-lede">
          Tools that output “you are a Facilitator type” are learning styles for teachers. Ethos
          Mirror inverts the framing — from identity to repertoire and reasoning.
        </p>
        <div className="principles">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="principle-card">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section cta-section">
        <h2>Your next promotion case starts with evidence</h2>
        <p className="section-lede">
          Ten minutes of honest mapping beats a weekend staring at a blank philosophy statement.
        </p>
        <button className="btn btn-primary" onClick={() => onNavigate('/app/repertoire')}>
          Open the mirror
        </button>
      </section>

      <footer className="landing-footer">
        <span>
          MIT licensed ·{' '}
          <a href="https://github.com/michael-borck/ethos-mirror">michael-borck/ethos-mirror</a>
        </span>
        <span>
          Grounded in Brookfield’s lenses, Schön’s reflection-on-action and Kolb’s cycle — not
          typologies.
        </span>
      </footer>
    </div>
  );
}
