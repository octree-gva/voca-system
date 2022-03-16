module.exports = () => {
  const service = {
    async onDecidimInstall(instance, payload) {
      if (!instance) {
        strapi.log.warn("webhook fired without instances.");
        return;
      }
      // Add a notification
      strapi.query("api::notification.notification").create({
        type: "install",
        instance,
        content: {
          status: "created",
          url: "https://" + instance.envName + ".voca.city",
          msg: "Decidim instance almost ready, seeding",
        },
      });
      // Fire the seed manifest
      await strapi.service("api::jelastic.environment").seed({
        acronym: instance.acronym,
        adminEmail: instance.creator.email,
        subdomain: instance.envName,
      });
    },

    async handleWebhook(instance, eventType, payload) {
      switch (eventType) {
        case "decidim.install":
          service.onDecidimInstall(instance, payload);
          break;
      }
    },
  };

  return service;
};
