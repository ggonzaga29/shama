/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/dashboard',
      },
    ];
  }, 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
