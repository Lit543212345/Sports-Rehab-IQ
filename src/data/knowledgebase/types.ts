/**
 * @module knowledgebase/types
 * @description Core TypeScript interfaces for the Sports Rehab IQ knowledgebase.
 * All injury data, diagnostic trees, and treatment protocols conform to these types.
 */

/* ════════════════════════════════════════════
   Body Regions & Enums
   ════════════════════════════════════════════ */

/** Anatomical body regions for injury classification */
export type BodyRegion =
  | 'head-neck'
  | 'shoulder'
  | 'elbow-wrist-hand'
  | 'spine'
  | 'hip-pelvis-groin'
  | 'knee-thigh'
  | 'lower-leg-ankle-foot'
  | 'systemic';

/** Metadata for a body region in the body map */
export interface BodyRegionInfo {
  id: BodyRegion;
  label: string;
  shortLabel: string;
  color: string;
  injuryCount: number;
  icon: string;
}

/* ════════════════════════════════════════════
   Injuries
   ════════════════════════════════════════════ */

/** Represents a single injury in the knowledgebase */
export interface Injury {
  /** URL-safe slug identifier, e.g. "lateral-ankle-sprain" */
  id: string;
  /** Full clinical name */
  name: string;
  /** Anatomical region */
  region: BodyRegion;
  /** Common lay terms for this injury */
  aliases: string[];
  /** Brief clinical description (1-3 sentences) */
  overview: string;
  /** Red flag symptoms that require immediate professional referral */
  redFlags: RedFlag[];
  /** Key risk factors */
  riskFactors: string[];
  /** Root node ID of the diagnostic decision tree */
  diagnosticTreeRootId: string;
  /** Estimated recovery timeline string */
  estimatedRecovery: string;
}

/** Red flag symptom that should trigger immediate referral */
export interface RedFlag {
  /** Symptom description */
  symptom: string;
  /** Why this is dangerous */
  reason: string;
  /** Urgency: emergency (ER), urgent (same-day), or prompt (within week) */
  urgency: 'emergency' | 'urgent' | 'prompt';
}

/* ════════════════════════════════════════════
   Diagnostic Decision Tree
   ════════════════════════════════════════════ */

/** A single node in the diagnostic decision tree */
export interface DiagnosticNode {
  /** Unique node identifier */
  id: string;
  /** Node type determines rendering behavior */
  type: 'question' | 'physical-test' | 'result' | 'referral' | 'info';
  /** Display content — question text, test instruction, or result summary */
  content: string;
  /** Optional supplementary detail text */
  detail?: string;
  /** Branching options (for question/test nodes) */
  options?: DiagnosticOption[];
  /** For linear progression (info nodes) */
  nextNodeId?: string;
  /** Injury ID if this is a result node */
  resultInjuryId?: string;
  /** Category tag for grouping in the UI */
  category?: 'onset' | 'location' | 'symptom' | 'mechanism' | 'test' | 'severity';
}

/** A selectable option within a diagnostic node */
export interface DiagnosticOption {
  /** Display label */
  label: string;
  /** ID of the next node to navigate to */
  nextNodeId: string;
  /** Optional icon hint */
  icon?: string;
  /** Optional array of muscles to highlight on a mini diagram */
  highlightMuscles?: string[];
  /** Which side of the body to show for the diagram */
  modelType?: 'anterior' | 'posterior';
}

/** User's answer to a diagnostic question */
export interface DiagnosticAnswer {
  nodeId: string;
  selectedOptionLabel: string;
  nextNodeId: string;
  timestamp: number;
}

/* ════════════════════════════════════════════
   Treatment Protocols
   ════════════════════════════════════════════ */

/** Complete treatment protocol for an injury */
export interface TreatmentProtocol {
  /** Linked injury ID */
  injuryId: string;
  /** Treatment phases in order */
  phases: RehabPhase[];
  /** Which clinical rules apply to this protocol */
  applicableRules: ClinicalRuleId[];
  /** Total estimated duration range */
  estimatedDuration: string;
  /** General precautions */
  precautions: string[];
  /** When to seek professional help during treatment */
  seekHelpIf: string[];
}

/** A single phase of rehabilitation */
export interface RehabPhase {
  /** Phase identifier */
  id: string;
  /** Phase number (1-based) */
  phaseNumber: number;
  /** Display name, e.g. "Phase 1: Acute Protection" */
  name: string;
  /** Criteria to enter this phase */
  entryCriteria: string[];
  /** Goals for this phase */
  goals: string[];
  /** Exercises prescribed in this phase */
  exercises: Exercise[];
  /** Activity restrictions */
  restrictions: string[];
  /** Typical duration range */
  typicalDuration: string;
  /** Criteria to progress to next phase */
  progressionCriteria: string[];
}

