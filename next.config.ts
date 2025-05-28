import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'loom-clone.b-cdn.net',
        protocol: 'https',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
