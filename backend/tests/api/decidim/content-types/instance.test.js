const request = require("supertest");
require("../../../helpers/useStrapi");
const { create: createInstance } = require("../../../factories/instances");

describe("content-type/api::decidim.instance", () => {
  beforeEach(() => {
    strapi.service("api::decidim.deployment").deployNew = jest.fn();
    strapi.service("api::decidim.deployment").updateDomain = jest.fn();
  });

  it("fires api::decidim.deployment#deployNew after creation", async () => {
    expect(strapi.service("api::decidim.deployment")).toBeDefined();
    const instance = await createInstance();
    expect(
      strapi.service("api::decidim.deployment").deployNew
    ).toHaveBeenCalledWith(instance);
  });
  it("fires api::decidim.deployment#updateDomain after update", async () => {
    expect(strapi.service("api::decidim.deployment")).toBeDefined();
    const instance = await createInstance();
    await strapi.query("api::decidim.instance").update({
      data: { customDomain: "test.ch" },
      where: { id: instance.id },
    });
    expect(
      strapi.service("api::decidim.deployment").updateDomain
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        id: instance.id,
        customDomain: "test.ch",
      })
    );
  });
});
