/**
 * Score Scan
 *
 * Core scoring entrypoint.
 * Responsible for:
 * - Executing scoring logic
 * - Producing final score output
 * - Persisting results with correct scan_id
 *
 * NOTE:
 * This file MUST NEVER invent scan IDs.
 */

import { MongoClient } from "mongodb";

/**
 * Scoring output contract
 */
export interface ScoringResult {
  score: number;
  grade: string;
  confidence: number;
  explainability: object;
}

/**
 * Scoring input contract
 */
export interface ScoringInput {
  scanId: string;
  url: string;
}

/**
 * Mongo connection (local dev)
 * Keep this minimal – persistence is orchestration-level.
 */
const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("privacy_falcon");

/**
 * Main scoring function
 */
export async function scoreScan(
  input: ScoringInput
): Promise<ScoringResult> {
  /**
   * HARD GUARD
   * Scoring without scan_id is forbidden.
   */
  if (!input.scanId) {
    throw new Error("scoreScan called without scanId");
  }

  console.log(`Scoring scan ${input.scanId} for ${input.url}`);

  // Ensure Mongo connection
  if (!client.topology?.isConnected()) {
    await client.connect();
  }

  /**
   * SCORING LOGIC (dummy for now)
   * This will later include:
   * - aggregation
   * - penalties
   * - grading
   * - explainability
   */
  const result: ScoringResult = {
    score: 100,
    grade: "A",
    confidence: 1,
    explainability: {},
  };

  /**
   * PERSIST RESULTS (CRITICAL)
   * scan_id MUST match scans.scan_id
   */
  await db.collection("results").insertOne({
    scan_id: input.scanId,
    score: result.score,
    grade: result.grade,
    confidence: result.confidence,
    explainability: result.explainability,
    ruleset_version: "latest",
    created_at: new Date(),
  });

  return result;
}
