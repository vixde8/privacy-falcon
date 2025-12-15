import { Severity, Detection } from "../types/detection";
import { Jurisdiction } from "../types/law";
import { Dimension } from "../types/dimension";

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

export interface PenaltyContext {
  detection: Detection;
  dimension: Dimension;
  jurisdiction: Jurisdiction;
  reason: string;
}
