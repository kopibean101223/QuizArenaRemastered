/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/?page=login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;