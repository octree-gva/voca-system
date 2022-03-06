module.exports = {
  routes: [
    {
      method: "POST",
      path: "/jelastic/instance",
      handler: "jelastic.createInstance",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
