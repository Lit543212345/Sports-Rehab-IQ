/**
 * @module components/ClinicalReasoning
 * @description Displays clinical reasoning explanation linking the user's
 * diagnostic answers to the predicted diagnosis and treatment approach.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ClinicalReasoning } from '../../engine/clinical-reasoning';
import './ClinicalReasoning.css';

interface ClinicalReasoningCardProps {
  reasoning: ClinicalReasoning;
}

/**
 * Renders a collapsible clinical reasoning explanation card.
 * Shows the narrative summary by default, with expandable details.
 */
export function ClinicalReasoningCard({ reasoning }: ClinicalReasoningCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="clinical-reasoning">
      <button
        className="clinical-reasoning__toggle"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="clinical-reasoning__toggle-icon">🧠</span>
        <span className="clinical-reasoning__toggle-label">
          Why this diagnosis?
        </span>
        <span className={`clinical-reasoning__chevron ${expanded ? 'clinical-reasoning__chevron--open' : ''}`}>
          ▾
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="reasoning-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="clinical-reasoning__content-wrapper"
          >
            <div className="clinical-reasoning__content">
              {/* Narrative */}
              <p
                className="clinical-reasoning__narrative"
                dangerouslySetInnerHTML={{ __html: formatBoldMarkdown(reasoning.narrative) }}
              />

              {/* Evidence Steps */}
              {reasoning.steps.length > 0 && (
                <div className="clinical-reasoning__evidence">
                  <h4 className="clinical-reasoning__section-title">Clinical Evidence</h4>
                  <div className="clinical-reasoning__steps">
                    {reasoning.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        className="clinical-reasoning__step"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <span className="clinical-reasoning__step-badge">{step.category}</span>
                        <p className="clinical-reasoning__step-finding">
                          <strong>You reported:</strong> {step.finding}
                        </p>
                        <p className="clinical-reasoning__step-significance">{step.significance}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Treatment Rationale */}
              <div className="clinical-reasoning__treatment">
                <h4 className="clinical-reasoning__section-title">Treatment Approach</h4>
                <p
                  className="clinical-reasoning__treatment-text"
                  dangerouslySetInnerHTML={{ __html: formatBoldMarkdown(reasoning.treatmentRationale) }}
                />
              </div>

              {/* Exercise Rationale */}
              {reasoning.exerciseRationale.length > 0 && (
                <div className="clinical-reasoning__exercises">
                  <h4 className="clinical-reasoning__section-title">Why These Exercises?</h4>
                  <ul className="clinical-reasoning__exercise-list">
                    {reasoning.exerciseRationale.map((text, i) => (
                      <li
                        key={i}
                        className="clinical-reasoning__exercise-item"
                        dangerouslySetInnerHTML={{ __html: formatBoldMarkdown(text) }}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Converts **bold** markdown to <strong> tags for inline rendering.
 * Also converts *italic* markdown to <em> tags.
 */
function formatBoldMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
