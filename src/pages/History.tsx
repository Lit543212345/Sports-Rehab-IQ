/**
 * @module pages/History
 * @description Page displaying user's diagnosis sessions and treatment plans.
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/shared/GlassCard';
import { db } from '../data/db';
import type { ActiveTreatmentPlan, DiagnosisSession } from '../data/knowledgebase/types';
import { getInjury, getBodyRegions } from '../data/knowledgebase';
import './History.css';

export function History() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<ActiveTreatmentPlan[]>([]);
  const [sessions, setSessions] = useState<DiagnosisSession[]>([]);

  useEffect(() => {
    // Fetch all treatment plans, order by most recent startedAt
    db.treatmentPlans.orderBy('startedAt').reverse().toArray()
      .then(setPlans)
      .catch(() => setPlans([]));

    // Fetch all diagnosis sessions, order by most recent createdAt
    db.sessions.orderBy('createdAt').reverse().toArray()
      .then(setSessions)
      .catch(() => setSessions([]));
  }, []);

  const regions = getBodyRegions();
  const getRegionLabel = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    return region ? region.label : regionId;
  };

  return (
    <div className="page-container history">
      <motion.div 
        className="history__header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="history__title">History</h1>
        <p className="history__subtitle">Your past assessments and treatment plans.</p>
      </motion.div>

      <motion.section 
        className="history__section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="history__section-title">
          <span>📋</span> Treatment Plans
        </h2>
        
        {plans.length === 0 ? (
          <div className="history__empty">
            <p>No active or completed treatment plans.</p>
          </div>
        ) : (
          <div className="history__list">
            {plans.map((plan) => {
              const injury = getInjury(plan.injuryId);
              return (
                <GlassCard key={plan.id} hoverable onClick={() => navigate(`/treatment/${plan.id}`)}>
                  <span className={`history__plan-status history__plan-status--${plan.status}`}>
                    {plan.status}
                  </span>
                  <h3 className="history__plan-name">{injury?.name ?? plan.injuryId}</h3>
                  <div className="history__plan-meta">
                    <span>Phase {plan.currentPhase}</span>
                    <span>{new Date(plan.startedAt).toLocaleDateString()}</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </motion.section>

      <motion.section 
        className="history__section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="history__section-title">
          <span>🔍</span> Past Diagnoses
        </h2>
        
        {sessions.length === 0 ? (
          <div className="history__empty">
            <p>No past diagnosis sessions found.</p>
          </div>
        ) : (
          <div className="history__list">
            {sessions.map((session) => {
              const injury = session.matchedInjuryId ? getInjury(session.matchedInjuryId) : null;
              const resultText = injury 
                ? injury.name 
                : session.matchedInjuryId 
                  ? 'Condition identified' 
                  : 'No definitive match';

              return (
                <GlassCard key={session.id}>
                  <h3 className="history__session-name">{resultText}</h3>
                  <p className="history__session-region">{getRegionLabel(session.region)}</p>
                  <p className="history__session-date">
                    {new Date(session.createdAt).toLocaleString(undefined, { 
                      dateStyle: 'medium', 
                      timeStyle: 'short' 
                    })}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        )}
      </motion.section>
    </div>
  );
}
