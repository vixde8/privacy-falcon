export type Jurisdiction = "EU" | "US" | "IN";

export interface PenaltyRule {
  detector: string;
  dimension: string;
  severity: "low" | "medium" | "high";
  base_penalty: number;
  applies_if?: {
    consent_missing?: boolean;
    data_category?: string[];
  };
}

export interface Ruleset {
  id: string;                 // eu-default
  version: string;            // 2025.1
  jurisdiction: Jurisdiction;
  effective_from: string;     // ISO date
  penalties: PenaltyRule[];
  weights: Record<string, number>;
}
