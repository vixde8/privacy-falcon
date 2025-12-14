/**
 * Scan Job Contract.
 *
 * Defines the Zod schema and TypeScript types for scan jobs.
 * Acts as the boundary validation layer for incoming work items.
 */
import { z } from "zod";

const ScanJobSchema = z.object({
  scanId: z.string(),
  url: z.string().url(),
  config: z.object({
    maxDepth: z.number().int().min(0),
    maxPages: z.number().int().min(1),
    timeoutMs: z.number().int().positive()
  })
});

export function parseScanJob(input: unknown) {
  return ScanJobSchema.parse(input);
}

export type ScanJob = z.infer<typeof ScanJobSchema>;
