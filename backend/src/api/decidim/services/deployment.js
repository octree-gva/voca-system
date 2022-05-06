"use strict";

const { createEnvSchema } = require("../schemas");
const { v4: uuid } = require("uuid");

const DEFAULT_HOSTNAME = "voca.city";

const randomEnvName = (instanceUUID = undefined) => {
  if (!instanceUUID) instanceUUID = uuid();
  const rand = instanceUUID.replace(/-/g, "");
  return rand.substring(0, 24);
};

module.exports = ({ strapi }) => ({
  async isEnvNameAvailable(envName) {
    const [_result, matchCount] = await strapi
      .query("api::decidim.instance")
      .findWithCount({
        where: { envName },
      });
    return matchCount === 0;
  },

  async deployNew(instanceEntity) {
    await strapi.query("api::notification.notification").create({
      data: {
        saga: "install",
        instance: instanceEntity.id,
        content: {
          domain: `${instanceEntity.subdomain}.${DEFAULT_HOSTNAME}`,
          status: "triggered",
        },
        level: "info",
      },
    });
    const conf = await strapi
      .query("api::jelastic-config.jelastic-config")
      .findOne();
    if (!conf && process.env.NODE_ENV !== "test") {
      throw new Error("No config found");
    }
    const defaultLocale = instanceEntity.default_locale;
    // If available locales does not contains default one,
    // add the default to the availables.
    const availableLocales = instanceEntity.available_locales
      .split(",")
      .map((s) => s.trim())
      .reduce(
        (acc, locale) => {
          if (!acc.includes(locale)) acc.push(locale);
          return acc;
        },
        [defaultLocale]
      )
      .join(",");

    const ok = await strapi.jelasticClient.manifest.install(
      conf?.manifestUrl,
      {
        displayName: `${instanceEntity.subdomain}.voca.city`,
        nodeGroup: conf.nodeGroup,
        envName: randomEnvName(instanceEntity.instanceUUID),
        manifestSettings: {
          PUBLIC_DOMAIN: `${instanceEntity.subdomain}.voca.city`,
          PUBLIC_URL: `https://${instanceEntity.subdomain}.voca.city`,
          JOB_IMAGE_REGISTRY: conf.jobImageRegistry,
          JOB_IMAGE_PAGE: conf.jobImagePath,
          PROD_IMAGE_REGISTRY: conf.prodImageRegistry,
          PROD_IMAGE_PATH: conf.prodImagePath,
          IMAGE_USERNAME: conf.registeryUsername,
          IMAGE_PASSWORD: conf.registeryPassword,
          INSTANCE_UUID: instanceEntity.instanceUUID,
          TIMEZONE: instanceEntity.timezone,
          WEBHOOK_URL: conf.webhookUrl,
          WEBHOOK_HMAC: conf.webhookHMAC,
          SMTP_HOST: conf.smtpHost,
          SMTP_PORT: conf.smtpPort,
          SMTP_USERNAME: conf.smtpUsername,
          SMTP_PASSWORD: conf.smtpPassword,
          SMTP_AUTHENTICATION: conf.smtpAuthentication,
          SMTP_HELO_DOMAIN: conf.smtpOpenTimeout,
          SMTP_OPEN_TIMEOUT: conf.smtpOpenTimeout,
          SMTP_READ_TIMEOUT: conf.smtpReadTimeout,
          ADMIN_EMAIL: instanceEntity.creator.email,
          DECIDIM_DEFAULT_SYSTEM_EMAIL: "sysadmin@voca.city",
          DECIDIM_NAME: instanceEntity.title,
          DECIDIM_SHORTNAME: instanceEntity.acronym,
          DECIDIM_CURRENCY_UNIT: instanceEntity.currency,
          DECIDIM_DEFAULT_LOCALE: defaultLocale,
          DECIDIM_AVAILABLE_LOCALES: availableLocales,
        },
      },
      false
    );
    return { ok };
  },
});