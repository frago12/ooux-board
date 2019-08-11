export const colors = {
  blue: "#5BAFF8",
  yellow: "#F7C44D",
  red: "#FE6883",
  green: "#68CD67",
};

export function getColor(type: Type) {
  switch (type) {
    case "object":
      return colors.blue;
    case "coredata":
      return colors.yellow;
    case "metadata":
      return colors.red;
    case "cta":
      return colors.green;
    default:
      throw new Error("Invalid item type");
  }
}
