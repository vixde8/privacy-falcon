/**
 * Scoring Adapter
 *
 * Bridges worker-scanner execution with worker-scoring engine.
 * This is the ONLY place allowed to import worker-scoring.
 */

import { scoreScan, ScoringResult } from "@pf/worker-scoring";

export interface ScoringInput {
  scanId: string;
  url: string;
  // later: trackers, cookies, network evidence, etc.
}

export async function runScoring(
  input: ScoringInput
): Promise<ScoringResult> {
  /**
   * HARD GUARANTEE:
   * Scoring is impossible without scanId.
   * This preserves referential integrity.
   */
  if (!input.scanId) {
    throw new Error("runScoring called without scanId");
  }

  return scoreScan({
    scanId: input.scanId,
    url: input.url,
  });
}
