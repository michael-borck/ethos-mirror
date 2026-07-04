import type { ScenarioPrompt } from './types.js';

/**
 * Scenario-based interview prompts. Situations and choices, never personality.
 * Free-text answers become quotable raw material for the philosophy statement.
 */
export const SCENARIOS: ScenarioPrompt[] = [
  {
    id: 'challenged-mid-lecture',
    title: 'The challenge',
    prompt:
      'A student challenges your interpretation mid-lecture, in front of everyone. Walk through what you actually do — not what you think you should do.',
    reveals: 'How you handle authority, uncertainty, and public disagreement.',
  },
  {
    id: 'misconception-at-scale',
    title: 'The misconception',
    prompt:
      'You have 50 minutes, 200 students, and a concept that almost everyone gets wrong. What does the session look like, minute by minute if you can?',
    reveals: 'Your instincts about scale, activity, and how understanding is actually built.',
  },
  {
    id: 'proudest-and-redesign',
    title: 'Two assessments',
    prompt:
      'Pick the assessment you are proudest of and the one you would most like to redesign. Describe each, and why it earns its place on that list.',
    reveals: 'What you believe assessment is for, in practice rather than in principle.',
  },
  {
    id: 'formative-moment',
    title: 'The turning point',
    prompt:
      'Describe a moment — as a teacher or as a student — that changed how you teach. What happened, and what changed afterwards?',
    reveals: 'The formative experience behind your current practice; the anecdote every good philosophy statement is built on.',
  },
  {
    id: 'class-that-failed',
    title: 'The one that failed',
    prompt:
      'Tell the story of a session or assessment that went genuinely badly. What did you do in the moment, and what did you change afterwards — or decide not to change?',
    reveals: 'How you reflect on and respond to failure (Schön\'s reflection-on-action, in the wild).',
  },
  {
    id: 'ai-to-skeptic',
    title: 'The AI policy',
    prompt:
      'A skeptical colleague asks you to justify your current stance on student AI use. What do you actually say?',
    reveals: 'The reasoning behind your AI stance, articulated under mild pressure.',
  },
  {
    id: 'five-years-later',
    title: 'Five years later',
    prompt:
      'A student from your unit bumps into you five years from now. What do you hope they say the unit gave them — and what would disappoint you to hear?',
    reveals: 'What you ultimately think your teaching is for.',
  },
];

export function getScenario(id: string): ScenarioPrompt | undefined {
  return SCENARIOS.find((s) => s.id === id);
}
