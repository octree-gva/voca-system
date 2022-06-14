const request = require("supertest");
require("../../../../helpers/useStrapi");
const { create: createInstance } = require("../../../../factories/instances");
const {
  create: createManifest,
} = require("../../../../factories/jelastic-manifest");
const {
  create: createConfig,
} = require("../../../../factories/jelastic-config");

describe("service/api::decidim.deployment#updateDomain", () => {
  beforeEach(() => {
    strapi.jelasticClient.manifest.install = jest.fn();
  });

  it("don't update domain if it does not changes ", async () => {
    await createManifest({
      updateDomainJps: "udpateDomainJps",
    });
    const instance = await createInstance({ customDomain: "test-ch" });
    await strapi.query("api::decidim.instance").update({
      data: { customDomain: "test-ch", subdomain: "test-ch" },
      where: { id: instance.id },
    });
    expect(strapi.jelasticClient.manifest.install).toHaveBeenCalledTimes(1);
  });

  it("uses the instance's envName to target installation ", async () => {
    const config = await createConfig();
    await createManifest({
      updateDomainJps: "udpateDomainJps",
    });
    const instance = await createInstance({ customDomain: undefined });
    await strapi.query("api::decidim.instance").update({
      data: { customDomain: "test.ch" },
      where: { id: instance.id },
    });
    expect(strapi.jelasticClient.manifest.install).toHaveBeenCalledTimes(2);
    expect(strapi.jelasticClient.manifest.install.mock.calls).toEqual([
      expect.anything(),
      [
        "udpateDomainJps",
        expect.objectContaining({
          nodeGroup: config.nodeGroup,
          envName: instance.envName,
          manifestSettings: expect.objectContaining({
            TRAEFIK_ENVNAME: config.traefikEnvName,
            PUBLIC_URL: `https://test.ch`,
            PUBLIC_DOMAIN: "test.ch",
          }),
        }),
        false,
      ],
    ]);
  });
});
