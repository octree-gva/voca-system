"use strict";

/**
 * A set of functions called "actions" for `jelastic`
 */
module.exports = {
  createInstance: async (ctx, next) => {
    try {
      if (!ctx.is("json")) {
        ctx.throw(415, "json only!");
        return;
      }
      const body = ctx.request.body;
      // First create a user with given credentials
      const { email, password, password_confirmation } = body;
      const user = await strapi
        .service("api::jelastic.account")
        .create({ email, password, password_confirmation });
      // Then create an env in jelastic with the given subdomain
      const { subdomain } = body;
      const instance = await strapi
        .service("api::jelastic.environment")
        .create({ subdomain, current_user: user });
      ctx.status(201).send({ ok: true, instance });
    } catch (err) {
      strapi.log.error(err);
      ctx.status(400).send({ ok: false });
    }
  },
};
