const cache = new Map<string, unknown>();

export function getCachedRuleset(key: string) {
  return cache.get(key);
}

export function setCachedRuleset(key: string, rules: unknown) {
  cache.set(key, rules);
}
