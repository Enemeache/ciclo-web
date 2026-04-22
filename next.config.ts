import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ciclo-web",
  images: { unoptimized: true },
};

export default nextConfig;
