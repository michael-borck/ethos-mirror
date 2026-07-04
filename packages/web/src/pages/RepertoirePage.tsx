import { useState } from 'react';
import {
  DOMAINS,
  ITEMS,
  itemsByDomain,
  type RepertoireItem,
  type RepertoireStatus,
} from '@ethos-mirror/core';
import { useMirrorStore } from '../store';

const STATUS_OPTIONS: { value: RepertoireStatus; label: string }[] = [
  { value: 'frequent', label: 'Frequently used' },
  { value: 'occasional', label: 'Occasionally used' },
  { value: 'never', label: 'Never tried' },
  { value: 'abandoned', label: 'Tried & set aside' },
];

export default function RepertoirePage() {
  const entries = useMirrorStore((s) => s.entries);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mapped = Object.keys(entries).length;

  return (
    <div className="page">
      <div className="page-intro">
        <h1>Your repertoire, recently</h1>
        <p>
          Not “your style” — your <strong>coverage</strong>. Mark how each practice has featured in
          your recent teaching. Gaps are prompts, not deficiencies: a legitimate reason (class
          size, accreditation, room design) is a first-class answer, and “tried and set aside” with
          a why is reflective gold.
        </p>
        <div className="legend" aria-hidden>
          <span className="legend-item">
            <i className="swatch swatch-frequent" /> frequent
          </span>
          <span className="legend-item">
            <i className="swatch swatch-occasional" /> occasional
          </span>
          <span className="legend-item">
            <i className="swatch swatch-abandoned" /> set aside
          </span>
          <span className="legend-item">
            <i className="swatch swatch-never" /> never tried
          </span>
          <span className="legend-item">
            <i className="swatch swatch-unmapped" /> not mapped yet
          </span>
        </div>
        <p className="progress-note">
          {mapped} of {ITEMS.length} practices mapped so far.
        </p>
      </div>

      {DOMAINS.map((domain) => (
        <section key={domain.id} className="domain">
          <h2>{domain.name}</h2>
          <p className="domain-desc">{domain.description}</p>
          <div className="heat-grid">
            {itemsByDomain(domain.id).map((item) => {
              const entry = entries[item.id];
              const cls = entry ? `cell-${entry.status}` : 'cell-unmapped';
              return (
                <button
                  key={item.id}
                  className={`heat-cell ${cls}${selectedId === item.id ? ' selected' : ''}`}
                  onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          {selectedId && itemsByDomain(domain.id).some((i) => i.id === selectedId) && (
            <ItemDetail item={ITEMS.find((i) => i.id === selectedId)!} />
          )}
        </section>
      ))}
    </div>
  );
}

function ItemDetail({ item }: { item: RepertoireItem }) {
  const entry = useMirrorStore((s) => s.entries[item.id]);
  const setStatus = useMirrorStore((s) => s.setStatus);
  const clearStatus = useMirrorStore((s) => s.clearStatus);
  const setEntryNote = useMirrorStore((s) => s.setEntryNote);

  return (
    <div className="item-detail">
      <h3>{item.name}</h3>
      <p>{item.explainer}</p>
      <p>
        <strong>Good for:</strong> {item.goodFor}
      </p>
      <fieldset className="status-picker">
        <legend>In your recent practice, this has been…</legend>
        {STATUS_OPTIONS.map((opt) => (
          <label key={opt.value} className={entry?.status === opt.value ? 'checked' : ''}>
            <input
              type="radio"
              name={`status-${item.id}`}
              checked={entry?.status === opt.value}
              onChange={() => setStatus(item.id, opt.value)}
            />
            {opt.label}
          </label>
        ))}
        {entry && (
          <button className="link-btn" onClick={() => clearStatus(item.id)}>
            clear
          </button>
        )}
      </fieldset>
      {entry && (
        <label className="note-field">
          {entry.status === 'abandoned'
            ? 'Why did you set it aside? (Abandonment reasons are evidence of judgement.)'
            : 'Context or constraint worth recording (optional):'}
          <textarea
            rows={2}
            value={entry.note ?? ''}
            onChange={(e) => setEntryNote(item.id, e.target.value)}
            placeholder={
              entry.status === 'abandoned'
                ? 'e.g. tried peer assessment in 2024; marking moderation load doubled and students distrusted the marks'
                : 'e.g. 2-hour lecture slot, 400 students, accreditation requires a written exam'
            }
          />
        </label>
      )}
      {(!entry || entry.status === 'never') && (
        <p className="trial-tip">
          <strong>A low-risk way to try it:</strong> {item.lowRiskTrial}
        </p>
      )}
    </div>
  );
}
