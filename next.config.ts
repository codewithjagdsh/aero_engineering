import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phones/tablets on the local network to load the dev server
  allowedDevOrigins: ["192.168.29.103", "192.168.29.*", "192.168.*.*"],
};

export default nextConfig;
