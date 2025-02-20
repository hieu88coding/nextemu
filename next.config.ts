import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    domains: ["fakestoreapi.com"], // Thêm domain của ảnh
  },
};

export default nextConfig;
