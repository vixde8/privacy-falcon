/**
 * Worker Loop
 *
 * Polls MongoDB for queued scans,
 * claims one atomically,
 * and executes it end-to-end.
 */

import { connectMongo } from "../persistence/mongo";
import { createScanRepository } from "../persistence/scan.repository";
import { executeScan } from "../services/scanExecutionService";

const POLL_INTERVAL_MS = 3000;
let isPolling = false;

async function pollOnce() {
  if (isPolling) return; // prevent overlap
  isPolling = true;

  try {
    console.log("🔍 Worker poll tick");

    const db = await connectMongo();
    const repo = createScanRepository(db);

    const scan = await repo.claimNextQueuedScan();

    if (!scan) {
      console.log("📭 No queued scans found");
      return;
    }

    console.log(
      `🚀 Claimed scan ${scan.scan_id} | url=${scan.meta.url}`
    );

    await executeScan(db, scan.scan_id);

    console.log(`✅ Finished scan ${scan.scan_id}`);
  } catch (err) {
    console.error("❌ Worker poll error:", err);
  } finally {
    isPolling = false;
  }
}

export function startWorkerLoop() {
  console.log("🔁 Worker loop started");
  setInterval(pollOnce, POLL_INTERVAL_MS);
}

startWorkerLoop();
