module.exports = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://criticalkarepharma.vercel.app/api/:path*', // Proxy to Backend
  //     },
  //   ];
  // },

  // async redirects() {
  //   return [
  //     {
  //       source: '/(.*)', // Match all paths
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'www.criticalkarepharma.com', // Redirect www to non-www
  //         },
  //       ],
  //       destination: 'https://criticalkarepharma.com/:path*',
  //       permanent: true, // Use 301 redirect
  //     },
  //   ];
  // },

  experimental: {
    serverActions: true,
  },
  images: {
    // Allow images to be loaded from specific remote URLs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'criticalkare.s3.ap-south-1.amazonaws.com',
        pathname: '/**', // Match all images from this S3 bucket
      },
    ],
    domains: ['criticalkare.s3.ap-south-1.amazonaws.com'], // Define domains where images can be hosted
  },

  reactStrictMode: false,
};
