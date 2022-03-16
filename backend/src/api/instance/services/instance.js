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

  async createInstance(instance, creator) {
    const instanceEntity = await strapi.query("api::instance.instance").create({
      data: {
        title: instance.title,
        acronym: instance.acronym,
        envName: instance.subdomain,
        creator: creator?.id,
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
          domain: `${instance.subdomain}.${DEFAULT_HOSTNAME}`,
          status: "pending",
        },
        level: "info",
      },
    });
    await strapi.service("api::jelastic.environment").create({
      subdomain: instanceEntity.envName,
      current_user: creator,
      instanceUUID: instanceEntity.instanceUUID,
    });

    return instanceEntity;
  },
}));
