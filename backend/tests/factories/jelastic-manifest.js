const configFactory = {
  build: (overwrites = {}) => {
    return {
      installJps: "installJps",
      controlJps: "controlJps",
      ...overwrites,
    };
  },
  create: async (overwrites = {}) => {
    const manifests = await strapi
      .query("api::jelastic-config.jelastic-manifest")
      .findOne();
    if (manifests)
      return strapi.query("api::jelastic-config.jelastic-manifest").update({
        data: configFactory.build(overwrites),
        where: { id: manifests.id },
      });

    return strapi
      .query("api::jelastic-config.jelastic-manifest")
      .create({ data: configFactory.build(overwrites) });
  },
};
module.exports = configFactory;
