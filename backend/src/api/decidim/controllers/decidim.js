"use strict";
const axios = require("axios");
const { v4: uuid } = require("uuid");
/**
 * A set of functions called "actions" for `decidim`
 */

module.exports = {
  webhook: async (ctx, next) => {
    const { instanceUUID } = ctx.params;
    const { event_type, content, content_hmac } = ctx.request.body;
    const instance = strapi
      .query("api::instance.instance")
      .findOne({ where: { instanceUUID } });
    await strapi.query("api::webhook.webhook").create({
      data: {
        eventType: event_type,
        instance: instance,
        content: content,
        status: "completed",
      },
    });
  },
  checkSubdomain: async (ctx, next) => {
    const { subdomain } = ctx.params;
    const [_result, matchCount] = await strapi
      .query("api::instance.instance")
      .findWithCount({
        where: { envName: subdomain },
      });
    if (matchCount > 0) ctx.send({ ok: false });
    else ctx.send({ ok: true });
  },
  firstInstall: async (ctx, next) => {
    try {
      const {
        email,
        password,
        password_confirmation,
        title,
        acronym,
        subdomain,
      } = ctx.request.body;
      const account = await strapi.service("api::account.account").create({
        email,
        password,
        password_confirmation,
      });
      // Prepare a new instance (will check unicity for envName)
      const instanceData = await strapi.query("api::instance.instance").create({
        data: {
          title,
          acronym,
          envName: subdomain,
          account: account,
          creator: account.creator,
          status: "pending",
          instanceUUID: uuid(),
        },
        populate: ["creator"],
      });
      await strapi.query("api::notification.notification").create({
        data: {
          type: "first_install",
          instance: instanceData.id,
          content: {
            domain: `${subdomain}.voca.city`,
            status: "pending",
          },
          level: "info",
        },
      });
      await strapi.service("api::jelastic.environment").create({
        subdomain: instanceData.envName,
        current_user: account.creator,
        instanceUUID: instanceData.instanceUUID,
      });
      ctx.send({ ok: true }, 201);
    } catch (err) {
      ctx.throw(axios.isAxiosError(err) ? 400 : 500, `${err}`);
    }
  },
};
