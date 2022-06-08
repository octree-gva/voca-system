"use stric";

const publicPerms = ["api::notification.webhook.handleOne"];

const authenticated = [
  ...publicPerms,
  "plugin::users-permissions.user.me",
  "plugin::users-permissions.user.find",
  "plugin::users-permissions.user.findOne",
  "api::notification.notification.find",
  "api::account.account.find",
  "api::account.account.findOne",
  "api::decidim.instance.create",
  "api::decidim.instance.update",
  "api::decidim.instance.findOne",
  "api::decidim.instance.find",
];

module.exports = {
  roles: {
    public: publicPerms,
    authenticated,
  },
};
