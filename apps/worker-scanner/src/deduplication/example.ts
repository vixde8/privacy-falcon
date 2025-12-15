/**
 * Detection Deduplication Example.
 *
 * Demonstrates merging duplicate detections safely.
 */

import { deduplicateDetections } from "./deduplicator";
import { ClassifiedDetection } from "./types";

const detections: ClassifiedDetection[] = [
  {
    tracker_id: "google_analytics",
    severity: "medium",
    confidence: "medium",
    confidence_score: 0.5,
    signals: ["network"]
  },
  {
    tracker_id: "google_analytics",
    severity: "medium",
    confidence: "high",
    confidence_score: 0.9,
    signals: ["script"]
  },
  {
    tracker_id: "meta_pixel",
    severity: "high",
    confidence: "medium",
    confidence_score: 0.6,
    signals: ["network"]
  }
];

const result = deduplicateDetections(detections);

console.log(JSON.stringify(result, null, 2));
