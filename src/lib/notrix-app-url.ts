/** The marketing site never authenticates customers. It sends them to the real app. */
export function notrixAppUrl(path: "/login" | "/signup"): string {
  const configured = process.env.NOTRIX_APP_URL;
  if (!configured && process.env.NODE_ENV === "production") {
    throw new Error("NOTRIX_APP_URL is required in production");
  }
  const url = new URL(configured || "http://localhost:3000");
  if (url.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && url.hostname === "localhost")) {
    throw new Error("NOTRIX_APP_URL must be an HTTPS origin");
  }
  if (url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("NOTRIX_APP_URL must be an origin without a path or query");
  }
  return new URL(path, url).toString();
}
