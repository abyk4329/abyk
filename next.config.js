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
      // Canonical domain: redirect any requests from old Vercel domain to abyk.online
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "abyk.vercel.app",
          },
        ],
        destination: "https://abyk.online/:path*",
        permanent: true,
      },
      // Force www to apex
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.abyk.online",
          },
        ],
        destination: "https://abyk.online/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
