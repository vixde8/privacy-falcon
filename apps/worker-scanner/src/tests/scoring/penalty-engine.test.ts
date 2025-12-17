import { describe, it, expect } from "vitest";
import { aggregateScore, AppliedPenalty } from "../../scoring/framework";

describe("Score aggregation", () => {
  it("aggregates penalties into dimension scores correctly", () => {
    const penalties: AppliedPenalty[] = [
      {
        detector: "meta_pixel",
        severity: "high",
        dimension: "tracking_risk",
        base_penalty: -15,
        confidence_score: 0.6,
        jurisdiction_multiplier: 1.2,
        final_penalty: -10.8,
        reason: "Tracking without consent"
      }
    ];

    const weights = {
      tracking_risk: 0.3,
      consent_compliance: 0.25,
      data_exposure: 0.2,
      transparency: 0.15,
      control_and_choice: 0.1
    };

    const result = aggregateScore({ penalties, weights });

    expect(result.dimensions.tracking_risk.score).toBe(89.2);
    expect(result.final_score).toBeGreaterThan(80);
  });

  it("never produces scores outside the 0–100 range", () => {
    const penalties: AppliedPenalty[] = Array(20).fill({
      detector: "bad",
      severity: "critical",
      dimension: "tracking_risk",
      base_penalty: -25,
      confidence_score: 1,
      jurisdiction_multiplier: 1,
      final_penalty: -25,
      reason: "Over-penalized"
    });

    const weights = {
      tracking_risk: 1,
      consent_compliance: 0,
      data_exposure: 0,
      transparency: 0,
      control_and_choice: 0
    };

    const result = aggregateScore({ penalties, weights });

    expect(result.dimensions.tracking_risk.score).toBe(0);
    expect(result.final_score).toBe(0);
  });
});
