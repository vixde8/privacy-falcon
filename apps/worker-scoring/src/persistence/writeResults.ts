import { getDb } from "./mongo";

export async function writeResults(params: {
  scanId: string;
  score: number;
  grade: string;
  confidence: number;
  findings: any[];
  signals: any[];
}) {
  const db = await getDb();

  await db.collection("results").insertOne({
    scan_id: params.scanId,
    score: params.score,
    grade: params.grade,
    confidence: params.confidence,
    findings: params.findings,
    signals: params.signals,
    ruleset_version: "latest",
    created_at: new Date(),
  });
}
