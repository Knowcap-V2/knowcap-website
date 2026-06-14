const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  // Chrome Web Store registers https://knowcap.ai/privacy as the
  // extension's privacy URL but the page lives at /policy (commit
  // 988833f). Google's publish-time reachability checker doesn't follow
  // redirects, so /privacy must answer 200 directly. We use a Next.js
  // rewrite (internal route mapping) instead of a redirect so the same
  // policy page renders under both URLs with no HTTP 308 hop.
  async rewrites() {
    return [
      { source: '/privacy', destination: '/policy' },
      { source: '/privacy-policy', destination: '/policy' },
    ];
  },
  // /pitch is the legacy no-video deck. Investors get the video deck at
  // /knowcap-pitch (founder decision). 308-redirect /pitch so any already-sent
  // links self-heal to the video deck and only one deck stays canonical.
  async redirects() {
    return [
      { source: '/pitch', destination: '/knowcap-pitch', permanent: true },
    ];
  },
};

module.exports = nextConfig;