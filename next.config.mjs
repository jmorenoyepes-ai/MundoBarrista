/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone mode is required for Docker (Linux), but disabled on Windows to avoid symlink EPERM
  output: process.platform === 'linux' || process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        pathname: '/football/**',
      },
    ],
  },
};

export default nextConfig;
