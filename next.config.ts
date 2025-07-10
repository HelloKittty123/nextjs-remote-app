import type { NextConfig } from "next";

const domain = process.env.PATH_URL;

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/services/:path*", // client request to /api/*
        destination: `${domain}/services/:path*`, // real backend
      },
      {
        source: "/auth/:path*",
        destination: `${domain}/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
