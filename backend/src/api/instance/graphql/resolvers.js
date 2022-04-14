const onlyAdmin = {
  name: "api::account.account-team",
  config: {
    model: "api::instance.instance",
    foreignKey: "account",
    scope: "administrators",
  },
};
module.exports = ({ nexus, strapi }) => ({
  types: [
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
    Query: {},
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
    "Mutation.firstInstall": {
      auth: {
        scope: ["api::instance.instance.firstInstall"],
      },
    },
    "Mutation.createInstance": {
      policies: [onlyAdmin],
    },
    "Mutation.updateInstance": {
      policies: [onlyAdmin],
    },
    "Query.instances": {
      policies: [onlyAdmin],
    },
    "Query.instance": {
      policies: [onlyAdmin],
    },
  },
});
