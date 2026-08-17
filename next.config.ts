import type { NextConfig } from "next";

// TODO  : NEED TO REMOVE UNWANTED HOSTNAMES
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "www.episkin.in" },
      { hostname: "lh3.googleusercontent.com" },
      // New account's R2 files (served via the custom domain).
      { hostname: "cdn.forumsquare.in" },
      // Old bucket — keep until the DB file-URL rewrite (Stage F) is done.
      { hostname: "pub-73909f0ed311488f9559b0650c747b2d.r2.dev" },
    ],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
