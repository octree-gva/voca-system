"use strict";

/**
 * A set of functions called "actions" for `decidim`
 */

module.exports = {
  webhook: async (ctx, next) => {
    const { instanceUUID } = ctx.params;
    const { event_type, content, content_hmac } = ctx.request.body;
    const instance = await strapi
      .query("api::instance.instance")
      .findOne({ where: { instanceUUID } });
    return await strapi.query("api::webhook.webhook").create({
      data: {
        eventType: event_type,
        instance: instance,
        content: content,
        status: "completed",
      },
    });
  },
};
