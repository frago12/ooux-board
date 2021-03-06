// @flow
import type { ElementTypes } from "./types";

const colors = {
  blue: "#5BAFF8",
  yellow: "#F7C44D",
  red: "#FE6883",
  green: "#68CD67",
};

export function getColor(type: "empty" | ElementTypes) {
  switch (type) {
    case "object":
      return colors.blue;
    case "coredata":
      return colors.yellow;
    case "metadata":
      return colors.red;
    case "cta":
      return colors.green;
    case "empty":
      return "transparent";
    default:
      throw new Error("Invalid item type");
  }
}
