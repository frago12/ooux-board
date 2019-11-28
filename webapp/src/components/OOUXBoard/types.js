export type ElementTypes = "object" | "coredata" | "metadata" | "cta";

export type Element = {
  id: string,
  name: string,
  type: "cta",
};

export type CTA = {
  id: string,
  name: string,
  type: "object" | "coredata" | "metadata",
};

export type MainObject = {
  id: string,
  name: string,
  elements: Element[],
  ctas: CTA[],
};

export type BoardData = MainObject[];
