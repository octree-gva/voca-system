module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    const { content, eventType, instance } = result;
    return strapi
      .service("api::webhook.webhook")
      .fire(instance, eventType, content);
  },
};
