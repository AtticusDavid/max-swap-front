const path = require('path');

const WebpackObfuscator = require('webpack-obfuscator');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_ENDPOINT}/:path*`,
        basePath: false,
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    outputStandalone: true,
  },
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (false && !dev) {
      config.plugins.push(new WebpackObfuscator({}, ['node_modules/**']));
    }

    // Important: return the modified config
    return config;
  }
};

module.exports = nextConfig;
