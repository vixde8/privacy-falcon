import { Dimension } from "../../types/dimension";
import { AppliedPenalty } from "../penalty/penalty.types";

/**
 * Input to aggregation engine
 */
export interface AggregationInput {
  penalties: AppliedPenalty[];
  weights: Record<Dimension, number>;
}

/**
 * Per-dimension aggregation result
 */
export interface DimensionAggregation {
  score: number; // 0–100
  penalties: AppliedPenalty[];
}

/**
 * Full aggregation output (pre-grade)
 */
export interface AggregationResult {
  dimensions: Record<Dimension, DimensionAggregation>;
  final_score: number; // 0–100
}
