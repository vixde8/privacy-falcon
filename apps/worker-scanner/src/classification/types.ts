/**
 * Classification Types.
 *
 * Type definitions for the detection classification process.
 */
export type SignalType = "network" | "script" | "cookie";

export type RawDetection = {
  tracker_id: string;
  signal_type: SignalType;
  confidence_weight: number;
};

export type ClassifiedDetection = {
  tracker_id: string;
  severity: "low" | "medium" | "high";
  confidence: "low" | "medium" | "high";
  signals: SignalType[];
  confidence_score: number;
};
