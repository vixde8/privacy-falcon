export type Severity = "low" | "medium" | "high" | "critical";
export type Confidence = "low" | "medium" | "high";
export type Signal =
  | "network"
  | "script"
  | "storage"
  | "iframe"
  | "behavior";

export interface Detection {
  tracker_id: string;
  severity: Severity;
  confidence: Confidence;
  confidence_score: number;
  signals: Signal[];
}
