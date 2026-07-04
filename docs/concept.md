# Ethos Mirror: Teaching Reflection and Philosophy Builder

*Reflect on your practice, build your philosophy.*

*Concept description, v0.2, July 2026*

## One-line summary

A reflection instrument that maps an educator's teaching repertoire, compares stated values against enacted practice, and helps them build and maintain a teaching philosophy statement grounded in evidence rather than a blank page.

## Positioning statement

This is explicitly **not** a teaching-style typology. Tools that output "you are a Facilitator type" are teacher-side learning styles: weak evidence, self-fulfilling labels, and permission slips to avoid unfamiliar methods. Ethos Mirror inverts the framing, from *identity* ("what kind of teacher are you") to *repertoire and reasoning* ("what do you actually do, why, and where are the gaps"). Good teaching matches method to situation, not method to teacher comfort, which is the same principle underpinning Lesson Loom's framework guidance engine.

**Core design principle: every output is a mirror plus a question, never a verdict.** "Here is the pattern in your practice, does it match your intent?" rather than "you are X." A reflection instrument, not a horoscope.

## The anchor use case: the teaching philosophy statement

Philosophy statements are required for academic promotion applications, teaching awards, and AdvanceHE fellowship applications, yet most academics find them agonising to write because they are asked to produce values from a blank page. Ethos Mirror's destination feature is a philosophy builder that:

1. Interviews the educator conversationally about beliefs, formative experiences, and intent
2. Pulls patterns from actual practice (lesson plans, reflections, repertoire data)
3. Surfaces alignments and tensions between the two
4. Drafts a philosophy statement the educator refines, with every claim traceable to evidence

Everything else in the tool exists to gather material for this artefact and keep it alive over time. This gives every feature a job and stops the tool sprawling into a generic "reflection app".

## Core components

### 1. Repertoire map

Not "your style" but "your coverage". A structured self-audit across:

- **Delivery modes**: lecture, jigsaw, flipped, case discussion, role-play, lab/practical, Socratic seminar, peer instruction, studio, workshop
- **Assessment types**: exam, essay, portfolio, viva, authentic project, peer assessment, self-assessment, signal-based/process assessment
- **Feedback practices**: written, audio, in-class, rubric-based, peer feedback loops, feedforward
- **AI-integration stances**: prohibited, acknowledged, required, co-designed with students
- **Inclusion practices**: UDL application, accessibility habits, differentiation approaches

Output is a **heat map, not a label**: frequently used, occasionally used, never tried, tried and abandoned (with a "why" field, because abandonment reasons are reflective gold). Gaps are framed as prompts, not deficiencies: "You have never used peer assessment. Here is what it is good for, here is a low-risk way to trial it in one tutorial."

Each cell links to a short explainer, so the map doubles as a professional development browser, the same light-PD pattern as Lesson Loom's framework pages.

### 2. Evidence-grounded reflection (the Lesson Loom integration)

Self-report is one lens, but it is the least reliable one. Where the educator also uses Lesson Loom, Ethos Mirror can compare stated values against enacted practice computationally:

- "You say you prioritise active learning, but 80% of minutes in your recent plans are allocated to presentation segments."
- "You describe yourself as assessment-diverse, but every linked unit ends in a written exam."
- "Your stated AI stance is 'conversation, not delegation', and your plans do consistently include AI-use guidance. This is a genuine strength; here is the evidence trail for your promotion case."

This is Brookfield's lenses done computationally: the self lens (interview and quiz), the practice lens (lesson plan corpus), and eventually the student lens (imported unit feedback, optional) and the peer lens (a shareable "observe me against my stated values" prompt sheet for a colleague).

Tensions are surfaced neutrally and always end in a question. The educator decides whether the gap is a problem, an aspiration, or a constraint imposed by context (accreditation requirements, class sizes, room design). That third option matters: not every mismatch is a personal failing, and the tool should offer "this is a constraint, not a choice" as a first-class response.

### 3. Situational triage quiz (input, not verdict)

A short quiz exists, but as an *input channel* for the repertoire map and interview, never as a standalone output. Questions probe situations and choices, not personality:

