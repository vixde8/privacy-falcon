import { describe, it, expect } from "vitest";
import {
  formatScoreExplanation,
  AggregationResult
} from "../../scoring/framework";

describe("Score explainability", () => {
  it("produces clear explanations when issues exist", () => {
    const aggregation: AggregationResult = {
      final_score: 62,
      dimensions: {
        tracking_risk: {
          score: 55,
          penalties: [
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
          ]
        },
        consent_compliance: { score: 100, penalties: [] },
        data_exposure: { score: 100, penalties: [] },
        transparency: { score: 100, penalties: [] },
        control_and_choice: { score: 100, penalties: [] }
      }
    };

    const explanation = formatScoreExplanation(aggregation);

    expect(explanation.final_score).toBe(62);
    expect(explanation.summary).toContain("Moderate");
    expect(explanation.dimensions[0].issues.length).toBe(1);
  });

  it("explicitly states when no issues are present", () => {
    const aggregation: AggregationResult = {
      final_score: 95,
      dimensions: {
        tracking_risk: { score: 100, penalties: [] },
        consent_compliance: { score: 100, penalties: [] },
        data_exposure: { score: 100, penalties: [] },
        transparency: { score: 100, penalties: [] },
        control_and_choice: { score: 100, penalties: [] }
      }
    };

    const explanation = formatScoreExplanation(aggregation);

    expect(explanation.dimensions[0].summary)
      .toContain("No privacy issues");
  });
});
