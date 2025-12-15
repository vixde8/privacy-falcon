/**
 * Detection Classifier.
 *
 * Takes raw detection signals and classifies them into
 * severity and confidence levels.
 */
import {
  RawDetection,
  ClassifiedDetection
} from "./types";
import {
  calculateConfidenceScore,
  classifyConfidence
} from "./confidenceCalculator";
import { resolveSeverity } from "./severityResolver";

export function classifyDetections(
  rawDetections: RawDetection[],
  trackerCatalog: Record<string, any>
): ClassifiedDetection[] {
  const grouped = new Map<string, RawDetection[]>();

  for (const d of rawDetections) {
    if (!grouped.has(d.tracker_id)) {
      grouped.set(d.tracker_id, []);
    }
    grouped.get(d.tracker_id)!.push(d);
  }

  const results: ClassifiedDetection[] = [];

  for (const [trackerId, detections] of grouped) {
    const tracker = trackerCatalog[trackerId];
    if (!tracker) continue;

    const score = calculateConfidenceScore(detections);
    const confidence = classifyConfidence(score);
    const severity = resolveSeverity(
      tracker.default_severity
    );

    results.push({
      tracker_id: trackerId,
      severity,
      confidence,
      confidence_score: Number(score.toFixed(2)),
      signals: [
        ...new Set(detections.map(d => d.signal_type))
      ]
    });
  }

  return results;
}
