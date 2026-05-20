/**
 * @module data/db
 * @description Dexie.js IndexedDB database for local persistence.
 * Single-user model — no authentication or user ID scoping.
 */

import Dexie, { type Table } from 'dexie';
import type {
  DiagnosisSession,
  ActiveTreatmentPlan,
  DailyCheckIn,
  AppSettings,
} from './knowledgebase/types';

/** Sports Rehab IQ local database */
export class SportsRehabIQDatabase extends Dexie {
  sessions!: Table<DiagnosisSession>;
  treatmentPlans!: Table<ActiveTreatmentPlan>;
  checkIns!: Table<DailyCheckIn>;
  appSettings!: Table<AppSettings>;

  constructor() {
    super('SportsRehabIQDatabase');

    this.version(1).stores({
      sessions: '++id, region, matchedInjuryId, createdAt',
      treatmentPlans: '++id, injuryId, sessionId, status, startedAt',
      checkIns: '++id, planId, date, createdAt',
      appSettings: 'id',
    });
  }
}

/** Singleton database instance */
export const db = new SportsRehabIQDatabase();

/**
 * Ensures default app settings exist in the database.
 * Called on app initialization.
 */
export async function initializeAppSettings(): Promise<AppSettings> {
  const existing = await db.appSettings.get(1);
  if (existing) return existing;

  const defaults: AppSettings = {
    id: 1,
    theme: 'dark',
    units: 'metric',
    lastReminderDate: '',
    onboardingComplete: false,
  };

  await db.appSettings.put(defaults);
  return defaults;
}

/**
 * Gets the current app settings.
 */
export async function getAppSettings(): Promise<AppSettings> {
  const settings = await db.appSettings.get(1);
  if (!settings) return initializeAppSettings();
  return settings;
}

/**
 * Updates app settings (partial update).
 */
export async function updateAppSettings(
  updates: Partial<Omit<AppSettings, 'id'>>
): Promise<void> {
  await db.appSettings.update(1, updates);
}
