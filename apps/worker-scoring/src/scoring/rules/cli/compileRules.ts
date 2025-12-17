/**
 * Ruleset compiler CLI
 *
 * Usage:
 *   pnpm compile:rules
 */

import fs from "fs";
import path from "path";
import { compileRuleset } from "../compiler/compileRuleset";
import { Ruleset } from "../ruleset.schema";

const RAW_RULES_DIR = path.resolve(process.cwd(), "rules/raw");
const OUTPUT_DIR = path.resolve(process.cwd(), "rules/compiled");

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = fs.readdirSync(RAW_RULES_DIR).filter(f => f.endsWith(".json"));

for (const file of files) {
  const rawPath = path.join(RAW_RULES_DIR, file);
  const raw = JSON.parse(fs.readFileSync(rawPath, "utf-8")) as Ruleset;

  const compiled = compileRuleset(raw);

  const outFile = `${compiled.id}@${compiled.version}.json`;
  fs.writeFileSync(
    path.join(OUTPUT_DIR, outFile),
    JSON.stringify(compiled, null, 2)
  );

  console.log(`✔ Compiled ${file} → ${outFile}`);
}
