/**
 * Scoring Adapter.
 *
 * Bridges worker-scanner execution with worker-scoring engine.
 * This is the ONLY place allowed to import worker-scoring.
 */

// TODO: switch to @pf/worker-scoring after dist build exists

import { scoreScan, ScoringResult } from "../../../worker-scoring/src";

export interface ScoringInput {
  url: string;
  // later: trackers, cookies, network evidence, etc.
}

export async function runScoring(
  input: ScoringInput
): Promise<ScoringResult> {
  /**
   * NOTE:
   * For now, we score with minimal input.
   * As detection improves, this input will expand.
   */
  return scoreScan({
    url: input.url,
  });
}
