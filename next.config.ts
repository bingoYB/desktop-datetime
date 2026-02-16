import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
