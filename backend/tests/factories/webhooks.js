const { create: createInstance } = require("./instances");
const chance = require("chance").Chance();
const webhook = {
  build: (overwrites = {}) => {
    const email = chance.email();
    return {
      eventType: chance.string({ alpha: true }),
      content: {
        [`${chance.string({ alpha: true })}`]: chance.string({
          alpha: true,
          numeric: true,
        }),
      },
      status: chance.pickone(["waiting", "completed"]),
      ...overwrites,
    };
  },
  create: async (overwrites = {}) => {
    return await strapi.query("api::notification.webhook").create({
      data: {
        ...webhook.build(overwrites),
        instance: await createInstance(),
      },
      populate: ["instance"],
    });
  },
};
module.exports = webhook;
