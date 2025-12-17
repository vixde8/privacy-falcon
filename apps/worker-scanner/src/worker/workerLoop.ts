/**
 * Worker Loop.
 *
 * Continuously polls for queued scans and executes them.
 * This process is long-running and separate from the API.
 */

import { connectMongo } from "../persistence/mongo";
import { createScanRepository } from "../persistence/scan.repository";
import { executeScan } from "../services/scanExecutionService";

const POLL_INTERVAL_MS = 3000;

async function pollOnce() {
  const { db } = await connectMongo();
  const repo = createScanRepository(db);

  const queuedScans = await repo.findQueuedScans?.();

  if (!queuedScans || queuedScans.length === 0) {
    return;
  }

  for (const scan of queuedScans) {
    await executeScan(db, scan.scan_id);
  }
}

export async function startWorkerLoop() {
  console.log("🔁 Worker loop started");

  while (true) {
    try {
      await pollOnce();
    } catch (err) {
      console.error("Worker loop error:", err);
    }

    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
}

if (require.main === module) {
  startWorkerLoop();
}
