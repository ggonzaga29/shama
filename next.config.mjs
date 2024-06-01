/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  swcMinify: true,
  async rewrites() {
    return [{
      source: "/",
      destination: "/dashboard"
    }];
  },
  images: {
    loader: 'custom',
    loaderFile: './src/common/lib/supabase/imageLoader.ts'
  }
};

export default nextConfig;