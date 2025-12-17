import { PrivacyGrade } from "./grading.types";

/**
 * Score thresholds for grade mapping.
 * Order matters (highest first).
 */
export const GRADE_THRESHOLDS: Array<{
  minScore: number;
  grade: PrivacyGrade;
}> = [
  { minScore: 90, grade: "A" },
  { minScore: 75, grade: "B" },
  { minScore: 60, grade: "C" },
  { minScore: 40, grade: "D" },
  { minScore: 0, grade: "F" }
];
