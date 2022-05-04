module.exports = async (ctx, config, { strapi }) => {
  // Fetch allowed accounts from signed user
  const { user = {} } = ctx.state;
  const { id: userId } = user;

  if (!userId) {
    strapi.log.warn("policy fails, no user found");
    return false;
  }

  const allowedAccountIds = (
    await strapi
      .query("api::account.account")
      .findMany({ where: { administrators: { id: userId } } }, { populate: [] })
  ).map(({ id }) => id);

  if (allowedAccountIds.length === 0) {
    strapi.log.warn(
      "policy fails, user have no available accounts as administrator"
    );
    return false;
  }
  const allowedInstanceIds = (
    await strapi
      .query("api::decidim.instance")
      .findMany(
        { where: { account: { id: { $in: allowedAccountIds } } } },
        { populate: [] }
      )
  ).map(({ id }) => id);
  if (allowedInstanceIds.length === 0) {
    strapi.log.warn("policy fails, user's account have no instance");
    return false;
  }
  const isGraphql = ctx.type === "graphql";
  const { id } = isGraphql ? ctx.args : ctx.params;
  if (!!id) {
    return false; // Can't get a notification alone.
  }

  // Add a filter for many to many queries or updates
  if (isGraphql) {
    ctx.args.filters = {
      and: [
        ctx.args.filters || false,
        { instance: { id: allowedInstanceIds } },
      ].filter(Boolean),
    };
  } else {
    ctx.params.filters = {
      $and: [
        ctx.params.filters || false,
        { instance: { id: { $in: allowedInstanceIds } } },
      ].filter(Boolean),
    };
  }
  return true;
};
