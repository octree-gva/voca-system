const request = require("supertest");
require("../../../helpers/useStrapi");
const jelasticConfigFactory = require("../factories/jelastic-config");

describe("service.jelastic.environment", () => {
  const mockUserData = {
    username: "tester",
    email: "tester@voca.city",
    provider: "local",
    password: "1234abc",
    confirmed: true,
    blocked: null,
  };
  let validParams;
  let jelastic;
  let createEnv;
  let user;
  beforeAll(async () => {
    user = await strapi.plugins["users-permissions"].services.user.add({
      ...mockUserData,
    });
    await strapi.query("api::jelastic-config.jelastic-config").create({
      data: jelasticConfigFactory(),
    });
  });
  beforeEach(async () => {
    jelastic = strapi?.service("api::jelastic.environment");
    strapi.service("api::jelastic.jelastic").manifest.install = jest.fn(
      () => true
    );
    createEnv = jelastic?.create;
    validParams = {
      current_user: user,
      subdomain: "participate.bp",
      instanceUUID: "73wghf c hncgtcr",
    };
  });
  it("is defined", () => {
    expect(createEnv).toBeDefined();
  });
  describe("validates subdomain", () => {
    it("is required", async () => {
      expect(async () =>
        createEnv({ ...validParams, subdomain: undefined })
      ).rejects.toBeTruthy();
    });
    it("throws error when using punycode", () => {
      expect(async () =>
        createEnv({ ...validParams, subdomain: "xn--lickbank-ech" })
      ).rejects.toBeTruthy();
    });
    it(`with 'démo' throws validation error`, () => {
      expect(async () =>
        createEnv({ ...validParams, subdomain: "démo" })
      ).rejects.toBeTruthy();
    });
    it(`with 'strange/idea' throws validation error`, () => {
      expect(async () =>
        createEnv({ ...validParams, subdomain: "strange/idea" })
      ).rejects.toBeTruthy();
    });
    it(`with 'that-is-weird-' throws validation error`, () => {
      expect(async () =>
        createEnv({ ...validParams, subdomain: "that-is-weird-" })
      ).rejects.toBeTruthy();
    });
    it(`with '001net' is fine'`, async () => {
      const result = await createEnv({ ...validParams, subdomain: "001net" });
      expect(result.ok).toEqual(true);
    });
    it(`with 'test.participate.bp' is fine'`, async () => {
      const result = await createEnv({
        ...validParams,
        subdomain: "test.participate.bp",
      });
      expect(result.ok).toEqual(true);
    });
  });
  describe("validates current_user", () => {
    it("is required", () => {
      expect(async () =>
        createEnv({ ...validParams, current_user: undefined })
      ).rejects.toBeTruthy();
    });
    it("can not be blocked", () => {
      expect(async () =>
        createEnv({
          ...validParams,
          current_user: { ...validParams.current_user, blocked: true },
        })
      ).rejects.toBeTruthy();
    });
  });

  describe("deploy the jps manifest", () => {});
});
