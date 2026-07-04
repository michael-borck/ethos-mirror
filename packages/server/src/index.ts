import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import {
  generateDraft,
  type BuilderInput,
  type LlmConfig,
} from '@ethos-mirror/core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: '1mb' }));

function llmConfig(): LlmConfig | null {
  const baseUrl = process.env.LLM_BASE_URL;
  const model = process.env.LLM_MODEL;
  if (!baseUrl || !model) return null;
  return { baseUrl, model, apiKey: process.env.LLM_API_KEY || undefined };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/llm/status', (_req, res) => {
  const cfg = llmConfig();
  res.json({
    configured: cfg !== null,
    model: cfg?.model ?? null,
  });
});

app.post('/api/philosophy/draft', async (req, res) => {
  const cfg = llmConfig();
  if (!cfg) {
    res.status(503).json({ error: 'no_llm_configured' });
    return;
  }
  const body = req.body as Partial<BuilderInput>;
  const input: BuilderInput = {
    entries: Array.isArray(body.entries) ? body.entries : [],
    answers: Array.isArray(body.answers) ? body.answers : [],
  };
  try {
    const draft = await generateDraft(cfg, input);
    res.json({ draft });
  } catch (err) {
    console.error('draft generation failed:', err);
    res.status(502).json({
      error: 'llm_failed',
      detail: err instanceof Error ? err.message : String(err),
    });
  }
});

// In production the built SPA sits alongside the server packages.
const webDistPath = join(__dirname, '..', '..', 'web', 'dist');
if (existsSync(webDistPath)) {
  app.use(express.static(webDistPath));
  app.get('{*path}', (_req, res) => res.sendFile(join(webDistPath, 'index.html')));
}

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  const cfg = llmConfig();
  console.log(`ethos-mirror server on :${port} — LLM ${cfg ? `${cfg.model} via ${cfg.baseUrl}` : 'not configured (scaffold mode)'}`);
});
