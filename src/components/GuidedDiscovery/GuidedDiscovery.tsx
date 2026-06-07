/**
 * @module components/GuidedDiscovery
 * @description Multi-step diagnostic questionnaire wizard.
 */
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Model from 'react-body-highlighter';
import type { Muscle } from 'react-body-highlighter';
import type { BodyRegion, DiagnosticNode, DiagnosticAnswer } from '../../data/knowledgebase/types';
import { getDiagnosticNode } from '../../data/knowledgebase';
import { getStartNode, recordAnswer, resolveResult } from '../../engine/diagnostic-matcher';
import type { KnowledgebaseQueryResult } from '../../data/knowledgebase/types';
import { GlassCard } from '../shared/GlassCard';
import { REGION_TO_MUSCLES } from '../BodyMap/BodyMap';
import './GuidedDiscovery.css';

interface GuidedDiscoveryProps {
  region: BodyRegion;
  onComplete: (result: KnowledgebaseQueryResult, answers: DiagnosticAnswer[]) => void;
  onBack: () => void;
}

export function GuidedDiscovery({ region, onComplete, onBack }: GuidedDiscoveryProps) {
  const [currentNode, setCurrentNode] = useState<DiagnosticNode | null>(() => getStartNode(region));
  const [answers, setAnswers] = useState<DiagnosticAnswer[]>([]);
  const [direction, setDirection] = useState(1);

  const handleOptionSelect = useCallback((optionIndex: number) => {
    if (!currentNode || !currentNode.options) return;
    const option = currentNode.options[optionIndex];
    const answer = recordAnswer(currentNode.id, option.label, option.nextNodeId);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    const nextNode = getDiagnosticNode(option.nextNodeId);
    if (!nextNode) {
      onComplete({ found: false, result: null, message: 'This condition is not currently covered in our clinical guidelines database. Please consult a healthcare professional for diagnosis and treatment.' }, newAnswers);
      return;
    }

    if (nextNode.type === 'result' || nextNode.type === 'referral') {
      const result = resolveResult(nextNode);
      onComplete(result, newAnswers);
      return;
    }

    if (nextNode.type === 'info' && nextNode.nextNodeId) {
      const afterInfo = getDiagnosticNode(nextNode.nextNodeId);
      if (afterInfo) {
        setDirection(1);
        setCurrentNode(afterInfo);
        return;
      }
    }

    setDirection(1);
    setCurrentNode(nextNode);
  }, [currentNode, answers, onComplete]);

  const handleGoBack = useCallback(() => {
    if (answers.length === 0) { onBack(); return; }
    const prevAnswers = answers.slice(0, -1);
    setAnswers(prevAnswers);
    const prevNodeId = prevAnswers.length > 0 ? prevAnswers[prevAnswers.length - 1].nextNodeId : getStartNode(region)?.id;
    if (prevNodeId) {
      setDirection(-1);
      setCurrentNode(getDiagnosticNode(prevNodeId) ?? null);
    }
  }, [answers, region, onBack]);

  if (!currentNode) {
    return (
      <div className="guided-discovery__empty">
        <p>No diagnostic information available for this region yet.</p>
        <button className="btn btn--secondary" onClick={onBack}>← Back to Body Map</button>
      </div>
    );
  }

  const progress = Math.min(answers.length * 20, 95);

  return (
    <div className="guided-discovery">
      <div className="guided-discovery__header">
        <button className="btn btn--ghost" onClick={handleGoBack}>← Back</button>
        <div className="guided-discovery__progress">
          <div className="guided-discovery__progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <span className="guided-discovery__step">Q{answers.length + 1}</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentNode.id}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="guided-discovery__card-wrapper"
        >
          <GlassCard className="guided-discovery__question-card">
            {currentNode.category && (
              <span className="guided-discovery__category">{currentNode.category}</span>
            )}
            <h2 className="guided-discovery__question">{currentNode.content}</h2>
            {currentNode.detail && (
              <p className="guided-discovery__detail">{currentNode.detail}</p>
            )}

            {currentNode.type === 'physical-test' && (
              <div className="guided-discovery__test-badge">
                <span>🔬</span> Physical Self-Test
              </div>
            )}

            {currentNode.options && (
              <div className="guided-discovery__options">
                {currentNode.options.map((option, i) => (
                  <motion.button
                    key={option.label}
                    className="guided-discovery__option"
                    onClick={() => handleOptionSelect(i)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="guided-discovery__option-diagram">
                      {option.pin && <div className="guided-discovery__pin" />}
                      <div 
                        className="guided-discovery__model-wrapper"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-${option.pin ? option.pin.left : 50}%, -${option.pin ? option.pin.top : 50}%) scale(${option.pin?.zoom || (option.pin ? 3.5 : 0.75)})`,
                          width: '40px',
                          height: '80px',
                        }}
                      >
                        <Model
                          type={option.modelType || 'anterior'}
                          data={[{ name: 'Highlight', muscles: (option.highlightMuscles || REGION_TO_MUSCLES[region] || []) as Muscle[] }]}
                          bodyColor="var(--color-bg-secondary)"
                          highlightedColors={['var(--color-accent)']}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                    <span className="guided-discovery__option-label">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
