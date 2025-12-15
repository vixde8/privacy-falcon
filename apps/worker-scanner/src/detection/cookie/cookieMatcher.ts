/**
 * Cookie Matcher.
 *
 * Matches observed cookies against a known tracker's cookie patterns.
 */
export function cookieNameMatches(
  cookieName: string,
  trackerCookie: string
): boolean {
  cookieName = cookieName.toLowerCase();
  trackerCookie = trackerCookie.toLowerCase();

  // exact match
  if (cookieName === trackerCookie) return true;

  // prefix match (_ga_XXXX)
  return cookieName.startsWith(`${trackerCookie}_`);
}
