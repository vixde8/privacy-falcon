export interface StoredRuleset {
  id: string;
  version: string;
  jurisdiction: string;
  effective_from: string;
  checksum: string;
  compiled_at: string;
  rules: unknown;
}
