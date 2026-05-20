/**
 * @module knowledgebase/body-regions
 * @description Body region metadata for the interactive body map.
 * Total injuries: 82 (42 base + 20 Tier 1 + 20 Tier 2 expansion)
 */

import type { BodyRegionInfo } from './types';

export const bodyRegions: BodyRegionInfo[] = [
  {
    id: 'head-neck',
    label: 'Head & Neck',
    shortLabel: 'Head',
    color: 'var(--color-region-head)',
    injuryCount: 5,
    icon: '🧠',
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    shortLabel: 'Shoulder',
    color: 'var(--color-region-shoulder)',
    injuryCount: 9,
    icon: '💪',
  },
  {
    id: 'elbow-wrist-hand',
    label: 'Elbow, Wrist & Hand',
    shortLabel: 'Arm',
    color: 'var(--color-region-elbow)',
    injuryCount: 12,
    icon: '✋',
  },
  {
    id: 'spine',
    label: 'Spine & Lower Back',
    shortLabel: 'Spine',
    color: 'var(--color-region-spine)',
    injuryCount: 8,
    icon: '🦴',
  },
  {
    id: 'hip-pelvis-groin',
    label: 'Hip, Pelvis & Groin',
    shortLabel: 'Hip',
    color: 'var(--color-region-hip)',
    injuryCount: 10,
    icon: '🏃',
  },
  {
    id: 'knee-thigh',
    label: 'Knee & Thigh',
    shortLabel: 'Knee',
    color: 'var(--color-region-knee)',
    injuryCount: 17,
    icon: '🦵',
  },
  {
    id: 'lower-leg-ankle-foot',
    label: 'Lower Leg, Ankle & Foot',
    shortLabel: 'Ankle',
    color: 'var(--color-region-ankle)',
    injuryCount: 17,
    icon: '🦶',
  },
  {
    id: 'systemic',
    label: 'Systemic / General',
    shortLabel: 'General',
    color: 'var(--color-region-systemic)',
    injuryCount: 3,
    icon: '⚡',
  },
];
