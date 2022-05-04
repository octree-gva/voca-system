const { create: createInstance } = require("./instances");
const chance = require("chance").Chance();
const notification = {
  build: (overwrites = {}) => {
    return {
      saga: chance.string({ alpha: true }),
      content: {
        [`${chance.string({ alpha: true })}`]: chance.string({
          alpha: true,
          numeric: true,
        }),
      },
      level: chance.pickone(["info", "warn", "error"]),
      ...overwrites,
    };
  },
  create: async (overwrites = {}) => {
    return await strapi.query("api::notification.notification").create({
      data: {
        instance: await createInstance(),
        ...notification.build(overwrites),
      },
      populate: ["instance"],
    });
  },
};
module.exports = notification;
