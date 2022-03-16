"use strict";

/**
 * webhook service.
 */

const { createCoreService } = require("@strapi/strapi").factories;
const listeners = [];
module.exports = createCoreService("api::webhook.webhook", ({ strapi }) => ({
  async register(pattern, listener) {
    listeners.push([new RegExp(pattern, "ig"), listener]);
  },
  async fire(instance, eventType, payload) {
    await Promise.all(
      listeners
        .filter(async ([matcher]) => matcher.test(eventType))
        .map(([_, listener]) => {
          try {
            return listener(instance, eventType, payload);
          } catch (err) {
            strapi.log.warn(`listener fails to handle ${eventType}`);
            return Promise.resolve();
          }
        })
    );
  },
}));
