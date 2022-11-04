module.exports = {
  swcMinify: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    // Important: return the modified config
    return config
  },
  images: {
    domains: ['burst.shopifycdn.com'],
  },
};
