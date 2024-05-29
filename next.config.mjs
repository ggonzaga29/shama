/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/dashboard"
      }
    ]
  }
};

export default nextConfig;
