/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Sanity image CDN
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // Unsplash (used for placeholder/fallback images)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Picsum (used for leadership photo placeholders)
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
