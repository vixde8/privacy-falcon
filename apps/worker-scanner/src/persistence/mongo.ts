/**
 * Mongo Connection Helper
 *
 * Handles MongoDB connection for worker-scanner.
 * Supports both local (host) and dockerized environments.
 */

import { MongoClient, Db } from "mongodb";

const MONGO_URI =
  process.env.MONGO_URI ?? "mongodb://localhost:27017";

const MONGO_DB =
  process.env.MONGO_DB ?? "privacy_falcon";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectMongo(): Promise<Db> {
  if (db) return db;

  console.log("🧪 Worker Mongo URI:", MONGO_URI);
  console.log("🧪 Worker Mongo DB:", MONGO_DB);

  client = new MongoClient(MONGO_URI);
  await client.connect();

  db = client.db(MONGO_DB);
  return db;
}
