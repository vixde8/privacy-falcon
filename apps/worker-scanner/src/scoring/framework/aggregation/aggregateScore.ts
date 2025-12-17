/**
 * Aggregates dimension scores into a final weighted score.
 */

import { AggregationInput, AggregationResult } from "./aggregation.types";
import { aggregateDimensions } from "./aggregateDimensions";

export function aggregateScore(
  input: AggregationInput
): AggregationResult {
  const { penalties, weights } = input;

  const dimensions = aggregateDimensions(penalties);

  let finalScore = 0;

  for (const [dimension, aggregation] of Object.entries(dimensions)) {
    const weight = weights[dimension as keyof typeof weights];
    finalScore += aggregation.score * weight;
  }

  finalScore = Number(
    Math.max(0, Math.min(100, finalScore)).toFixed(2)
  );

  return {
    dimensions,
    final_score: finalScore
  };
}
