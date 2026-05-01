import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: 'gravatar.com' },
      { hostname: '*.gravatar.com' },
      { hostname: 'algora.io', protocol: 'https' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
