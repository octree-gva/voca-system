"use strict";

/**
 *  webhook controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { NotFoundError } = require("@strapi/utils").errors;
module.exports = createCoreController(
  "api::notification.webhook",
  ({ strapi }) => ({
    async handleOne(ctx) {
      const { instanceUUID } = ctx.params;
      const { event_type, content, content_hmac } = ctx.request.body;
      const instance = await strapi
        .query("api::decidim.instance")
        .findOne({ where: { instanceUUID } });
      if (!instance) throw new NotFoundError("instance not found");
      return await strapi.query("api::notification.webhook").create({
        data: {
          eventType: event_type,
          instance: instance,
          content: content,
          status: "completed",
        },
      });
    },
  })
);
