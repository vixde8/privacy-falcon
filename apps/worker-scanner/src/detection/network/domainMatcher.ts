export function extractHostname(url: string): string | null {
  try {
    const u = new URL(url);
    return u.hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function domainMatches(
  requestHost: string,
  trackerDomain: string
): boolean {
  requestHost = requestHost.toLowerCase();
  trackerDomain = trackerDomain.toLowerCase();

  if (requestHost === trackerDomain) return true;

  // subdomain match only (safe)
  return requestHost.endsWith(`.${trackerDomain}`);
}
