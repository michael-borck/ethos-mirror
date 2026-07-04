import type {
  BuilderInput,
  DraftSection,
  DraftSectionId,
  EvidenceRef,
  LlmConfig,
  PhilosophyDraft,
} from './types.js';
import { getItem } from './taxonomy.js';
import { getScenario } from './scenarios.js';
import { STATUS_LABELS } from './assemble.js';

interface ChatMessage {
  role: 'system' | 'user';
  content: string;
}

/** Minimal OpenAI-compatible chat completions client (works with Ollama, OpenRouter, OpenAI, …). */
export async function chatComplete(cfg: LlmConfig, messages: ChatMessage[]): Promise<string> {
  const url = `${cfg.baseUrl.replace(/\/$/, '')}/chat/completions`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(cfg.apiKey ? { authorization: `Bearer ${cfg.apiKey}` } : {}),
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      temperature: 0.4,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`LLM request failed (${res.status}): ${body.slice(0, 300)}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error('LLM returned no content');
  return content;
}

const SYSTEM_PROMPT = `You are the drafting engine inside Ethos Mirror, a teaching-reflection tool.
You produce a FIRST DRAFT of a teaching philosophy statement from an educator's own repertoire data and interview answers.

Hard rules:
- Every substantive claim must be traceable to the provided evidence. Never invent practices, anecdotes, or values not present in the material.
- No teacher-type labels ("facilitator", "sage", personas). Vocabulary: repertoire, pattern, coverage, tension, intent.
- Patterns are framed temporally ("recently", "so far"), never as identity ("you are").
- Where stated values and enacted practice diverge, surface the tension neutrally and END IT WITH A QUESTION for the educator; a mismatch may be a constraint, an aspiration, or a deliberate choice.
- Write in first person, plainly, quoting or closely paraphrasing the educator's own words where possible. The educator will rewrite this; give them structure and specifics, not polish.

Respond with ONLY a JSON object, no markdown fences, in exactly this shape:
{"sections":[{"id":"beliefs","title":"...","body":"...","claims":[{"text":"...","evidence":[{"kind":"interview","id":"<promptId>"},{"kind":"repertoire","id":"<itemId>"}]}]}, ... ]}
Sections required, in order, with ids: "beliefs", "enactment", "evidence", "growth".
Each claim's evidence array must only reference ids that appear in the provided material.`;

export function buildDraftUserPrompt(input: BuilderInput): string {
  const lines: string[] = [];
  lines.push('## Repertoire map (recent practice)');
  for (const e of input.entries) {
    const item = getItem(e.itemId);
    if (!item) continue;
    lines.push(`- id=${e.itemId} | ${item.name} | ${STATUS_LABELS[e.status]}${e.note ? ` | note: ${e.note}` : ''}`);
  }
  if (input.entries.length === 0) lines.push('(no repertoire data recorded yet)');
  lines.push('');
  lines.push('## Scenario interview answers');
  for (const a of input.answers) {
    if (!a.text.trim()) continue;
    const s = getScenario(a.promptId);
    lines.push(`### id=${a.promptId} | ${s?.title ?? a.promptId}`);
    lines.push(`Prompt: ${s?.prompt ?? ''}`);
    lines.push(`Answer: ${a.text.trim()}`);
    lines.push('');
  }
  lines.push('Draft the four sections now, as JSON only.');
  return lines.join('\n');
}

const VALID_SECTION_IDS: DraftSectionId[] = ['beliefs', 'enactment', 'evidence', 'growth'];

/** Parse and sanitise the model's JSON, dropping evidence refs that don't exist in the input. */
export function parseDraftResponse(raw: string, input: BuilderInput, model: string): PhilosophyDraft {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object in LLM response');
  const parsed = JSON.parse(text.slice(start, end + 1)) as { sections?: unknown };

  const validRepertoire = new Set(input.entries.map((e) => e.itemId));
  const validInterview = new Set(input.answers.filter((a) => a.text.trim()).map((a) => a.promptId));

  const rawSections = Array.isArray(parsed.sections) ? parsed.sections : [];
  const sections: DraftSection[] = [];
  for (const id of VALID_SECTION_IDS) {
    const found = rawSections.find(
      (s): s is Record<string, unknown> =>
        typeof s === 'object' && s !== null && (s as Record<string, unknown>).id === id,
    );
    if (!found) continue;
    const claimsRaw = Array.isArray(found.claims) ? found.claims : [];
    sections.push({
      id,
      title: typeof found.title === 'string' && found.title.trim() ? found.title : id,
      body: typeof found.body === 'string' ? found.body : '',
      claims: claimsRaw
        .filter((c): c is Record<string, unknown> => typeof c === 'object' && c !== null)
        .map((c) => ({
          text: typeof c.text === 'string' ? c.text : '',
          evidence: (Array.isArray(c.evidence) ? c.evidence : [])
            .filter((r): r is Record<string, unknown> => typeof r === 'object' && r !== null)
            .filter(
              (r) =>
                (r.kind === 'repertoire' && typeof r.id === 'string' && validRepertoire.has(r.id)) ||
                (r.kind === 'interview' && typeof r.id === 'string' && validInterview.has(r.id)),
            )
            .map((r) => ({ kind: r.kind, id: r.id }) as EvidenceRef),
        }))
        .filter((c) => c.text.trim().length > 0),
    });
  }
  if (sections.length === 0) throw new Error('LLM response contained no usable sections');

  return { createdAt: new Date().toISOString(), source: model, sections };
}

/** End-to-end AI draft: prompt → completion → parsed, evidence-checked draft. */
export async function generateDraft(cfg: LlmConfig, input: BuilderInput): Promise<PhilosophyDraft> {
  const raw = await chatComplete(cfg, [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: buildDraftUserPrompt(input) },
  ]);
  return parseDraftResponse(raw, input, cfg.model);
}
