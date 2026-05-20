/**
 * @module pages/Diagnose
 * @description Diagnosis flow: BodyMap → GuidedDiscovery → Result with clinical reasoning.
 */
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BodyRegion, DiagnosticAnswer, KnowledgebaseQueryResult } from '../data/knowledgebase/types';
import { BodyMap } from '../components/BodyMap/BodyMap';
import { GuidedDiscovery } from '../components/GuidedDiscovery/GuidedDiscovery';
import { GlassCard } from '../components/shared/GlassCard';
import { ClinicalReasoningCard } from '../components/ClinicalReasoning/ClinicalReasoning';
import { generateClinicalReasoning } from '../engine/clinical-reasoning';
import type { ClinicalReasoning } from '../engine/clinical-reasoning';
import { db } from '../data/db';

type DiagnoseStep = 'body-map' | 'discovery' | 'result';

export function Diagnose() {
  const navigate = useNavigate();
  const [step, setStep] = useState<DiagnoseStep>('body-map');
  const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null);
  const [result, setResult] = useState<KnowledgebaseQueryResult | null>(null);
  const [reasoning, setReasoning] = useState<ClinicalReasoning | null>(null);

  const handleRegionSelect = useCallback((region: BodyRegion) => {
    setSelectedRegion(region);
    setStep('discovery');
  }, []);

  const handleDiscoveryComplete = useCallback(async (res: KnowledgebaseQueryResult, answers: DiagnosticAnswer[]) => {
    setResult(res);
    setStep('result');

    // Generate clinical reasoning if we have a match
    if (res.found && res.result) {
      const clinicalReasoning = generateClinicalReasoning(answers, res.result);
      setReasoning(clinicalReasoning);
    } else {
      setReasoning(null);
    }

    await db.sessions.add({
      region: selectedRegion!,
      matchedInjuryId: res.result?.injury.id ?? null,
      answers,
      startedTreatment: false,
      createdAt: Date.now(),
    });
  }, [selectedRegion]);

  const handleStartTreatment = useCallback(async () => {
    if (!result?.result) return;
    const planId = await db.treatmentPlans.add({
      injuryId: result.result.injury.id,
      sessionId: 0,
      currentPhase: 1,
      status: 'active',
      startedAt: Date.now(),
      updatedAt: Date.now(),
    });
    navigate(`/treatment/${planId}`);
  }, [result, navigate]);

  return (
    <div className="page-container">
      {step === 'body-map' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)', fontFamily: 'var(--font-display)' }}>Where does it hurt?</h1>
          <BodyMap onRegionSelect={handleRegionSelect} />
        </motion.div>
      )}

      {step === 'discovery' && selectedRegion && (
        <GuidedDiscovery region={selectedRegion} onComplete={handleDiscoveryComplete} onBack={() => setStep('body-map')} />
      )}

      {step === 'result' && result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ paddingTop: 'var(--space-8)' }}>
          {result.found && result.result ? (
            <GlassCard accent="var(--color-accent)">
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Assessment Result
              </span>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                {result.result.injury.name}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
                {result.result.injury.overview}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-4)' }}>
                <span>⏱ {result.result.injury.estimatedRecovery}</span>
              </div>

              {/* Clinical Reasoning Explanation */}
              {reasoning && (
                <ClinicalReasoningCard reasoning={reasoning} />
              )}

              {result.result.injury.redFlags.length > 0 && (
                <div style={{ background: 'var(--color-error-bg)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <strong style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)' }}>⚠️ Seek immediate help if you experience:</strong>
                  <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-4)', listStyle: 'disc' }}>
                    {result.result.injury.redFlags.map((rf) => (
                      <li key={rf.symptom} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>{rf.symptom}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
                <button className="btn btn--primary" onClick={handleStartTreatment}>Start Treatment Plan →</button>
                <button className="btn btn--secondary" onClick={() => setStep('body-map')}>Try Different Area</button>
              </div>
            </GlassCard>
          ) : (
            <GlassCard accent="var(--color-warning)">
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>Condition Not Found</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{result.message}</p>
              <button className="btn btn--secondary" onClick={() => setStep('body-map')}>← Back to Body Map</button>
            </GlassCard>
          )}
        </motion.div>
      )}
    </div>
  );
}

