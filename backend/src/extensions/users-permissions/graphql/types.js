/**
 * Gives back the hydrated relationship for the given user (users-permissions)
 * @param strapi the strapi global object
 * @param id users-permissions id to fetch
 * @param foreignKey the relationship to fetch
 * @return data of the relationship for the given user id.
 */
const fetchUserRelation = async (strapi, id, foreignKey) => {
  const { [`${foreignKey}`]: data } = await strapi.entityService.findOne(
    "plugin::users-permissions.user",
    id,
    {
      populate: [foreignKey],
    }
  );
  return data;
};

module.exports = ({ strapi, nexus }) => {
  return {
    types: [
      nexus.extendType({
        type: "UsersPermissionsLoginPayload",
        definition(t) {
          /** Resolve administratorAccounts fields in login and registration  */
          t.list.field("administratorAccounts", {
            type: "AccountEntityResponse",
            resolve: (root) =>
              fetchUserRelation(strapi, root.id, "administratorAccounts"),
          });
        },
      }),
      nexus.extendType({
        type: "UsersPermissionsMe",
        definition(t) {
          t.string("lastName");
          t.string("firstName");
          /** Resolve administratorAccounts fields in me query  */
          t.list.field("administratorAccounts", {
            type: "AccountEntity",
            resolve: (root) =>
              fetchUserRelation(strapi, root.id, "administratorAccounts"),
          });
        },
      }),
    ],
  };
};
