/**
 * PF-217 Sanity Test
 * Temporary local test for penalty engine
 */

import { applyPenalty } from "../../scoring/framework";

const penalty = applyPenalty({
  detection: {
    tracker_id: "meta_pixel",
    severity: "high",
    confidence: "medium",
    confidence_score: 0.6,
    signals: ["network"]
  },
  dimension: "tracking_risk",
  jurisdiction: "EU",
  reason: "Tracking without prior consent"
});

console.log("PF-217 penalty result:");
console.log(JSON.stringify(penalty, null, 2));
