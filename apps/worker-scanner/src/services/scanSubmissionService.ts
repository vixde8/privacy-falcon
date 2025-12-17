/**
 * Scan Submission Service.
 *
 * Creates new scan jobs in the `queued` state.
 * This is the single authoritative entrypoint for scan creation.
 */

import { randomUUID } from "crypto";
import type { Db } from "mongodb";
import { createScanRepository } from "../persistence/scan.repository";

export interface SubmitScanInput {
  target_url: string;
  ruleset_version?: string;
}

export interface SubmitScanResult {
  scan_id: string;
}

export async function submitScan(
  db: Db,
  input: SubmitScanInput
): Promise<SubmitScanResult> {
  const repo = createScanRepository(db);

  const scan_id = randomUUID();
  const now = new Date();

  await repo.save({
    scan_id,
    status: "queued",
    progress: {
      phase: "queued",
      percent: 0,
    },
    ruleset_version: input.ruleset_version ?? "latest",
    created_at: now,
    updated_at: now,
    meta: {
      url: input.target_url,
    } as any,
  });

  return { scan_id };
}
