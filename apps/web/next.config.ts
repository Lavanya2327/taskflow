import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/common-types"],
};

export default nextConfig;
