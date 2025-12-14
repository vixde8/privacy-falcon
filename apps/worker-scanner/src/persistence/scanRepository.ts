/**
 * Scan Repository.
 *
 * Persists normalized scan results to MongoDB
 * and provides basic retrieval helpers.
 */

import { Collection, Db } from "mongodb";
import type { NormalizedScanResult } from "../output/normalizeScanResult";

export type ScanDocument = NormalizedScanResult & {
  _id?: string;
};

export function createScanRepository(db: Db) {
  const collection: Collection<ScanDocument> =
    db.collection("scans");

  async function save(scan: NormalizedScanResult) {
    const result = await collection.insertOne(scan);
    return result.insertedId.toString();
  }

  async function findByUrl(url: string) {
    return collection.find({ "meta.url": url }).toArray();
  }

  return {
    save,
    findByUrl
  };
}
