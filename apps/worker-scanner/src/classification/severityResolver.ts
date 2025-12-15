/**
 * Severity Resolver.
 *
 * Resolves the severity of a detection based on a set of rules.
 *
 * @see /docs/onboarding.md
 */
export function resolveSeverity(
  defaultSeverity: "low" | "medium" | "high"
): "low" | "medium" | "high" {
  // PF-170 rule: severity is tracker-defined baseline
  return defaultSeverity;
}
