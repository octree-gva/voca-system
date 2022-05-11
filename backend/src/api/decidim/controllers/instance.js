"use strict";

/**
 *  instance controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { ValidationError } = require("@strapi/utils").errors;
const { v4: uuid } = require("uuid");

module.exports = createCoreController(
  "api::decidim.instance",
  ({ strapi }) => ({
    async isSubdomainAvailable(ctx) {
      const { subdomain } = ctx.request.body;
      if (!subdomain) {
        throw new ValidationError("Subdomain is required");
      }
      const isSubdomainAvailable = await strapi
        .service("api::decidim.deployment")
        .isSubdomainAvailable(subdomain);
      if (!isSubdomainAvailable)
        return { ok: false, errCode: "ENV_NAME_UNAVAILABLE" };
      return { ok: true };
    },
    async firstInstall(args) {
      strapi.log.warn("deprecated endpoint");
      const { user: inputUser, instance } = args;

      const isSubdomainAvailable = await strapi
        .service("api::decidim.deployment")
        .isSubdomainAvailable(instance.subdomain);
      if (!isSubdomainAvailable)
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
            // envName will be updated as soon as the environmnent
            // is ready.
            envName: instance.subdomain,
            subdomain: instance.subdomain,
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
