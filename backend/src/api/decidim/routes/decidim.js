module.exports = {
  routes: [
    {
      method: "GET",
      path: "/first-install/:subdomain",
      handler: "decidim.checkSubdomain",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/first-install",
      handler: "decidim.firstInstall",
      config: {
        policies: [],
        middlewares: [],
      },
    },
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
