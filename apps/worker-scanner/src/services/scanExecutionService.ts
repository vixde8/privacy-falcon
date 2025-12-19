/**
 * Scan Execution Service.
 *
 * Executes a single scan job end-to-end:
 * - lifecycle transitions
 * - crawl (browser instrumentation)
 * - tracker detection
 * - normalization (canonical output)
 * - scoring
 * - persistence
 */

import type { Db } from "mongodb";
import { createScanRepository } from "../persistence/scan.repository";
import {
  transitionScanState,
  isTerminalState
} from "../domain/lifecycle/scanLifecycle";

import { runCrawl } from "../crawl/crawlController";
import { detectTrackers } from "../detection/trackerDetector";
import { normalizeScanResult } from "../output/normalizeScanResult";
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

  if (isTerminalState(scan.status)) {
    return;
  }

  try {
    /* queued → running */
    if (scan.status === "queued") {
      transitionScanState(scan.status, "running");
      await repo.updateJobState(scan_id, {
        status: "running",
        progress: { phase: "running", percent: 5 }
      });
    }

    /* running → scanning */
    transitionScanState("running", "scanning");
    await repo.updateJobState(scan_id, {
      status: "scanning",
      progress: { phase: "scanning", percent: 25 }
    });

    /* 1️⃣ Crawl site */
    const crawlResult = await runCrawl(scan.meta.url);
    const {
      startedAt,
      finishedAt,
      scripts,
      network,
      cookies
    } = crawlResult;

    /* 2️⃣ Detect trackers */
    const signals = detectTrackers({
      scripts,
      network,
      cookies
    });

    /* 3️⃣ Normalize scan output */
    const normalized = normalizeScanResult({
      url: scan.meta.url,
      startedAt,
      finishedAt,
      scripts,
      network,
      cookies,
      signals
    });

    /* scanning → scoring */
    transitionScanState("scanning", "scoring");
    await repo.updateJobState(scan_id, {
      status: "scoring",
      progress: { phase: "scoring", percent: 70 }
    });

    /* 4️⃣ Score normalized output */
    const scoringResult = await runScoring(normalized);

    /* scoring → completed */
    transitionScanState("scoring", "completed");
    await repo.updateJobState(scan_id, {
      status: "completed",
      progress: { phase: "completed", percent: 100 },
      ruleset_version: scoringResult.ruleset_version ?? "latest",
      score: scoringResult.score,
      grade: scoringResult.grade,
      confidence: scoringResult.confidence,
      explainability: scoringResult.explainability,
      completed_at: new Date()
    });
  } catch (err: any) {
    await repo.updateJobState(scan_id, {
      status: "failed",
      progress: { phase: "failed", percent: 100 },
      error: {
        type: "permanent",
        code: "EXECUTION_ERROR",
        message: err?.message ?? "Unknown execution error"
      }
    });
  }
}
