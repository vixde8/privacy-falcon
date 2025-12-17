/**
 * Scan Repository.
 *
 * Persists scan job metadata and normalized scan results to MongoDB.
 * Backward compatible with tracker catalog and sync pipelines.
 */

import { Collection, Db } from "mongodb";
import type { NormalizedScanResult } from "../output/normalizeScanResult";

export type ScanStatus =
  | "queued"
  | "running"
  | "scanning"
  | "scoring"
  | "completed"
  | "failed";

export interface ScanProgress {
  phase: ScanStatus;
  percent: number;
  message?: string;
}

export interface ScanJobFields {
  scan_id: string;
  status: ScanStatus;
  progress: ScanProgress;
  ruleset_version: string;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
  error?: {
    type: "transient" | "permanent";
    code: string;
    message: string;
  };
}

export type ScanDocument = NormalizedScanResult &
  Partial<ScanJobFields> & {
    _id?: string;
  };

export function createScanRepository(db: Db) {
  const collection: Collection<ScanDocument> =
    db.collection("scans");

  /**
   * Saves a full scan document (job + results).
   */
  async function save(scan: ScanDocument) {
    const result = await collection.insertOne(scan);
    return result.insertedId.toString();
  }

  /**
   * Finds scans by URL (used by tracker sync).
   */
  async function findByUrl(url: string) {
    return collection.find({ "meta.url": url }).toArray();
  }

  /**
   * Updates job state without touching scan results.
   */
  async function updateJobState(
    scan_id: string,
    patch: Partial<ScanJobFields>
  ) {
    await collection.updateOne(
      { scan_id },
      {
        $set: {
          ...patch,
          updated_at: new Date(),
        },
      }
    );
  }

  /**
   * Finds a scan by scan_id (PF-102 APIs).
   */
  async function findByScanId(scan_id: string) {
    return collection.findOne({ scan_id });
  }

  return {
    save,
    findByUrl,
    findByScanId,
    updateJobState,
  };
}
