"use stric";

const publicPerms = [
  "api::decidim.instance.firstInstall",
  "api::notification.webhook.handleOne",
];

const authenticated = [
  ...publicPerms,
  "plugin::users-permissions.user.me",
  "plugin::users-permissions.user.update",
  "api::notification.notification.find",
  "api::decidim.instance.create",
  "api::decidim.instance.update",
  "api::decidim.instance.find",
];

module.exports = {
  roles: {
    public: publicPerms,
    authenticated,
  },
};
