/**
 * Detection Evidence Aggregator.
 *
 * Aggregates evidence and generates human-readable reasons
 * for each deduplicated detection.
 */

import { EvidenceBundle } from "./evidenceTypes";

type DeduplicatedDetection = {
  tracker_id: string;
  signals: string[];
};

type RawSignal = {
  tracker_id: string;
  signal_type: "network" | "script" | "cookie";
  evidence_value: string;
};

export function aggregateEvidence(
  detection: DeduplicatedDetection,
  rawSignals: RawSignal[]
): EvidenceBundle {
  const relatedSignals = rawSignals.filter(
    s => s.tracker_id === detection.tracker_id
  );

  const evidence = relatedSignals.map(s => ({
    signal_type: s.signal_type,
    value: s.evidence_value
  }));

  const reasons = detection.signals.map(signal =>
    `Detected via ${signal} signal`
  );

  return { reasons, evidence };
}
