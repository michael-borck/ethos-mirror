import { SCENARIOS } from '@ethos-mirror/core';
import { useMirrorStore } from '../store';

export default function InterviewPage() {
  const answers = useMirrorStore((s) => s.answers);
  const setAnswer = useMirrorStore((s) => s.setAnswer);

  const answeredCount = SCENARIOS.filter((s) => answers[s.id]?.text.trim()).length;

  return (
    <div className="page page-narrow">
      <div className="page-intro">
        <h1>Scenario interview</h1>
        <p>
          Situations and choices, not personality. Answer in plain, specific language — these
          answers become the quotable raw material of your philosophy statement, so a concrete
          story beats a polished abstraction every time. Answer as many as you like, in any order.
        </p>
        <p className="progress-note">
          {answeredCount} of {SCENARIOS.length} answered so far. Saved automatically, only in this
          browser.
        </p>
      </div>

      {SCENARIOS.map((scenario, i) => (
        <section key={scenario.id} className="scenario-card">
          <h2>
            <span className="scenario-num">{i + 1}</span> {scenario.title}
          </h2>
          <p className="scenario-prompt">{scenario.prompt}</p>
          <p className="scenario-reveals">What this tends to reveal: {scenario.reveals}</p>
          <textarea
            rows={6}
            value={answers[scenario.id]?.text ?? ''}
            onChange={(e) => setAnswer(scenario.id, e.target.value)}
            placeholder="Write what you actually do or did — specifics, not principles."
          />
        </section>
      ))}
    </div>
  );
}
