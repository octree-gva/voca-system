"use stric";

const publicPerms = [
  "api::instance.instance.firstInstall",
  "api::instance.instance.find",
];

const authenticated = [];

module.exports = {
  roles: {
    public: publicPerms,
    authenticated,
  },
};
