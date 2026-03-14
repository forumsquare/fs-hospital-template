import type { NextConfig } from "next";

// TODO  : NEED TO REMOVE UNWANTED HOSTNAMES
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "www.episkin.in" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "pub-73909f0ed311488f9559b0650c747b2d.r2.dev" },
    ],
  },
};

export default nextConfig;
