const chance = require("chance").Chance();
const account = {
  build: (overwrites = {}) => {
    const email = chance.email();
    return {
      title: chance.string({ alpha: true }),
      ...overwrites,
    };
  },
  create: async (overwrites = {}) => {
    return await strapi.query("api::account.account").create({
      data: {
        ...account.build(overwrites),
      },
    });
  },
};
module.exports = account;
