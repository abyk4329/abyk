/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is enabled by default in Next.js 13+
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/money-code",
        destination: "/thewelthcode",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
