/**
 * Scan Repository.
 *
 * Persists and retrieves scan jobs from MongoDB.
 * This repository is the ONLY layer allowed to touch the `scans` collection.
 *
 * Responsibilities:
 * - Create new scan jobs
 * - Retrieve scans by id or query
 * - Update job lifecycle state and progress
 * - Provide worker pickup helpers (queued scans)
 */

import type { Db, Collection, WithId, Document } from "mongodb";
import type { NormalizedScanResult } from "../output/normalizeScanResult";

/**
 * ScanDocument
 *
 * Canonical MongoDB representation of a scan job.
 * This shape is intentionally flexible and evolves over time.
 */
export type ScanDocument = NormalizedScanResult & {
  _id?: string;

  scan_id: string;
  status: "queued" | "running" | "scanning" | "scoring" | "completed" | "failed";

  progress: {
    phase: string;
    percent: number;
  };

  ruleset_version: string;

  created_at: Date;
  updated_at: Date;
  completed_at?: Date;

  error?: {
    type: "transient" | "permanent";
    code: string;
    message: string;
  };

  meta: {
    url: string;
    [key: string]: any;
  };
};

export function createScanRepository(db: Db) {
  const collection: Collection<ScanDocument> = db.collection("scans");

  /**
   * save
   *
   * Persists a new scan job.
   * Used by backend submission and local CLI.
   */
  async function save(scan: ScanDocument) {
    const result = await collection.insertOne({
      ...scan,
      created_at: scan.created_at ?? new Date(),
      updated_at: scan.updated_at ?? new Date(),
    });

    return result.insertedId.toString();
  }

  /**
   * findByScanId
   *
   * Retrieves a scan job by scan_id.
   */
  async function findByScanId(scan_id: string): Promise<ScanDocument | null> {
    return collection.findOne({ scan_id });
  }

  /**
   * findByUrl
   *
   * Retrieves all scans executed against a given URL.
   * Mostly useful for debugging and local dev.
   */
  async function findByUrl(url: string): Promise<ScanDocument[]> {
    return collection.find({ "meta.url": url }).toArray();
  }

  /**
   * updateJobState
   *
   * Updates scan lifecycle state and progress.
   * Lifecycle validation MUST happen before calling this.
   */
  async function updateJobState(
    scan_id: string,
    update: Partial<
      Pick<
        ScanDocument,
        | "status"
        | "progress"
        | "completed_at"
        | "error"
      >
    >
  ) {
    await collection.updateOne(
      { scan_id },
      {
        $set: {
          ...update,
          updated_at: new Date(),
        },
      }
    );
  }

  /**
   * persistScanResult
   *
   * Persists final normalized scan output and score.
   * Used at the end of successful execution.
   */
  async function persistScanResult(
    scan_id: string,
    result: Partial<NormalizedScanResult>
  ) {
    await collection.updateOne(
      { scan_id },
      {
        $set: {
          ...result,
          updated_at: new Date(),
        },
      }
    );
  }

  /**
   * findQueuedScans
   *
   * Returns scans eligible for worker pickup.
   * Limited batch size to avoid overloading workers.
   */
  async function findQueuedScans(limit = 5): Promise<ScanDocument[]> {
    return collection
      .find({ status: "queued" })
      .sort({ created_at: 1 })
      .limit(limit)
      .toArray();
  }

  return {
    save,
    findByScanId,
    findByUrl,
    updateJobState,
    persistScanResult,
    findQueuedScans,
  };
}
