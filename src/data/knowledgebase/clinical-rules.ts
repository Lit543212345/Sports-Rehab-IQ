/**
 * @module knowledgebase/clinical-rules
 * @description Clinical rules hardcoded from the NotebookLM knowledgebase.
 * These govern rehab progression decisions throughout the app.
 */

import type { ClinicalRule } from './types';

export const clinicalRules: ClinicalRule[] = [
  {
    id: 'soreness-rules',
    name: 'Soreness Rules',
    source: 'Fees et al. (1998)',
    description:
      'Clinical criteria used during rehabilitation to monitor pain or soreness at the site of injury and dictate how to safely adjust the intensity, volume, or progression of a training program.',
    rules: [
      {
        condition: 'Soreness during warm-up that continues',
        action: 'Take 2 days off, then drop down 1 step in the program',
      },
      {
        condition: 'Soreness during warm-up that goes away',
        action: 'Stay at the current step until the session can be completed entirely without soreness',
      },
      {
        condition: 'Soreness during warm-up that goes away but redevelops later in the session',
        action: 'Take 2 days off, then drop down 1 step in the program',
      },
      {
        condition: 'Soreness the day after an activity (distinct from normal DOMS)',
        action: 'Take 1 day off and do not advance the program to the next step',
      },
      {
        condition: 'No soreness',
        action: 'Advance 1 step per week, or proceed as instructed by a healthcare professional',
      },
    ],
  },
  {
    id: 'ten-percent-rule',
    name: '10% Training Load Rule',
    source: 'Clinical practice guideline for running rehabilitation',
    description:
      'The athlete\'s acute weekly training load (or running mileage) should not increase by more than 10% compared to their chronic load (typically the average of the previous 4 weeks). Session-specific increases in running distance of 10% or more may be more important than cumulative weekly volume.',
    rules: [
      {
        condition: 'Weekly volume increase ≤ 10% of 4-week average',
        action: 'Safe to proceed — within adaptation capacity',
      },
      {
        condition: 'Weekly volume increase > 10% of 4-week average',
        action: 'Reduce volume — elevated injury risk for bone stress and overuse conditions',
      },
      {
        condition: 'Increasing distance and pace simultaneously',
        action: 'Avoid — prioritize distance/volume over speed when following this progression',
      },
    ],
  },
  {
    id: 'concussion-rule-of-2',
    name: 'Concussion Rule of 2',
    source: '2016 Consensus Statement on Return to Sport',
    description:
      'During each stage of the graduated return-to-sport protocol, a symptom spike of more than 2 points on a post-concussion symptom scale (compared to pre-activity baseline) that does not resolve within 1 hour requires dropping back to the previous stage.',
    rules: [
      {
        condition: 'Symptom increase ≤ 2 points AND resolves within 1 hour',
        action: 'Safe to proceed to the next RTS stage after 24 hours at current stage',
      },
      {
        condition: 'Symptom increase > 2 points OR does not resolve within 1 hour',
        action: 'Return to the previous stage and wait 24 hours before re-attempting',
      },
    ],
  },
];
