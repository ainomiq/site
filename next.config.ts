import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      {
        source: "/platform",
        destination: "/ecommerce",
        permanent: true,
      },
      {
        source: "/platform/:path*",
        destination: "/ecommerce/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
