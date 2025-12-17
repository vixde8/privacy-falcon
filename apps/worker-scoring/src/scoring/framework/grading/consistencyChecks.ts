/**
 * Validates consistency of an aggregated score.
 */

import { AggregationResult } from "../aggregation/aggregation.types";
import { Dimension } from "../../types/dimension";

const ALL_DIMENSIONS: Dimension[] = [
  "tracking_risk",
  "consent_compliance",
  "data_exposure",
  "transparency",
  "control_and_choice"
];

export function validateAggregationConsistency(
  aggregation: AggregationResult
): void {
  // Final score bounds
  if (
    aggregation.final_score < 0 ||
    aggregation.final_score > 100
  ) {
    throw new Error(
      `Final score out of bounds: ${aggregation.final_score}`
    );
  }

  // Dimension completeness
  for (const dim of ALL_DIMENSIONS) {
    if (!aggregation.dimensions[dim]) {
      throw new Error(`Missing dimension: ${dim}`);
    }

    const score = aggregation.dimensions[dim].score;

    if (score < 0 || score > 100) {
      throw new Error(
        `Dimension ${dim} score out of bounds: ${score}`
      );
    }
  }
}
