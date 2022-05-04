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
        t.nonNull.string("available_locales");
        t.nonNull.string("default_locale");
        t.nonNull.string("timezone");
        t.nonNull.string("currency");
      },
    }),
    nexus.objectType({
      name: "OkayResponse",
      definition(t) {
        t.nonNull.boolean("ok");
        t.string("errCode");
      },
    }),
  ],
});
