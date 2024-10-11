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
    loader: 'custom',
    loaderFile: './src/common/lib/supabase/imageLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@carbon/icons-react', '@carbon/pictograms-react'],
  },
};

export default nextConfig;
