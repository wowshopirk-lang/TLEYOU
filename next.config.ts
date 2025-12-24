import type { NextConfig } from "next";
// Temporarily disabled next-intl plugin until [locale] structure is set up
// import createNextIntlPlugin from 'next-intl/plugin';
// const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Next.js 16 uses Turbopack by default
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },
  // Experimental features for Next.js 16
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Suppress params Promise warnings in development (React DevTools serialization)
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Suppress React DevTools serialization warnings for params Promise
  reactStrictMode: true,
  // Logging configuration to reduce noise
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Suppress console warnings for params Promise serialization
  webpack: (config, { dev }) => {
    if (dev) {
      // Suppress React DevTools serialization warnings
      config.ignoreWarnings = [
        { module: /node_modules/ },
        { message: /params are being enumerated/ },
      ];
    }
    return config;
  },
};

export default nextConfig;
