"use strict";

/**
 * webhook router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::notification.webhook", {
  only: ["find"],
  config: {
    find: {
      policies: ["api::notification.only-instance"],
      middlewares: [],
    },
  },
});
