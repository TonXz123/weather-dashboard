import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["172.20.192.1:3000", "localhost:3000"],
    },
  },
  allowedDevOrigins: ["172.20.192.1:3000", "localhost:3000"],
};

export default nextConfig;
