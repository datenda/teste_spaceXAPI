import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.staticflickr.com",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
