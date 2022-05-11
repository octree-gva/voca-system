module.exports = {
  routes: [
    {
      method: "POST",
      path: "/decidim/subdomain",
      handler: "api::decidim.instance.isSubdomainAvailable",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
