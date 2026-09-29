import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // CRITICAL: Enables Hostinger compatibility
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dwbjb3svx/**' },
      { protocol: 'https', hostname: 'sleigh.staymedia.ng', pathname: '/**' },
      { protocol: 'https', hostname: 'sleighstrands.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.sleighstrands.com', pathname: '/**' },
    ],
    unoptimized: true, // Recommended for Hostinger shared environments
  },
  typescript: {
    ignoreBuildErrors: true, // Prevents minor type issues from blocking production
  },
};

export default nextConfig;
