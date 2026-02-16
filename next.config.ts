import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // 核心配置：禁用内置图片优化
  },
};

export default nextConfig;
