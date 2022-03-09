"use strict";
const Yup = require("yup");
const fs = require("fs");
const yaml = require("js-yaml");

const MANIFEST = yaml.load(
  fs.readFileSync(__dirname + "/jps/decidim-install.yml", "utf8")
);

const createEnvSchema = Yup.object().shape({
  subdomain: Yup.string()
    .required("Subdomain is required")
    .matches(
      /^[a-z0-9\-\.\_]+[a-z0-9]+$/,
      "Subdomain is invalid. Uses lowercases"
    )
    .test(
      "punycode",
      "Punycodes are not yet supported",
      (value) => !`${value}`.startsWith("xn--")
    ),
  current_user: Yup.object()
    .required("can not create anonymous instance.")
    .shape({
      username: Yup.string().required("username is required"),
      blocked: Yup.bool().nullable().isFalse("you are blocked"),
    }),
});

module.exports = () => ({
  create: async (options) => {
    await createEnvSchema.validate(options || {});
    const { JELASTIC_INSTANCE_PREFIX = "ief6Se" } = process.env;
    const conf = await strapi
      .query("api::jelastic-config.jelastic-config")
      .findOne();
    if (!conf) throw new Error("No config found");
    const ok = await strapi.service("api::jelastic.jelastic").manifest.install(
      MANIFEST,
      {
        envName: `${JELASTIC_INSTANCE_PREFIX}-${options.subdomain}`,
        displayName: `${options.subdomain}.voca.city`,
        nodeGroup: conf.nodeGroup,
        manifestSettings: {
          JOB_IMAGE_REGISTRY: conf.jobImageRegistry,
          JOB_IMAGE_PAGE: conf.jobImagePath,
          PROD_IMAGE_REGISTRY: conf.prodImageRegistry,
          PROD_IMAGE_PATH: conf.prodImagePath,
          IMAGE_USERNAME: conf.registeryUsername,
          IMAGE_PASSWORD: conf.registeryPassword,
          DECIDIM_DEFAULT_SYSTEM_EMAIL: conf.defaultFromEmail,
          DECIDIM_DEFAULT_SYSTEM_PASSWORD: conf.defaultSystemPassword,
          DECIDIM_NAME: "Voca.city",
          DECIDIM_SHORTNAME: `${options.subdomain}`,
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
});
