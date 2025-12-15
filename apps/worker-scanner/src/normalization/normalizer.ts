/**
 * Detection Output Normalizer.
 *
 * Produces final, versioned, API-safe detection objects.
 */

import { NormalizedDetection } from "./normalizedTypes";
import { EvidenceBundle } from "../evidence/evidenceTypes";

type DeduplicatedDetection = {
  tracker_id: string;
  severity: "low" | "medium" | "high";
  confidence: "low" | "medium" | "high";
  confidence_score: number;
  signals: string[];
};

export function normalizeDetection(
  detection: DeduplicatedDetection,
  evidence: EvidenceBundle
): NormalizedDetection {
  return {
    tracker_id: detection.tracker_id,
    severity: detection.severity,
    confidence: detection.confidence,
    confidence_score: detection.confidence_score,
    signals: detection.signals,

    evidence,

    rule_version: "1.0.0",
    engine_version: "pf-100"
  };
}
