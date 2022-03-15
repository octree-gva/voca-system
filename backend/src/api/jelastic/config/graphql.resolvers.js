const getEnv = require("../controllers/jelastic").environment;
module.exports = ({ nexus, strapi }) => ({
  Query: {
    environment: {
      async resolve(parent, params, context) {
        const ctx = { ...context, params };
        return await getEnv(ctx);
      },
    },
  },
  Mutation: {},
  resolversConfig: {
    "Query.environment": {
      auth: true,
    },
  },
});
