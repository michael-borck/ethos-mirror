import type {
  BuilderInput,
  DraftClaim,
  DraftSection,
  InterviewAnswer,
  PhilosophyDraft,
  RepertoireEntry,
  RepertoireStatus,
} from './types.js';
import { getItem } from './taxonomy.js';
import { getScenario } from './scenarios.js';

export const STATUS_LABELS: Record<RepertoireStatus, string> = {
  frequent: 'frequently used (recently)',
  occasional: 'occasionally used (recently)',
  never: 'never tried (so far)',
  abandoned: 'tried and set aside',
};

const SECTION_TITLES: Record<DraftSection['id'], string> = {
  beliefs: 'What I believe about teaching',
  enactment: 'How my practice enacts it',
  evidence: 'Evidence from my practice',
  growth: 'Where I am growing',
};

function byStatus(entries: RepertoireEntry[], status: RepertoireStatus): RepertoireEntry[] {
  return entries.filter((e) => e.status === status);
}

function itemName(itemId: string): string {
  return getItem(itemId)?.name ?? itemId;
}

function answered(answers: InterviewAnswer[]): InterviewAnswer[] {
  return answers.filter((a) => a.text.trim().length > 0);
}

/**
 * Assemble a first-draft scaffold WITHOUT any AI: the educator's own words,
 * organised into the four-section structure with evidence links. Deliberately
 * unfinished — a mirror plus a question, never a verdict.
 */
export function assembleScaffold(input: BuilderInput): PhilosophyDraft {
  const { entries } = input;
  const answers = answered(input.answers);

  const frequent = byStatus(entries, 'frequent');
  const occasional = byStatus(entries, 'occasional');
  const neverTried = byStatus(entries, 'never');
  const abandoned = byStatus(entries, 'abandoned');

  const beliefsClaims: DraftClaim[] = [];
  const beliefSources = ['formative-moment', 'five-years-later', 'proudest-and-redesign'];
  for (const id of beliefSources) {
    const a = answers.find((x) => x.promptId === id);
    if (a) {
      beliefsClaims.push({
        text: `From "${getScenario(id)?.title ?? id}": ${excerpt(a.text)}`,
        evidence: [{ kind: 'interview', id }],
      });
    }
  }

  const enactClaims: DraftClaim[] = frequent.slice(0, 6).map((e) => ({
    text: `${itemName(e.itemId)} is a regular part of my recent practice${e.note ? ` (${e.note})` : ''}.`,
    evidence: [{ kind: 'repertoire', id: e.itemId }],
  }));

  const evidenceClaims: DraftClaim[] = [];
  for (const id of ['misconception-at-scale', 'challenged-mid-lecture', 'ai-to-skeptic']) {
    const a = answers.find((x) => x.promptId === id);
    if (a) {
      evidenceClaims.push({
        text: `Concrete account — "${getScenario(id)?.title ?? id}": ${excerpt(a.text)}`,
        evidence: [{ kind: 'interview', id }],
      });
    }
  }
  for (const e of abandoned.filter((x) => x.note)) {
    evidenceClaims.push({
      text: `I tried ${itemName(e.itemId)} and set it aside: ${e.note}. (Abandonment reasons are evidence of deliberate judgement, not failure.)`,
      evidence: [{ kind: 'repertoire', id: e.itemId }],
    });
  }

  const growthClaims: DraftClaim[] = neverTried.slice(0, 5).map((e) => ({
    text: `${itemName(e.itemId)}: untried so far${e.note ? ` — noted constraint: ${e.note}` : ''}. Is this a gap, an aspiration, or a deliberate choice?`,
    evidence: [{ kind: 'repertoire', id: e.itemId }],
  }));
  const failure = answers.find((x) => x.promptId === 'class-that-failed');
  if (failure) {
    growthClaims.push({
      text: `From "The one that failed": ${excerpt(failure.text)}`,
      evidence: [{ kind: 'interview', id: 'class-that-failed' }],
    });
  }

  const sections: DraftSection[] = [
    {
      id: 'beliefs',
      title: SECTION_TITLES.beliefs,
      body:
        'Draft this section in your own voice from the raw material below. Start from the turning-point story and the five-years-later answer: what do they say you actually value?',
      claims: beliefsClaims,
    },
    {
      id: 'enactment',
      title: SECTION_TITLES.enactment,
      body:
        frequent.length > 0
          ? `Your recent repertoire leans on: ${frequent.map((e) => itemName(e.itemId)).join(', ')}${
              occasional.length > 0
                ? `; with occasional use of ${occasional.map((e) => itemName(e.itemId)).join(', ')}`
                : ''
            }. Connect each belief above to one of these practices — a belief with no enactment is an aspiration, which belongs in the growth section instead.`
          : 'Complete the repertoire map to ground this section in what you actually do.',
      claims: enactClaims,
    },
    {
      id: 'evidence',
      title: SECTION_TITLES.evidence,
      body:
        'Every claim in a strong philosophy statement traces to something concrete. Use these accounts verbatim or nearly so — specific beats polished.',
      claims: evidenceClaims,
    },
    {
      id: 'growth',
      title: SECTION_TITLES.growth,
      body:
        'Gaps are prompts, not deficiencies. For each item below, decide: constraint (name it), deliberate choice (own it), or genuine next step (pick one and plan a low-risk trial).',
      claims: growthClaims,
    },
  ];

  return {
    createdAt: new Date().toISOString(),
    source: 'scaffold',
    sections,
  };
}

