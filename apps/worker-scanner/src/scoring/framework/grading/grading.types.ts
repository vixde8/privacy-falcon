/**
 * Letter grades for privacy score
 */
export type PrivacyGrade = "A" | "B" | "C" | "D" | "F";

/**
 * Output of grading stage
 */
export interface GradedScore {
  final_score: number;
  grade: PrivacyGrade;
}
