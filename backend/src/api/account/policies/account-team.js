/**
 * This is a generic policy for restricting an API access to
 * an account member.
 *
 * # Use case
 * A model is managed by an account, and account members can only access their instance.
 * Account members can have different permissions models, likes `administrators`, `guests`, etc.
 *
 * # Configuration
 *
 * - scope: the field name of Account we need to look at (optional, default: administrators)
 *          the designed field should be a relationship to user-permissions.
 * - model: the strapi uid for the model to query. For example: "api::decidim.instance" (required, default: undefined)
 * - foreignKey: the model's foreignKey to link to account. support one-to-one relationship only. (optional, default: "account")
 *
 * # Example: restrict update
 * ```
 * # /src/api/decidim/graphql/resolvers.js
 * const onlyAdmins = {
 *   name: "api::account.account-team",
 *   config: {
 *     model: "api::decidim.instance",
 *     foreignKey: "account",
 *     scope: "administrators",
 *   },
 * };
 * module.exports = {
 *   resolversConfig: {
 *     "Mutation.updateInstance": {
 *       policies: [onlyAdmins],
 *     }
 *   }
 * }
 * ```
 *
 *
 * Inspired by https://github.com/strapi/documentation/issues/600
 */
const { ApplicationError } = require("@strapi/utils").errors;
const SUPPORTED_SCOPES = ["administrators"];
module.exports = async (ctx, config, { strapi }) => {
  const {
    scope = "administrators",
    model: modelName,
    foreignKey = "account",
  } = config;
  if (!modelName)
    throw new ApplicationError("Bad policy config. missing `model`");
  if (!SUPPORTED_SCOPES.includes(scope))
    throw new ApplicationError(
      `Bad policy config. unsupported 'scope' (${scope})`
    );

  // Fetch allowed accounts from signed user
  const {
    user: { id: userId },
  } = ctx.state;
  const allowedAccountIds = (
    await strapi
      .query("api::account.account")
      .findMany({ where: { [`${scope}`]: { id: userId } } }, { populate: [] })
  ).map(({ id }) => id);
  if (allowedAccountIds.length === 0) return false;

  // Check variables given over allowed accounts while querying Rest/Graphql endpoints
  const isGraphql = ctx.type === "graphql";
  const { id } = isGraphql ? ctx.args : ctx.params;
  if (!!id) {
    // Will fall in a findOne that don't pass filters.
    // => we need to check manually if we are allowed to access the
    // required model
    const match = await strapi.query(modelName).findOne(
      {
        where: { id, [`${foreignKey}`]: { id: allowedAccountIds } },
      },
      { populate: [] }
    );
    return !!match;
  }

  // Add a filter for many to many queries or updates
  if (isGraphql) {
    ctx.args.filters = {
      and: [
        ctx.args.filters || false,
        { [`${foreignKey}`]: { id: allowedAccountIds } },
      ].filter(Boolean),
    };
  } else {
    ctx.params.filters = {
      $and: [
        ctx.params.filters || false,
        { [`${foreignKey}`]: { id: { $in: allowedAccountIds } } },
      ].filter(Boolean),
    };
  }
  return true;
};
