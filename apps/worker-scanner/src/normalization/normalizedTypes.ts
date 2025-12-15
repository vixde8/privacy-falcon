/**
 * Normalized Detection Types.
 *
 * Defines the final output contract for detections.
 */

import { EvidenceBundle } from "../evidence/evidenceTypes";

export type NormalizedDetection = {
  tracker_id: string;

  severity: "low" | "medium" | "high";
  confidence: "low" | "medium" | "high";
  confidence_score: number;
  signals: string[];

  evidence: EvidenceBundle;

  rule_version: string;
  engine_version: string;
};
