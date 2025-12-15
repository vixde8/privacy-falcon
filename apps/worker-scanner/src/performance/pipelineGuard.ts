/**
 * Detection Pipeline Guard.
 *
 * Wraps the PF-100 pipeline with performance and safety guards.
 */

import { withTimeGuard } from "./timeGuard";
import { enforceDetectionLimit } from "./countGuard";
import { sortDetectionsByTrackerId, sortSignals } from "./sortUtils";

type FinalDetection = {
  tracker_id: string;
  signals: string[];
};

export function guardFinalDetections(
  detections: FinalDetection[]
): FinalDetection[] {
  return withTimeGuard(
    () => {
      const limited = enforceDetectionLimit(detections, 100);

      const normalized = limited.map(d => ({
        ...d,
        signals: sortSignals(d.signals)
      }));

      return sortDetectionsByTrackerId(normalized);
    },
    50,
    "Final detection normalization"
  );
}
