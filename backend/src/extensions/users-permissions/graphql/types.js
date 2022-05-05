module.exports = ({ strapi, nexus }) => {
  return {
    types: [
      nexus.extendType({
        type: "UsersPermissionsMe",
        definition(t) {
          t.string("lastName");
          t.string("firstName");
          t.list.field("administratorAccounts", {
            type: "AccountEntityResponse",
            resolve: (root, args, ctx) => {
              // Fetch administratorAccounts from current user.
              return strapi.entityService
                .findOne("plugin::users-permissions.user", root.id, {
                  populate: ["administratorAccounts"],
                })
                .then(({ administratorAccounts }) => administratorAccounts);
            },
          });
        },
      }),
    ],
  };
};
