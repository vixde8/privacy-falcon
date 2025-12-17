/**
 * MongoDB Connection Helper.
 *
 * Owns MongoDB connection lifecycle for worker-scanner.
 * No business logic is allowed in this file.
 */

import { MongoClient, Db, Collection } from "mongodb";
import { ScanDocument } from "./scan.types";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.MONGO_DB || "privacy_falcon";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getMongoDb(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(MONGO_URI);
  await client.connect();

  db = client.db(DB_NAME);
  return db;
}

export async function getScansCollection(): Promise<
  Collection<ScanDocument>
> {
  const database = await getMongoDb();
  return database.collection<ScanDocument>("scans");
}
