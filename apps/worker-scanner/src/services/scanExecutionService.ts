/**
 * Scan Execution Service.
 *
 * Executes a single scan job end-to-end:
 * - enforces lifecycle transitions
 * - runs crawl + detection
 * - runs scoring
 * - persists outputs
 */

import type { Db } from "mongodb";
import { createScanRepository } from "../persistence/scan.repository";
import {
  transitionScanState,
  isTerminalState,
} from "../domain/lifecycle/scanLifecycle";

export async function executeScan(
  db: Db,
  scan_id: string
): Promise<void> {
  const repo = createScanRepository(db);
  const scan = await repo.findByScanId(scan_id);

  if (!scan) {
    throw new Error(`Scan not found: ${scan_id}`);
  }

  if (isTerminalState(scan.status)) {
    return;
  }

  // queued → running
  transitionScanState(scan.status, "running");
  await repo.updateJobState(scan_id, {
    status: "running",
    progress: { phase: "running", percent: 5 },
  });

  try {
    // running → scanning
    transitionScanState("running", "scanning");
    await repo.updateJobState(scan_id, {
      status: "scanning",
      progress: { phase: "scanning", percent: 30 },
    });

    // TODO: hook crawler + detectors here
    // const crawlOutput = await runCrawler(scan.meta.url);

    // scanning → scoring
    transitionScanState("scanning", "scoring");
    await repo.updateJobState(scan_id, {
      status: "scoring",
      progress: { phase: "scoring", percent: 70 },
    });

    // TODO: invoke worker-scoring
    // const score = await scoreScan(crawlOutput);

    // scoring → completed
    transitionScanState("scoring", "completed");
    await repo.updateJobState(scan_id, {
      status: "completed",
      progress: { phase: "completed", percent: 100 },
      completed_at: new Date(),
    });
  } catch (err: any) {
    await repo.updateJobState(scan_id, {
      status: "failed",
      progress: { phase: "failed", percent: 100 },
      error: {
        type: "permanent",
        code: "EXECUTION_ERROR",
        message: err.message,
      },
    });
  }
}
