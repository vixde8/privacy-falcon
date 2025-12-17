import Ajv from "ajv";
import schema from "../schemas/detection.schema.json";

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

export function validateDetection(input: unknown): void {
  if (!validate(input)) {
    throw new Error(
      `Invalid Detection: ${ajv.errorsText(validate.errors)}`
    );
  }
}
