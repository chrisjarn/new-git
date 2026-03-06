import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'incident.io' },
      { hostname: 'i.pravatar.cc' },
    ],
  },
};

export default nextConfig;
