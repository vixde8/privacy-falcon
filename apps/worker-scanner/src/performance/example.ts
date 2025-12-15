/**
 * Performance & Stability Example.
 *
 * Demonstrates guarded, deterministic detection output.
 */

import { guardFinalDetections } from "./pipelineGuard";

const detections = [
  {
    tracker_id: "meta_pixel",
    signals: ["network"]
  },
  {
    tracker_id: "google_analytics",
    signals: ["script", "network"]
  }
];

const result = guardFinalDetections(detections);

console.log(JSON.stringify(result, null, 2));
