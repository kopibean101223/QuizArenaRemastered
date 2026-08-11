/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "192.168.100.57",
    "192.168.100.57:3000",
    "localhost:3000",
    "127.0.0.1:3000",
    '10.221.193.143', '10.221.193.143:3000'
  ],
  turbopack: {}, // Satisfies Turbopack requirements
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