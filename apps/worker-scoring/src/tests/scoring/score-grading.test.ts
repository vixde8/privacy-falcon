import { describe, it, expect } from "vitest";
import {
  gradeScore,
  validateAggregationConsistency,
  AggregationResult
} from "../../scoring/framework";

describe("Score grading and consistency checks", () => {
  it("assigns the correct grade for a given score", () => {
    expect(gradeScore(95).grade).toBe("A");
    expect(gradeScore(80).grade).toBe("B");
    expect(gradeScore(62).grade).toBe("C");
    expect(gradeScore(45).grade).toBe("D");
    expect(gradeScore(10).grade).toBe("F");
  });

  it("throws when a required dimension is missing", () => {
    const invalidAggregation = {
      final_score: 80,
      dimensions: {
        tracking_risk: { score: 80, penalties: [] }
      }
    } as AggregationResult;

    expect(() =>
      validateAggregationConsistency(invalidAggregation)
    ).toThrow();
  });

  it("throws when score is out of range", () => {
    expect(() => gradeScore(-1)).toThrow();
    expect(() => gradeScore(101)).toThrow();
  });
});
