/**
 * @module engine/clinical-reasoning
 * @description Generates plain-English clinical reasoning explanations that link
 * the user's diagnostic answers to the predicted diagnosis and chosen treatment.
 *
 * This module converts the abstract decision-tree path into a narrative the user
 * can understand: "Because you reported X, Y, and Z, we believe this is likely
 * [Injury] and have prescribed [Exercises] accordingly."
 */

import type {
  DiagnosticAnswer,
  DiagnosticNode,
  Injury,
  TreatmentProtocol,
  MatchResult,
} from '../data/knowledgebase/types';
import { getDiagnosticNode } from '../data/knowledgebase';

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

/** A single reasoning step linking an answer to clinical logic */
export interface ReasoningStep {
  /** The category of clinical evidence (mechanism, symptom, etc.) */
  category: string;
  /** What the user reported */
  finding: string;
  /** Why this matters clinically */
  significance: string;
}

/** The full clinical reasoning summary */
export interface ClinicalReasoning {
  /** Opening narrative paragraph */
  narrative: string;
  /** Individual reasoning steps */
  steps: ReasoningStep[];
  /** Summary linking diagnosis to treatment rationale */
  treatmentRationale: string;
  /** Key exercises and why they were chosen */
  exerciseRationale: string[];
}

/* ═══════════════════════════════════════════
   Category → Human-Readable Label Map
   ═══════════════════════════════════════════ */

const CATEGORY_LABELS: Record<string, string> = {
  onset: 'Onset pattern',
  location: 'Pain location',
  symptom: 'Key symptom',
  mechanism: 'Injury mechanism',
  test: 'Clinical test',
  severity: 'Severity indicator',
};

/* ═══════════════════════════════════════════
   Core Generator
   ═══════════════════════════════════════════ */

/**
 * Generates a clinical reasoning explanation from the user's diagnostic path.
 *
 * @param answers - The user's answers through the diagnostic tree
 * @param matchResult - The matched injury and protocol
 * @returns A structured clinical reasoning object, or null if insufficient data
 */
export function generateClinicalReasoning(
  answers: DiagnosticAnswer[],
  matchResult: MatchResult
): ClinicalReasoning {
  const { injury, protocol } = matchResult;

  // Build reasoning steps from each answer
  const steps = buildReasoningSteps(answers);

  // Generate the narrative paragraph
  const narrative = buildNarrative(steps, injury);

  // Generate treatment rationale
  const treatmentRationale = buildTreatmentRationale(injury, protocol);

  // Generate exercise rationale
  const exerciseRationale = buildExerciseRationale(protocol);

  return {
    narrative,
    steps,
    treatmentRationale,
    exerciseRationale,
  };
}

/**
 * Builds individual reasoning steps from the diagnostic answers.
 * Each step links a user response to its clinical significance.
 */
function buildReasoningSteps(answers: DiagnosticAnswer[]): ReasoningStep[] {
  const steps: ReasoningStep[] = [];

  for (const answer of answers) {
    const node = getDiagnosticNode(answer.nodeId);
    if (!node) continue;

    // Skip info nodes — they don't contribute clinical evidence
    if (node.type === 'info') continue;

    const category = node.category ?? 'symptom';
    const finding = extractFinding(answer.selectedOptionLabel);
    const significance = deriveSignificance(node, answer.selectedOptionLabel);

    if (significance) {
      steps.push({
        category: CATEGORY_LABELS[category] ?? category,
        finding,
        significance,
      });
    }
  }

  return steps;
}

/**
 * Extracts a clean finding description from the option label.
 * Strips leading "Yes — " or "No — " patterns for readability.
 */
function extractFinding(label: string): string {
  // Strip common prefix patterns
  const cleaned = label
    .replace(/^Yes\s*[—–-]\s*/i, '')
    .replace(/^No\s*[—–-]\s*/i, 'No ')
    .replace(/^Both\s*[—–-]\s*/i, '')
    .trim();

  // Lowercase the first char for embedding in sentences
  return cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
}

/**
 * Derives clinical significance from a diagnostic node and the selected answer.
 * Maps the question category + content to a plain-English explanation.
 */
