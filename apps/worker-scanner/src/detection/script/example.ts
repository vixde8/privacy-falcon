import { detectTrackersFromScripts } from "./scriptDetector";

const scripts = [
  {
    src: "https://connect.facebook.net/en_US/fbevents.js"
  },
  {
    content: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    `
  }
];

const trackerCatalog = {
  meta_pixel: {
    tracker_id: "meta_pixel",
    identifiers: {
      script_patterns: ["fbq("]
    },
    confidence_weights: { script: 0.4 }
  },
  google_analytics: {
    tracker_id: "google_analytics",
    identifiers: {
      script_patterns: ["gtag("]
    },
    confidence_weights: { script: 0.3 }
  }
};

const detections = detectTrackersFromScripts(
  scripts,
  trackerCatalog
);

console.log(JSON.stringify(detections, null, 2));
