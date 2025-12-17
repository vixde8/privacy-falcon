import { describe, it, expect } from "vitest";
import { validateFinalScore } from "../../scoring/framework";
import { AggregationResult } from "../../scoring/framework";
import { ScoreExplanation } from "../../scoring/framework";

describe("PF-223 Validation Gate", () => {
  it("rejects invalid weight sums", () => {
    const aggregation: AggregationResult = {
      final_score: 90,
      dimensions: {
        tracking_risk: { score: 100, penalties: [] },
        consent_compliance: { score: 100, penalties: [] },
        data_exposure: { score: 100, penalties: [] },
        transparency: { score: 100, penalties: [] },
        control_and_choice: { score: 100, penalties: [] }
      }
    };

    const explanation: ScoreExplanation = {
      final_score: 90,
      summary: "OK",
      dimensions: [
        {
          dimension: "tracking_risk",
          score: 100,
          summary: "No issues",
          issues: []
        }
      ]
    };

    expect(() =>
      validateFinalScore({
        aggregation,
        explanation,
        weights: {
          tracking_risk: 0.5,
          consent_compliance: 0.5,
          data_exposure: 0,
          transparency: 0,
          control_and_choice: 0.1
        }
      })
    ).toThrow();
  });
});
