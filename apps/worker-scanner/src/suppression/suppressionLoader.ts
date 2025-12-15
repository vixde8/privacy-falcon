/**
 * Suppression Rule Loader.
 *
 * Loads enabled suppression rules from persistent storage.
 */

import { MongoClient } from "mongodb";
import { SuppressionRule } from "./suppressionTypes";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017";

export async function loadSuppressionRules(): Promise<SuppressionRule[]> {
  const client = new MongoClient(MONGO_URI);
  await client.connect();

  const rules = await client
    .db("privacy_falcon")
    .collection("suppression_rules")
    .find({ enabled: true })
    .toArray();

  await client.close();
  return rules as SuppressionRule[];
}
