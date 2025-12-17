/**
 * PF-218 Sanity Test
 */

import {
  aggregateScore,
  AppliedPenalty
} from "../../scoring/framework";

const penalties: AppliedPenalty[] = [
  {
    detector: "meta_pixel",
    severity: "high",
    dimension: "tracking_risk",
    base_penalty: -15,
    confidence_score: 0.6,
    jurisdiction_multiplier: 1.2,
    final_penalty: -10.8,
    reason: "Tracking without consent"
  },
  {
    detector: "session_replay",
    severity: "medium",
    dimension: "data_exposure",
    base_penalty: -7,
    confidence_score: 0.8,
    jurisdiction_multiplier: 1.2,
    final_penalty: -6.72,
    reason: "Session replay captures PII"
  }
];

const weights = {
  tracking_risk: 0.3,
  consent_compliance: 0.25,
  data_exposure: 0.2,
  transparency: 0.15,
  control_and_choice: 0.1
};

const result = aggregateScore({ penalties, weights });

console.log(JSON.stringify(result, null, 2));