function deriveSignificance(node: DiagnosticNode, selectedLabel: string): string {
  const category = node.category ?? 'symptom';
  const isPositive = /^yes/i.test(selectedLabel);

  switch (category) {
    case 'mechanism':
      return isPositive
        ? 'This injury mechanism is consistent with the identified condition and helps narrow the tissue type involved.'
        : 'This mechanism pattern helps differentiate from other conditions in this region.';

    case 'onset':
      if (/sudden|acute|pop/i.test(selectedLabel)) {
        return 'Acute onset suggests a specific traumatic event — this helps classify the injury grade and expected healing timeline.';
      }
      if (/gradual|overuse|progressive/i.test(selectedLabel)) {
        return 'Gradual onset indicates an overuse or degenerative process — treatment focuses on load management and progressive strengthening.';
      }
      return 'The onset pattern helps classify the injury as acute vs. chronic and guides the treatment approach.';

    case 'location':
      return 'Pain location helps identify the specific anatomical structure involved and differentiates between conditions in this region.';

    case 'symptom':
      if (/swell|effusion/i.test(node.content)) {
        if (/within.*(?:2|two)\s*hours|immediate|rapid/i.test(selectedLabel)) {
          return 'Rapid swelling (within 2 hours) suggests haemarthrosis — bleeding into the joint, which indicates significant structural damage.';
        }
        if (/next day|gradual|overnight/i.test(selectedLabel)) {
          return 'Delayed swelling (next day) suggests reactive effusion — an inflammatory response rather than acute bleeding.';
        }
        return 'The swelling pattern helps determine the severity and type of tissue damage.';
      }
      if (/lock|catch|give.*way|buckl/i.test(node.content)) {
        return 'Mechanical symptoms like locking, catching, or giving way suggest internal derangement — a loose body or structural instability.';
      }
      if (/numb|tingl|pins.*needles|radiat/i.test(node.content)) {
        return 'Neurological symptoms indicate nerve involvement and may change the treatment approach or require specialist referral.';
      }
      if (/stiff|morning/i.test(node.content)) {
        return 'Stiffness patterns help differentiate inflammatory vs. mechanical conditions and guide exercise timing.';
      }
      if (/snap|click|pop/i.test(node.content)) {
        return 'Audible or palpable mechanical signs help identify the specific tissue involved.';
      }
      if (/droop|weakness|inability/i.test(node.content)) {
        return 'Motor weakness or loss of active movement suggests a structural disruption requiring specific splinting or rehabilitation.';
      }
      if (/burn|pebble/i.test(node.content)) {
        return 'Burning or shooting pain patterns suggest nerve irritation rather than purely musculoskeletal pathology.';
      }
      return 'This symptom pattern is characteristic of the identified condition and guided the diagnostic pathway.';

    case 'test':
      return isPositive
        ? 'A positive clinical test provides strong evidence for this diagnosis and increases diagnostic confidence.'
        : 'This test result helps exclude other conditions and confirms the working diagnosis.';

    case 'severity':
      return 'Severity indicators help determine the treatment grade and expected recovery timeline.';

    default:
      return 'This clinical finding contributed to the diagnostic pathway.';
  }
}

/**
 * Builds the opening narrative paragraph that explains the reasoning chain.
 */
function buildNarrative(steps: ReasoningStep[], injury: Injury): string {
  if (steps.length === 0) {
    return `Based on your responses, the clinical pattern is consistent with ${injury.name}.`;
  }

  // Pick the most clinically interesting steps (mechanism → symptom → location)
  const keyFindings = steps.slice(0, 3).map((s) => s.finding);

  const findingsText = keyFindings.length === 1
    ? keyFindings[0]
    : keyFindings.length === 2
      ? `${keyFindings[0]} and ${keyFindings[1]}`
      : `${keyFindings.slice(0, -1).join(', ')}, and ${keyFindings[keyFindings.length - 1]}`;

  return `Because you reported ${findingsText}, the clinical pattern is consistent with a likely **${injury.name}**. This diagnosis is based on matching your specific combination of findings against established clinical criteria.`;
}

/**
 * Generates a rationale linking the diagnosis to the treatment approach.
 */
function buildTreatmentRationale(injury: Injury, protocol: TreatmentProtocol): string {
  const phase1 = protocol.phases[0];
  if (!phase1) {
    return `Treatment follows evidence-based guidelines for ${injury.name}.`;
  }

  const goals = phase1.goals.slice(0, 2).join(' and ');
  return `Your treatment plan starts with **${phase1.name}** (${phase1.typicalDuration}). The initial focus is on ${goals.toLowerCase()}. ${protocol.precautions[0] ? `Key precaution: *${protocol.precautions[0]}*.` : ''}`;
}

/**
 * Generates rationale for each prescribed exercise.
 */
function buildExerciseRationale(protocol: TreatmentProtocol): string[] {
  const phase1 = protocol.phases[0];
  if (!phase1 || phase1.exercises.length === 0) return [];

  return phase1.exercises.map((ex) => {
    const categoryLabel =
      ex.category === 'mobility' ? 'restore range of motion' :
      ex.category === 'strength' ? 'rebuild strength and stability' :
      ex.category === 'balance' ? 'retrain proprioception and balance' :
      ex.category === 'cardio' ? 'maintain cardiovascular fitness' :
      ex.category === 'flexibility' ? 'restore tissue flexibility' :
      'support functional recovery';

    return `**${ex.name}** — Prescribed to ${categoryLabel}. ${ex.progressionNotes}`;
  });
}
