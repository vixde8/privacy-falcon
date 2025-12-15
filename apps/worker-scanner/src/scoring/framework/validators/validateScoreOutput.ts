import Ajv from "ajv";
import schema from "../schemas/score-output.schema.json";

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

export function validateScoreOutput(score: unknown): void {
  if (!validate(score)) {
    throw new Error("Invalid Privacy Score Output");
  }
}