/** An exercise within a rehab phase */
export interface Exercise {
  /** Unique exercise identifier */
  id: string;
  /** Exercise name */
  name: string;
  /** Detailed description / instructions */
  description: string;
  /** Number of sets */
  sets: number;
  /** Reps or duration, e.g. "12" or "30 seconds" */
  reps: string;
  /** How often, e.g. "2x daily" */
  frequency: string;
  /** Notes on how to progress this exercise */
  progressionNotes: string;
  /** Category of exercise */
  category: 'mobility' | 'strength' | 'balance' | 'cardio' | 'flexibility' | 'functional';
}

/* ════════════════════════════════════════════
   Clinical Rules
   ════════════════════════════════════════════ */

/** Identifiers for clinical rules hardcoded in the engine */
export type ClinicalRuleId = 'soreness-rules' | 'ten-percent-rule' | 'concussion-rule-of-2';

/** Clinical rule definition for display */
export interface ClinicalRule {
  id: ClinicalRuleId;
  name: string;
  source: string;
  description: string;
  rules: ClinicalRuleStep[];
}

/** Individual step/condition within a clinical rule */
export interface ClinicalRuleStep {
  condition: string;
  action: string;
}

/* ════════════════════════════════════════════
   User Data (IndexedDB)
   ════════════════════════════════════════════ */

/** A completed diagnosis session */
export interface DiagnosisSession {
  /** Auto-incremented ID */
  id?: number;
  /** Body region selected */
  region: BodyRegion;
  /** Matched injury ID (null if no match) */
  matchedInjuryId: string | null;
  /** User's answers through the diagnostic tree */
  answers: DiagnosticAnswer[];
  /** Whether user started a treatment plan from this session */
  startedTreatment: boolean;
  /** Timestamp */
  createdAt: number;
}

/** An active treatment plan being tracked */
export interface ActiveTreatmentPlan {
  /** Auto-incremented ID */
  id?: number;
  /** Linked injury ID */
  injuryId: string;
  /** Linked diagnosis session ID */
  sessionId: number;
  /** Current phase number (1-based) */
  currentPhase: number;
  /** Plan status */
  status: 'active' | 'completed' | 'paused' | 'abandoned';
  /** When the plan was started */
  startedAt: number;
  /** When the plan was last updated */
  updatedAt: number;
  /** When the plan was completed (if applicable) */
  completedAt?: number;
}

/** A daily check-in record */
export interface DailyCheckIn {
  /** Auto-incremented ID */
  id?: number;
  /** Linked treatment plan ID */
  planId: number;
  /** Pain score 0-10 */
  painScore: number;
  /** Soreness timing relative to activity */
  sorenessTiming: SorenessTiming;
  /** Whether exercises were completed */
  exercisesCompleted: boolean;
  /** Which exercises were done (IDs) */
  exercisesDone: string[];
  /** Free-text notes */
  notes: string;
  /** Date string YYYY-MM-DD */
  date: string;
  /** Timestamp */
  createdAt: number;
}

/** Soreness timing categories for the Soreness Rules engine */
export type SorenessTiming =
  | 'none'
  | 'during-warmup-persists'
  | 'during-warmup-resolves'
  | 'during-warmup-resolves-returns'
  | 'day-after-activity';

/** App settings (single row) */
export interface AppSettings {
  /** Always 1 — single-row table */
  id: number;
  /** Color theme */
  theme: 'dark' | 'light';
  /** Measurement units */
  units: 'metric' | 'imperial';
  /** Last date a check-in reminder was shown */
  lastReminderDate: string;
  /** First launch completed */
  onboardingComplete: boolean;
}

/* ════════════════════════════════════════════
   Query / Match Results
   ════════════════════════════════════════════ */

/** Result of running the diagnostic matcher */
export interface MatchResult {
  /** Matched injury */
  injury: Injury;
  /** Treatment protocol for the injury */
  protocol: TreatmentProtocol;
  /** Confidence indicator */
  confidence: 'high' | 'moderate' | 'low';
  /** Red flags detected during assessment */
  detectedRedFlags: RedFlag[];
}

/** Query result when searching the knowledgebase */
export interface KnowledgebaseQueryResult {
  /** Whether a match was found */
  found: boolean;
  /** Match result if found */
  result: MatchResult | null;
  /** Message to display */
  message: string;
}
