/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dwbjb3svx/**',
      },
      {
        protocol: 'https',
        hostname: 'sleigh.staymedia.ng',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
