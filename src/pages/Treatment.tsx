/**
 * @module pages/Treatment
 * @description Active treatment plan dashboard with exercises and check-ins.
 */
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/shared/GlassCard';
import { db } from '../data/db';
import { getInjury, getTreatmentProtocol } from '../data/knowledgebase';
import { evaluateSoreness } from '../engine/soreness-rules';
import type { ActiveTreatmentPlan, DailyCheckIn, TreatmentProtocol, Injury, SorenessTiming } from '../data/knowledgebase/types';

export function Treatment() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<ActiveTreatmentPlan | null>(null);
  const [injury, setInjury] = useState<Injury | null>(null);
  const [protocol, setProtocol] = useState<TreatmentProtocol | null>(null);
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>([]);
  const [showCheckin, setShowCheckin] = useState(false);
  const [painScore, setPainScore] = useState(3);
  const [soreness, setSoreness] = useState<SorenessTiming>('none');

  useEffect(() => {
    if (!planId) return;
    const id = parseInt(planId, 10);
    db.treatmentPlans.get(id).then((p) => {
      if (!p) return;
      setPlan(p);
      setInjury(getInjury(p.injuryId) ?? null);
      setProtocol(getTreatmentProtocol(p.injuryId) ?? null);
      db.checkIns.where('planId').equals(id).toArray().then(setCheckIns);
    });
  }, [planId]);

  const handleCheckin = useCallback(async () => {
    if (!plan?.id) return;
    const today = new Date().toISOString().split('T')[0];
    await db.checkIns.add({ planId: plan.id, painScore, sorenessTiming: soreness, exercisesCompleted: true, exercisesDone: [], notes: '', date: today, createdAt: Date.now() });
    const decision = evaluateSoreness(soreness);

    if (decision.outcome === 'advance' && protocol) {
      const nextPhase = Math.min(plan.currentPhase + 1, protocol.phases.length);
      await db.treatmentPlans.update(plan.id, { currentPhase: nextPhase, updatedAt: Date.now() });
      setPlan({ ...plan, currentPhase: nextPhase });
    }

    const updated = await db.checkIns.where('planId').equals(plan.id).toArray();
    setCheckIns(updated);
    setShowCheckin(false);
    alert(`${decision.instruction}\n\n${decision.detail}`);
  }, [plan, painScore, soreness, protocol]);

  if (!plan || !injury || !protocol) {
    return <div className="page-container"><p>Loading treatment plan...</p></div>;
  }

  const currentPhaseData = protocol.phases.find((p) => p.phaseNumber === plan.currentPhase);

  return (
    <div className="page-container" style={{ paddingTop: 'var(--space-6)' }}>
      <button className="btn btn--ghost" onClick={() => navigate('/')} style={{ marginBottom: 'var(--space-4)' }}>← Home</button>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard accent="var(--color-accent)">
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>{injury.name}</h1>
          <p style={{ color: 'var(--color-accent)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            {currentPhaseData?.name ?? `Phase ${plan.currentPhase}`}
          </p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>
            {checkIns.length} check-ins completed • Duration: {currentPhaseData?.typicalDuration}
          </p>
        </GlassCard>
      </motion.div>

      {/* Phase Goals */}
      {currentPhaseData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} style={{ marginTop: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>Goals</h2>
          {currentPhaseData.goals.map((g) => (
            <div key={g} style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              <span style={{ color: 'var(--color-accent)' }}>✓</span>{g}
            </div>
          ))}
        </motion.div>
      )}

      {/* Exercises */}
      {currentPhaseData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginTop: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>Exercises</h2>
          {currentPhaseData.exercises.map((ex, i) => (
            <motion.div key={ex.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
              <GlassCard style={{ marginBottom: 'var(--space-3)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>{ex.name}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>{ex.description}</p>
                <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                  <span>{ex.sets} sets × {ex.reps}</span>
                  <span>{ex.frequency}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Daily Check-in */}
      <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        {!showCheckin ? (
          <button className="btn btn--primary" style={{ width: '100%', padding: 'var(--space-4)' }} onClick={() => setShowCheckin(true)}>
            📋 Daily Check-In
          </button>
        ) : (
          <GlassCard accent="var(--color-info)">
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Daily Check-In</h3>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'block', marginBottom: 'var(--space-2)' }}>Pain Score: {painScore}/10</label>
              <input type="range" min="0" max="10" value={painScore} onChange={(e) => setPainScore(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'block', marginBottom: 'var(--space-2)' }}>Soreness Pattern</label>
              <select value={soreness} onChange={(e) => setSoreness(e.target.value as SorenessTiming)} style={{ width: '100%', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}>
                <option value="none">No soreness</option>
                <option value="during-warmup-persists">During warm-up (persists)</option>
                <option value="during-warmup-resolves">During warm-up (resolves)</option>
                <option value="during-warmup-resolves-returns">Warm-up resolves, returns later</option>
                <option value="day-after-activity">Day after activity</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn--primary" onClick={handleCheckin}>Submit Check-In</button>
              <button className="btn btn--ghost" onClick={() => setShowCheckin(false)}>Cancel</button>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
