const request = require("supertest");
require("../../../helpers/useStrapi");
const { create: createInstance } = require("../../../factories/instances");

describe("content-type/api::decidim.instance", () => {
  beforeEach(() => {
    strapi.service("api::decidim.deployment").deployNew = jest.fn();
  });

  it("fires api::decidim.deployment#deployNew after creation", async () => {
    expect(strapi.service("api::decidim.deployment")).toBeDefined();
    const instance = await createInstance();
    expect(
      strapi.service("api::decidim.deployment").deployNew
    ).toHaveBeenCalledWith(instance);
  });
});
