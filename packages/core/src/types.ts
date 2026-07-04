/** How often an item has featured in the educator's recent practice. */
export type RepertoireStatus = 'frequent' | 'occasional' | 'never' | 'abandoned';

export interface RepertoireDomain {
  id: string;
  name: string;
  description: string;
}

export interface RepertoireItem {
  id: string;
  domainId: string;
  name: string;
  /** What this practice is, in two or three plain sentences. */
  explainer: string;
  /** The situations this practice is genuinely good for. */
  goodFor: string;
  /** A low-risk way to trial it once. */
  lowRiskTrial: string;
}

export interface RepertoireEntry {
  itemId: string;
  status: RepertoireStatus;
  /**
   * Free text attached to the status. For 'abandoned' this is the "why"
   * (reflective gold); for any status it can record a constraint
   * ("2h lecture slot, 400 students") so a gap reads as context, not deficit.
   */
  note?: string;
  updatedAt: string;
}

export interface ScenarioPrompt {
  id: string;
  title: string;
  prompt: string;
  /** What this prompt tends to reveal — shown to the educator, never hidden scoring. */
  reveals: string;
}

export interface InterviewAnswer {
  promptId: string;
  text: string;
  updatedAt: string;
}

/** A pointer from a claim in the draft back to its source material. */
export interface EvidenceRef {
  kind: 'repertoire' | 'interview';
  id: string; // itemId or promptId
}

export interface DraftClaim {
  text: string;
  evidence: EvidenceRef[];
}

export type DraftSectionId = 'beliefs' | 'enactment' | 'evidence' | 'growth';

export interface DraftSection {
  id: DraftSectionId;
  title: string;
  body: string;
  claims: DraftClaim[];
}

export interface PhilosophyDraft {
  createdAt: string;
  /** 'scaffold' when assembled without AI; otherwise the model name used. */
  source: string;
  sections: DraftSection[];
}

/** Everything the builder needs, gathered from the browser store. */
export interface BuilderInput {
  entries: RepertoireEntry[];
  answers: InterviewAnswer[];
}

export interface LlmConfig {
  baseUrl: string;
  model: string;
  apiKey?: string;
}
