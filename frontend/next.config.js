module.exports = {
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
  },
};
