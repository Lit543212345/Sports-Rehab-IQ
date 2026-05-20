/**
 * @module pages/Home
 * @description Landing page with hero, diagnosis CTA, and active plans.
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/shared/GlassCard';
import { db } from '../data/db';
import type { ActiveTreatmentPlan } from '../data/knowledgebase/types';
import { getInjury } from '../data/knowledgebase';
import './Home.css';

export function Home() {
  const navigate = useNavigate();
  const [activePlans, setActivePlans] = useState<ActiveTreatmentPlan[]>([]);

  useEffect(() => {
    db.treatmentPlans.where('status').equals('active').toArray().then(setActivePlans).catch(() => setActivePlans([]));
  }, []);

  return (
    <div className="page-container home">
      <motion.div className="home__hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="home__hero-badge">Evidence-Based • 82 Conditions</div>
        <h1 className="home__title">
          <span className="home__title-accent">Sports Rehab IQ</span>
          <br />Sports Injury Guide
        </h1>
        <p className="home__subtitle">
          Self-diagnose sports injuries through guided clinical assessment and follow evidence-based treatment plans.
        </p>
        <motion.button className="btn btn--primary home__cta" onClick={() => navigate('/diagnose')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Start Diagnosis →
        </motion.button>
      </motion.div>

      {activePlans.length > 0 && (
        <motion.section className="home__plans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="home__section-title">Active Treatment Plans</h2>
          <div className="home__plans-grid">
            {activePlans.map((plan) => {
              const injury = getInjury(plan.injuryId);
              return (
                <GlassCard key={plan.id} hoverable onClick={() => navigate(`/treatment/${plan.id}`)}>
                  <h3 className="home__plan-name">{injury?.name ?? plan.injuryId}</h3>
                  <p className="home__plan-phase">Phase {plan.currentPhase}</p>
                  <span className="home__plan-date">Started {new Date(plan.startedAt).toLocaleDateString()}</span>
                </GlassCard>
              );
            })}
          </div>
        </motion.section>
      )}

      <motion.section className="home__features" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <div className="home__features-grid">
          {[
            { icon: '🔍', title: 'Guided Diagnosis', desc: 'Interactive decision trees based on clinical guidelines' },
            { icon: '📋', title: 'Treatment Plans', desc: 'Phased rehabilitation with exercise prescriptions' },
            { icon: '📊', title: 'Track Progress', desc: 'Daily check-ins with soreness-based progression' },
            { icon: '📱', title: 'Works Offline', desc: 'Full functionality without internet connection' },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
              <GlassCard className="home__feature-card">
                <span className="home__feature-icon">{f.icon}</span>
                <h2 className="home__feature-title">{f.title}</h2>
                <p className="home__feature-desc">{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
