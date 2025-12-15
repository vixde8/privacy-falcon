/**
 * Evidence Aggregation Example.
 *
 * Demonstrates attaching evidence and reasons to detections.
 */

import { aggregateEvidence } from "./evidenceAggregator";

const detection = {
  tracker_id: "google_analytics",
  signals: ["network", "script"]
};

const rawSignals = [
  {
    tracker_id: "google_analytics",
    signal_type: "network",
    evidence_value: "google-analytics.com"
  },
  {
    tracker_id: "google_analytics",
    signal_type: "script",
    evidence_value: "gtag("
  }
];

console.log(
  JSON.stringify(
    aggregateEvidence(detection, rawSignals),
    null,
    2
  )
);
