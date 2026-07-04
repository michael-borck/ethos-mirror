import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { maybeSeedDemo } from './demo';

// Must run before create() below so persist hydrates the seeded data.
maybeSeedDemo();
import type {
  BuilderInput,
  InterviewAnswer,
  LlmConfig,
  PhilosophyDraft,
  RepertoireEntry,
  RepertoireStatus,
} from '@ethos-mirror/core';

interface MirrorState {
  entries: Record<string, RepertoireEntry>;
  answers: Record<string, InterviewAnswer>;
  draft: PhilosophyDraft | null;
  /** Desktop (BYOK) mode only — the web app gets its LLM from the server. */
  llmConfig: LlmConfig | null;
  setLlmConfig: (config: LlmConfig | null) => void;
  setStatus: (itemId: string, status: RepertoireStatus) => void;
  clearStatus: (itemId: string) => void;
  setEntryNote: (itemId: string, note: string) => void;
  setAnswer: (promptId: string, text: string) => void;
  setDraft: (draft: PhilosophyDraft | null) => void;
  updateSectionBody: (sectionId: string, body: string) => void;
  clearAll: () => void;
}

export const useMirrorStore = create<MirrorState>()(
  persist(
    (set) => ({
      entries: {},
      answers: {},
      draft: null,
      llmConfig: null,
      setLlmConfig: (llmConfig) => set({ llmConfig }),
      setStatus: (itemId, status) =>
        set((s) => ({
          entries: {
            ...s.entries,
            [itemId]: {
              itemId,
              status,
              note: s.entries[itemId]?.note,
              updatedAt: new Date().toISOString(),
            },
          },
        })),
      clearStatus: (itemId) =>
        set((s) => {
          const entries = { ...s.entries };
          delete entries[itemId];
          return { entries };
        }),
      setEntryNote: (itemId, note) =>
        set((s) => {
          const existing = s.entries[itemId];
          if (!existing) return s;
          return {
            entries: {
              ...s.entries,
              [itemId]: { ...existing, note: note || undefined, updatedAt: new Date().toISOString() },
            },
          };
        }),
      setAnswer: (promptId, text) =>
        set((s) => ({
          answers: {
            ...s.answers,
            [promptId]: { promptId, text, updatedAt: new Date().toISOString() },
          },
        })),
      setDraft: (draft) => set({ draft }),
      updateSectionBody: (sectionId, body) =>
        set((s) =>
          s.draft
            ? {
                draft: {
                  ...s.draft,
                  sections: s.draft.sections.map((sec) =>
                    sec.id === sectionId ? { ...sec, body } : sec,
                  ),
                },
              }
            : s,
        ),
      clearAll: () => set({ entries: {}, answers: {}, draft: null }),
    }),
    { name: 'ethos-mirror-v1' },
  ),
);

export function builderInput(state: Pick<MirrorState, 'entries' | 'answers'>): BuilderInput {
  return {
    entries: Object.values(state.entries),
    answers: Object.values(state.answers),
  };
}
