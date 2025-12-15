/**
 * Optional overrides for penalties.
 * Default behavior uses BASE_PENALTIES.
 */

import { Severity } from "../types/detection";

export const PENALTY_OVERRIDES: Partial<Record<Severity, number>> = {
  // Example:
  // high: -18
};
