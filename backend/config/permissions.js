"use stric";

const publicPerms = [
  "api::instance.instance.firstInstall",
  "api::instance.instance.find",
];

const authenticated = [
  ...publicPerms,
  "plugin::users-permissions.user.me",
  "plugin::users-permissions.user.update",
  "api::notification.notification.find",
];

module.exports = {
  roles: {
    public: publicPerms,
    authenticated,
  },
};
