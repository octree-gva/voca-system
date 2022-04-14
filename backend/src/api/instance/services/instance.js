"use strict";

const { v4: uuid } = require("uuid");
const { createCoreService } = require("@strapi/strapi").factories;

const DEFAULT_HOSTNAME = "voca.city";

module.exports = createCoreService("api::instance.instance", ({ strapi }) => ({
  async isEnvNameAvailable(envName) {
    const [_result, matchCount] = await strapi
      .query("api::instance.instance")
      .findWithCount({
        where: { envName },
      });
    return matchCount === 0;
  },

  async createInstance(instance, account) {
    const instanceEntity = await strapi.query("api::instance.instance").create({
      data: {
        title: instance.title,
        acronym: instance.acronym,
        envName: instance.subdomain,
        default_locale: instance.default_locale,
        available_locales: instance.available_locales,
        instanceUUID: uuid(),
        creator: account.creator,
        status: "pending",
        account: account.id,
      },
    });
    await strapi.query("api::notification.notification").create({
      data: {
        type: "first_install",
        instance: instanceEntity.id,
        content: {
          domain: `${instance.subdomain}.${DEFAULT_HOSTNAME}`,
          status: "pending",
        },
        level: "info",
      },
    });
    await strapi.service("api::decidim.instance").create({
      title: instanceEntity.title,
      acronym: instanceEntity.acronym,
      subdomain: instanceEntity.envName,
      current_user: account.creator,
      instanceUUID: instanceEntity.instanceUUID,
      available_locales: instanceEntity.available_locales,
      default_locale: instanceEntity.default_locale,
      timezone: instanceEntity.timezone,
      currency: instanceEntity.currency,
    });
    return instanceEntity;
  },
}));
