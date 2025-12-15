import { Severity } from "./detection";

export interface Penalty {
  severity: Severity;
  base_penalty: number;
}
