/**
 * Confidence Calculator.
 *
 * Calculates a confidence score based on a set of raw detections,
 * and classifies the score into a confidence level.
 */
import { RawDetection } from "./types";

export function calculateConfidenceScore(
  detections: RawDetection[]
): number {
  return detections.reduce(
    (sum, d) => sum + d.confidence_weight,
    0
  );
}

export function classifyConfidence(
  score: number
): "low" | "medium" | "high" {
  if (score >= 0.7) return "high";
  if (score >= 0.4) return "medium";
  return "low";
}
