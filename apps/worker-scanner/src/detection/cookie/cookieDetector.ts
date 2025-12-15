/**
 * Cookie-based Tracker Detector.
 *
 * Detects trackers by observing cookies set in the browser.
 */
import { cookieNameMatches } from "./cookieMatcher";

export type Cookie = {
  name: string;
  value?: string;
  domain?: string;
  path?: string;
};

export type CookieDetection = {
  tracker_id: string;
  signal_type: "cookie";
  matched_on: "cookie_name";
  matched_value: string;
  confidence_weight: number;
  evidence: {
    type: "cookie";
    value: string;
  };
};

export function detectTrackersFromCookies(
  cookies: Cookie[],
  trackerCatalog: Record<string, any>
): CookieDetection[] {
  const detections: CookieDetection[] = [];

  for (const cookie of cookies) {
    for (const tracker of Object.values(trackerCatalog)) {
      const cookieNames: string[] =
        tracker.identifiers?.cookie_names || [];

      const weight =
        tracker.confidence_weights?.cookie ?? 0;

      for (const trackerCookie of cookieNames) {
        if (cookieNameMatches(cookie.name, trackerCookie)) {
          detections.push({
            tracker_id: tracker.tracker_id,
            signal_type: "cookie",
            matched_on: "cookie_name",
            matched_value: trackerCookie,
            confidence_weight: weight,
            evidence: {
              type: "cookie",
              value: cookie.name
            }
          });
        }
      }
    }
  }

  return detections;
}
