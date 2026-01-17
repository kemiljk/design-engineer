/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "iconoir-react",
      "date-fns",
      "motion",
      "cmdk",
      "@clerk/nextjs",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgix.cosmicjs.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
