/**
 * Penalty constants and multipliers.
 * Pure configuration. No logic.
 */

import { Severity } from "../../types/detection";
import { Jurisdiction } from "../../types/law";

export const BASE_PENALTIES: Record<Severity, number> = {
  low: -3,
  medium: -7,
  high: -15,
  critical: -25
};

export const JURISDICTION_MULTIPLIER: Record<Jurisdiction, number> = {
  EU: 1.2,
  US: 1.0,
  INDIA: 0.9
};
