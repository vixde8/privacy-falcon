/**
 * Aggregates penalties into per-dimension scores.
 * Deterministic and side-effect free.
 */

import { Dimension } from "../../types/dimension";
import { AppliedPenalty } from "../penalty/penalty.types";
import { DimensionAggregation } from "./aggregation.types";

const ALL_DIMENSIONS: Dimension[] = [
  "tracking_risk",
  "consent_compliance",
  "data_exposure",
  "transparency",
  "control_and_choice"
];

export function aggregateDimensions(
  penalties: AppliedPenalty[]
): Record<Dimension, DimensionAggregation> {
  const result: Record<Dimension, DimensionAggregation> =
    Object.fromEntries(
      ALL_DIMENSIONS.map((d) => [
        d,
        { score: 100, penalties: [] }
      ])
    ) as Record<Dimension, DimensionAggregation>;

  for (const penalty of penalties) {
    result[penalty.dimension].penalties.push(penalty);
    result[penalty.dimension].score += penalty.final_penalty;
  }

  // Clamp scores to [0, 100]
  for (const dimension of ALL_DIMENSIONS) {
    result[dimension].score = Math.max(
      0,
      Math.min(100, Number(result[dimension].score.toFixed(2)))
    );
  }

  return result;
}
