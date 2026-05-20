/**
 * @module engine/soreness-rules
 * @description Implements Fees et al. (1998) Soreness Rules for rehab progression.
 */
import type { SorenessTiming } from '../data/knowledgebase/types';

export type SorenessOutcome = 'advance' | 'maintain' | 'regress_2days' | 'rest_1day' | 'regress_2days_alt';

export interface SorenessDecision {
  outcome: SorenessOutcome;
  instruction: string;
  detail: string;
}

/**
 * Evaluates the soreness rules based on check-in data.
 * @param timing - When soreness occurs relative to activity
 * @returns Decision on whether to advance, maintain, or regress
 */
export function evaluateSoreness(timing: SorenessTiming): SorenessDecision {
  switch (timing) {
    case 'none':
      return {
        outcome: 'advance',
        instruction: 'Advance 1 step per week',
        detail: 'No soreness detected. You can progress to the next level of your rehabilitation program.',
      };
    case 'during-warmup-persists':
      return {
        outcome: 'regress_2days',
        instruction: 'Take 2 days off, then drop down 1 step',
        detail: 'Soreness during warm-up that continues indicates the current load is too high. Rest for 2 days, then return to the previous step in your program.',
      };
    case 'during-warmup-resolves':
      return {
        outcome: 'maintain',
        instruction: 'Stay at current step',
        detail: 'Soreness that resolves during warm-up means you are at the right level. Continue at this step until you can complete the entire session without soreness.',
      };
    case 'during-warmup-resolves-returns':
      return {
        outcome: 'regress_2days_alt',
        instruction: 'Take 2 days off, then drop down 1 step',
        detail: 'Soreness that returns later in the session indicates the volume is too high even if intensity is tolerable. Rest for 2 days and reduce the step.',
      };
    case 'day-after-activity':
      return {
        outcome: 'rest_1day',
        instruction: 'Take 1 day off — do not advance',
        detail: 'Post-activity soreness (distinct from normal DOMS) means the load was at the upper limit. Take 1 day off but stay at the current step.',
      };
  }
}
