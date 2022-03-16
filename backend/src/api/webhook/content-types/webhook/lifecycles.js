module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    const { content, eventType, id } = result;
    let { instance } = params.data;
    if (!instance) {
      // Find the instance
      const webhook = await strapi.query("api::webhook.webhook").findOne({
        where: {
          id,
        },
        populate: ["instance"],
      });
      instance = webhook.instance;
    }
    return strapi
      .service("api::webhook.webhook")
      .fire(instance, eventType, content);
  },
};
