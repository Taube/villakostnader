export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.villakostnader.se"
    : "http://localhost:3500"