function excerpt(text: string, max = 220): string {
  const t = text.trim().replace(/\s+/g, ' ');
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

/** Render a draft (plus its evidence appendix) as a Markdown document. */
export function draftToMarkdown(draft: PhilosophyDraft, input: BuilderInput): string {
  const lines: string[] = [];
  lines.push('# Teaching Philosophy — working draft');
  lines.push('');
  lines.push(
    `> Generated by Ethos Mirror on ${draft.createdAt.slice(0, 10)} (${
      draft.source === 'scaffold' ? 'assembled from your own words, no AI' : `AI-assisted draft, model: ${draft.source}`
    }). This is raw material, not a finished statement: rewrite it in your own voice before using it anywhere that matters.`,
  );
  lines.push('');

  const evidenceIndex = new Map<string, number>();
  const evidenceList: string[] = [];

  const refKey = (kind: string, id: string) => `${kind}:${id}`;
  const refNumber = (kind: 'repertoire' | 'interview', id: string): number => {
    const key = refKey(kind, id);
    const existing = evidenceIndex.get(key);
    if (existing) return existing;
    const n = evidenceIndex.size + 1;
    evidenceIndex.set(key, n);
    if (kind === 'repertoire') {
      const entry = input.entries.find((e) => e.itemId === id);
      const label = getItem(id)?.name ?? id;
      evidenceList.push(
        `[^${n}]: Repertoire — ${label}: ${entry ? STATUS_LABELS[entry.status] : 'no entry'}${
          entry?.note ? `. Note: ${entry.note}` : ''
        }`,
      );
    } else {
      const answer = input.answers.find((a) => a.promptId === id);
      const scenario = getScenario(id);
      evidenceList.push(
        `[^${n}]: Interview — "${scenario?.title ?? id}" (${scenario?.prompt ?? ''}): ${
          answer ? answer.text.trim() : 'no answer'
        }`,
      );
    }
    return n;
  };

  for (const section of draft.sections) {
    lines.push(`## ${section.title}`);
    lines.push('');
    if (section.body.trim()) {
      lines.push(section.body.trim());
      lines.push('');
    }
    for (const claim of section.claims) {
      const marks = claim.evidence.map((r) => `[^${refNumber(r.kind, r.id)}]`).join('');
      lines.push(`- ${claim.text}${marks}`);
    }
    if (section.claims.length > 0) lines.push('');
  }

  if (evidenceList.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push('## Evidence appendix');
    lines.push('');
    lines.push(...evidenceList);
    lines.push('');
  }

  return lines.join('\n');
}
