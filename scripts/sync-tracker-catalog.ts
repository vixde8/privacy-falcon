/**
 * Tracker Catalog Sync.
 *
 * Synchronizes the tracker catalog from the file system
 * to the MongoDB database.
 */
import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = "privacy_falcon";
const COLLECTION = "tracker_catalog";
const CATALOG_DIR = path.resolve("catalog/trackers");

async function run() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();

  const db = client.db(DB_NAME);
  const col = db.collection(COLLECTION);

  const files = fs.readdirSync(CATALOG_DIR);

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const fullPath = path.join(CATALOG_DIR, file);
    const data = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

    if (!data.tracker_id) {
      throw new Error(`Missing tracker_id in ${file}`);
    }

    await col.updateOne(
      { _id: data.tracker_id },
      {
        $set: {
          ...data,
          _meta: {
            synced_from: "repo",
            synced_at: new Date()
          }
        }
      },
      { upsert: true }
    );

    console.log(`✔ Synced ${data.tracker_id}`);
  }

  await client.close();
  console.log("✅ Tracker catalog sync complete");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
