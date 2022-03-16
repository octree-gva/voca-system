module.exports = {
  routes: [
    {
      method: "POST",
      path: "/decidim/webhooks/:instanceUUID",
      handler: "decidim.webhook",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
