import type { BuilderInput, PhilosophyDraft } from '@ethos-mirror/core';

export interface LlmStatus {
  configured: boolean;
  model: string | null;
}

export async function fetchLlmStatus(): Promise<LlmStatus> {
  const res = await fetch('/api/llm/status');
  if (!res.ok) throw new Error('status check failed');
  return (await res.json()) as LlmStatus;
}

export async function requestAiDraft(input: BuilderInput): Promise<PhilosophyDraft> {
  const res = await fetch('/api/philosophy/draft', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (res.status === 503) throw new Error('No LLM is configured on this server.');
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { detail?: string } | null;
    throw new Error(body?.detail ?? `Draft request failed (${res.status})`);
  }
  const json = (await res.json()) as { draft: PhilosophyDraft };
  return json.draft;
}
