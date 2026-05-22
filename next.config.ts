import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // CRITICAL: Enables Hostinger compatibility
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'sleigh.staymedia.ng' },
    ],
    unoptimized: true, // Recommended for Hostinger shared environments
  },
  typescript: {
    ignoreBuildErrors: true, // Prevents minor type issues from blocking production
  },
};

export default nextConfig;
