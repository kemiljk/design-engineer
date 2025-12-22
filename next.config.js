/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "@heroui/react",
      "@heroui/button",
      "@heroui/card",
      "@heroui/chip",
      "@heroui/avatar",
      "@heroui/link",
      "@heroui/input",
      "@heroui/modal",
      "@heroui/navbar",
      "lucide-react",
      "date-fns",
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
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
