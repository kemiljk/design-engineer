/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "imgix.cosmicjs.com",
      }
    ],
  }
}

module.exports = nextConfig
