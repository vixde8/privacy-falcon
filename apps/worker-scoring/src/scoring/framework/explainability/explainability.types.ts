import { Dimension } from "../../types/dimension";

/**
 * One dimension’s human-readable explanation
 */
export interface DimensionExplanation {
  dimension: Dimension;
  score: number;
  summary: string;
  issues: Array<{
    detector: string;
    impact: number;
    reason: string;
  }>;
}

/**
 * Full explainability payload
 */
export interface ScoreExplanation {
  final_score: number;
  summary: string;
  dimensions: DimensionExplanation[];
}
