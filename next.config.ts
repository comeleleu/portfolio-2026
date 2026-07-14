import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin';
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // Your Next.js config here
  serverExternalPackages: ['sharp'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
}

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
const withNextIntl = createNextIntlPlugin();
export default withPayload(withNextIntl(nextConfig)); 