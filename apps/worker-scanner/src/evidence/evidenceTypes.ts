/**
 * Detection Evidence Types.
 *
 * Defines evidence and reason structures attached to detections.
 */

export type EvidenceItem = {
  signal_type: "network" | "script" | "cookie";
  value: string;
};

export type EvidenceBundle = {
  reasons: string[];
  evidence: EvidenceItem[];
};
