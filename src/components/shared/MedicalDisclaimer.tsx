/**
 * @module components/shared/MedicalDisclaimer
 * @description Persistent, non-dismissible medical disclaimer.
 * Rendered in the app shell on EVERY page — cannot be hidden.
 */
import './MedicalDisclaimer.css';

export function MedicalDisclaimer() {
  return (
    <div className="medical-disclaimer" role="alert" aria-live="polite">
      <span className="medical-disclaimer__icon" aria-hidden="true">⚕️</span>
      <span className="medical-disclaimer__text">
        For educational purposes only — not a substitute for professional medical advice.
      </span>
    </div>
  );
}
