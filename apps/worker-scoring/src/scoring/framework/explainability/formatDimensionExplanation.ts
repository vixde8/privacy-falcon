/**
 * Formats explanation for a single dimension.
 * No scoring logic. No mutation.
 */

import { Dimension } from "../../types/dimension";
import { DimensionAggregation } from "../aggregation/aggregation.types";
import { DimensionExplanation } from "./explainability.types";

export function formatDimensionExplanation(
  dimension: Dimension,
  aggregation: DimensionAggregation
): DimensionExplanation {
  const { score, penalties } = aggregation;

  if (penalties.length === 0) {
    return {
      dimension,
      score,
      summary: "No privacy issues detected for this category.",
      issues: []
    };
  }

  return {
    dimension,
    score,
    summary: `Detected ${penalties.length} issue(s) impacting this category.`,
    issues: penalties.map((p) => ({
      detector: p.detector,
      impact: p.final_penalty,
      reason: p.reason
    }))
  };
}
