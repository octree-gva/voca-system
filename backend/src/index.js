"use strict";

const graphqlExtends = require("./graphql");
const bootstrapActions = require("./bootstrap");
const { NODE_ENV } = process.env;

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(context) {
    graphqlExtends(context);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(context) {
    const { strapi } = context;
    strapi
      .service("api::webhook.webhook")
      .register(
        /^decidim\.[.]*/,
        strapi.service("api::decidim.webhook").handleWebhook
      );

    if (NODE_ENV !== "test")
      for (let action of bootstrapActions) {
        await action(context);
      }
  },
};
