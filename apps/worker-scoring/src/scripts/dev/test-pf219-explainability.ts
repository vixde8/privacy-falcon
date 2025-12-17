/**
 * PF-219 sanity test
 */

import {
  formatScoreExplanation,
  AggregationResult
} from "../../scoring/framework";

const aggregation: AggregationResult = {
  final_score: 62,
  dimensions: {
    tracking_risk: {
      score: 55,
      penalties: [
        {
          detector: "meta_pixel",
          severity: "high",
          dimension: "tracking_risk",
          base_penalty: -15,
          confidence_score: 0.6,
          jurisdiction_multiplier: 1.2,
          final_penalty: -10.8,
          reason: "Tracking without prior consent"
        }
      ]
    },
    consent_compliance: { score: 100, penalties: [] },
    data_exposure: { score: 100, penalties: [] },
    transparency: { score: 100, penalties: [] },
    control_and_choice: { score: 100, penalties: [] }
  }
};

console.log(
  JSON.stringify(formatScoreExplanation(aggregation), null, 2)
);
