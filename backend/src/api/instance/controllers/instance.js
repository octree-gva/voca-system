"use strict";

/**
 *  instance controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::instance.instance",
  ({ strapi }) => ({
    async firstInstall(args) {
      const { user, instance } = args;

      const isEnvNameAvailable = await strapi
        .service("api::instance.instance")
        .isEnvNameAvailable(instance.subdomain);
      if (!isEnvNameAvailable)
        return { ok: false, errCode: "ENV_NAME_UNAVAILABLE" };

      let account = null;
      try {
        account = await strapi.service("api::account.account").create(user);
      } catch (error) {
        strapi.log.error(error);
        return { ok: false, errCode: "EMAIL_UNAVAILABLE" };
      }

      try {
        await strapi
          .service("api::instance.instance")
          .createInstance(instance, account);
        return { ok: true };
      } catch (error) {
        strapi.log.error(error);
        return { ok: false, errCode: "SERVER_ERROR" };
      }
    },
  })
);
