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
};


export default nextConfig;
