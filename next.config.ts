import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Marketing-site CSP. next/font self-hosts typefaces at build time, so font-src
 * stays 'self'. 'unsafe-inline' on script/style is required for Next.js App
 * Router hydration without a per-request nonce (which would force dynamic
 * rendering of every page). Dev additionally allows eval + localhost sockets
 * for Fast Refresh.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws://localhost:* wss://localhost:* http://localhost:*" : ""}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/", headers: securityHeaders },
      { source: "/:path*", headers: securityHeaders },
    ];
  },
  async redirects() {
    return [
      { source: "/brain", destination: "/product/company-brain", permanent: false },
      { source: "/company", destination: "/company/about", permanent: false },
    ];
  },
};

export default nextConfig;
