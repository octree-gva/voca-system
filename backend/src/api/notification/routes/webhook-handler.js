module.exports = {
  routes: [
    {
      method: "POST",
      path: "/decidim/webhooks/:instanceUUID",
      handler: "api::notification.webhook.handleOne",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
