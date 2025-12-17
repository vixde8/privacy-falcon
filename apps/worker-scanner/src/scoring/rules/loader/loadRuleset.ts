import { getCachedRuleset, setCachedRuleset } from "../cache/rulesetCache";

export async function loadRuleset({
  jurisdiction,
  version
}: {
  jurisdiction: string;
  version?: string;
}) {
  const cacheKey = `${jurisdiction}@${version ?? "latest"}`;
  const cached = getCachedRuleset(cacheKey);
  if (cached) return cached;

  const query: any = { jurisdiction };
  if (version) query.version = version;

  const doc = await mongo
    .collection("privacy_rulesets")
    .findOne(query, { sort: { effective_from: -1 } });

  if (!doc) {
    throw new Error("No ruleset found");
  }

  setCachedRuleset(cacheKey, doc.rules);
  return doc.rules;
}