- "A student challenges your interpretation mid-lecture. Walk through what you do."
- "You have 50 minutes, 200 students, and a concept everyone gets wrong. What does the session look like?"
- "Pick the assessment you are proudest of and the one you would redesign. Why each?"

Scenario responses reveal reasoning patterns far better than Likert scales, and they generate quotable raw material for the philosophy statement.

### 4. Reflection journal and post-delivery loop

Lightweight, prompted entries after teaching sessions ("what surprised you", "what would you change", Schön's reflection-on-action). Entries attach to specific Lesson Loom plans where linked, building the "as planned vs as taught vs as reflected" record over time. The philosophy builder mines this journal for concrete anecdotes, which is what separates a compelling philosophy statement from a generic one.

### 5. Philosophy statement builder and maintainer

- **First draft mode**: conversational interview plus repertoire and journal evidence produces a structured draft (beliefs, enactment, evidence, growth), mapped optionally to an external framework
- **Framework mapping**: AdvanceHE PSF dimensions for university educators, AITSL standards for K-12, or unstructured
- **Traceability**: every claim in the draft links back to its evidence (a plan, a journal entry, a repertoire item), so nothing is hollow
- **Living document mode**: the statement is versioned and periodically re-checked against new practice data. "Your statement says X; your last semester's plans suggest your practice has shifted toward Y. Update the statement, or revisit the practice?"
- **Purpose-specific renders**: promotion application version (evidence-forward, word-limited), award nomination version, fellowship application version, personal version

## Guardrails against pigeonholing

- No types, archetypes, personas, or style labels anywhere in the product
- No "preferred style" language; the vocabulary is repertoire, coverage, pattern, tension, intent
- Heat maps and patterns always carry the temporal frame "recently" and "so far", never "you are"
- Every gap prompt includes a legitimate-reasons escape hatch (constraints, deliberate choices)
- The tool never scores or ranks educators, and produces nothing that could be misused as a performance metric by a third party. Reflection data is private to the educator by default, with export entirely under their control

## Ecosystem fit

- **Lesson Loom** generates the practice; **Ethos Mirror** reflects on it; **UDL Lens** audits it. Each tool has a distinct verb.
- Repertoire gaps can push suggestions *into* Lesson Loom ("trial a jigsaw next week; want a plan for it?"), closing the loop from reflection to changed practice, which is the whole point of reflection
- Journal and philosophy data could feed promotion and fellowship applications directly, a concrete institutional value story

## Theoretical grounding (so it is not pedagogy invented from scratch)

- Brookfield's four critical lenses (self, students, peers, scholarship)
- Schön's reflection-in-action and reflection-on-action
- AdvanceHE Professional Standards Framework (university mapping)
- AITSL Australian Professional Standards for Teachers (K-12 mapping)
- Kolb's cycle for the journal loop (experience → reflection → conceptualisation → experimentation)

## MVP scoping suggestion

Phase 1 (prove the reflective core, no Lesson Loom dependency):
1. Repertoire self-audit and heat map with explainers
2. Scenario-based interview (five to eight prompts)
3. Philosophy statement first-draft builder with claim-to-evidence links
4. Markdown export

Phase 2: reflection journal, Lesson Loom plan-corpus analysis, stated-vs-enacted tension reports, living-document re-checks

Phase 3: student and peer lens imports, PSF/AITSL mapping, purpose-specific renders, repertoire-gap suggestions pushed into Lesson Loom

## Open design questions

- How is the plan-corpus analysis framed so it feels like a mirror rather than surveillance? Opt-in per unit? Educator-triggered only?
- Should the philosophy builder ever write in first person for the user, or always produce structured notes the user drafts from? (Authenticity matters for promotion artefacts, and assessors increasingly screen for AI-written statements)
- Is the scenario quiz free-text (richer, needs AI analysis) or structured-choice (faster, shallower)? Probably free-text with optional voice input
- Standalone product or a module inside Lesson Loom's dashboard? Standalone keeps the reflection data cleanly private; module makes the evidence loop frictionless
- Name: settled on Ethos Mirror (runner-up: Teaching Mirror). Before public launch, run a trademark and domain scan, since "Ethos" and "Praxis" are common in edtech naming
