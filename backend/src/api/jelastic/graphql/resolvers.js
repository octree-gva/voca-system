module.exports = ({ nexus, strapi }) => ({
  types: [
    nexus.extendType({
      type: "Query",
      definition(t) {
        t.field("environment", {
          type: "EnvironmentPayload",
          args: {
            envName: nexus.nonNull(nexus.stringArg()),
          },
        });
      },
    }),
  ],
  resolvers: {
    Query: {
      environment: {
        description: "",
        async resolve(root, args) {
          return strapi.controller("api::jelastic.jelastic").environment(args);
        },
      },
    },
  },
});
