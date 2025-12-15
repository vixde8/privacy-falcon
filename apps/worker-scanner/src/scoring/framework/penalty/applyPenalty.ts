/**
 * Applies penalty logic to a single detection + dimension.
 * This function is deterministic and side-effect free.
 */

import { PenaltyContext, AppliedPenalty } from "./penalty.types";
import {
  BASE_PENALTIES,
  JURISDICTION_MULTIPLIER
} from "./penalty.constants";
import { PENALTY_OVERRIDES } from "./penalty.config";

export function applyPenalty(
  context: PenaltyContext
): AppliedPenalty {
  const { detection, dimension, jurisdiction, reason } = context;

  const severity = detection.severity;
  const confidenceScore =
    typeof detection.confidence_score === "number"
      ? detection.confidence_score
      : 0.5;

  const basePenalty =
    PENALTY_OVERRIDES[severity] ??
    BASE_PENALTIES[severity];

  const jurisdictionMultiplier =
    JURISDICTION_MULTIPLIER[jurisdiction];

  const finalPenaltyRaw =
    basePenalty *
    confidenceScore *
    jurisdictionMultiplier;

  const finalPenalty = Number(
    finalPenaltyRaw.toFixed(2)
  );

  return {
    detector: detection.tracker_id,
    severity,
    dimension,
    base_penalty: basePenalty,
    confidence_score: confidenceScore,
    jurisdiction_multiplier: jurisdictionMultiplier,
    final_penalty: finalPenalty,
    reason
  };
}
