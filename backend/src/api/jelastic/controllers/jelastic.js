"use strict";
const axios = require("axios");
/**
 * A set of functions called "actions" for `jelastic`
 */
module.exports = {
  environments: async (ctx, next) => {
    try {
      return await strapi
        .service("api::jelastic.jelastic")
        .environment.getAll();
    } catch (e) {
      return ctx.throw(axios.isAxiosError(e) ? 400 : 500, `${e}`);
    }
  },
  environment: async (ctx, next) => {
    try {
      return await strapi
        .service("api::jelastic.jelastic")
        .environment.getOne(`${ctx.params.envName}`);
    } catch (e) {
      return ctx.throw(axios.isAxiosError(e) ? 400 : 500, `${e}`);
    }
  },
  apps: async (ctx, next) => {
    try {
      return await strapi
        .service("api::jelastic.jelastic")
        .environment.getAllApps(`${ctx.params.envName}`);
    } catch (e) {
      return ctx.throw(axios.isAxiosError(e) ? 400 : 500, `${e}`);
    }
  },
  stop: async (ctx, next) => {
    try {
      const {
        data: {
          env: { appid = undefined },
        },
      } = await strapi
        .service("api::jelastic.jelastic")
        .environment.getOne(`${ctx.params.envName}`);
      strapi.log.debug("start " + appid);

      return await strapi
        .service("api::jelastic.jelastic")
        .environment.stop(`${ctx.params.envName}`, `${appid}`);
    } catch (e) {
      return ctx.throw(axios.isAxiosError(e) ? 400 : 500, `${e}`);
    }
  },
  start: async (ctx, next) => {
    try {
      const {
        data: {
          env: { appid = undefined },
        },
      } = await strapi
        .service("api::jelastic.jelastic")
        .environment.getOne(`${ctx.params.envName}`);
      strapi.log.debug("start " + appid);
      return await strapi
        .service("api::jelastic.jelastic")
        .environment.start(`${ctx.params.envName}`, `${appid}`);
    } catch (e) {
      return ctx.throw(axios.isAxiosError(e) ? 400 : 500, `${e}`);
    }
  },
  nodes: async (ctx, next) => {
    try {
      return await strapi
        .service("api::jelastic.jelastic")
        .environment.getAllNodes(`${ctx.params.envName}`);
    } catch (e) {
      return ctx.throw(axios.isAxiosError(e) ? 400 : 500, `${e}`);
    }
  },
  createInstance: async (ctx, next) => {
    try {
      if (!ctx.is("json")) {
        return ctx.throw(415, "json only!");
      }
      const body = ctx.request.body;
      // First create a user with given credentials
      const { email, password, password_confirmation } = body;
      const user = await strapi
        .service("api::account.account")
        .create({ email, password, password_confirmation });
      // Then create an env in jelastic with the given subdomain.
      const { subdomain } = body;
      const instance = await strapi
        .service("api::jelastic.environment")
        .create({ subdomain, current_user: user });
      return ctx.status(201).send({ ok: true, instance });
    } catch (e) {
      strapi.log.error("api::jelastic.jelastic#createEnvironment\t", e);
      return ctx.throw(axios.isAxiosError(e) ? 400 : 500, `${e}`);
    }
  },
};
