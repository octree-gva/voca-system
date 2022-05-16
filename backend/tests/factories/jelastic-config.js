const configFactory = {
  build: (overwrites = {}) => {
    return {
      jelasticHost: "JELASTICHOST",
      jelasticToken: "JELASTICTOKEN",
      jobImageRegistry: "JOBIMAGEREGISTRY",
      jobImagePath: "JOBIMAGEPATH",
      prodImageRegistry: "PRODIMAGEREGISTRY",
      prodImagePath: "PRODIMAGEPATH",
      registeryUsername: "REGISTERYUSERNAME",
      registeryPassword: "REGISTERYPASSWORD",
      defaultFromEmail: "DEFAULTFROMEMAIL",
      defaultSystemPassword: "DEFAULTSYSTEMPASSWORD",
      webhookUrl: "WEBHOOKURL",
      webhookHMAC: "WEBHOOKHMAC",
      smtpHost: "SMTPHOST",
      smtpPort: "SMTPPORT",
      smtpUsername: "SMTPUSERNAME",
      smtpPassword: "SMTPPASSWORD",
      smtpAuthentication: "SMTPAUTHENTICATION",
      smtpOpenTimeout: "SMTPOPENTIMEOUT",
      smtpReadTimeout: "SMTPREADTIMEOUT",
      nodeGroup: "nodeGroup",
      ...overwrites,
    };
  },
  create: async (overwrites = {}) => {
    const config = await strapi
      .query("api::jelastic-config.jelastic-config")
      .findOne();
    if (config)
      return strapi.query("api::jelastic-config.jelastic-config").update({
        data: configFactory.build(overwrites),
        where: { id: config.id },
      });

    return strapi
      .query("api::jelastic-config.jelastic-config")
      .create({ data: configFactory.build(overwrites) });
  },
};
module.exports = configFactory;
