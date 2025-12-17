/**
 * Applies penalty logic to a single detection + dimension.
 * Deterministic, side-effect free, and ruleset-driven.
 */

import { PenaltyContext, AppliedPenalty } from "./penalty.types";
import { resolvePenaltyRule } from "./resolvePenaltyRule";
import { JURISDICTION_MULTIPLIER } from "./penalty.constants";

export function applyPenalty(
  context: PenaltyContext
): AppliedPenalty | null {
  const {
    detection,
    dimension,
    jurisdiction,
    reason,
    ruleset
  } = context;

  // 1️⃣ Resolve matching penalty rule from ruleset
  const rule = resolvePenaltyRule(detection, ruleset);

  // No rule → no penalty applies
  if (!rule) {
    return null;
  }

  // 2️⃣ Confidence handling
  const confidenceScore =
    typeof detection.confidence_score === "number"
      ? detection.confidence_score
      : 0.5;

  // 3️⃣ Jurisdiction multiplier (defaults to 1)
  const jurisdictionMultiplier =
    JURISDICTION_MULTIPLIER[jurisdiction] ?? 1;

  // 4️⃣ Base penalty comes ONLY from ruleset
  const basePenalty = rule.base_penalty;

  const finalPenaltyRaw =
    basePenalty *
    confidenceScore *
    jurisdictionMultiplier;

  const finalPenalty = Number(
    finalPenaltyRaw.toFixed(2)
  );

  return {
    detector: detection.tracker_id,
    severity: detection.severity,
    dimension,
    base_penalty: basePenalty,
    confidence_score: confidenceScore,
    jurisdiction_multiplier: jurisdictionMultiplier,
    final_penalty: finalPenalty,
    reason
  };
}
