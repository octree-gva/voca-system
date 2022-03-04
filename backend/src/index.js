"use strict";
const httpsBoot = require("./https-boot");
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    await Promise.all([
      process.env.NODE_ENV === "development"
        ? httpsBoot(strapi)
        : Promise.resolve(),
    ]);
  },
};
