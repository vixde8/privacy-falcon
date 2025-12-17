import { applyPenalty } from "../../scoring/framework/penalty/applyPenalty";
import { Detection } from "../../scoring/types/detection";
import { Ruleset } from "../../scoring/rules/ruleset.schema";

// --- Mock detection (what PF-215/216 would produce) ---
const detection: Detection = {
  tracker_id: "meta_pixel",
  severity: "high",
  confidence_score: 0.6,
  signals: ["network"]
};

// --- Minimal ruleset (normally loaded from compiled JSON / Mongo) ---
const ruleset: Ruleset = {
  id: "eu-default",
  version: "2025.1",
  jurisdiction: "EU",
  effective_from: "2025-01-01",
  penalties: [
    {
      detector: "meta_pixel",
      dimension: "tracking_risk",
      severity: "high",
      base_penalty: -15,
      applies_if: {
        consent_missing: true
      }
    }
  ],
  weights: {
    tracking_risk: 1
  }
};

// --- Apply penalty ---
const penalty = applyPenalty({
  detection,
  dimension: "tracking_risk",
  jurisdiction: "EU",
  reason: "Tracking without consent",
  ruleset
});

console.log("PF-217 penalty result:");
console.dir(penalty, { depth: null });
