"use strict";
const onlyAdmins = {
  name: "api::account.account-team",
  config: {
    model: "api::instance.instance",
  },
};
/**
 * instance router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::instance.instance", {
  config: {
    find: { policies: [onlyAdmins] },
    findOne: { policies: [onlyAdmins] },
    updateOne: { policies: [onlyAdmins] },
    deleteOne: { policies: [onlyAdmins] },
  },
});
