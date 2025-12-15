export function matchesScriptPattern(
  content: string,
  pattern: string
): boolean {
  return content.includes(pattern);
}
