import { Severity, Detection } from "../../types/detection";
import { Jurisdiction } from "../../types/law";
import { Dimension } from "../../types/dimension";
import { Ruleset } from "../../rules/ruleset.schema";

export interface AppliedPenalty {
  detector: string;
  severity: Severity;
  dimension: Dimension;
  base_penalty: number;
  confidence_score: number;
  jurisdiction_multiplier: number;
  final_penalty: number;
  reason: string;
}

/**
 * Context required to apply a penalty.
 * Ruleset is mandatory — no hardcoded policy allowed.
 */
export interface PenaltyContext {
  detection: Detection;
  dimension: Dimension;
  jurisdiction: Jurisdiction;
  reason: string;
  ruleset: Ruleset;
}
