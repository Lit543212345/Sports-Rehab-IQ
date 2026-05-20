/**
 * @module engine/diagnostic-matcher
 * @description Walks diagnostic decision trees to match injuries from user answers.
 */
import type { DiagnosticNode, DiagnosticAnswer, BodyRegion } from '../data/knowledgebase/types';
import { getDiagnosticNode, queryKnowledgebase } from '../data/knowledgebase';
import type { KnowledgebaseQueryResult } from '../data/knowledgebase/types';

/**
 * Gets the first diagnostic node for a body region.
 * Returns the root node of the first injury's diagnostic tree in that region.
 */
export function getStartNode(region: BodyRegion): DiagnosticNode | null {
  const rootId = `${region}-root`;
  return getDiagnosticNode(rootId) ?? null;
}

/**
 * Gets the next node based on user selection.
 */
export function getNextNode(currentNodeId: string, selectedOptionIndex: number): DiagnosticNode | null {
  const current = getDiagnosticNode(currentNodeId);
  if (!current) return null;

  if (current.nextNodeId) {
    return getDiagnosticNode(current.nextNodeId) ?? null;
  }

  if (current.options && current.options[selectedOptionIndex]) {
    const nextId = current.options[selectedOptionIndex].nextNodeId;
    return getDiagnosticNode(nextId) ?? null;
  }

  return null;
}

/**
 * Resolves a diagnosis result from a result node.
 * Returns null with the "not in knowledgebase" message if no match.
 */
export function resolveResult(resultNode: DiagnosticNode): KnowledgebaseQueryResult {
  if (resultNode.type !== 'result' || !resultNode.resultInjuryId) {
    return queryKnowledgebase(null);
  }
  return queryKnowledgebase(resultNode.resultInjuryId);
}

/**
 * Records a user's answer during the diagnostic flow.
 */
export function recordAnswer(
  nodeId: string,
  selectedLabel: string,
  nextNodeId: string
): DiagnosticAnswer {
  return {
    nodeId,
    selectedOptionLabel: selectedLabel,
    nextNodeId,
    timestamp: Date.now(),
  };
}
