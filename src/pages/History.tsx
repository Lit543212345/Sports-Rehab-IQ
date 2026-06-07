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
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedSessionIds, setSelectedSessionIds] = useState<Set<number>>(new Set());

  const refreshSessions = () => {
    db.sessions.orderBy('createdAt').reverse().toArray()
      .then(setSessions)
      .catch(() => setSessions([]));
  };

  useEffect(() => {
    // Fetch all treatment plans, order by most recent startedAt
    db.treatmentPlans.orderBy('startedAt').reverse().toArray()
      .then(setPlans)
      .catch(() => setPlans([]));

    refreshSessions();
  }, []);

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedSessionIds(new Set());
  };

  const toggleSelectSession = (id: number) => {
    const next = new Set(selectedSessionIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedSessionIds(next);
  };

  const handleClearSelected = async () => {
    if (selectedSessionIds.size === 0) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete the ${selectedSessionIds.size} selected diagnosis session(s)?`);
    if (!confirmDelete) return;

    try {
      await db.sessions.bulkDelete(Array.from(selectedSessionIds));
      setSelectedSessionIds(new Set());
      setIsSelectMode(false);
      refreshSessions();
    } catch (err) {
      console.error('Failed to delete selected sessions:', err);
    }
  };

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
        <div className="history__section-header">
          <h2 className="history__section-title">
            <span>🔍</span> Past Diagnoses
          </h2>
          {sessions.length > 0 && (
            <div className="history__section-actions">
              {isSelectMode ? (
                <>
                  <button 
                    className="history__btn" 
                    onClick={toggleSelectMode}
                  >
                    Cancel
                  </button>
                  <button 
                    className="history__btn history__btn--danger" 
                    disabled={selectedSessionIds.size === 0}
                    onClick={handleClearSelected}
                  >
                    Delete Selected ({selectedSessionIds.size})
                  </button>
                </>
              ) : (
                <button 
                  className="history__btn" 
                  onClick={toggleSelectMode}
                >
                  Select
                </button>
              )}
            </div>
          )}
        </div>
        
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
              const isSelected = selectedSessionIds.has(session.id!);

              return (
                <div key={session.id} className="history__session-card-wrapper">
                  {isSelectMode && (
                    <div 
                      className={`history__checkbox-container ${isSelected ? 'history__checkbox-container--checked' : ''}`}
                      onClick={() => toggleSelectSession(session.id!)}
                    >
                      {isSelected && <span className="history__checkbox-icon">✓</span>}
                    </div>
                  )}
                  <GlassCard 
                    className={isSelectMode ? `history__session-card-selectable ${isSelected ? 'history__session-card-selectable--selected' : ''}` : ''} 
                    onClick={isSelectMode ? () => toggleSelectSession(session.id!) : undefined}
                  >
                    <h3 className="history__session-name">{resultText}</h3>
                    <p className="history__session-region">{getRegionLabel(session.region)}</p>
                    <p className="history__session-date">
                      {new Date(session.createdAt).toLocaleString(undefined, { 
                        dateStyle: 'medium', 
                        timeStyle: 'short' 
                      })}
                    </p>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        )}
      </motion.section>
    </div>
  );
}
