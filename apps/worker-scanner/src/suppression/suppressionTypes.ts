/**
 * Suppression Rule Types.
 *
 * Defines the structure of false-positive suppression rules.
 */

export type SuppressionLevel =
  | "tracker"
  | "signal"
  | "rule";

export type SuppressionRule = {
  id: string;
  level: SuppressionLevel;

  tracker_id?: string;
  signal_type?: "network" | "script" | "cookie";
  rule_id?: string;

  reason: string;
  enabled: boolean;
};
