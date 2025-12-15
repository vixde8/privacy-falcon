/**
 * Suppression Engine.
 *
 * Applies suppression rules to classified detections.
 */

import { SuppressionRule } from "./suppressionTypes";

type ClassifiedDetection = {
  tracker_id: string;
  signals: string[];
};

export function applySuppressions(
  detections: ClassifiedDetection[],
  rules: SuppressionRule[]
): ClassifiedDetection[] {
  return detections.filter(detection => {
    for (const rule of rules) {
      if (
        rule.level === "tracker" &&
        rule.tracker_id === detection.tracker_id
      ) {
        return false;
      }

      if (
        rule.level === "signal" &&
        rule.tracker_id === detection.tracker_id &&
        rule.signal_type &&
        detection.signals.includes(rule.signal_type)
      ) {
        return false;
      }
    }
    return true;
  });
}
