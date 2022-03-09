const request = require("supertest");
require("../../../helpers/useStrapi");

const jelasticConfigFactory = require("../factories/jelastic-config");
const axios = require("axios");

describe("service.jelastic.jelastic", () => {
  beforeEach(async () => {
    // create a config
    await strapi.query("api::jelastic-config.jelastic-config").create({
      data: jelasticConfigFactory(),
    });
  });
  it("is defined", () => {
    const jelasticApi = strapi.service("api::jelastic.jelastic").raw;
    expect(jelasticApi).toBeDefined();
  });
});
