import crypto from "crypto";
import { Ruleset } from "../ruleset.schema";
import { validateRuleset } from "./validateRuleset";

export function compileRuleset(ruleset: Ruleset) {
  validateRuleset(ruleset);

  return {
    ...ruleset,
    compiled_at: new Date().toISOString(),
    checksum: crypto
      .createHash("sha256")
      .update(JSON.stringify(ruleset))
      .digest("hex")
  };
}
