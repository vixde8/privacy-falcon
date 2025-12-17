import { describe, it, expect } from "vitest";
import { aggregateScore } from "../../scoring/framework";

describe("PF-222 Edge Case Handling", () => {
  it("returns score 100 when there are no detections", () => {
    const result = aggregateScore({
      penalties: [],
      weights: {
        tracking_risk: 0.3,
        consent_compliance: 0.25,
        data_exposure: 0.2,
        transparency: 0.15,
        control_and_choice: 0.1
      }
    });

    expect(result.final_score).toBe(100);
  });
});
