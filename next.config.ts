import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/brain", destination: "/product/company-brain", permanent: false },
      { source: "/company", destination: "/company/about", permanent: false },
    ];
  },
};

export default nextConfig;
