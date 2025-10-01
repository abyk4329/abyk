/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static assets are properly copied to the build
  output: 'standalone',
  
  webpack: (config) => {
    // Copy font files to the build output
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = nextConfig;
