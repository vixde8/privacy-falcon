/**
 * Mongo Connection Helper.
 *
 * Provides a shared MongoDB connection for worker-scanner.
 * This is the ONLY place that should establish Mongo connections.
 */

import { MongoClient, Db } from "mongodb";

const MONGO_URI =
  process.env.MONGO_URI ?? "mongodb://localhost:27017";
const MONGO_DB =
  process.env.MONGO_DB ?? "privacy_falcon";

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * connectMongo
 *
 * Lazily initializes and returns Mongo client + db.
 * Safe to call multiple times.
 */
export async function connectMongo(): Promise<{ db: Db }> {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(MONGO_DB);
  }

  return { db: db! };
}
