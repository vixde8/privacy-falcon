import { extractHostname } from "../network/domainMatcher";
import { matchesScriptPattern } from "./scriptMatcher";

export type ScriptArtifact = {
  src?: string;
  content?: string;
};

export type ScriptDetection = {
  tracker_id: string;
  signal_type: "script";
  matched_on: "script_src" | "inline_pattern";
  matched_value: string;
  confidence_weight: number;
  evidence: {
    type: "script";
    value: string;
  };
};

export function detectTrackersFromScripts(
  scripts: ScriptArtifact[],
  trackerCatalog: Record<string, any>
): ScriptDetection[] {
  const detections: ScriptDetection[] = [];

  for (const script of scripts) {
    const srcHost = script.src
      ? extractHostname(script.src)
      : null;

    for (const tracker of Object.values(trackerCatalog)) {
      const patterns: string[] =
        tracker.identifiers?.script_patterns || [];

      const weight =
        tracker.confidence_weights?.script ?? 0;

      for (const pattern of patterns) {
        // Match inline script content
        if (
          script.content &&
          matchesScriptPattern(script.content, pattern)
        ) {
          detections.push({
            tracker_id: tracker.tracker_id,
            signal_type: "script",
            matched_on: "inline_pattern",
            matched_value: pattern,
            confidence_weight: weight,
            evidence: {
              type: "script",
              value: pattern
            }
          });
        }

        // Match external script source
        if (srcHost && script.src?.includes(pattern)) {
          detections.push({
            tracker_id: tracker.tracker_id,
            signal_type: "script",
            matched_on: "script_src",
            matched_value: pattern,
            confidence_weight: weight,
            evidence: {
              type: "script",
              value: script.src
            }
          });
        }
      }
    }
  }

  return detections;
}
