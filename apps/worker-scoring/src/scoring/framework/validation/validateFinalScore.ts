/**
 * PF-223 Validation Gate
 * Rejects invalid or inconsistent score outputs.
 */

import { AggregationResult } from "../aggregation/aggregation.types";
import { ScoreExplanation } from "../explainability/explainability.types";
import { Dimension } from "../../types/dimension";

const ALL_DIMENSIONS: Dimension[] = [
  "tracking_risk",
  "consent_compliance",
  "data_exposure",
  "transparency",
  "control_and_choice"
];

export function validateFinalScore(params: {
  aggregation: AggregationResult;
  explanation: ScoreExplanation;
  weights: Record<Dimension, number>;
}): void {
  const { aggregation, explanation, weights } = params;

  // 1️⃣ Final score bounds
  if (
    aggregation.final_score < 0 ||
    aggregation.final_score > 100
  ) {
    throw new Error(
      `Invalid final score: ${aggregation.final_score}`
    );
  }

  // 2️⃣ All dimensions present
  for (const dim of ALL_DIMENSIONS) {
    if (!aggregation.dimensions[dim]) {
      throw new Error(`Missing dimension: ${dim}`);
    }
  }

  // 3️⃣ Weights sum to 1.0
  const weightSum = Object.values(weights).reduce(
    (a, b) => a + b,
    0
  );

  if (Math.abs(weightSum - 1) > 0.001) {
    throw new Error(
      `Invalid weight sum: ${weightSum}`
    );
  }

  // 4️⃣ Explainability must be non-empty
  if (
    !explanation ||
    !explanation.dimensions ||
    explanation.dimensions.length === 0
  ) {
    throw new Error(
      "Explainability output is empty"
    );
  }
}
