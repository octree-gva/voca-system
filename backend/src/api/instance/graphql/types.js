module.exports = ({ nexus, strapi }) => ({
  types: [
    nexus.inputObjectType({
      name: "UserInput",
      definition(t) {
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nonNull.string("password_confirmation");
      },
    }),
    nexus.inputObjectType({
      name: "InstanceInstallInput",
      definition(t) {
        t.nonNull.string("title");
        t.nonNull.string("acronym");
        t.nonNull.string("subdomain");
      },
    }),
    nexus.objectType({
      name: "OkayResponse",
      definition(t) {
        t.nonNull.string("ok");
      },
    }),
  ],
});
