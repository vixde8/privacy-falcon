/**
 * PF-220 Grading sanity test
 */

import {
  gradeScore,
  validateAggregationConsistency,
  AggregationResult
} from "../../scoring/framework";

const aggregation: AggregationResult = {
  final_score: 62,
  dimensions: {
    tracking_risk: { score: 55, penalties: [] },
    consent_compliance: { score: 100, penalties: [] },
    data_exposure: { score: 100, penalties: [] },
    transparency: { score: 100, penalties: [] },
    control_and_choice: { score: 100, penalties: [] }
  }
};

validateAggregationConsistency(aggregation);

const graded = gradeScore(aggregation.final_score);

console.log(graded);
