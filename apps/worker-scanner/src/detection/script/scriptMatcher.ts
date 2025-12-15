/**
 * Script Matcher.
 *
 * Matches observed script content against a known tracker's script patterns.
 */
export function matchesScriptPattern(
  content: string,
  pattern: string
): boolean {
  return content.includes(pattern);
}
