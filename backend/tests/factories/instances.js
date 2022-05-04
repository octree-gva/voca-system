const chance = require("chance").Chance();
const accountFactory = require("./account");
const userPermissionFactory = require("./userPermission");
const instanceFactory = {
  build: (overwrites = {}) => {
    return {
      title: chance.string({ alpha: true }),
      acronym: chance.string({ alpha: true }),
      envName: chance.string({ alpha: true, length: 24, numeric: true }),
      default_locale: chance.string({
        alpha: true,
        length: 2,
        casing: "upper",
      }),
      available_locales: chance
        .n(chance.string, chance.natural({ min: 1, max: 15 }), {
          alpha: true,
          length: 2,
          casing: "upper",
        })
        .join(","),
      instanceUUID: chance.guid(),
      status: "pending",
      ...overwrites,
    };
  },
  create: async (overwrites = {}) => {
    const creator = await userPermissionFactory.create();
    const entity = instanceFactory.build({
      creator,
      account: await accountFactory.create({
        creator: creator,
        administrators: [creator],
      }),
      ...overwrites,
    });
    return strapi
      .query("api::decidim.instance")
      .create({ data: entity, populate: ["creator"] });
  },
};
module.exports = instanceFactory;
