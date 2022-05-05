"use strict";

/**
 *  instance controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { v4: uuid } = require("uuid");

module.exports = createCoreController(
  "api::decidim.instance",
  ({ strapi }) => ({
    async firstInstall(args) {
      const { user: inputUser, instance } = args;

      const isEnvNameAvailable = await strapi
        .service("api::decidim.deployment")
        .isEnvNameAvailable(instance.subdomain);
      if (!isEnvNameAvailable)
        return { ok: false, errCode: "ENV_NAME_UNAVAILABLE" };

      // Create user from params
      const authenticatedRole = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: "authenticated" }, populate: [] });
      const user = await strapi.entityService.create(
        "plugin::users-permissions.user",
        {
          data: {
            email: inputUser.email,
            username: inputUser.email,
            password: inputUser.password,
            role: authenticatedRole,
            provider: "local",
            confirmed: true,
          },
          populate: ["administratorAccounts"],
        }
      );
      if (!user) return { ok: false, errCode: "USER_BAD_DATA" };
      // Get personal workspace account
      const [account] = user.administratorAccounts || [];
      if (!account) return { ok: false, errCode: "USER_BAD_DATA" };

      try {
        await strapi.query("api::decidim.instance").create({
          data: {
            title: instance.title,
            acronym: instance.acronym,
            envName: instance.subdomain,
            default_locale: instance.default_locale,
            available_locales: instance.available_locales,
            instanceUUID: uuid(),
            creator: user,
            status: "pending",
            account: account.id,
          },
          populate: ["account", "creator"],
        });
        return { ok: true };
      } catch (error) {
        strapi.log.error(error);
        return { ok: false, errCode: "SERVER_ERROR" };
      }
    },
  })
);
