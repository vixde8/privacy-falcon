import { Ruleset } from "../ruleset.schema";

export function validateRuleset(ruleset: Ruleset): void {
  if (!ruleset.id || !ruleset.version) {
    throw new Error("Ruleset must have id and version");
  }

  if (!ruleset.jurisdiction) {
    throw new Error("Ruleset must define jurisdiction");
  }

  const weightSum = Object.values(ruleset.weights)
    .reduce((a, b) => a + b, 0);

  if (Math.abs(weightSum - 1) > 0.001) {
    throw new Error("Weights must sum to 1.0");
  }

  for (const rule of ruleset.penalties) {
    if (rule.base_penalty >= 0) {
      throw new Error("Penalty values must be negative");
    }
  }
}
