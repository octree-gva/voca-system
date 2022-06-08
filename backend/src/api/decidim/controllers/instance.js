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
  })
);
