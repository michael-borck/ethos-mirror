# Ethos Mirror — agent notes

npm-workspaces monorepo, TypeScript throughout. Sibling of cite-sight (same architecture) and curriculum-curator.

## Commands

```bash
npm run build            # core → server → web (order matters: web/server import core's dist)
npm run build:core       # required before dev:web / dev:server after editing core
npm run dev:server       # tsx watch, :3001
npm run dev:web          # vite, :5173, proxies /api → :3001
npm run typecheck        # all workspaces
```

## Architecture invariants

- `packages/core` is browser-compatible TS with zero runtime deps — no Node APIs. It must stay that way: the Tauri desktop shell runs it directly in the webview (`web/src/desktop.ts` detects Tauri; `api.ts` branches between server calls and direct `generateDraft`).
- Desktop builds on this machine: the repo lives on exFAT, so set `CARGO_TARGET_DIR` to an internal path and clean `._*` files first (`npm run clean:appledouble` — the desktop:* scripts do this automatically).
- The server is stateless: reflection data lives only in browser localStorage (`ethos-mirror-v1`). Do not add server-side persistence of user reflection data — privacy-by-default is a product guardrail, not an implementation detail.
- LLM access is a single OpenAI-compatible code path (`core/src/llm.ts`), configured via `LLM_BASE_URL` / `LLM_MODEL` / `LLM_API_KEY`. No per-provider SDKs.
- Product language rules (enforced in copy and prompts): no teacher types/personas/labels; patterns are "recently"/"so far", never "you are"; tensions end in a question; gaps are prompts with a legitimate-reasons escape hatch. See docs/concept.md.

## Useful details

- `?seed=demo` on any URL seeds localStorage with a realistic sample profile (used for screenshots — see `web/src/demo.ts`).
- Landing screenshots live in `packages/web/public/screens/`; regenerate with headless Chrome against a running production server with `?seed=demo`.
- AI draft responses are parsed and evidence-refs validated in `core/src/llm.ts` (`parseDraftResponse`) — invented evidence ids are dropped.
