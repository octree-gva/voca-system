"use strict";

const fs = require("fs");
const yaml = require("js-yaml");
const { seedEnvSchema, createEnvSchema } = require("../schemas");

const INSTALL_MANIFEST = yaml.load(
  fs.readFileSync("src/manifests/decidim-install.yml", "utf8")
);
const SEED_MANIFEST = yaml.load(
  fs.readFileSync("src/manifests/decidim-seed.yml", "utf8")
);

module.exports = () => ({
  create: async (options) => {
    await createEnvSchema.validate(options || {});
    const conf = await strapi
      .query("api::jelastic-config.jelastic-config")
      .findOne();

    if (!conf) throw new Error("No config found");

    const namePrefix = conf?.jelasticInstancePrefix || "v--";
    const ok = await strapi.jelasticClient.manifest.install(
      INSTALL_MANIFEST,
      {
        envName: `${namePrefix}-${options.subdomain}`,
        displayName: `${options.subdomain}.voca.city`,
        nodeGroup: conf.nodeGroup,
        manifestSettings: {
          JOB_IMAGE_REGISTRY: conf.jobImageRegistry,
          JOB_IMAGE_PAGE: conf.jobImagePath,
          PROD_IMAGE_REGISTRY: conf.prodImageRegistry,
          PROD_IMAGE_PATH: conf.prodImagePath,
          IMAGE_USERNAME: conf.registeryUsername,
          IMAGE_PASSWORD: conf.registeryPassword,
          INSTANCE_UUID: options.instanceUUID,
          TIMEZONE: conf.decidimTimezone,
          WEBHOOK_URL: conf.webhookUrl,
          WEBHOOK_USERNAME: conf.webhookUsername,
          WEBHOOK_PASSWORD: conf.webhookPassword,
          WEBHOOK_HMAC: conf.webhookHMAC,
          SMTP_HOST: conf.smtpHost,
          SMTP_PORT: conf.smtpPort,
          SMTP_USERNAME: conf.smtpUsername,
          SMTP_PASSWORD: conf.smtpPassword,
          SMTP_AUTHENTICATION: conf.smtpAuthentication,
          SMTP_HELO_DOMAIN: conf.smtpOpenTimeout,
          SMTP_OPEN_TIMEOUT: conf.smtpOpenTimeout,
          SMTP_READ_TIMEOUT: conf.smtpReadTimeout,
        },
      },
      false
    );
    return { ok };
  },

  seed: async (options) => {
    await seedEnvSchema.validate(options || {});
    const conf = await strapi
      .query("api::jelastic-config.jelastic-config")
      .findOne();
    if (!conf) throw new Error("No config found");

    const namePrefix = conf?.jelasticInstancePrefix || "v--";

    const ok = await strapi.jelasticClient.manifest.install(
      SEED_MANIFEST,
      {
        envName: `${namePrefix}-${options.subdomain}`,
        displayName: `${options.subdomain}.voca.city`,
        manifestSettings: {
          ADMIN_EMAIL: options.adminEmail,
          DECIDIM_DEFAULT_SYSTEM_EMAIL: conf.defaultFromEmail,
          DECIDIM_DEFAULT_SYSTEM_PASSWORD: conf.defaultSystemPassword,
          DECIDIM_NAME: "vocacity",
          DECIDIM_SHORTNAME: `${options.acronym}`,
        },
      },
      false
    );
    return { ok };
  },
});
