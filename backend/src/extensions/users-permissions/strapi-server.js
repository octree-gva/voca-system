module.exports = (plugin) => {
  const sanitizeOutput = (user) => {
    const {
      password,
      resetPasswordToken,
      confirmationToken,
      ...sanitizedUser
    } = user; // be careful, you need to omit other private attributes yourself
    return sanitizedUser;
  };

  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      { populate: ["role", "administratorAccounts"] }
    );

    ctx.body = sanitizeOutput(user);
  };
  plugin.controllers.user.find = async (ctx) => {
    const users = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      { ...ctx.params, populate: ["role", "administratorAccounts"] }
    );
    ctx.body = users.map((user) => sanitizeOutput(user));
  };

  return plugin;
};
