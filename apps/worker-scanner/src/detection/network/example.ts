import { detectTrackersFromNetwork } from "./networkDetector";

const mockRequests = [
  {
    url: "https://connect.facebook.net/en_US/fbevents.js",
    method: "GET",
    resourceType: "script"
  },
  {
    url: "https://www.google-analytics.com/g/collect?v=2",
    method: "POST",
    resourceType: "beacon"
  },
  {
    url: "https://cdn.example.com/app.js",
    method: "GET",
    resourceType: "script"
  }
];

const trackerCatalog = {
  meta_pixel: {
    tracker_id: "meta_pixel",
    identifiers: {
      domains: ["facebook.com", "connect.facebook.net"]
    },
    confidence_weights: { network: 0.5 }
  },
  google_analytics: {
    tracker_id: "google_analytics",
    identifiers: {
      domains: ["google-analytics.com"]
    },
    confidence_weights: { network: 0.5 }
  }
};

const detections = detectTrackersFromNetwork(
  mockRequests,
  trackerCatalog
);

console.log(JSON.stringify(detections, null, 2));
