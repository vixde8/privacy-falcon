/**
 * Suppression Engine Example.
 *
 * Demonstrates suppressing a known false-positive tracker.
 */

import { applySuppressions } from "./suppressionEngine";
import { SuppressionRule } from "./suppressionTypes";

const detections = [
  {
    tracker_id: "google_analytics",
    signals: ["network", "script"]
  },
  {
    tracker_id: "meta_pixel",
    signals: ["network"]
  }
];

const rules: SuppressionRule[] = [
  {
    id: "disable_ga_temporarily",
    level: "tracker",
    tracker_id: "google_analytics",
    reason: "False positive during proxy testing",
    enabled: true
  }
];

const filtered = applySuppressions(detections, rules);

console.log(JSON.stringify(filtered, null, 2));
