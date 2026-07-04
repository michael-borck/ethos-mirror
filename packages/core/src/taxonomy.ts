import type { RepertoireDomain, RepertoireItem } from './types.js';

export const DOMAINS: RepertoireDomain[] = [
  {
    id: 'delivery',
    name: 'Delivery modes',
    description: 'How learning activity is structured when you are in the room (or the virtual one).',
  },
  {
    id: 'assessment',
    name: 'Assessment types',
    description: 'How students demonstrate learning and how judgements are made.',
  },
  {
    id: 'feedback',
    name: 'Feedback practices',
    description: 'How information about performance gets back to students in a usable form.',
  },
  {
    id: 'ai',
    name: 'AI-integration stances',
    description: 'The positions you have actually taken on student AI use, per task or unit.',
  },
  {
    id: 'inclusion',
    name: 'Inclusion practices',
    description: 'Habits that widen who can access and succeed in your teaching.',
  },
];

export const ITEMS: RepertoireItem[] = [
  // ── Delivery modes ─────────────────────────────────────────────────────────
  {
    id: 'lecture',
    domainId: 'delivery',
    name: 'Lecture',
    explainer:
      'Structured expert exposition to a group. Still the workhorse of higher education, and unfairly maligned: a well-built lecture models expert thinking in a way few other formats can.',
    goodFor:
      'Introducing a framework quickly, telling the story of a field, modelling how an expert reasons through a messy problem.',
    lowRiskTrial:
      'If you rarely lecture, try a 15-minute mini-lecture inside a workshop: one concept, one worked example, one provocation.',
  },
  {
    id: 'jigsaw',
    domainId: 'delivery',
    name: 'Jigsaw',
    explainer:
      'Students split into "expert" groups that each master one slice of material, then regroup so every new group contains one expert per slice and members teach each other.',
    goodFor:
      'Content that partitions cleanly, building interdependence, getting every student to speak in a low-stakes setting.',
    lowRiskTrial:
      'Run one jigsaw round on a single reading in one tutorial: four slices, four experts per home group, 30 minutes.',
  },
  {
    id: 'flipped',
    domainId: 'delivery',
    name: 'Flipped classroom',
    explainer:
      'First contact with content happens before class (video, reading, quiz); class time goes to application, problems, and discussion where the expert is actually useful.',
    goodFor:
      'Procedural subjects where practice with support beats exposition, cohorts with wildly mixed prior knowledge.',
    lowRiskTrial:
      'Flip one week only: a 10-minute video plus a three-question entry quiz, then spend the session entirely on problems.',
  },
  {
    id: 'case-discussion',
    domainId: 'delivery',
    name: 'Case discussion',
    explainer:
      'A rich, specific, usually real scenario is analysed collectively. The teacher facilitates rather than resolves: the mess is the point.',
    goodFor:
      'Judgement under ambiguity, connecting theory to practice, disciplines where reasonable experts disagree.',
    lowRiskTrial:
      'Take one news story from your field this month and run a 20-minute structured discussion: what happened, what would you have done, what principle decides it?',
  },
  {
    id: 'role-play',
    domainId: 'delivery',
    name: 'Role-play / simulation',
    explainer:
      'Students act inside a scenario — a negotiation, a consultation, an incident response — and then debrief. The debrief carries most of the learning.',
    goodFor:
      'Skills with an interpersonal or time-pressure component, perspective-taking, making abstract stakes feel real.',
    lowRiskTrial:
      'Pair role-play, two minutes each way, on one realistic conversation from your field, followed by a five-minute whole-class debrief.',
  },
  {
    id: 'lab-practical',
    domainId: 'delivery',
    name: 'Lab / practical',
    explainer:
      'Hands-on work with real equipment, materials, or codebases under supervision. Where knowing-that becomes knowing-how.',
    goodFor:
      'Skill acquisition, tacit knowledge, letting students meet reality (which is messier than the textbook).',
    lowRiskTrial:
      'Convert one tutorial exercise into a hands-on task with real tools, even if scaled down to a toy dataset or bench demo.',
  },
  {
    id: 'socratic',
    domainId: 'delivery',
    name: 'Socratic seminar',
    explainer:
      'Sustained questioning of student reasoning — the teacher mostly asks, rarely tells, and follows the argument where it goes.',
    goodFor:
      'Surfacing hidden assumptions, teaching students to defend and revise positions, small-group critical disciplines.',
    lowRiskTrial:
      'Pick one claim students tend to accept uncritically and spend ten minutes only asking questions about it. No statements allowed (from you).',
  },
  {
    id: 'peer-instruction',
    domainId: 'delivery',
    name: 'Peer instruction',
    explainer:
      'Concept question → individual vote → convince your neighbour → revote → resolution. Mazur\'s format, devastatingly effective for misconception-heavy topics.',
    goodFor:
      'Large classes, concepts everyone thinks they understand but do not, making thinking visible at scale.',
    lowRiskTrial:
      'One concept question with a show of hands (or free polling tool), two minutes of neighbour argument, revote. Ten minutes total.',
  },
  {
    id: 'studio',
    domainId: 'delivery',
    name: 'Studio',
    explainer:
      'Students work on individual or group projects in a shared space while the teacher circulates, critiques, and convenes ad-hoc mini-lessons. The default in design; underused elsewhere.',
    goodFor:
      'Extended creative or constructive work, normalising critique, teaching taste and judgement rather than procedure.',
    lowRiskTrial:
      'Turn one session into open work time on the current assignment with you circulating — plus one five-minute pause where you critique a volunteer\'s work-in-progress publicly and kindly.',
  },
  {
    id: 'workshop',
    domainId: 'delivery',
    name: 'Workshop',
    explainer:
      'Short instruction bursts interleaved with structured hands-on activity, usually producing a concrete artefact by the end of the session.',
    goodFor:
      'Tool and method teaching, cohorts who learn by doing, sessions that must deliver a tangible outcome.',
    lowRiskTrial:
      'Restructure one lecture as 3 × (8 minutes of input + 12 minutes of guided task) with a shareable artefact at the end.',
  },

  // ── Assessment types ───────────────────────────────────────────────────────
  {
    id: 'exam',
    domainId: 'assessment',
    name: 'Exam',
    explainer:
      'Timed, controlled-conditions assessment. High reliability and logistical familiarity; validity depends entirely on what the questions actually ask.',
    goodFor:
      'Verifying individual mastery at scale, accreditation requirements, content where fluency-under-constraint genuinely matters.',
    lowRiskTrial:
      'If exams are your default, the trial runs the other way: replace 20% of one exam with an applied section written against a scenario students have not seen.',
  },
  {
    id: 'essay',
    domainId: 'assessment',
    name: 'Essay',
    explainer:
      'Extended written argument. Assesses synthesis, structure, and voice — and is squarely in the blast radius of generative AI, which changes how it must be designed.',
    goodFor:
      'Disciplines where the argument is the skill, assessing depth of engagement with sources and ideas.',
    lowRiskTrial:
      'Add a 10-minute viva-style conversation about one submitted essay per student, or an in-class annotated-outline stage before submission.',
  },
  {
    id: 'portfolio',
    domainId: 'assessment',
    name: 'Portfolio',
    explainer:
      'A curated collection of work plus reflective commentary, built over time. Assesses growth and judgement about one\'s own work, not just endpoints.',
    goodFor:
      'Skill development across a semester, creative and professional disciplines, making progress visible to the student themselves.',
    lowRiskTrial:
      'Ask for three artefacts plus one page of "what changed between these" commentary as a small percentage of one unit.',
  },
  {
    id: 'viva',
    domainId: 'assessment',
    name: 'Viva / oral assessment',
    explainer:
      'Assessment by structured conversation. Hard to fake, quick to reveal depth, and increasingly attractive as written work becomes automatable.',
    goodFor:
      'Verifying authorship and understanding, professional disciplines where talking is the job, small cohorts (or sampling within large ones).',
    lowRiskTrial:
      'Attach a five-minute "defend one decision you made" conversation to an existing project assessment, sampled or for all.',
  },
  {
    id: 'authentic-project',
    domainId: 'assessment',
    name: 'Authentic project',
    explainer:
      'Assessment task mirroring real professional work — real client, real dataset, real constraints, or as close as feasible. Validity is the headline; consistency takes more design work.',
    goodFor:
      'Employability narratives, motivation, assessing the messy integration of skills that real work demands.',
    lowRiskTrial:
      'Reframe one existing assignment around a real artefact from practice (a genuine dataset, brief, or codebase) without changing the marking scheme yet.',
  },
  {
    id: 'peer-assessment',
    domainId: 'assessment',
    name: 'Peer assessment',
    explainer:
      'Students judge each other\'s work against criteria. The learning mostly accrues to the assessor: applying a rubric teaches the standard better than reading one.',
    goodFor:
      'Teaching evaluative judgement, scaling formative feedback, group-work contribution visibility.',
    lowRiskTrial:
      'One formative round: students apply your rubric to two anonymised past submissions, then compare with your marks and discuss the gaps.',
  },
  {
    id: 'self-assessment',
    domainId: 'assessment',
    name: 'Self-assessment',
    explainer:
      'Students judge their own work against criteria before (or alongside) the teacher\'s judgement. The foundational skill of every autonomous professional.',
    goodFor:
      'Developing calibration and metacognition, making rubrics actually get read, shifting feedback conversations from grades to gaps.',
    lowRiskTrial:
      'Require a completed self-marked rubric with one submission; give brief feedback on the calibration, not just the work.',
  },
  {
    id: 'process-assessment',
    domainId: 'assessment',
    name: 'Process / signal-based assessment',
    explainer:
      'Assessing the trail of work — drafts, commits, lab notebooks, decision logs — rather than only the final artefact. Rewards how the work was done and resists outsourcing.',
    goodFor:
      'AI-era academic integrity by design, valuing iteration, disciplines where process quality predicts professional quality.',
    lowRiskTrial:
      'Make 10% of one project\'s mark a short "decision log": three dated entries on what changed and why, submitted with the artefact.',
  },

  // ── Feedback practices ─────────────────────────────────────────────────────
  {
    id: 'written-feedback',
    domainId: 'feedback',
    name: 'Written comments',
    explainer:
      'The default. Permanent and referenceable, but slow to produce and often read once (or never — collection rates are humbling).',
    goodFor:
      'Precise, quotable guidance on written work; feedback the student needs to act on over time.',
    lowRiskTrial:
      'If written is all you do, trial replacing one round with another channel below and compare student response.',
  },
  {
    id: 'audio-feedback',
    domainId: 'feedback',
    name: 'Audio / video feedback',
    explainer:
      'Recorded spoken comments on student work. Faster per word than typing, and tone survives — students consistently report it feels more personal and more actionable.',
    goodFor:
      'Nuanced feedback on extended work, conveying encouragement credibly, students who do not read margin comments.',
    lowRiskTrial:
      'Record three minutes of spoken feedback for five students on one assignment using any voice recorder, and ask them which format they preferred.',
  },
  {
    id: 'in-class-feedback',
    domainId: 'feedback',
    name: 'In-class / live feedback',
    explainer:
      'Feedback delivered in the moment of the work — circulating during activities, live critique, whole-class debriefs of common patterns.',
    goodFor:
      'Correcting course while it still matters, feedback at scale via patterns ("here are the three things most drafts did"), studio and lab formats.',
    lowRiskTrial:
      'After the next assessment, open one class with ten minutes on the three most common issues, anonymised, with before/after examples.',
  },
  {
    id: 'rubric-feedback',
    domainId: 'feedback',
    name: 'Rubric-based feedback',
    explainer:
      'Structured judgement against published criteria. Consistency and transparency machine; the risk is rubric-filling replacing actual communication.',
    goodFor:
      'Large cohorts and teaching teams, contested marks, making standards explicit enough to argue with.',
    lowRiskTrial:
      'Add one two-sentence "the single most useful change" field on top of an existing rubric and see whether students quote it back.',
  },
  {
    id: 'peer-feedback',
    domainId: 'feedback',
    name: 'Peer feedback loops',
    explainer:
      'Structured student-to-student feedback with training wheels: criteria, sentence stems, and accountability for feedback quality.',
    goodFor:
      'Multiplying feedback volume, teaching students to receive critique, draft-improvement cycles that would otherwise be unmarkable.',
    lowRiskTrial:
      'One structured swap: students exchange drafts with a three-prompt response sheet ("strongest part", "one confusion", "one suggestion").',
  },
  {
    id: 'feedforward',
    domainId: 'feedback',
    name: 'Feedforward',
    explainer:
      'Feedback aimed at the next task rather than post-mortem on the last one — often as "when you do X next month, do these two things differently".',
    goodFor:
      'Unit designs with sequenced assessments, breaking the "read grade, ignore comments" cycle, transferable skill development.',
    lowRiskTrial:
      'End your next batch of feedback with one explicit line: "For assignment 2, the one change that will most lift your mark is…"',
  },

  // ── AI-integration stances ─────────────────────────────────────────────────
  {
    id: 'ai-prohibited',
    domainId: 'ai',
    name: 'Prohibited',
    explainer:
      'AI use disallowed for a task, ideally because the task assesses a capability students must hold personally, and with conditions that make the prohibition meaningful rather than decorative.',
    goodFor:
      'Foundational skill certification, controlled-conditions assessment, tasks where the unassisted capability is the explicit learning outcome.',
    lowRiskTrial:
      'If you prohibit by default, the trial is inverting once: pick one low-stakes task and design it assuming AI use, then compare what it reveals.',
  },
  {
    id: 'ai-acknowledged',
    domainId: 'ai',
    name: 'Acknowledged',
    explainer:
      'AI use permitted with disclosure — students state what they used and how. Shifts the conversation from policing to transparency and judgement.',
    goodFor:
      'Most coursework in most disciplines right now; building honest norms; gathering intelligence about how students actually work.',
    lowRiskTrial:
      'Add a no-penalty AI-use statement field to one assignment and read what comes back before deciding anything else.',
  },
  {
    id: 'ai-required',
    domainId: 'ai',
    name: 'Required',
    explainer:
      'The task deliberately requires AI use — critique its output, improve it, benchmark against it — because working with these tools is itself the competency.',
    goodFor:
      'Teaching critical evaluation of AI output, professional preparation, tasks where the interesting work starts after the first draft.',
    lowRiskTrial:
      'One exercise: students get an AI-generated answer to a discipline question and must find and fix its three most serious flaws.',
  },
  {
    id: 'ai-codesigned',
    domainId: 'ai',
    name: 'Co-designed with students',
    explainer:
      'The AI policy for a task or unit is negotiated with the cohort — students help draw the lines and therefore understand and largely respect them.',
    goodFor:
      'Building ownership of integrity norms, capstones and postgraduate cohorts, surfacing what students actually do.',
    lowRiskTrial:
      'Spend 20 minutes of one class drafting the AI rules for a single upcoming task together; you keep veto rights.',
  },

  // ── Inclusion practices ────────────────────────────────────────────────────
  {
    id: 'udl',
    domainId: 'inclusion',
    name: 'UDL application',
    explainer:
      'Universal Design for Learning: multiple means of engagement, representation, and expression built into the design so fewer students need retrofitted accommodations.',
    goodFor:
      'Reducing accommodation load, diverse cohorts, designs that also happen to help everyone (captions, worked examples, choice).',
    lowRiskTrial:
      'Pick one assignment and add a second permissible format for demonstrating the same outcome (e.g. recorded presentation as an alternative to a report).',
  },
  {
    id: 'accessibility',
    domainId: 'inclusion',
    name: 'Accessibility habits',
    explainer:
      'The unglamorous defaults: captioned video, alt text, heading-structured documents, readable contrast, materials posted in advance.',
    goodFor:
      'Students with declared and undeclared needs alike; compliance obligations; anyone on a phone, a bus, or a bad week.',
    lowRiskTrial:
      'Run your most-used unit document through an accessibility checker and fix what it finds. Under an hour, permanent payoff.',
  },
  {
    id: 'differentiation',
    domainId: 'inclusion',
    name: 'Differentiation',
    explainer:
      'Deliberately varying pathway, pace, or support within one cohort — extension problems, optional scaffolds, tiered tasks — without varying the destination standard.',
    goodFor:
      'Mixed-preparation cohorts, keeping the top engaged while the base consolidates, service units taught across degrees.',
    lowRiskTrial:
      'Add one optional "stretch" variant and one optional scaffold sheet to a single tutorial task; watch who takes which.',
  },
  {
    id: 'flexible-formats',
    domainId: 'inclusion',
    name: 'Flexible participation',
    explainer:
      'Legitimate alternative routes to participate: contributing via backchannel or discussion board, recorded options, flexibility windows on low-stakes deadlines.',
    goodFor:
      'Carers, working students, anxious students who think best in writing, cohorts spanning time zones.',
    lowRiskTrial:
      'For one discussion-based class, accept written contributions posted within 24 hours as equal participation, and see who becomes visible.',
  },
];

export function itemsByDomain(domainId: string): RepertoireItem[] {
  return ITEMS.filter((i) => i.domainId === domainId);
}

export function getItem(id: string): RepertoireItem | undefined {
  return ITEMS.find((i) => i.id === id);
}
