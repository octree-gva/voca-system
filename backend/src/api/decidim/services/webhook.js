module.exports = () => {
  const service = {
    async onDecidimFails(instance) {
      await strapi.query("api::notification.notification").create({
        saga: "install",
        instance,
        content: {
          status: "fails",
          msg: msg,
        },
        logLevel: "info",
      });
    },
    async onDecidimReady(instance, payload) {
      const { url } = payload;
      const previousHooks = await strapi
        .query("api::webhook.webhook")
        .findMany({
          where: { instance },
        });
      const adminHook = previousHooks.find(
        ({ eventType }) => eventType === "decidim.admin_created"
      );
      if (!adminHook) service.onDecidimFails(instance);
      const { content: adminCredentials } = adminHook;
      try {
        await strapi
          .plugin("email-designer")
          .service("email")
          .sendTemplatedEmail(
            {
              to: adminCredentials.email,
              from: "hadrien@octree.ch",
              replyTo: "hadrien@octree.ch",
            },
            { templateReferenceId: 13 },
            {
              publicUrl: url,
              adminPassword: adminCredentials.password,
              adminEmail: adminCredentials.email,
            }
          );
      } catch (err) {
        strapi.log.debug("📺: ", err);
        throw err;
      }
    },

    async logInstallSaga(instance, status, msg = undefined) {
      await strapi.query("api::notification.notification").create({
        data: {
          saga: "install",
          instance,
          content: {
            status: status,
            msg: msg,
          },
          level: "info",
        },
      });
    },

    async handleWebhook(inst, eventType, payload) {
      if (!inst) {
        strapi.log.warn("webhook fired without instances.");
        return;
      }
      const instance = await strapi
        .query("api::instance.instance")
        .findOne({ where: { id: inst } });
      switch (eventType) {
        case "decidim.assets_compiled":
          await service.logInstallSaga(instance, "assets_compiled");
          break;
        case "decidim.seed":
          await service.logInstallSaga(instance, "seed");
          break;
        case "decidim.admin_created":
          await service.logInstallSaga(instance, "admin_created");
          break;
        case "decidim.ready":
          await service.onDecidimReady(instance, payload);
          await service.logInstallSaga(instance, "ready");
          break;
      }
    },
  };

  return service;
};
