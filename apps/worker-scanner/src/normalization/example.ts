/**
 * Output Normalization Example.
 *
 * Demonstrates producing final normalized detection output.
 */

import { normalizeDetection } from "./normalizer";

const detection = {
  tracker_id: "google_analytics",
  severity: "medium",
  confidence: "high",
  confidence_score: 0.9,
  signals: ["network", "script"]
};

const evidence = {
  reasons: [
    "Detected via network signal",
    "Detected via script signal"
  ],
  evidence: [
    { signal_type: "network", value: "google-analytics.com" },
    { signal_type: "script", value: "gtag(" }
  ]
};

console.log(
  JSON.stringify(
    normalizeDetection(detection, evidence),
    null,
    2
  )
);
