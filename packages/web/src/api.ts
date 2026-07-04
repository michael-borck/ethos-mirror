import { generateDraft, type BuilderInput, type PhilosophyDraft } from '@ethos-mirror/core';
import { isDesktop } from './desktop';
import { useMirrorStore } from './store';

export interface LlmStatus {
  configured: boolean;
  model: string | null;
}

export async function fetchLlmStatus(): Promise<LlmStatus> {
  if (isDesktop) {
    const cfg = useMirrorStore.getState().llmConfig;
    const configured = Boolean(cfg?.baseUrl && cfg?.model);
    return { configured, model: configured ? cfg!.model : null };
  }
  const res = await fetch('/api/llm/status');
  if (!res.ok) throw new Error('status check failed');
  return (await res.json()) as LlmStatus;
}

export async function requestAiDraft(input: BuilderInput): Promise<PhilosophyDraft> {
  if (isDesktop) {
    const cfg = useMirrorStore.getState().llmConfig;
    if (!cfg?.baseUrl || !cfg.model) {
      throw new Error('Configure an AI endpoint in the settings panel first.');
    }
    // Direct call from the webview — reflections and key never leave the device
    // except to the endpoint the educator chose.
    return generateDraft(cfg, input);
  }
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
