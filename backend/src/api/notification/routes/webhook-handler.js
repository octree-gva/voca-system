module.exports = {
  routes: [
    {
      method: "POST",
      path: "/notifications/webhooks/:instanceUUID",
      handler: "api::notification.webhook.handleOne",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
