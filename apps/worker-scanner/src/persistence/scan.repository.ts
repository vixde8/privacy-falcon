/**
 * Scan Repository
 *
 * The ONLY layer allowed to touch the `scans` collection.
 * Provides atomic job claiming for workers.
 */

import type { Db, Collection } from "mongodb";
import type { NormalizedScanResult } from "../output/normalizeScanResult";

export type ScanStatus =
  | "queued"
  | "running"
  | "scanning"
  | "scoring"
  | "completed"
  | "failed";

export type ScanDocument = NormalizedScanResult & {
  _id?: string;

  scan_id: string;
  status: ScanStatus;

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

  /* -------------------- CREATE -------------------- */

  async function save(scan: ScanDocument) {
    const now = new Date();
    const result = await collection.insertOne({
      ...scan,
      created_at: now,
      updated_at: now,
    });
    return result.insertedId.toString();
  }

  /* -------------------- READ -------------------- */

  async function findByScanId(scan_id: string) {
    return collection.findOne({ scan_id });
  }

  async function findByUrl(url: string) {
    return collection.find({ "meta.url": url }).toArray();
  }

  /* -------------------- ATOMIC CLAIM -------------------- */

  /**
   * Atomically claims ONE queued scan and marks it as running.
   * This is CRITICAL for correctness.
   */
  async function claimNextQueuedScan(): Promise<ScanDocument | null> {
    const result = await collection.findOneAndUpdate(
      { status: "queued" },
      {
        $set: {
          status: "running",
          progress: { phase: "running", percent: 5 },
          updated_at: new Date(),
        },
      },
      {
        sort: { created_at: 1 },
        returnDocument: "before",
      }
    );

    return result as unknown as ScanDocument | null;
  }

  /* -------------------- UPDATE -------------------- */

  async function updateJobState(
    scan_id: string,
    update: Partial<
      Pick<ScanDocument, "status" | "progress" | "completed_at" | "error">
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

  async function persistScanResult(
    scan_id: string,
    result: Partial<NormalizedScanResult & {
      score: number;
      grade: string;
      confidence: number;
      explainability: any;
      ruleset_version: string;
    }>
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

  return {
    save,
    findByScanId,
    findByUrl,
    claimNextQueuedScan,
    updateJobState,
    persistScanResult,
  };
}
