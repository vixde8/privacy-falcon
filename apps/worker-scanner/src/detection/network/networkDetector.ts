import { extractHostname, domainMatches } from "./domainMatcher";

export type NetworkRequest = {
  url: string;
  method: string;
  resourceType: string;
};

export type NetworkDetection = {
  tracker_id: string;
  signal_type: "network";
  matched_on: "domain";
  matched_value: string;
  request_url: string;
  confidence_weight: number;
  evidence: {
    type: "network_request";
    value: string;
  };
};

export function detectTrackersFromNetwork(
  requests: NetworkRequest[],
  trackerCatalog: Record<string, any>
): NetworkDetection[] {
  const detections: NetworkDetection[] = [];

  for (const req of requests) {
    const hostname = extractHostname(req.url);
    if (!hostname) continue;

    for (const tracker of Object.values(trackerCatalog)) {
      const domains: string[] = tracker.identifiers?.domains || [];
      const weight = tracker.confidence_weights?.network ?? 0;

      for (const domain of domains) {
        if (domainMatches(hostname, domain)) {
          detections.push({
            tracker_id: tracker.tracker_id,
            signal_type: "network",
            matched_on: "domain",
            matched_value: domain,
            request_url: req.url,
            confidence_weight: weight,
            evidence: {
              type: "network_request",
              value: hostname
            }
          });
        }
      }
    }
  }

  return detections;
}
