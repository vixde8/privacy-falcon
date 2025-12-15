/**
 * Detection Deduplicator.
 *
 * Merges multiple detections of the same tracker into one.
 */

import {
  ClassifiedDetection,
  DeduplicatedDetection
} from "./types";

export function deduplicateDetections(
  detections: ClassifiedDetection[]
): DeduplicatedDetection[] {
  const map = new Map<string, ClassifiedDetection>();

  for (const detection of detections) {
    const existing = map.get(detection.tracker_id);

    if (!existing) {
      map.set(detection.tracker_id, detection);
      continue;
    }

    // Keep higher confidence score
    const chosen =
      detection.confidence_score > existing.confidence_score
        ? detection
        : existing;

    map.set(detection.tracker_id, {
      ...chosen,
      signals: Array.from(
        new Set([
          ...existing.signals,
          ...detection.signals
        ])
      )
    });
  }

  return Array.from(map.values());
}
