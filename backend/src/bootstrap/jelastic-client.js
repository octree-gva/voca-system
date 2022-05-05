"use strict";

const jelasticRequestFactory = require("../factories/jelastic/request");
const jelasticClientFactory = require("../factories/jelastic/client");

module.exports = async ({ strapi }) => {
  const config = await strapi
    .query("api::jelastic-config.jelastic-config")
    .findOne();
  const { jelasticHost, jelasticToken } = config || {};
  if (process.env.NODE_ENV === "test") {
    strapi.jelasticClient = { manifest: { install: (x) => x } };
    return;
  }

  if (jelasticHost && jelasticToken) {
    const jelasticRequest = jelasticRequestFactory(strapi, {
      jelasticHost,
      jelasticToken,
    });
    const jelasticClient = jelasticClientFactory(jelasticRequest);
    strapi.jelasticClient = jelasticClient;
    strapi.log.info(`Jelastic client ready.`);
  } else {
    strapi.log.error(`No config for Jelastic API. can not create instances`);
  }
};
