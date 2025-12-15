import { Dimension } from "./dimension";

export interface DimensionBreakdown {
  score: number;
  penalties: Array<{
    detector: string;
    reason: string;
    penalty: number;
  }>;
}

export interface PrivacyScore {
  final_score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  dimensions: Record<Dimension, DimensionBreakdown>;
  scoring_version: string;
  ruleset_hash: string;
}
