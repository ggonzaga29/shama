/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
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
