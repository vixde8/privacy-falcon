/**
 * Tracker Detector.
 *
 * Classifies observed scripts and network requests to identify
 * third-party activity and tracker-like behavior.
 */

export type TrackerSignal = {
  url: string;
  type: "script" | "network";
  thirdParty: boolean;
  trackerLike: boolean;
  reason: string[];
};

function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function looksLikeTracker(url: string): string[] {
  const patterns = [
    "analytics",
    "track",
    "pixel",
    "beacon",
    "collect",
    "gtm",
    "doubleclick",
    "facebook",
    "segment"
  ];

  const reasons = patterns.filter((p) =>
    url.toLowerCase().includes(p)
  );

  return reasons;
}

export function detectTrackers(params: {
  pageUrl: string;
  scripts: { src: string | null }[];
  network: { url: string }[];
}): TrackerSignal[] {
  const pageHost = hostnameOf(params.pageUrl);

  const signals: TrackerSignal[] = [];

  for (const s of params.scripts) {
    if (!s.src) continue;

    const host = hostnameOf(s.src);
    const reasons = looksLikeTracker(s.src);

    signals.push({
      url: s.src,
      type: "script",
      thirdParty: !!host && host !== pageHost,
      trackerLike: reasons.length > 0,
      reason: reasons
    });
  }

  for (const n of params.network) {
    const host = hostnameOf(n.url);
    const reasons = looksLikeTracker(n.url);

    signals.push({
      url: n.url,
      type: "network",
      thirdParty: !!host && host !== pageHost,
      trackerLike: reasons.length > 0,
      reason: reasons
    });
  }

  return signals;
}
