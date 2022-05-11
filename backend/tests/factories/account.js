const chance = require("chance").Chance();
const userPermissionFactory = require("./userPermission");

const account = {
  build: (overwrites = {}) => {
    const email = chance.email();
    return {
      title: chance.string({ alpha: true }),
      ...overwrites,
    };
  },
  create: async (overwrites = {}) => {
    const creator = await userPermissionFactory.create();
    return await strapi.query("api::account.account").create({
      data: {
        creator: creator,
        administrators: [creator],
        ...account.build(overwrites),
      },
      populate: ["creator", "administrators"],
    });
  },
};
module.exports = account;
