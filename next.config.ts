import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "bcrypt", "bcryptjs"],
  devIndicators: false,
};

export default nextConfig;
