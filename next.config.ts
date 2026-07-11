import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "bcrypt", "bcryptjs"],
  devIndicators: false,
  outputFileTracingExcludes: {
    "*": [
      "public/audio/**/*",
      "scratch/**/*",
      "node_modules/**/*.map",
    ],
  },
  // Section 10: Remove Next.js powered-by header to prevent fingerprinting
  poweredByHeader: false,
  // Section 10: Disable production browser source maps to prevent exposing source code
  productionBrowserSourceMaps: false,
  // Section 10: image domain allowlist to restrict external images
  images: {
    domains: ["lh3.googleusercontent.com", "images.unsplash.com"],
  },
  // Section 1: HTTP Security Headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            // Note: Tailwind requires 'unsafe-inline' for style-src. Nonce '{nonce}' is replaced dynamically in middleware.
            value: "default-src 'self'; script-src 'self' 'nonce-{nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.anthropic.com https://generativelanguage.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

