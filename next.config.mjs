import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import createBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/i18n/request.tsx',
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
});
const withMdx = createMDX({});
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/meals',
        destination: '/api/meals'
      }
    ];
  },
  appDir: true,
  trailingSlash: false
  // other options...
};

export default withNextIntl(withMdx(withBundleAnalyzer(nextConfig)));
