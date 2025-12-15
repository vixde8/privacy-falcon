/**
 * Deduplication Types.
 *
 * Defines input and output shapes for detection deduplication.
 */

export type ClassifiedDetection = {
  tracker_id: string;
  severity: "low" | "medium" | "high";
  confidence: "low" | "medium" | "high";
  confidence_score: number;
  signals: string[];
};

export type DeduplicatedDetection = ClassifiedDetection;
