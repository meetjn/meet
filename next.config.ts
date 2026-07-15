import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/.well-known/llms.txt",
        destination: "/llms.txt",
      },
    ];
  },
  async redirects() {
    return [
      // The journal moved from /writing to the homepage; articles keep
      // their /writing/[slug] URLs.
      {
        source: "/writing",
        destination: "/",
        permanent: true,
      },
      {
        source: "/safety",
        destination: "/reflection",
        permanent: true,
      },
      {
        source: "/tools/pomodoro",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
