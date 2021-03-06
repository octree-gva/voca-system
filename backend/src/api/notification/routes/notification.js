"use strict";

/**
 * notification router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::notification.notification", {
  only: ["find"],
  config: {
    find: {
      auth: { scope: ["admin"] },
      policies: ["api::notification.only-instance"],
      middlewares: [],
    },
  },
});
