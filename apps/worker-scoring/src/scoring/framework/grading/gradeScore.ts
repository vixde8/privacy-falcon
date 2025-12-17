/**
 * Maps a numeric score to a letter grade.
 * Deterministic and side-effect free.
 */

import { PrivacyGrade, GradedScore } from "./grading.types";
import { GRADE_THRESHOLDS } from "./grade.constants";

export function gradeScore(score: number): GradedScore {
  if (Number.isNaN(score)) {
    throw new Error("Cannot grade NaN score");
  }

  if (score < 0 || score > 100) {
    throw new Error(`Score out of bounds: ${score}`);
  }

  const match = GRADE_THRESHOLDS.find(
    (t) => score >= t.minScore
  );

  if (!match) {
    throw new Error(`Unable to grade score: ${score}`);
  }

  return {
    final_score: Number(score.toFixed(2)),
    grade: match.grade
  };
}
