/**
 * Scan Persistence Types.
 *
 * Canonical MongoDB document definitions for scan jobs.
 * This file defines the single source of truth for scan state.
 */

export type ScanStatus =
  | "queued"
  | "running"
  | "scanning"
  | "scoring"
  | "completed"
  | "failed";

export interface ScanError {
  type: "transient" | "permanent";
  code: string;
  message: string;
  stack?: string;
}

export interface ScanProgress {
  phase: ScanStatus;
  percent: number; // 0–100
  message?: string;
}

export interface ScanDocument {
  scan_id: string;

  target_url: string;

  status: ScanStatus;
  progress: ScanProgress;

  ruleset_version: string;

  created_at: Date;
  updated_at: Date;

  started_at?: Date;
  completed_at?: Date;

  error?: ScanError;

  // References only (no large blobs in Mongo)
  scanner_output_ref?: string;
  scoring_output_ref?: string;
}
