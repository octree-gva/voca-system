"use stric";

const publicPerms = [
  "api::decidim.instance.firstInstall",
  "api::decidim.instance.find",
  "api::notification.webhook.handleOne",
  "api::notification.notification.find",
];

const authenticated = [
  ...publicPerms,
  "plugin::users-permissions.user.me",
  "plugin::users-permissions.user.update",
];

module.exports = {
  roles: {
    public: publicPerms,
    authenticated,
  },
};
