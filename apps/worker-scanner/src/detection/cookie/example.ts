import { detectTrackersFromCookies } from "./cookieDetector";

const cookies = [
  { name: "_ga" },
  { name: "_ga_1ABCD" },
  { name: "_fbp" },
  { name: "session_id" }
];

const trackerCatalog = {
  google_analytics: {
    tracker_id: "google_analytics",
    identifiers: {
      cookie_names: ["_ga"]
    },
    confidence_weights: { cookie: 0.2 }
  },
  meta_pixel: {
    tracker_id: "meta_pixel",
    identifiers: {
      cookie_names: ["_fbp"]
    },
    confidence_weights: { cookie: 0.1 }
  }
};

const detections = detectTrackersFromCookies(
  cookies,
  trackerCatalog
);

console.log(JSON.stringify(detections, null, 2));
