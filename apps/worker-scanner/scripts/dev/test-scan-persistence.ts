/**
 * PF-264 Sanity Test.
 *
 * Verifies scan persistence layer works end-to-end.
 * Uses an explicit async entrypoint to support CJS execution.
 */

import {
  createScanRepository,
} from "../../src/persistence/scan.repository";
import { getMongoDb } from "../../src/persistence/mongo";

async function main() {
  const db = await getMongoDb();
  const repo = createScanRepository(db);

  const scanId = "pf264-test";

  await repo.save({
    scan_id: scanId,
    status: "queued",
    progress: {
      phase: "queued",
      percent: 0,
    },
    ruleset_version: "v1",
    created_at: new Date(),
    updated_at: new Date(),

    // minimal normalized scan fields
    meta: {
      url: "https://example.com",
    } as any,
  });

  const result = await repo.findByScanId(scanId);
  console.log("Saved scan:", result);
}

main().catch((err) => {
  console.error("PF-264 test failed:", err);
  process.exit(1);
});
