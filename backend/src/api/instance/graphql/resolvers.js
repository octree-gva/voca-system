module.exports = ({ nexus, strapi }) => ({
  types: [
    nexus.extendType({
      type: "Query",
      definition(t) {
        t.field("isSubdomainAvailable", {
          type: "Boolean",
          args: {
            subdomain: nexus.nonNull("String"),
          },
        });
      },
    }),
    nexus.extendType({
      type: "Mutation",
      definition(t) {
        t.field("firstInstall", {
          type: "OkayResponse",
          args: {
            user: nexus.nonNull("UserInput"),
            instance: nexus.nonNull("InstanceInstallInput"),
          },
        });
      },
    }),
  ],
  resolvers: {
    Query: {
      isSubdomainAvailable: {
        description: "Check if a subdomain is available",
        async resolve(root, args) {
          return strapi
            .controller("api::instance.instance")
            .isSubdomainAvailable(args);
        },
      },
    },
    Mutation: {
      firstInstall: {
        description: "Create user account and install first instance",
        async resolve(root, args) {
          return strapi.controller("api::instance.instance").firstInstall(args);
        },
      },
    },
  },
  resolversConfig: {
    "Query.isSubdomainAvailable": {
      auth: {
        scope: ["api::instance.instance.isSubdomainAvailable"],
      },
    },
    "Mutation.firstInstall": {
      auth: {
        scope: ["api::instance.instance.firstInstall"],
      },
    },
  },
});
