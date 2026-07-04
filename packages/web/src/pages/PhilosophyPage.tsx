import { useEffect, useState } from 'react';
import {
  assembleScaffold,
  draftToMarkdown,
  getItem,
  getScenario,
  ITEMS,
  SCENARIOS,
  STATUS_LABELS,
  type EvidenceRef,
} from '@ethos-mirror/core';
import { builderInput, useMirrorStore } from '../store';
import { fetchLlmStatus, requestAiDraft, type LlmStatus } from '../api';

export default function PhilosophyPage() {
  const entries = useMirrorStore((s) => s.entries);
  const answers = useMirrorStore((s) => s.answers);
  const draft = useMirrorStore((s) => s.draft);
  const setDraft = useMirrorStore((s) => s.setDraft);
  const updateSectionBody = useMirrorStore((s) => s.updateSectionBody);

  const [llm, setLlm] = useState<LlmStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLlmStatus()
      .then(setLlm)
      .catch(() => setLlm({ configured: false, model: null }));
  }, []);

  const input = builderInput({ entries, answers });
  const mappedCount = input.entries.length;
  const answeredCount = input.answers.filter((a) => a.text.trim()).length;
  const enoughMaterial = mappedCount >= 3 || answeredCount >= 2;

  const buildScaffold = () => {
    setError(null);
    setDraft(assembleScaffold(input));
  };

  const buildAiDraft = async () => {
    setError(null);
    setBusy(true);
    try {
      setDraft(await requestAiDraft(input));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!draft) return;
    const md = draftToMarkdown(draft, input);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teaching-philosophy-draft.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page page-narrow">
      <div className="page-intro">
        <h1>Philosophy statement builder</h1>
        <p>
          A first draft grounded in your evidence — never a blank page, never a verdict. Every
          claim links back to a repertoire entry or an interview answer, so nothing in the
          statement is hollow.
        </p>
      </div>

      <section className="builder-status">
        <div className="status-row">
          <span className="stat">
            <strong>{mappedCount}</strong> / {ITEMS.length} repertoire items mapped
          </span>
          <span className="stat">
            <strong>{answeredCount}</strong> / {SCENARIOS.length} interview prompts answered
          </span>
          <span className={`stat llm-badge ${llm?.configured ? 'on' : 'off'}`}>
            {llm === null
              ? 'Checking AI availability…'
              : llm.configured
                ? `AI drafting available (${llm.model})`
                : 'No AI configured — scaffold mode'}
          </span>
        </div>
        {!enoughMaterial && (
          <p className="hint">
            The builder works best with some material to mirror: map a few repertoire items and
            answer two or three interview prompts first.
          </p>
        )}
        <div className="builder-actions">
          <button
            className="btn btn-primary"
            onClick={buildAiDraft}
            disabled={!llm?.configured || busy || !enoughMaterial}
          >
            {busy ? 'Drafting…' : 'Generate AI first draft'}
          </button>
          <button className="btn btn-secondary" onClick={buildScaffold} disabled={!enoughMaterial}>
            Assemble scaffold (no AI)
          </button>
          {draft && (
            <button className="btn btn-secondary" onClick={download}>
              Download Markdown
            </button>
          )}
        </div>
        {error && <p className="error">{error}</p>}
      </section>

      {draft && (
        <>
          <p className="authenticity-note">
            {draft.source === 'scaffold'
              ? 'This scaffold is assembled entirely from your own words — organise and expand it.'
              : `Drafted with ${draft.source} from your material only. Rewrite it in your own voice before using it in a promotion or fellowship application: assessors increasingly screen for AI-written statements, and authenticity is the point.`}
          </p>
          {draft.sections.map((section) => (
            <section key={section.id} className="draft-section">
              <h2>{section.title}</h2>
              <textarea
                rows={Math.max(4, Math.ceil(section.body.length / 90))}
                value={section.body}
                onChange={(e) => updateSectionBody(section.id, e.target.value)}
              />
              {section.claims.length > 0 && (
                <ul className="claims">
                  {section.claims.map((claim, i) => (
                    <li key={i}>
                      {claim.text}
                      <span className="evidence-chips">
                        {claim.evidence.map((ref, j) => (
                          <EvidenceChip key={j} refr={ref} />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      )}
    </div>
  );
}

function EvidenceChip({ refr }: { refr: EvidenceRef }) {
  const entries = useMirrorStore((s) => s.entries);
  const answers = useMirrorStore((s) => s.answers);

  let label: string;
  let tooltip: string;
  if (refr.kind === 'repertoire') {
    const item = getItem(refr.id);
    const entry = entries[refr.id];
    label = item?.name ?? refr.id;
    tooltip = entry ? `Repertoire: ${label} — ${STATUS_LABELS[entry.status]}${entry.note ? `. ${entry.note}` : ''}` : `Repertoire: ${label}`;
  } else {
    const scenario = getScenario(refr.id);
    const answer = answers[refr.id];
    label = scenario?.title ?? refr.id;
    tooltip = answer ? `Interview — ${label}: ${answer.text}` : `Interview — ${label}`;
  }
  return (
    <span className={`chip chip-${refr.kind}`} title={tooltip}>
      {refr.kind === 'repertoire' ? '▦' : '✎'} {label}
    </span>
  );
}
