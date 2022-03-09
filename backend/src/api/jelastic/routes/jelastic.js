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
    {
      method: "GET",
      path: "/jelastic/environments/:envName/nodes",
      handler: "jelastic.nodes",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/jelastic/environments/:envName",
      handler: "jelastic.environment",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/jelastic/environments/:envName/apps",
      handler: "jelastic.apps",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/jelastic/environments/:envName/stop",
      handler: "jelastic.stop",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/jelastic/environments/:envName/start",
      handler: "jelastic.start",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/jelastic/environments",
      handler: "jelastic.environments",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
