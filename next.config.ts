import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // serve modern, smaller formats automatically
    formats: ["image/avif", "image/webp"],
    // cache optimized images for a day
    minimumCacheTTL: 60 * 60 * 24,
    // sensible breakpoints for responsive `sizes`
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
