export const API_URL =
  process.env.NODE_ENV === "production"
    ? "//oouxapi.frago.dev"
    : "http://localhost:8000";
