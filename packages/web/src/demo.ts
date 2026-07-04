import { assembleScaffold, type BuilderInput } from '@ethos-mirror/core';

/**
 * Visiting any page with ?seed=demo replaces stored data with a realistic
 * sample profile. Used for screenshots and demos; must be imported before the
 * store module so localStorage is populated before zustand-persist reads it.
 */
export function maybeSeedDemo(): void {
  if (!new URLSearchParams(window.location.search).has('seed')) return;

  const now = new Date().toISOString();
  const entry = (itemId: string, status: string, note?: string) => ({
    itemId,
    status,
    note,
    updatedAt: now,
  });
  const answer = (promptId: string, text: string) => ({ promptId, text, updatedAt: now });

  const entries = {
    lecture: entry('lecture', 'frequent', '2-hour slots, cohort of 220'),
    workshop: entry('workshop', 'frequent'),
    'lab-practical': entry('lab-practical', 'frequent'),
    'case-discussion': entry('case-discussion', 'occasional'),
    'peer-instruction': entry('peer-instruction', 'occasional'),
    flipped: entry(
      'flipped',
      'abandoned',
      'Tried in 2024; pre-class completion sat under 30% and sessions stalled. Would retry with entry quizzes.',
    ),
    jigsaw: entry('jigsaw', 'never'),
    socratic: entry('socratic', 'never'),
    exam: entry('exam', 'frequent', 'Accreditation requires an invigilated component'),
    'authentic-project': entry('authentic-project', 'frequent'),
    portfolio: entry('portfolio', 'occasional'),
    'peer-assessment': entry('peer-assessment', 'never'),
    'written-feedback': entry('written-feedback', 'frequent'),
    'rubric-feedback': entry('rubric-feedback', 'frequent'),
    'audio-feedback': entry('audio-feedback', 'never'),
    'ai-acknowledged': entry('ai-acknowledged', 'frequent'),
    'ai-required': entry('ai-required', 'occasional'),
    accessibility: entry('accessibility', 'frequent'),
    udl: entry('udl', 'occasional'),
  };

  const answers = {
    'challenged-mid-lecture': answer(
      'challenged-mid-lecture',
      'First instinct is to thank them, honestly. I ask them to unpack the objection, put it to the room, and if I am wrong I say so and fix the slide live. The worst thing I can model is an expert who cannot be questioned.',
    ),
    'misconception-at-scale': answer(
      'misconception-at-scale',
      'Concept question up front, everyone votes, and the vote is always wrong in the same revealing way. Two minutes to convince your neighbour, revote, then I work the correct reasoning from a student explanation rather than my own.',
    ),
    'formative-moment': answer(
      'formative-moment',
      'A second-year told me in week 11 that she had understood nothing since week 3 but was too embarrassed to say. Everything I do about low-stakes checking dates from that conversation.',
    ),
    'five-years-later': answer(
      'five-years-later',
      'I hope they say the unit taught them how to find out, not what to memorise. It would disappoint me to hear it was easy.',
    ),
  };

  const input: BuilderInput = {
    entries: Object.values(entries) as BuilderInput['entries'],
    answers: Object.values(answers),
  };

  localStorage.setItem(
    'ethos-mirror-v1',
    JSON.stringify({
      state: { entries, answers, draft: assembleScaffold(input) },
      version: 0,
    }),
  );
}
