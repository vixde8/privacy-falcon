export type Jurisdiction = "EU" | "US" | "INDIA";

export interface Law {
  law_id: string;
  jurisdiction: Jurisdiction;
  requirements: Record<string, boolean>;
}
