import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // <-- Crucial: This forces Next.js to build static files
  images: {
    unoptimized: true, // Required because Next.js native image optimization needs a server
  },
};

export default nextConfig;
