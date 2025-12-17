/**
 * Scan Execution Service.
 *
 * Executes a single scan job end-to-end:
 * - enforces lifecycle transitions
 * - runs (placeholder) scanning phase
 * - runs real scoring via worker-scoring
 * - persists final outputs
 */

import type { Db } from "mongodb";
import { createScanRepository } from "../persistence/scan.repository";
import {
  transitionScanState,
  isTerminalState,
} from "../domain/lifecycle/scanLifecycle";
import { runScoring } from "../scoring/scoringAdapter";

export async function executeScan(
  db: Db,
  scan_id: string
): Promise<void> {
  const repo = createScanRepository(db);
  const scan = await repo.findByScanId(scan_id);

  if (!scan) {
    throw new Error(`Scan not found: ${scan_id}`);
  }

  // Guard: do not re-run terminal scans
  if (isTerminalState(scan.status)) {
    return;
  }

  try {
    /* ─────────────────────────────
     * queued → running
     * ───────────────────────────── */
    transitionScanState(scan.status, "running");
    await repo.updateJobState(scan_id, {
      status: "running",
      progress: { phase: "running", percent: 5 },
    });

    /* ─────────────────────────────
     * running → scanning
     * (placeholder phase for future crawler)
     * ───────────────────────────── */
    transitionScanState("running", "scanning");
    await repo.updateJobState(scan_id, {
      status: "scanning",
      progress: { phase: "scanning", percent: 30 },
    });

    /**
     * NOTE:
     * Real crawling + detection will plug in here later (PF-271+).
     * For PF-270, scoring can already run with minimal inputs.
     */

    /* ─────────────────────────────
     * scanning → scoring
     * ───────────────────────────── */
    transitionScanState("scanning", "scoring");
    await repo.updateJobState(scan_id, {
      status: "scoring",
      progress: { phase: "scoring", percent: 70 },
    });

    /* ─────────────────────────────
     * REAL SCORING (PF-270)
     * ───────────────────────────── */
    const scoringResult = await runScoring({
      url: scan.meta.url,
    });

    /**
     * Persist scoring outputs.
     * These fields are read directly by the Results API (PF-260).
     */
    await repo.persistScanResult(scan_id, {
      score: scoringResult.score,
      grade: scoringResult.grade,
      confidence: scoringResult.confidence,
      explainability: scoringResult.explainability,
    });

    /* ─────────────────────────────
     * scoring → completed
     * ───────────────────────────── */
    transitionScanState("scoring", "completed");
    await repo.updateJobState(scan_id, {
      status: "completed",
      progress: { phase: "completed", percent: 100 },
      completed_at: new Date(),
    });
  } catch (err: any) {
    /* ─────────────────────────────
     * FAILURE PATH
     * ───────────────────────────── */
    await repo.updateJobState(scan_id, {
      status: "failed",
      progress: { phase: "failed", percent: 100 },
      error: {
        type: "permanent",
        code: "EXECUTION_ERROR",
        message: err?.message ?? "Unknown execution error",
      },
    });
  }
}
