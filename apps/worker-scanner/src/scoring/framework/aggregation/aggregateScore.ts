/**
 * Aggregates applied penalties into dimension-level scores
 * and computes the final weighted score.
 *
 * PF-218: Score Aggregation Engine
 * PF-222: Edge Case Handling
 */

import { AppliedPenalty } from "../penalty/penalty.types";
import { Dimension } from "../types/dimension";

export interface DimensionScore {
  score: number;
  penalties: AppliedPenalty[];
}

export interface AggregationResult {
  dimensions: Record<Dimension, DimensionScore>;
  final_score: number;
}

const ALL_DIMENSIONS: Dimension[] = [
  "tracking_risk",
  "consent_compliance",
  "data_exposure",
  "transparency",
  "control_and_choice"
];

interface AggregateScoreInput {
  penalties: AppliedPenalty[];
  weights: Record<Dimension, number>;
}

/**
 * Aggregate penalties into a final score.
 */
export function aggregateScore(
  input: AggregateScoreInput
): AggregationResult {
  const { penalties, weights } = input;

  /**
   * PF-222: Initialize all dimensions at 100
   * (handles empty dimensions implicitly)
   */
  const dimensions: Record<Dimension, DimensionScore> =
    Object.fromEntries(
      ALL_DIMENSIONS.map((dim) => [
        dim,
        { score: 100, penalties: [] }
      ])
    ) as Record<Dimension, DimensionScore>;

  /**
   * PF-222: No detections → perfect score
   */
  if (!penalties || penalties.length === 0) {
    return {
      dimensions,
      final_score: 100
    };
  }

  /**
   * Apply penalties to dimensions
   */
  for (const penalty of penalties) {
    const dim = penalty.dimension;

    // Safety guard: ignore unknown dimensions
    if (!dimensions[dim]) continue;

    dimensions[dim].penalties.push(penalty);
    dimensions[dim].score += penalty.final_penalty;
  }

  /**
   * Clamp dimension scores to [0, 100]
   */
  for (const dim of ALL_DIMENSIONS) {
    dimensions[dim].score = Math.max(
      0,
      Math.min(100, Number(dimensions[dim].score.toFixed(2)))
    );
  }

  /**
   * Compute final weighted score
   */
  let finalScore = 0;

  for (const dim of ALL_DIMENSIONS) {
    const weight = weights[dim] ?? 0;
    finalScore += dimensions[dim].score * weight;
  }

  finalScore = Number(finalScore.toFixed(2));

  return {
    dimensions,
    final_score: finalScore
  };
}
