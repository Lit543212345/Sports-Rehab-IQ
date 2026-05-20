/**
 * @module knowledgebase/index
 * @description Main query interface for the Sports Rehab IQ knowledgebase.
 * All queries are resolved against static data — never generates content.
 */
import type { BodyRegion, Injury, DiagnosticNode, TreatmentProtocol, KnowledgebaseQueryResult, BodyRegionInfo } from './types';
import { injuries } from './injuries';
import { diagnosticNodes } from './diagnostic-trees';
import { regionalRoots } from './regional-roots';
import { treatmentProtocols } from './treatment-protocols';
import { bodyRegions } from './body-regions';
import { clinicalRules } from './clinical-rules';

// Inject regional roots into the diagnostic nodes dictionary
for (const rootNode of regionalRoots) {
  diagnosticNodes[rootNode.id] = rootNode;
}

const NOT_IN_KB_MESSAGE = 'This condition is not currently covered in our clinical guidelines database. Please consult a healthcare professional for diagnosis and treatment.';

/** Get all body regions */
export function getBodyRegions(): BodyRegionInfo[] {
  return bodyRegions;
}

/** Get injuries for a specific body region */
export function getInjuriesByRegion(region: BodyRegion): Injury[] {
  return injuries.filter((i) => i.region === region);
}

/** Get a specific injury by ID */
export function getInjury(id: string): Injury | undefined {
  return injuries.find((i) => i.id === id);
}

/** Get a diagnostic node by ID */
export function getDiagnosticNode(nodeId: string): DiagnosticNode | undefined {
  return diagnosticNodes[nodeId];
}

/** Get the root diagnostic node for a body region */
export function getRegionDiagnosticRoots(region: BodyRegion): DiagnosticNode[] {
  const regionInjuries = getInjuriesByRegion(region);
  const roots: DiagnosticNode[] = [];
  for (const injury of regionInjuries) {
    const node = diagnosticNodes[injury.diagnosticTreeRootId];
    if (node && !roots.some((r) => r.id === node.id)) {
      roots.push(node);
    }
  }
  return roots;
}

/** Get treatment protocol for an injury */
export function getTreatmentProtocol(injuryId: string): TreatmentProtocol | undefined {
  return treatmentProtocols[injuryId];
}

/** Get all clinical rules */
export function getClinicalRules() {
  return clinicalRules;
}

/** Query the knowledgebase for a diagnosis result */
export function queryKnowledgebase(injuryId: string | null): KnowledgebaseQueryResult {
  if (!injuryId) {
    return { found: false, result: null, message: NOT_IN_KB_MESSAGE };
  }
  const injury = getInjury(injuryId);
  if (!injury) {
    return { found: false, result: null, message: NOT_IN_KB_MESSAGE };
  }
  const protocol = getTreatmentProtocol(injuryId);
  if (!protocol) {
    return {
      found: true,
      result: { injury, protocol: { injuryId, phases: [], applicableRules: [], estimatedDuration: 'Unknown', precautions: [], seekHelpIf: [] }, confidence: 'moderate', detectedRedFlags: [] },
      message: `Identified: ${injury.name}. Treatment protocol is being developed.`,
    };
  }
  return {
    found: true,
    result: { injury, protocol, confidence: 'high', detectedRedFlags: [] },
    message: `Identified: ${injury.name}`,
  };
}

/** Get total injury count */
export function getTotalInjuryCount(): number {
  return injuries.length;
}

export { NOT_IN_KB_MESSAGE };
