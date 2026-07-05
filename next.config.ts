import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/brand/**',
        // no `search` → optional ?v= cache-bust on any brand asset
      },
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn-s.acuityscheduling.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // Allow the Faca Studio work index to embed the site as a hover
        // preview (replaces X-Frame-Options: DENY; frame-ancestors is the
        // modern equivalent and supports an allowlist).
        {
          key: 'Content-Security-Policy',
          value:
            "frame-ancestors 'self' https://www.faca-studio.com https://faca-studio.com http://localhost:3000",
        },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
}

export default nextConfig
