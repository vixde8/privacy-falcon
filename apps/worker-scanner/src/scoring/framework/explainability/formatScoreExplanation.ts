/**
 * Formats the final explainability response.
 */

import { AggregationResult } from "../aggregation/aggregation.types";
import { ScoreExplanation } from "./explainability.types";
import { formatDimensionExplanation } from "./formatDimensionExplanation";
import { Dimension } from "../types/dimension";

export function formatScoreExplanation(
  aggregation: AggregationResult
): ScoreExplanation {
  const dimensions = Object.entries(aggregation.dimensions).map(
    ([dimension, dimAgg]) =>
      formatDimensionExplanation(
        dimension as Dimension,
        dimAgg
      )
  );

  const score = aggregation.final_score;

  let summary: string;
  if (score >= 90) {
    summary = "Strong privacy posture with minimal issues detected.";
  } else if (score >= 75) {
    summary = "Good privacy posture with some minor issues.";
  } else if (score >= 60) {
    summary = "Moderate privacy risks detected that should be addressed.";
  } else if (score >= 40) {
    summary = "High privacy risk due to multiple compliance gaps.";
  } else {
    summary = "Severe privacy risks detected requiring urgent action.";
  }

  return {
    final_score: score,
    summary,
    dimensions
  };
}
