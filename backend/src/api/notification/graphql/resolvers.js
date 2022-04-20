module.exports = ({ nexus, strapi }) => ({
  resolversConfig: {
    "Query.notifications": {
      policies: ["api::notification.only-instance"],
    },
    "Query.notification": {
      policies: ["api::notification.only-instance"],
    },
  },
});
