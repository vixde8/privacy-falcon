import { Ruleset } from "../../rules/ruleset.schema";
import { DetectionResult } from "../../types/detection";

export function resolvePenaltyRule(
  detection: DetectionResult,
  ruleset: Ruleset
) {
  return ruleset.penalties.find(rule =>
    rule.detector === detection.tracker_id &&
    rule.severity === detection.severity
  );
}
