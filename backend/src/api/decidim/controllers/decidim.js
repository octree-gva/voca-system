"use strict";
const axios = require("axios");

/**
 * A set of functions called "actions" for `decidim`
 */

module.exports = {
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
      console.log("BOD", ctx.request.body);
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
        },
        populate: ["creator"],
      });
      await strapi.service("api::jelastic.environment").create({
        subdomain: instanceData.envName,
        current_user: account.creator,
      });
      ctx.send({ ok: true }, 201);
    } catch (err) {
      ctx.throw(axios.isAxiosError(err) ? 400 : 500, `${err}`);
    }
  },
};
