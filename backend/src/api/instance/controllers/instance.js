"use strict";

/**
 *  instance controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { v4: uuid } = require("uuid");

module.exports = createCoreController(
  "api::instance.instance",
  ({ strapi }) => ({
    async firstInstall(args) {
      const { user, instance } = args;
      const account = await strapi.service("api::account.account").create(user);

      // Prepare a new instance (will check unicity for envName
      try {
        const instanceEntity = await strapi
          .query("api::instance.instance")
          .create({
            data: {
              title: instance.title,
              acronym: instance.acronym,
              envName: instance.subdomain,
              creator: account.creator?.id,
              instanceUUID: uuid(),
              status: "pending",
            },
            populate: ["creator"],
          });
        await strapi.query("api::notification.notification").create({
          data: {
            type: "first_install",
            instance: instanceEntity.id,
            content: {
              domain: `${instance.subdomain}.voca.city`,
              status: "pending",
            },
            level: "info",
          },
        });
        await strapi.service("api::jelastic.environment").create({
          subdomain: instanceEntity.envName,
          current_user: account.creator,
          instanceUUID: instanceEntity.instanceUUID,
        });
        return { ok: true };
      } catch (error) {
        strapi.log.error(error);
        throw error;
      }
    },

    async isSubdomainAvailable(args) {
      const { subdomain: envName } = args;
      const [_result, matchCount] = await strapi
        .query("api::instance.instance")
        .findWithCount({
          where: { envName },
        });
      return matchCount > 0;
    },
  })
);
