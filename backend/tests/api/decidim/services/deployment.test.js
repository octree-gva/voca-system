const request = require("supertest");
require("../../../helpers/useStrapi");
const { create: createInstance } = require("../../../factories/instances");
const {
  create: createManifest,
} = require("../../../factories/jelastic-manifest");
const { create: createConfig } = require("../../../factories/jelastic-config");

describe("service/api::decidim.deployment", () => {
  beforeEach(() => {
    strapi.jelasticClient.manifest.install = jest.fn();
  });

  it("install the manifest with the current config", async () => {
    const config = await createConfig();
    await createManifest({
      installJps: "https://myconfig.url/hello?world=bar",
    });
    await createInstance();
    expect(strapi.jelasticClient.manifest.install).toHaveBeenCalledWith(
      "https://myconfig.url/hello?world=bar",
      {
        displayName: expect.any(String),
        nodeGroup: config.nodeGroup,
        envName: expect.any(String),
        manifestSettings: expect.objectContaining({
          TRAEFIK_ENVNAME: config.traefikEnvName,
          JOB_IMAGE_REGISTRY: config.jobImageRegistry,
          JOB_IMAGE_PAGE: config.jobImagePath,
          PROD_IMAGE_REGISTRY: config.prodImageRegistry,
          PROD_IMAGE_PATH: config.prodImagePath,
          IMAGE_USERNAME: config.registeryUsername,
          IMAGE_PASSWORD: config.registeryPassword,
          ERROR_URL: config.errorUrl,
          WEBHOOK_URL: config.webhookUrl,
          WEBHOOK_HMAC: config.webhookHMAC,
          SMTP_HOST: config.smtpHost,
          SMTP_PORT: config.smtpPort,
          SMTP_USERNAME: config.smtpUsername,
          SMTP_PASSWORD: config.smtpPassword,
          SMTP_AUTHENTICATION: config.smtpAuthentication,
          SMTP_HELO_DOMAIN: config.smtpOpenTimeout,
          SMTP_OPEN_TIMEOUT: config.smtpOpenTimeout,
          SMTP_READ_TIMEOUT: config.smtpReadTimeout,
        }),
      },
      false
    );
  });
  it("install the manifest with the given instance", async () => {
    await createConfig();
    const instance = await createInstance({ subdomain: "test" });
    expect(strapi.jelasticClient.manifest.install).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        displayName: `test.voca.city`,
        manifestSettings: expect.objectContaining({
          PUBLIC_DOMAIN: "test.voca.city",
          PUBLIC_URL: "https://test.voca.city",
          INSTANCE_UUID: instance.instanceUUID,
          TIMEZONE: instance.timezone,
          ADMIN_EMAIL: instance.creator.email,
          DECIDIM_NAME: instance.title,
          DECIDIM_SHORTNAME: instance.acronym,
          DECIDIM_CURRENCY_UNIT: instance.currency,
          DECIDIM_DEFAULT_LOCALE: instance.default_locale,
        }),
      }),
      false
    );
  });
  it("Add default_locale in available locales and serializes in a uniq csv", async () => {
    await createConfig();
    const instance = await createInstance({
      default_locale: "DEF",
      available_locales: "AV1, AV2,AV2 ,AV3",
    });
    expect(strapi.jelasticClient.manifest.install).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        manifestSettings: expect.objectContaining({
          DECIDIM_AVAILABLE_LOCALES: "DEF,AV1,AV2,AV3",
        }),
      }),
      false
    );
  });
});
