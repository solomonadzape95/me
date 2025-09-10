import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Increase body size limit for multipart/form-data uploads (default 1MB)
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
