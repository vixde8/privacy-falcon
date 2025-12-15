import { classifyDetections } from "./classifier";
import { RawDetection } from "./types";

const rawDetections: RawDetection[] = [
  { tracker_id: "google_analytics", signal_type: "network", confidence_weight: 0.5 },
  { tracker_id: "google_analytics", signal_type: "script", confidence_weight: 0.3 },
  { tracker_id: "google_analytics", signal_type: "cookie", confidence_weight: 0.2 },

  { tracker_id: "meta_pixel", signal_type: "network", confidence_weight: 0.5 },
  { tracker_id: "meta_pixel", signal_type: "cookie", confidence_weight: 0.1 }
];

const trackerCatalog = {
  google_analytics: {
    tracker_id: "google_analytics",
    default_severity: "medium"
  },
  meta_pixel: {
    tracker_id: "meta_pixel",
    default_severity: "high"
  }
};

const result = classifyDetections(
  rawDetections,
  trackerCatalog
);

console.log(JSON.stringify(result, null, 2));
